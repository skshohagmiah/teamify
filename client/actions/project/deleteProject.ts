'use server'
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId:string,orgId:string) {
    try {
        await prisma.project.delete({
            where:{
                id:projectId
            }
        })

        revalidatePath(`/${orgId}`)
        return {
            ok:true,
        }
    } catch (error) {
        console.log('project deleting error :', error);
        return {
            ok:false
        }
    }
}