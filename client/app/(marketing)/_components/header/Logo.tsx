import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.svg'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
        <Image src={logo} alt='logo' width={50} height={50}/>
        <p className='font-medium text-lg'>Teamify</p>
    </Link>
  )
}

export default Logo