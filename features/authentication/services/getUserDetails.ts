import { parseURL } from "@/utils/parseUrl";
import { userSchema } from "@/features/authentication/types/userSchema"
import { User } from "next-auth";

export async function getUserDetails(apiToken: string): Promise<User | null> {
  try {
    const res = await fetch(parseURL("/api/auth/user/"), {
      method: 'GET',
      headers: {
        "Authorization": `Token ${apiToken}`
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch user details.');
      return null;
    }

    const userDetails = await res.json(); // response gives the user details.

    const accessAPIToken = apiToken
    const user = { accessAPIToken, ...userDetails };

    try {
      const userValidated = userSchema.parse(user);
      console.log("User type correctly parsed. \n User details", userValidated)
      return userValidated;
    } catch (error) {
      console.error("Error parsing user details: ", error);
      throw new Error(JSON.stringify(error));
    }
  } catch (error) {
    console.error("Error fetching user details: ", error);
    return null
  }
}