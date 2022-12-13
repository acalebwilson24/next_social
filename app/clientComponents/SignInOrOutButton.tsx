"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const SignInOrOutButton = () => {
    const session = useSession();

    if (session.status == "authenticated") {
        return (
            <button onClick={() => signOut()}>Log out</button>
        )
    }

    return (
        <button onClick={() => signIn()}>Log in</button>
    )
}

export default SignInOrOutButton;