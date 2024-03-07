import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/formatedDate'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { User } from '@prisma/client'
import { Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import VideoBtn from './VideoBtn'

const ConversationHeader = async({otherUser,projectId}:{otherUser:User,projectId:string}) => {
  const member = await prisma.member.findFirst({
    where:{
      userId:otherUser?.id,
      projectId:projectId
    },
    select:{
      lastSeen:true,
      isActive:true
    }
  })


  return (
    <div className=' bg-white flex items-center justify-between p-1 border-b-2 sticky top-0 w-full  max-w-screen-2xl mx-auto' >
            <div className='flex items-center gap-2'>
            <div className='relative w-[50px] h-[50px]'>
                    <Image src={otherUser?.image as string} alt='member' fill className='rounded-full'/>
                    <div className={`absolute top-0 right-0 size-4 rounded-full ${member?.isActive ? 'bg-green-500': 'bg-gray-500'} `}/>
                    </div>
                <p>{otherUser?.name}</p>
            </div>
            <div className='flex items-center gap-6'>
                  <VideoBtn />
                <div>
                <p className='font-mediun text-xl -mb-1'>Last Seen</p>
                <small>{formatDate(member?.lastSeen || new Date())}</small>
                </div>
            </div>
                
        </div>
  )
}

export default ConversationHeader