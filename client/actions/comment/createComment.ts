'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function createComment(orgId:string,projectId:string,taskId:string, content:string) {
    try {
        const currentUser = await getCurrentUser();
        await prisma.comment.create({
            data:{
                content,
                userId:currentUser?.id || '',
                taskId

            }
        })

        revalidatePath(`/${orgId}/${projectId}/tasks/${taskId}`)
    } catch (error) {
        console.log('comment creation error', content)
    }
}