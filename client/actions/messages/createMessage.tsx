'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createMessage(conversationId:string,text:string,imageUrl:string) {
    try {
        const currentUser = await getCurrentUser();
         await prisma.message.create({
            data:{
                text,
                conversationId,
                userId:currentUser?.id as string,
                imageUrl
            }
        })
    } catch (error) {
        console.log('message creation error', error)
    }
}