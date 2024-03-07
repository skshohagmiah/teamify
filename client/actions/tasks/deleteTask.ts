'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId:string, orgId:string, projectId:string){
    try {
        await prisma.task.delete({
            where:{
                id:taskId
            }
        })

        revalidatePath(`/${orgId}/${projectId}/tasks`)
    } catch (error) {
        console.log('task deletion error', error)
    }
}