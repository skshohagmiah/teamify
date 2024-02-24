import React from 'react'
import Logo from '../header/Logo'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className=' bg-gray-800 text-white'>
       <div className='max-w-screen-2xl mx-auto p-2 flex items-center justify-start md:justify-between flex-wrap gap-4'>
       <Logo />
        <p className='md:flex-grow text-center'>&copy; All Right are Reserved by Teamify</p>
        <Link href={'/'}>About us</Link>
        <Link href={'/'}>Contact us</Link>
        <Link href={'/'}>Terms & Conditions</Link>
       </div>
    </footer>
  )
}

export default Footer