import { Account, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "next-auth"
import GitHubProvider from 'next-auth/providers/github'
import { GithubProfile } from 'next-auth/providers/github'
import { GoogleProfile } from 'next-auth/providers/google'
import { usePost } from "@/hooks/useFetch";
import { createHmac } from 'crypto';
import GoogleProvider from "next-auth/providers/google";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { parseURL } from "@/utils/parseUrl";
import { loginUser } from "@/features/authentication/services/loginUser";
import { getUserDetails } from "@/features/authentication/services/getUserDetails";
import { signinGoogle } from "@/features/authentication/services/signinGoogle";

type Token = {
  key: string,
}


export const options: NextAuthOptions = {
  // Configure one or more authentication providers.
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {

        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
          image: profile.avatar_url,
          username: profile.login,
          accessAPIToken: '',
          oauth_provider: 'github',
        } as User
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({

      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
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
        try {
          const apiToken = await loginUser(credentials);
          if (!apiToken) return null;
          return await getUserDetails(apiToken.key);
        } catch (error) {
          throw error instanceof Error ? new Error(error.message) : error;
        }
      },
    }),

  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role



    async jwt({ token, user, account }) {
      // either way i would need to save the token in the jwt callback. So maybe the await signinGoogle(id_token) wont be able to put in the signin callback
      console.log("-----------JWT CALLBACK-----------")
      if (user) {
        token.role = user.role
        token.accessAPIToken = user.accessAPIToken
        token.email = user.email
      }
      // // if user authenticates with google, the token here user.key will be undefined
      // // we use the account object to get the user id_token of google and then use it for the backend

      if (account?.provider === "google" && account.id_token) {
        console.log("account", account)
        const id_token = account.id_token;

        try {
          const apiToken = await signinGoogle(id_token);
          console.log("token succesfully retrieved w/ Google Provider: ", apiToken);
          token.accessAPIToken = apiToken.key
          return token
        } catch (error) {
          console.error("error", error);
          token.error = error; // if we assign an error to the token, we can use it then in pages to redirect to the error page 
        }
      }
      return token
    },

    async session({ session, token }) {
      console.log("-----------SESSION CALLBACK-----------")
      if (session?.user) {
        session.user.role = token.role
        session.user.accessAPIToken = token.accessAPIToken
        session.user.email = token.email
      }
      session.user.error = token.error;
      return session
    },

    async redirect({ url, baseUrl }) {

      // if the user is authenticated with google, 
      // we redirect to the google-callback page which handles wheter the user is authenticated or not
      if (url.includes("/google-callback")) {
        return '/google-callback';
      }

      // This is the default behavior,
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }

  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
}