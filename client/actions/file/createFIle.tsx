'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createFile(name:string,url:string,type:string,projectId:string) {
    try {
        const currentUser = await getCurrentUser();
        await prisma.file.create({
            data:{
                url,
                name,
                type,
                projectId,
                userId:currentUser?.id || ''
            }
        })
    } catch (error) {
        console.log('file upload error', error)
    }
}