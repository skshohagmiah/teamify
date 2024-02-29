'use server';

import { prisma } from "@/lib/db";

export async function updateLastSeen(memberId:string,time:Date) {
    try {
        const member = await prisma.member.update({
            where:{
                id:memberId
            },
            data:{
                lastSeen:time
            }
        })

        return {
            lastSeen:member.lastSeen
        }
    } catch (error) {
        console.log('member last seen update error', error )
    }
}