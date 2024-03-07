'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full'>
        <Skeleton className='h-[50px] w-full m-2'/>
        <div className='flex items-center m-2 gap-4 flex-wrap w-full'>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
        </div>
    </div>
  )
}

export default loading