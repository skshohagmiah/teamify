import Logo from '@/app/(marketing)/_components/header/Logo'
import React from 'react'
import MenuComponent from './Menu'

const MobileHeader = () => {
  return (
    <header className='flex items-center justify-between p-2 border-b-2'>
        <Logo />
        <MenuComponent />
    </header>
  )
}

export default MobileHeader