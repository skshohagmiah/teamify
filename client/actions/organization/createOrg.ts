'use server';

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const createOrganization = async(orgName:string,fileUrl:string) => {
    try {
        const currentUser = await getCurrentUser()
        const organization =await prisma.organization.create({
            data:{
                name:orgName,
                logo:fileUrl,
                ownerId:currentUser?.id as string,
            }
        })

        await prisma.member.create({
            data:{
                orgId:organization.id as string,
                userId:currentUser?.id as string
                
            }
        })

        return {
            data:organization,
            ok:true
        }
    } catch (error) {
        console.log('create organization action error', error)
        return {
            data:{id:''},
            ok:false
        }
    }
}