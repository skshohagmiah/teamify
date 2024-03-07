'use server';

import { prisma } from "@/lib/db";


export async function getActiveMember(projectId:string) {
    try {
        const members = await prisma.member.findMany({
            where:{
                projectId:projectId,
                isActive:true
            },
            include:{
                user:true
            }
        })

        return members
    } catch (error) {
        console.log('getting active members error', error)
    }
}