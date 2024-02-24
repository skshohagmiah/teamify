import { auth } from "@/auth"
import { prisma } from "./db";

export const getCurrentUser = async() => {
    try {
        const session = await auth();
        const currentUser = await prisma.user.findUnique({
            where:{
                email:session?.user?.email!
            }
        })
        return currentUser
    } catch (error) {
        console.log('error getting current user', error)
    }
}