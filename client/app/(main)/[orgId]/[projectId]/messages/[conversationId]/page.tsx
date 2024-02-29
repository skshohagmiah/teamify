import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/getCurrentUser'
import React from 'react'
import ConversationHeader from './_components/ConversationHeader'
import MessageInput from './_components/MessageInput'
import ConversationBody from './_components/ConversationBody'

const ConversationIdPage = async({params}:{params:{conversationId:string,projectId:string}}) => {
    const currentUser = await getCurrentUser()
    const conversation = await prisma.conversation.findFirst({
        where:{
            id:params.conversationId
        },
        include:{
            userOne:true,
            userTwo:true,

        }
    })

    const member = await prisma.member.findFirst({
        where:{
            projectId:params.projectId,
            userId:currentUser?.id
        }
    })

    const messages = await prisma.message.findMany({
        where:{
            conversationId:conversation?.id
        },
        select:{
            id:true,
            imageUrl:true,
            text:true,
            createdAt:true,
            userId:true
        }
    })

    const otherUser = conversation?.userOne.id === currentUser?.id ? conversation?.userTwo : conversation?.userOne

  return (
    <div className='w-full flex flex-col  min-h-screen bg-gray-100 '>
        <ConversationHeader otherUser={otherUser!} projectId={params.projectId}/>
        <ConversationBody storedMessages={messages!} currentUser={currentUser!} otherUser={otherUser!}/>
        <MessageInput user={currentUser!} memberId={member?.id || ''} otherUserId={otherUser?.id as string}/>
    </div>
  )
}

export default ConversationIdPage