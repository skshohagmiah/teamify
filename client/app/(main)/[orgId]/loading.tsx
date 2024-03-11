'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'


const loading = () => {
  return (
    <div className='w-full h-screen'>
        <Skeleton className='w-full h-[50px] m-2' />
        <div className='flex items-center gap-4 w-full m-2'>
            <Skeleton className='w-[300px] h-[300px] rounded-md' />
            <Skeleton className='w-[300px] h-[300px] rounded-md' />
            <Skeleton className='w-[300px] h-[300px] rounded-md' />
        </div>
    </div>
  )

}

export default loading