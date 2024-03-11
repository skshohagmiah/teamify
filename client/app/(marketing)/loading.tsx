'use client'
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const loading = () => {
  return (
    <div className='w-full  flex flex-col'>
       <Skeleton className="w-full h-[50px] rounded-full p-2 mt-2 mx-6" />
        <div className='flex flex-col items-center h-[80vh] justify-between w-full gap-2 m-6'>
            <Skeleton className='w-full h-[50%] rounded-md'/>
            <Skeleton className='w-full h-[60%] rounded-md' />
        </div>
    </div>
  )
}

export default loading