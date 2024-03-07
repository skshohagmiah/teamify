'use client';
import { getActiveMember } from '@/actions/member/getActiveMembers';
import { User,Member } from '@prisma/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ActiveMember = () => {
    const {projectId} = useParams()
    const [members, setMembers] = useState<(Member & {user:User})[]>();


    useEffect(() => {
      const fetchMembers = async() => {
        const members = await getActiveMember(projectId as string);
        console.log(members)
        setMembers(members)
      }

      fetchMembers()
    },[projectId])



    console.log(members)

  return (
    <div className='flex items-center gap-2'>
      <h3>Active-Members:</h3>
      {members?.map(mem => (
        <div key={mem.id} className='-space-x-2'>
          <Image src={mem.user.image || ''} alt='active member pic' width={30} height={30} className='rounded-full ring-2' />
        </div>
      ))}
    </div>
  )
}

export default ActiveMember