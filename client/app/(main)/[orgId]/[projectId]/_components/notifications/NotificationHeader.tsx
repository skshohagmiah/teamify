'use client'
import { deleteAllNotifications } from '@/actions/notification/deleteNotification'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const NotificationHeader = ({setNotifications}:{setNotifications:(notifications:[]) => void}) => {
  const [loading, setLoading] = useState(false)
  const {orgId,projectId} = useParams()

  const handleNotifcationsDelete = async () => {
    setLoading(true)
    await deleteAllNotifications(projectId as string,orgId as string )
    setNotifications([])
    setLoading(false)
  }

  return (
    <div className='p-2 flex items-center justify-between sticky top-0 bg-white border-b-2'>
        <h3 className='text-lg font-semibold'>Your Recent Notifications</h3>
        <Button onClick={handleNotifcationsDelete} variant={'destructive'}>{loading ? <Loader2 className='animate-spin'/> : 'Clear All Notification'}</Button>
    </div>
  )
}

export default NotificationHeader