import { SheetOverlay } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react'
import { io,Socket } from "socket.io-client";

const useSocket = () => {
    const [socket,setSocket] = useState<Socket>()

    useEffect(() => {
        const socket = io("http://ec2-13-234-135-50.ap-south-1.compute.amazonaws.com:3001/");

        setSocket(socket)

    },[])

    return {
        socket
    }
}

export default useSocket