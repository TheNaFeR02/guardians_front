import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

// check if i need to add the accessToken to the session.
// i'm not sure if the access token has to be added for all the 3 below.

// create an authprovider to access the user session information.
// check: https://github.com/gitdagray/next-auth-role-based/blob/main/src/app/context/AuthProvider.
// check how he access the user data for client and server components.

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            username: string,
            email: string,
            role: string,
            accessToken: string|null,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        id: string,
        username: string,
        email: string,
        role: string,
        accessToken: string | null,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        accessToken: string| null,
    }
}