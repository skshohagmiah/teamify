'use server'

import { prisma } from "@/lib/db";
import {v4 as uuidV4} from 'uuid'


export async function generateToken(){
    try {
        const tokenString = uuidV4();
        const token = await prisma.inviteToken.create({
            data: {
              token: tokenString,
            },
          });
          return token.token
    } catch (error) {
        console.log('token generation error', error)
    }
}