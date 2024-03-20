import { SheetOverlay } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react'
import { io,Socket } from "socket.io-client";

const useSocket = () => {
    const [socket,setSocket] = useState<Socket>()

    useEffect(() => {
        const socket = io("https://teamify-socket-server.chickenkiller.com");

        setSocket(socket)

    },[])

    return {
        socket
    }
}

export default useSocket