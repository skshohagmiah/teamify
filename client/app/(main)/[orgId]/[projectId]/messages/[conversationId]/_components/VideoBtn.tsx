'use client'
import { Video } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const VideoBtn = () => {
    const {orgId, projectId, conversationId} = useParams()
  return (
    <Link href={`/${orgId}/${projectId}/messages/${conversationId}/video`} className='p-2 rounded-full bg-blue-200 cursor-pointer hover:bg-blue-300'>
    <Video className='w-6 h-6'/>
    </Link>
  )
}

export default VideoBtn