import {
	Button,
	Center,
	Stack,
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Header,
	Loader,
	AppShell,
} from "@mantine/core";
import { UserAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "../Landing/Header";
import {
	IconBrandGoogle,
	IconBrandTwitter,
	IconBrandGithub,
} from "@tabler/icons";

export default function AuthPage() {
	const { user, googleSignIn, twitterSignIn, githubSignIn, logOut } =
		UserAuth();
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			setIsLoading(false);
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = async (signInCallback: Function) => {
		try {
			setIsLoading(true);
			await signInCallback();
		} catch (error) {
			setIsLoading(false);
			window.location.reload();
			console.error(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			// redirect to home page after user successfully logs in
			navigate("/");
		}

		if (user == null) {
		}
	}, [user]);

	return (
		<AppShell
			header={
				<Header height={60} p={"sm"}>
					<HeaderMegaMenu />
				</Header>
			}
		>
			{isLoading && user == null ? (
				<Center>
					<Loader />
				</Center>
			) : (
				<Container size={420} style={{ transform: "translateY(40%)" }}>
					<Title
						align="center"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						Log in
					</Title>

					<Text color="dimmed" size="lg" align="center" mt={5}>
						to enjoy all of our cool features ✌️
					</Text>

					<Paper withBorder shadow="md" p={30} mt={20} radius="lg">
						<Stack>
							<Stack>
								<Center>
									<Button
										onClick={async () => handleSignIn(googleSignIn)}
										variant={"filled"}
										leftIcon={<IconBrandGoogle />}
										w={"80%"}
										radius={"md"}
										color={"ocean-blue"}
									>
										Sign in with Google
									</Button>
								</Center>
								<Center>
									<Button
										onClick={async () => handleSignIn(twitterSignIn)}
										variant={"filled"}
										leftIcon={<IconBrandTwitter />}
										w={"80%"}
										radius={"md"}
										color={"blue"}
									>
										Sign in with Twitter
									</Button>
								</Center>
								<Center>
									<Button
										onClick={async () => handleSignIn(githubSignIn)}
										variant={"filled"}
										leftIcon={<IconBrandGithub />}
										w={"80%"}
										radius={"md"}
										color={"gray"}
									>
										Sign in with GitHub
									</Button>
								</Center>
							</Stack>

							{user && (
								<Button color="red" onClick={handleSignOut}>
									Log Out
								</Button>
							)}
						</Stack>
					</Paper>
				</Container>
			)}
		</AppShell>
	);
}

export function AuthenticationTitle() {
	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{" "}
				<Anchor<"a">
					href="#"
					size="sm"
					onClick={(event) => event.preventDefault()}
				>
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput label="Email" placeholder="you@mantine.dev" required />
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
				/>
				<Group position="apart" mt="lg">
					<Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
					<Anchor<"a">
						onClick={(event) => event.preventDefault()}
						href="#"
						size="sm"
					>
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
