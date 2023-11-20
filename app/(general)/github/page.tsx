'use client'
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session } = useSession();

  if (!session) {
    // The user is not authenticated
    return <p>Please sign in</p>;
  }

  const user = session.user;
//   const accessToken = session.accessToken;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      {/* <p>Access Token: {accessToken}</p> */}
      {/* Other user data... */}
    </div>
  );
}

export default MyComponent;
