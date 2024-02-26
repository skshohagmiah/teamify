'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createConversation(otherUserId:string) {
    const currentUser = await getCurrentUser();
    try {
        const existingConversation = await prisma.conversation.findFirst({
            where:{
                OR:[
                    {
                        userOneId: currentUser?.id,
                        userTwoId:otherUserId
                    },
                    {
                        userOneId: otherUserId,
                        userTwoId: currentUser?.id
                    }
                ]
            }
        })

        if(existingConversation){
            return existingConversation
        }else{
            const conversation = await prisma.conversation.create({
                data:{
                    userOneId:currentUser?.id as string,
                    userTwoId:otherUserId
                }
            })

            return conversation
        }

    } catch (error) {
        console.log('conversation create error', error)
    }
}