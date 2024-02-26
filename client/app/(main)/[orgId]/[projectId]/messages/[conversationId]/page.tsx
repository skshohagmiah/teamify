import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/getCurrentUser'
import Image from 'next/image'
import React from 'react'
import ConversationHeader from './_components/ConversationHeader'
import MessageInput from './_components/MessageInput'

const ConversationIdPage = async({params}:{params:{conversationId:string}}) => {
    const currentUser = await getCurrentUser()
    const conversation = await prisma.conversation.findFirst({
        where:{
            id:params.conversationId
        },
        include:{
            messages:true,
            userOne:true,
            userTwo:true
        }
    })

    const otherUser = conversation?.userOne.id === currentUser?.id ? conversation?.userTwo : conversation?.userOne

  return (
    <div className='w-full flex flex-col justify-between min-h-screen bg-gray-100 '>
        <ConversationHeader otherUser={otherUser!}/>

        <MessageInput/>
    </div>
  )
}

export default ConversationIdPage