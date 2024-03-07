'use server';

import { prisma } from "@/lib/db";
import {TaskStatus} from '@prisma/client'


export async function updateTask(taskId:string,description:string,deadline:Date,status:TaskStatus,attachment:string) {
    try {
        await prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                description,
                deadline,
                status,
                attachments:{
                    push: attachment
                }
            }
        })
    } catch (error) {
        console.log('task update error', error)
    }
}