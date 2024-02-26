import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image } from 'lucide-react'
import React from 'react'
import ImageUpload from './ImageUpload'

const MessageInput = () => {
  return (
    <form className='flex items-center justify-between gap-2 p-4 bg-gray-200 w-full '>
        <ImageUpload />
        <Input  className='w-full p-2 rounded-sm'/>
        <Button>Send</Button>
    </form>
  )
}

export default MessageInput