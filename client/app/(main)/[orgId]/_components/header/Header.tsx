import Image from 'next/image'
import React from 'react'
import { SelectOrg } from './SelectOrg'
import Logout from '@/components/auth/Logout'
import Logo from '@/app/(marketing)/_components/header/Logo'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { prisma } from '@/lib/db'

const Header = async() => {

  const currentUser = await getCurrentUser();
  const organizations = await prisma.organization.findMany({
    where:{
      ownerId:currentUser?.id
    }
  })

  return (
   <header className='sticky top-0 left-0 right-0 border-b-2 bg-white shadow-md w-full'>
     <div className='max-w-screen-2xl mx-auto p-2 flex items-center justify-between '>
        <div className='flex gap-4 items-center'>
        <div className='items-center gap-2 hidden sm:flex'>
        <Logo />
        </div>
        <SelectOrg organizations={organizations} />
        </div>
        <Logout />
    </div>
   </header>
  )
}

export default Header