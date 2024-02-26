
import { Button } from '@/components/ui/button'
import React from 'react'

const MessagesHeader = () => {
  return (
    <div className='flex items-center justify-between p-2 bg-white border-b-2'>
        <h3 className='text-xl font-semibold'>All Project Chats</h3>
        <Button>New Group</Button>
    </div>
  )
}

export default MessagesHeader