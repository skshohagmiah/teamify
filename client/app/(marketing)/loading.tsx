'use client'
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const loading = () => {
  return (
    <div className='w-full h-screen'>
       <Skeleton className="w-full h-[50px] rounded-full p-2" />
        <div className='flex items-center justify-between w-full gap-2'>
            <Skeleton className='w-full h-[30%] rounded-md'/>
            <Skeleton className='w-full h-[30%] rounded-md' />
        </div>
    </div>
  )
}

export default loading