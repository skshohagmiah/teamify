import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const ConversationHeader = ({otherUser}:{otherUser:User}) => {
  return (
    <div className=' bg-white flex items-center justify-between p-1 border-b-2'>
            <div className='flex items-center gap-2'>
            <div className='relative w-[50px] h-[50px]'>
                    <Image src={otherUser?.image as string} alt='member' fill className='rounded-full'/>
                    <div className='absolute top-0 right-0 size-4 rounded-full bg-green-500'/>
                    </div>
                <p>{otherUser?.name}</p>
            </div>
            <div>
                <p>Last Seen</p>
                <small>{Date.now().toString()}</small>
            </div>
        </div>
  )
}

export default ConversationHeader