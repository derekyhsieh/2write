import { Button, Center, Stack, TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    LoadingOverlay, } from '@mantine/core'
import { UserAuth } from "../../context/AuthContext"
import React, { useEffect } from 'react'
import useCheckUser from '../../hooks/useCheckUser'


export default function AuthPage() {
    const { user, logOut, loggedInUser, isLoading } = UserAuth()

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
                <LoadingOverlay visible={isLoading} overlayBlur={2}/>

                {/* <AuthenticationTitle/> */}

                {



                }

                 { loggedInUser || user ?
                    (<>
                        <h1>Hello {loggedInUser?.displayName}</h1>
                        <Button onClick={handleSignOut} color="red">Log Out</Button>
                        <Button onClick={() => {console.log(loggedInUser)}}>Print logged user</Button>
                    </>
                    ) :
                    (
                        <Button onClick={handleGoogleSignIn}>Sign in with google</Button>
                    )
                    }


            </Stack>
        </Center>
    )
}


  export function AuthenticationTitle() {
    return (
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }