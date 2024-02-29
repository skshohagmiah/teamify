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