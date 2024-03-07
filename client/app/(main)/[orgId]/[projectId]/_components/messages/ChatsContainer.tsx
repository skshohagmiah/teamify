'use client'
import Image from 'next/image'
import React from 'react'
import {Member,User} from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { createConversation } from '@/actions/messages/createConversation'
import { formatDate } from '@/lib/formatedDate'

interface ChatsContainerProps{
    currentUser:User
    members: (Member & { user: User })[]
}

const ChatsContainer = ({members}:ChatsContainerProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleConversationClick = async(otherUserId:string) => {
        try {
            const conversation = await createConversation(otherUserId)
            if(conversation?.id){
                router.push(`${pathname}/${conversation.id}`)
            }
        } catch (error) {
            console.log('error while handling conversation', error)
        }
    }

  return (
    <div className='space-y-2 p-2 max-w-screen-2xl mx-auto'>
            {members.map(member => (
                <div key={member.id} className='flex flex-col gap-2 md:flex-row items-center justify-between bg-gray-50 p-1 shadow-sm rounded-sm cursor-pointer' onClick={() => handleConversationClick(member.user.id)}>
                    <div className='flex items-center gap-4'>
                    <div className='relative w-[50px] h-[50px]'>
                    <Image src={member.user.image as string} alt='member' fill className='rounded-full'/>
                    <div className={`absolute top-0 right-0 size-4 rounded-full ${member.isActive ? 'bg-green-500' : 'bg-gray-500'} `}/>
                    </div>
                    <div className='text-center'>
                        <p>{member.user.name}</p>
                        <small>{member.user.email}</small>
                    </div>
                    </div>
                    <div>
                        <p>Last seen</p>
                        <small>{formatDate(member.lastSeen)}</small>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default ChatsContainer