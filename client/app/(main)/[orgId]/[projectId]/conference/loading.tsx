'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div>
        <Skeleton className='w-full h-[50px] m-2'/>
        <div className='flex items-center justify-center w-full'>
            <Skeleton className='w-[80%] h-[80%] rounded-md'/>
        </div>
    </div>
  )
}

export default loading