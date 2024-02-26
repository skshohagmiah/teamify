'use client'
import Image from 'next/image'
import React from 'react'
import {Member,User} from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { createConversation } from '@/actions/messages/createConversation'

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
    <div className='space-y-2 p-2'>
            {members.map(member => (
                <div key={member.id} className='flex flex-col gap-2 md:flex-row items-center justify-around bg-gray-50 p-1 shadow-sm rounded-sm cursor-pointer' onClick={() => handleConversationClick(member.user.id)}>
                    <div className='relative w-[50px] h-[50px]'>
                    <Image src={member.user.image as string} alt='member' fill className='rounded-full'/>
                    <div className='absolute top-0 right-0 size-4 rounded-full bg-green-500'/>
                    </div>
                    <div className='text-center'>
                        <p>{member.user.name}</p>
                        <small>{member.user.email}</small>
                    </div>
                    <div>
                        <p>Last seen</p>
                        <small>{member.createdAt.toISOString().slice(0,16)}</small>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default ChatsContainer