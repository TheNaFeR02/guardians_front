
"use client"

export default function Error(){
    return(<>
        <h1>Error: No token was returned from the backend.</h1>
        <h2>Its possible that the email you provided is already in use.</h2>
        <button onClick={() => window.location.href = '/signin'}>Return to home page</button> 
    </>)
}