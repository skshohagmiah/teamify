import React from 'react'
import DesktopHeader from '../_components/header/DesktopHeader'
import { prisma } from '@/lib/db'

import TasksContainer from '../_components/tasks/TasksContainer'

const TasksPage = async({params}:{params:{projectId:string}}) => {

  const tasks = await prisma.task.findMany({
    where:{
      projectId:params.projectId
    },
    include:{
      comments:true
    },
    orderBy:{
      position:'asc'
    }
  })

  const members = await prisma.member.findMany({
    where:{
      projectId:params.projectId
    },
    include:{
      user:true
    }
  })




  return (
    <div className='w-full'>
        <DesktopHeader />
        <TasksContainer members={members} tasks={tasks}/>
    </div>
  )
}

export default TasksPage