'use server';

import { prisma } from "@/lib/db";
import exp from "constants";
import { revalidatePath } from "next/cache";


export async function deleteMember(memberId:string){
    try {
        await prisma.member.delete({
            where:{
                id:memberId
            }
        })

    } catch (error) {
        console.log('member deletion error', error)
    }
}