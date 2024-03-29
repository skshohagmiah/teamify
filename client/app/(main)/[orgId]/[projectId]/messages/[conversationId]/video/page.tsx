// @ts-nocheck
"use client";

import { otherMemberId } from "@/actions/messages/updateMember";
import { createNotification } from "@/actions/notification/createNotification";
import { Button } from "@/components/ui/button";
import useSocket from "@/hooks/useSocket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VideoCallPage() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [muteAudio, setMuteAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const { conversationId: ROOM_ID, orgId, projectId } = useParams();
  const router = useRouter();
  const { socket } = useSocket();


  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.services.mozilla.com" },
      { urls: "stun:numb.viagenie.ca" },
    ],
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const callUser = async (userId, stream) => {
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log('ice condidate', event.candidate)
        socket?.emit("ice-candidate", event.candidate, ROOM_ID);
      }
    };

    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket?.emit("offer", offer, userId);
  };

  useEffect(() => {
    const initialize = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      const otherUserId = await otherMemberId(ROOM_ID);

      const onCreateNotication = async () => {
        await createNotification({
          content: `has Called you, go to chats`,
          projectId: projectId as string,
          isGroup: false,
          receiverId: otherUserId,
        });
        socket?.emit("notification-indicator", {
          receiverId: otherMemberId,
          shouldIndicate: true,
        });
      };
      onCreateNotication();

      socket?.emit("join room", ROOM_ID);

      socket?.on("other user", (userId) => {
        console.log(userId, socket.id)
        callUser(userId, stream);
      });

      socket?.on("offer", async (offer, userId) => {
        console.log(offer)
        await handleOffer(offer, userId);
      });

      socket?.on("answer", async (answer) => {
        console.log(answer)
        await handleAnswer(answer);
      });

      socket?.on("ice-candidate", async (candidate) => {
        console.log(candidate)
        await handleNewICECandidateMsg(candidate);
      });
    };

    initialize();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (socket) {
        socket.disconnect();
      }
    };
  }, [ROOM_ID, projectId,socket]);

  const handleOffer = async (offer, userId) => {
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket?.emit("ice-candidate", event.candidate, ROOM_ID);
      }
    };

    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket?.emit("answer", answer, userId);
  };

  const handleAnswer = async (answer) => {
    await peerConnection.setRemoteDescription(answer);
  };

  const handleNewICECandidateMsg = async (candidate) => {
    await peerConnection.addIceCandidate(candidate);
  };

  const toggleMuteAudio = () => {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !muteAudio;
    });
    setMuteAudio((prevState) => !prevState);
  };

  const toggleShowVideo = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !showVideo;
    });
    setShowVideo((prevState) => !prevState);
  };

  const toggleScreenSharing = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing and switch back to the original video stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setLocalStream(screenStream);
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error("Error accessing screen:", error);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      router.replace(`/${orgId}/${projectId}/messages/${ROOM_ID}`);
    }
    if (socket) {
      socket.disconnect();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-[90vh] w-full p-4 space-y-2">
      <div className="flex items-center justify-between gap-2 flex-col lg:flex-row h-full w-full">
        {localStream && (
          <video
            autoPlay
            className="rounded-md"
            muted
            playsInline
            ref={(video) => {
              if (video) video.srcObject = localStream;
            }}
          />
        )}
        {remoteStream && (
          <video
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
          />
        )}
      </div>
      <div className="flex items-center flex-wrap justify-center gap-4 p-4">
        <Button onClick={toggleMuteAudio}>
          {muteAudio ? "Unmute Audio" : "Mute Audio"}
        </Button>
        <Button onClick={toggleShowVideo}>
          {showVideo ? "Hide Video" : "Show Video"}
        </Button>
        <Button onClick={toggleScreenSharing}>
          {isScreenSharing ? "Stop Sharing Screen" : "Share Screen"}
        </Button>
        <Button variant={"destructive"} onClick={endCall}>
          End Call
        </Button>
      </div>
    </div>
  );
}
