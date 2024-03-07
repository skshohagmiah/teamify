'use server';
import { prisma } from '@/lib/db';
import {Task,Comment} from '@prisma/client'



interface reorderTaskProps{
    tasks:(Task & {
        comments:Comment
    })[],
    projectId:string
}

export async function reorderTask({tasks,projectId}:reorderTaskProps) {
    try {
        const tasksTransaction = tasks.map(task => {
            return prisma.task.update({
                where:{
                    id:task.id,
                    projectId:projectId as string
                },
                data:{
                    position:task.position
                }
            })
        })

      const updatedData =  await prisma.$transaction(tasksTransaction)
      console.log(updatedData)

    } catch (error) {
        console.log('task update error', error)
    }   
}