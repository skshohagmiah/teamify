'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TaskContainerLoading = () => {
  return (
    <div className='w-full h-screen'>
        <Skeleton className='w-full m-2 rounded-md'/>
        <div className='w-full flex items-center justify-between gap-2 flex-col md:flex-row'>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
            <Skeleton className='w-[300px] h-[200px] rounded-md'/>
        </div>
    </div>
  )
}

export default TaskContainerLoading