'use client';

import { deleteMember } from '@/actions/member/deleteMember';
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const DeleteMember = ({disabled,memberId}:{disabled:boolean,memberId:string}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const {orgId} = useParams()
    const router = useRouter()

    const onDelete = async() => {
        try {
            setIsDeleting(true)
            await deleteMember(memberId)
            router.refresh();
            toast('Member deleted successfully')
        } catch (error) {
            console.log('error deleting member', error)
        }
    }

  return (
    <Button onClick={onDelete} disabled={disabled}  variant={'destructive'} size={'sm'}>
        {isDeleting ? <Loader2 className='animate-spin'/> : 'Delete'}
    </Button>
  )
}

export default DeleteMember