"use client";
import React, { useRef, useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { Button } from "@/components/ui/button";
import { Circle, Pen, PencilLine, RectangleHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCurrentActiveUser } from "@/actions/member/getActiveMembers";
import { User } from "@prisma/client";

// Interface for drawing data
interface DrawingData {
  x: number;
  y: number;
  color: string;
  mode: DrawingMode;
  width?: number;
  height?: number;
  endX?: number;
  endY?: number;
}

// Enumeration for drawing modes
enum DrawingMode {
  Freehand,
  Rectangle,
  Circle,
  Line,
}

const DrawingCanvas = () => {
  // Ref for canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State variables
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [color, setColor] = useState("black");
  const [mode, setMode] = useState<DrawingMode>(DrawingMode.Freehand);
  const [drawingData, setDrawingData] = useState<DrawingData[]>([]);
  const [realtimeCursors, setRealtimeCursors] = useState<
    { x: number; y: number; name: string }[]
  >([]);
  const [textData, setTextData] = useState<
    { x: number; y: number; text: string }[]
  >([]);
  const [inputPosition, setInputPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<User>();

  // Other hooks
  const { socket } = useSocket();
  const { projectId, orgId } = useParams();

  //get current user
  useEffect(() => {
    const handleCurrentUser = async () => {
      const user = await getCurrentActiveUser();
      setCurrentUser(user!);
    };
    handleCurrentUser();
  }, []);

  // Effect for drawing data changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    drawingData.forEach((data) => {
      drawShape(context!, data);
    });
  }, [drawingData]);

  // Effect for listening to socket events
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    drawingData.forEach((data) => {
      drawShape(context!, data);
    });

    realtimeCursors.forEach((cursor) => {
      drawCursor(context!, cursor);
    });

    textData.forEach((text) => {
      context!.fillStyle = color;
      context!.font = "16px Arial";
      context!.fillText(text.text, text.x, text.y);
    });
  }, [drawingData, realtimeCursors, textData, color]);

  // Effect for handling socket events
  useEffect(() => {
    socket?.on("cursor", (cursorData) => {
      setRealtimeCursors((prevCursors) => {
        const existingCursorIndex = prevCursors.findIndex(
          (cursor) => cursor.name === cursorData.name
        );
        if (existingCursorIndex !== -1) {
          prevCursors[existingCursorIndex] = cursorData;
          return [...prevCursors];
        } else {
          return [...prevCursors, cursorData];
        }
      });
    });

    socket?.on("draw", (drawData: DrawingData) => {
      setDrawingData((prevData) => [...prevData, drawData]);
    });

    socket?.on(
      "addText",
      (textData: { x: number; y: number; text: string }[]) => {
        setTextData(textData);
      }
    );

    socket?.on("clearRect", (data) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
      setDrawingData(data);
    });

    socket?.on("clear", () => {
      setDrawingData([]);
      setTextData([]);
    });

    return () => {
      socket?.off("cursor");
      socket?.off("draw");
      socket?.off("addText");
      socket?.off("clearRect");
      socket?.off("clear");
    };
  }, [socket]);

  // Function to draw shapes
  const drawShape = (
    context: CanvasRenderingContext2D | null,
    data: DrawingData
  ) => {
    if (!context) return;

    context.strokeStyle = data.color;
    context.lineWidth = data.mode === DrawingMode.Freehand ? 3 : 2;

    if (data.mode === DrawingMode.Freehand) {
      context.beginPath();
      context.moveTo(data.x, data.y);
      context.lineTo(data.endX!, data.endY!);
      context.stroke();
    } else if (data.mode === DrawingMode.Rectangle) {
      context.strokeRect(data.x, data.y, data.width!, data.height!);
    } else if (data.mode === DrawingMode.Circle) {
      const radius = Math.sqrt(
        Math.pow(data.width!, 2) + Math.pow(data.height!, 2)
      );
      context.beginPath();
      context.arc(data.x, data.y, radius, 0, Math.PI * 2);
      context.stroke();
    } else if (data.mode === DrawingMode.Line) {
      context.beginPath();
      context.moveTo(data.x, data.y);
      context.lineTo(data.endX!, data.endY!);
      context.stroke();
    }
  };

  // Function to draw cursors
  const drawCursor = (
    context: CanvasRenderingContext2D | null,
    cursor: { x: number; y: number; name: string }
  ) => {
    if (!context) return;

    context.beginPath();
    context.arc(cursor.x, cursor.y, 5, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
    context.fillText(cursor.name, cursor.x + 10, cursor.y - 10);
  };

  // Function to start drawing
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasBounds = canvas.getBoundingClientRect();
    setStartX(event.clientX - canvasBounds.left);
    setStartY(event.clientY - canvasBounds.top);
    setEndX(event.clientX - canvasBounds.left);
    setEndY(event.clientY - canvasBounds.top);
  };

  // Function to draw
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    socket?.emit(
      "cursor",
      {
        x: event.clientX,
        y: event.clientY,
        name: currentUser?.name,
      },
      projectId
    );

    setEndX(event.clientX);
    setEndY(event.clientY);

    if (mode === DrawingMode.Freehand) {
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(event.clientX, event.clientY);
      context.closePath();
      context.stroke();

      socket?.emit(
        "draw",
        {
          x: startX,
          y: startY,
          color,
          mode: DrawingMode.Freehand,
          endX: event.clientX,
          endY: event.clientY,
        },
        projectId
      );

      setDrawingData((prevData) => [
        ...prevData,
        {
          x: startX,
          y: startY,
          color,
          mode: DrawingMode.Freehand,
          endX: event.clientX,
          endY: event.clientY,
        },
      ]);

      setStartX(event.clientX);
      setStartY(event.clientY);
    } else {
      socket?.emit("clearRect", drawingData, projectId);
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawingData.forEach((data) => {
        drawShape(context, data);
      });

      if (mode === DrawingMode.Rectangle) {
        context.strokeStyle = color;
        context.strokeRect(
          startX,
          startY,
          event.clientX - startX,
          event.clientY - startY
        );

        socket?.emit(
          "draw",
          {
            x: startX,
            y: startY,
            color,
            mode: DrawingMode.Rectangle,
            width: event.clientX - startX,
            height: event.clientY - startY,
            endX: event.clientX,
            endY: event.clientY,
          },
          projectId
        );
      } else if (mode === DrawingMode.Circle) {
        context.strokeStyle = color;
        const radius = Math.sqrt(
          Math.pow(event.clientX - startX, 2) +
            Math.pow(event.clientY - startY, 2)
        );
        context.beginPath();
        context.arc(startX, startY, radius, 0, Math.PI * 2);
        context.stroke();

        socket?.emit(
          "draw",
          {
            x: startX,
            y: startY,
            color,
            mode: DrawingMode.Circle,
            width: event.clientX - startX,
            height: event.clientY - startY,
            endX: event.clientX,
            endY: event.clientY,
          },
          projectId
        );
      } else if (mode === DrawingMode.Line) {
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(event.clientX, event.clientY);
        context.stroke();

        socket?.emit(
          "draw",
          {
            x: startX,
            y: startY,
            color,
            mode: DrawingMode.Line,
            endX: event.clientX,
            endY: event.clientY,
          },
          projectId
        );
      }
    }
  };

  // Function to end drawing
  const endDrawing = () => {
    if (isDrawing) {
      setDrawingData((prevData) => [
        ...prevData,
        {
          x: startX,
          y: startY,
          color,
          mode,
          width: endX - startX,
          height: endY - startY,
          endX,
          endY,
        },
      ]);
      setIsDrawing(false);
    }
  };

  // Event handler for color change
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  // Event handler for mode change
  const handleModeChange = (newMode: DrawingMode) => {
    setMode(newMode);
  };

  // Function to clear canvas
  const clearCanvas = () => {
    setDrawingData([]);
    setTextData([]);

    socket?.emit("clear", projectId);
  };

  // Event handler for double click
  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasBounds = canvas.getBoundingClientRect();
    const x = event.clientX - canvasBounds.left;
    const y = event.clientY - canvasBounds.top;

    setInputPosition({ x, y });
    setTextData((prevTextData) => [...prevTextData, { x, y, text: "" }]);
  };

  // Event handler for text change
  const handleTextChange = (index: number, value: string) => {
    setTextData((prevTextData) => {
      const updatedTextData = [...prevTextData];
      updatedTextData[index].text = value;
      socket?.emit("addText", updatedTextData);
      return updatedTextData;
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-gray-50 w-full h-full relative">
      <div className="bg-sky-100  px-6 py-2 flex items-center justify-center rounded-full absolute top-2">
        <div className="flex items-center gap-4 flex-wrap">
          <Link href={`/${orgId}/${projectId}/tasks`}>
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          </Link>
          <hr className="w-[.1rem] h-[2rem] bg-black" />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-[3.5rem] h-[2.6rem] rounded-md"
          />
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Freehand)}
            variant={"outline"}
          >
            <Pen />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Rectangle)}
            variant={"outline"}
          >
            <RectangleHorizontal />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Circle)}
            variant={"outline"}
          >
            <Circle />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Line)}
            variant={"outline"}
          >
            <PencilLine />
          </Button>
          <Button size={"sm"} variant={"destructive"} onClick={clearCanvas}>
            Clear
          </Button>
        </div>
      </div>
      <div className="w-[99%] h-[100%] border-black border">
        <canvas
          className="bg-white w-full h-full"
          height={window.innerHeight}
          width={window.innerWidth}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
          onDoubleClick={handleDoubleClick}
        ></canvas>
        {inputPosition && (
          <input
            type="text"
            style={{
              position: "absolute",
              top: inputPosition.y,
              left: inputPosition.x,
            }}
            autoFocus
            onBlur={() => setInputPosition(null)}
            value={textData[textData.length - 1].text}
            onChange={(e) =>
              handleTextChange(textData.length - 1, e.target.value)
            }
          />
        )}
      </div>
    </div>
  );
};

export default DrawingCanvas;
