'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function memberStatus(projectId:string) {
    const currentUser = await getCurrentUser();
    const member = await prisma.member.findFirst({
        where:{
            userId:currentUser?.id,
            projectId
        }
    })

    return member
} 


export async function  notificationFalse(projectId:string){
    const currentUser = await getCurrentUser();
  const member = await prisma.member.findFirst({
    where:{
      userId:currentUser?.id,
      projectId:projectId
    }
  })

  await prisma.member.update({
    where:{
      id:member?.id
    },
    data:{
      hasNotification:false
    }
  })

}