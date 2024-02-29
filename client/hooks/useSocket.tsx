import { SheetOverlay } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react'
import { io,Socket } from "socket.io-client";

const useSocket = () => {
    const [socket,setSocket] = useState<Socket>()

    useEffect(() => {
        const socket = io("http://localhost:3001");

        setSocket(socket)

    },[])

    return {
        socket
    }
}

export default useSocket