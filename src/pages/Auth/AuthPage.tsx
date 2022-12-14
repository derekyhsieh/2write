import { Button, Center, Group, Stack } from '@mantine/core'
import { UserAuth } from "../../context/AuthContext"
import React from 'react'


export default function AuthPage() {
    const { user, logOut } = UserAuth()

    const { googleSignIn } = UserAuth()


    const handleSignOut = async () => {
        try {
           await logOut() 
        }catch (error) {
            console.log(error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Center>
            <Stack>

                {user?.displayName ?
                    (<>
                        <h1>Hello {user!.displayName}</h1>
                        <Button onClick={handleSignOut} color="red">Log Out</Button>
                    </>
                    ) :
                    (
                        <>
                            <h1>Google Authentication</h1>
                            <Button onClick={handleGoogleSignIn} color="green" size="lg">Sign in with Google</Button>
                        </>
                    )


                }

            </Stack>
        </Center>
    )
}
