import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {User} from "next-auth"
import GitHubProvider from 'next-auth/providers/github'

type Token = {
    key: string,
}

async function getToken(username: string, password: string): Promise<string | null> {
    try {
        const { data, status } = await axios.post<Token>('http://127.0.0.1:8000/api/auth/login/', {
            username: username,
            password: password,
        })
        const token = data.key
        console.log("token_key: ", token);
        return token
    } catch (error) {
        console.log(error);
        return null
    }
}

async function getUserDetails(token: string|null): Promise<User | null> {
    try {
        const { data, status } = await axios.get<User>('http://127.0.0.1:8000/api/auth/user-detail/',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            },
        );
        const user = data
        user.accessToken = token
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}

export const options: NextAuthOptions = {
    // Configure one or more authentication providers.
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req) {
                // Add logic here to look up the user from the credentials supplied
                //   const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                // post with axios

                
                const { username, password } = credentials;

                // logs in the user, if true returns the token
                const token = await getToken(username, password)

                // Get user details
                const user = await getUserDetails(token)
                
                // If Token exists return user details
                return token ? user : null
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) token.role = user.role
            if (user) token.id = user.id
            if (user) token.accessToken = user.accessToken
            // console.log(token);
            return token
        },
        
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            if (session?.user) session.user.accessToken = token.accessToken
            return session
        },
    },
    pages: {
        signIn: "/signin",
    },
}