import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import React from 'react'
import CreateMember from '../_components/members/CreateMember'

const MembersPage = async({params}:{params:{projectId:string}}) => {

    const members = await prisma.member.findMany({
        where:{
            projectId:params.projectId
        },
        include:{
            user:true,
            project:true
        }
    })


  return (
    <div className='w-full p-2'>
        <div className='flex items-center justify-between border-b-2 py-2'>
            <p className='text-xl font-semibold'>All Members</p>
            <CreateMember />
        </div>
        <div className='py-2'>
            {members.map(member => (
                <div key={member.id} className='flex items-center justify-around bg-blue-100 p-1 rounded-sm'>
                    <Image src={member.user.image as string} alt='member' width={50} height={50} className='rounded-full'/>
                    <h3 className='text-lg font-medium'>{member.user.name}</h3>
                    <p >{member.user.email}</p>
                    <p className={member.user.id === member.project.ownerId ? 'text-red-500 font-bold' : 'text-black'}>{member.user.id === member.project.ownerId ? 'Admin' : 'Member'}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MembersPage