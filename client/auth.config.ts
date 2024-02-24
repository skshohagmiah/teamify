import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [GitHub,Google,Facebook],
} satisfies NextAuthConfig