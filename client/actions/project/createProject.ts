'use server'
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { revalidatePath } from "next/cache"

export const createProject = async(name:string, description:string, orgId:string) => {
    const currentUser = await getCurrentUser();
    try {
        const project = await prisma.project.create({
            data:{
                name,
                description,
                organizationId:orgId,
                ownerId:currentUser?.id as string
            }
        })

        await prisma.member.create({
            data:{
                projectId:project.id,
                userId:currentUser?.id as string,

            }
        })

        revalidatePath(`/${orgId}`)

        return {
            id:project.id,
            ok:true
        }
    } catch (error) {
        console.log('create project action error',error)
        return {
            id:'',
            ok:false
        }
    }

}