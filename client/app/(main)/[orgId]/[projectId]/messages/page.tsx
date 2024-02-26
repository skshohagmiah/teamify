import React from 'react'

import MessagesHeader from '../_components/messages/Header'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/getCurrentUser'
import Image from 'next/image'
import ChatsContainer from '../_components/messages/ChatsContainer'

const MessagesPage = async({params}:{params:{projectId:string}}) => {

    const currentUser = await getCurrentUser();

    const members = await prisma.member.findMany({
        where:{
            projectId: params.projectId,
            // NOT:{
            //     userId:currentUser?.id
            // }
        },
        include:{
            user:true
        }
    })

    console.log(members)

  return (
    <div className='w-full bg-gray-100 h-screen'>
        <MessagesHeader />
        <ChatsContainer members={members!} currentUser={currentUser!}/>
    </div>
  )
}

export default MessagesPage