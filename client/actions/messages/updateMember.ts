'use server'

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function updateActive(projectId:string) {
    try {
        const currentUser = await getCurrentUser();
        
        const member = await prisma.member.findFirst({
            where:{
                userId:currentUser?.id,
                projectId:projectId
            }
        })

          await prisma.member.update({
            where:{
                id:member?.id,
            },
            data:{
                isActive:true
            }
        })
    } catch (error) {
        console.log('member active update error', error)
    }
}

export async function updateUnActive(projectId:string) {
    try {
        const currentUser = await getCurrentUser();
        
        const member = await prisma.member.findFirst({
            where:{
                userId:currentUser?.id,
                projectId:projectId
            }
        })

        await prisma.member.update({
            where:{
                id:member?.id,
            },
            data:{
                isActive:false
            }
        })
    } catch (error) {
        console.log('member active update error', error)
    }
}


export async function isOtherUserActive(otherUserId:string,projectId:string) {
    try {
        const member = await prisma.member.findFirst({
            where:{
                userId:otherUserId,
                projectId:projectId
            }
        })

        return member?.isActive
        
    } catch (error) {
        
    }
}

export async function otherMemberId(conversationId:string) {
    try {
        const currentUser = await getCurrentUser();
        const conversation = await prisma.conversation.findFirst({
            where:{
                id:conversationId,
            },
            include:{
                userOne:true,
                userTwo:true
            }
        })

        const otherUserId = currentUser?.id === conversation?.userOne.id ? conversation?.userTwo.id : conversation?.userOne.id

        return otherUserId
        
    } catch (error) {
        
    }
}