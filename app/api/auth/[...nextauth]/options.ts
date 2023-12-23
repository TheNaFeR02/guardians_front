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

type Token = {
  key: string,
}

function generatePasswordHash(password: string, salt: string) {
  const secretKey = process.env.PASSWORD_HASH_KEY_SECRET as string; // Keep this key secret
  const hmac = createHmac('sha256', secretKey);

  // Combine the password and salt before hashing
  const data = password + salt;

  // Update the HMAC with the combined data and digest it to get the hash
  const hash = hmac.update(data).digest('hex');

  return hash;
}

async function createUserFromProvider(user: User, password: string): Promise<boolean> {

  const response = await usePost({
    url: '/api/auth/register/',
    method: "POST",
    data: {
      username: user.id,
      email: user.email,
      password1: password,
      password2: password,
      oauth_provider: user.oauth_provider,
    },
  });

  const { data, statusCode, ok } = response;

  return ok;
}

async function getToken(username: string, password: string): Promise<string | null> {
  try {
    const { data, status, statusText } = await axios.post<Token>('http://127.0.0.1:8000/api/auth/login/', {
      username: username,
      password: password,
    })
    const token = data.key


    return token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      } else {
        throw new Error(error.message);
      }
    } else {
      throw error;
    }
  }
  // return null

}

async function getUserDetails(token: string | null): Promise<User | null> {
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
    user.accessAPIToken = token
    return user
  } catch (error) {
    console.log(error);
    return null
  }
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
        // post with axios

        try {
          const { username, password } = credentials;

          // logs in the user, if true returns the token
          const token = await getToken(username, password)

          // Get user details
          const user = await getUserDetails(token)

          // If Token exists return user details
          return token ? user : null
        } catch (error) {
          if (error instanceof Error && error.message === "E-mail is not verified.") {
            throw new Error(error.message)
          }
          return null;
        }
      },
    }),

  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role

    

    async jwt({ token, user, account }) {
      if (user) token.role = user.role
      if (user) token.id = user.id
      // 1ST. CASE
      if (user) token.accessAPIToken = user.accessAPIToken // For OAuth the accessAPIToken is undefined at this point. Below is obtained. 

      // console.log("account: ",account);
      // console.log("user: ",user);
      if (account && user) {
        if (account.provider === "google") {
          user.oauth_provider = "google"
        }

        if (account.type === 'oauth') {
          const plaintextPassword = user.id;
          let password = null;
          let userTokenExist = null;

          // Generate password
          const salt = 'randomly_generated_salt';
          password = await generatePasswordHash(user.id, salt);
          console.log('Generated hashed password:', password);


          // Check if the user already exists in the backend.
          if (password) userTokenExist = await getToken(user.id, password);
          console.log("userTokenExist: ", userTokenExist);


          // If the user token exists, it means they already have an API account.
          if (userTokenExist) {
            token.accessAPIToken = userTokenExist;
            // console.log("token_key: ", token.accessAPIToken);
            // 2ND. CASE
            return token;
          } else {
            // If the user didn't exist, create their account in the backend.
            if (password) {
              let userToken = null;
              const accountCreated = await createUserFromProvider(user, password);
              console.log("accountCreated: ", accountCreated);

              if (accountCreated) {
                const userToken = await getToken(user.id, password);

                token.accessAPIToken = userToken;
                console.log("token_key: ", token.accessAPIToken);

                // 3RD. CASE
                return token;
              }


            }
          }
        }
      }


      return token
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      if (session?.user) session.user.accessAPIToken = token.accessAPIToken
      return session
    },



  },
  pages: {
    signIn: "/signin",
  },
}