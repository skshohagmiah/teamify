"use client";
import React, { useRef, useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { Button } from "@/components/ui/button";
import { Circle, Pen, PencilLine, RectangleHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

enum DrawingMode {
  Freehand,
  Rectangle,
  Circle,
  Line,
}

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [color, setColor] = useState("black");
  const [mode, setMode] = useState<DrawingMode>(DrawingMode.Freehand);
  const [drawingData, setDrawingData] = useState<DrawingData[]>([]);
  const { socket } = useSocket();
  const { projectId, orgId } = useParams();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    drawingData.forEach((data) => {
      drawShape(context!, data);
    });
  }, [drawingData]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const startDrawing = (event: MouseEvent) => {
      setIsDrawing(true);
      setStartX(event.clientX);
      setStartY(event.clientY);
      setEndX(event.clientX);
      setEndY(event.clientY);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing || !context) return;

      setEndX(event.clientX);
      setEndY(event.clientY);

      // Draw based on the current mode
      if (mode === DrawingMode.Freehand) {
        // Draw freehand path
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();

        // Emit drawing data to the server
        socket?.emit(
          "draw",
          {
            x: startX,
            y: startY,
            color,
            mode: DrawingMode.Freehand,
            endX,
            endY,
          },
          projectId
        );

        // Add freehand data to drawing data
        setDrawingData((prevData) => [
          ...prevData,
          {
            x: startX,
            y: startY,
            color,
            mode: DrawingMode.Freehand,
            endX,
            endY,
          },
        ]);

        // Update start point for the next segment
        setStartX(endX);
        setStartY(endY);
      } else {
        // Clear previous drawings
        socket?.emit("clearRect", drawingData, projectId);
        context.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);

        // Redraw previous drawings
        drawingData.forEach((data) => {
          drawShape(context, data);
        });

        // Draw the current shape in real-time
        if (mode === DrawingMode.Rectangle) {
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
              height: event.clientY - startY,
              width: event.clientX - startX,
              mode: DrawingMode.Rectangle,
              endX,
              endY,
            },
            projectId
          );
        } else if (mode === DrawingMode.Circle) {
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
              height: event.clientY - startY,
              width: event.clientX - startX,
              mode: DrawingMode.Circle,
              endX,
              endY,
            },
            projectId
          );
        } else if (mode === DrawingMode.Line) {
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
              height: event.clientY - startY,
              width: event.clientX - startX,
              mode: DrawingMode.Line,
              endX,
              endY,
            },
            projectId
          );
        }
      }
    };

    const endDrawing = () => {
      if (isDrawing) {
        // Add the final shape data to drawing data
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

    canvas?.addEventListener("mousedown", startDrawing);
    canvas?.addEventListener("mousemove", draw);
    canvas?.addEventListener("mouseup", endDrawing);
    canvas?.addEventListener("mouseout", endDrawing);

    return () => {
      canvas?.removeEventListener("mousedown", startDrawing);
      canvas?.removeEventListener("mousemove", draw);
      canvas?.removeEventListener("mouseup", endDrawing);
      canvas?.removeEventListener("mouseout", endDrawing);
    };
  }, [isDrawing, startX, startY, endX, endY, color, mode, socket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    socket?.on("clearRect", (data) => {
      context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
      setDrawingData(data);
    });

    socket?.on("draw", (data: DrawingData) => {
      setDrawingData((prevData) => [...prevData, data]);
    });
    socket?.on("clearDraw", (data) => {
      setDrawingData(data);
    });
  }, [socket]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleModeChange = (newMode: DrawingMode) => {
    setMode(newMode);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    setDrawingData([]);

    socket?.emit("clearDraw", [], projectId);
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
          >
            <Pen />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Rectangle)}
          >
            <RectangleHorizontal />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Circle)}
          >
            <Circle />
          </Button>
          <Button
            size={"sm"}
            onClick={() => handleModeChange(DrawingMode.Line)}
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
        ></canvas>
      </div>
    </div>
  );
};

export default DrawingCanvas;
