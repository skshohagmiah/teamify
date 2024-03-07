import { Button } from '@/components/ui/button'
import React from 'react'
import FileUploadDialog from './FileUploadDialog'

const FilesHeader = () => {
  return (
    <div className='flex items-center justify-between p-2 border-b-2  max-w-screen-2xl mx-auto'>
        <h3 className='text-lg font-medium'>All Project Files</h3>
        <FileUploadDialog />
    </div>
  )
}

export default FilesHeader