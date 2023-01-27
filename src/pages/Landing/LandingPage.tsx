import {
	createStyles,
	Container,
	Text,
	Button,
	Group,
	AppShell,
	Header,
	Center,
	Space,
} from "@mantine/core";
import { HeaderMegaMenu } from "./Header";
import { CollegeCarousel } from "./Components/CollegeCarousel";
import { Features } from "./Components/Features";
import { useNavigate } from "react-router-dom";
import { FooterLinks } from "./Footer";

const BREAKPOINT = "@media (max-width: 755px)";
const wideMonitorBreakpoint = "@media (min-width: 2000px)";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		boxSizing: "border-box",
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
	},

	inner: {
		position: "relative",
		paddingTop: -10,
		paddingBottom: 50,
		maxWidth: 720,

		[BREAKPOINT]: {
			paddingBottom: 80,
			paddingTop: 20,
		},

		[wideMonitorBreakpoint]: {
			maxWidth: 1050,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 62,
		fontWeight: 900,
		lineHeight: 1.1,
		margin: 0,
		marginBottom: theme.spacing.xl,
		padding: 0,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		textAlign: "center",

		[BREAKPOINT]: {
			fontSize: 42,
			lineHeight: 1.2,
		},
	},

	description: {
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
		textAlign: "center",
		marginTop: theme.spacing.sm,
		fontSize: 24,

		[BREAKPOINT]: {
			fontSize: 18,
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 2,

		[BREAKPOINT]: {
			marginTop: theme.spacing.xl,
		},
	},

	control: {
		height: 54,
		paddingLeft: 38,
		paddingRight: 38,

		[BREAKPOINT]: {
			height: 54,
			paddingLeft: 18,
			paddingRight: 18,
			flex: 1,
		},
	},
}));

export default function LandingPage() {
	const { classes } = useStyles();
	

	const navigate = useNavigate();

	return (
		<AppShell
			header={
				<Header height={60} p={"sm"}>
					<HeaderMegaMenu />
				</Header>
			}
			footer={
				<FooterLinks
					data={[
						{
							title: "Privacy",
							links: [
								{ label: "Terms & Conditions", link: "" },
								{ label: "Privacy Policy", link: "" },
							],
						},
					]}
				/>
			}
		>
			<div className={classes.wrapper}>
				<Container className={classes.inner}>
					<h1 className={classes.title}>
						<Text
							ta="center"
							component="span"
							variant="gradient"
							gradient={{ from: "blue", to: "cyan" }}
							inherit
						>
							Turbocharge
						</Text>{" "}
						your writing with AI
					</h1>

					<video
						src="https://firebasestorage.googleapis.com/v0/b/discord-2db38.appspot.com/o/compressedversion.mp4?alt=media&token=a1f16773-b0b3-4b5a-99a1-3440cacf945e"
						preload="auto"
						loop
						autoPlay
						muted
						playsInline
						style={{
							width: "100%",
							marginTop: "10px",
							height: "100%",
							borderRadius: "8px",
							display: "block",
							objectFit: "cover",
							backgroundColor: "rgba(0,0,0,0)",
							objectPosition: "50% 50%",
							boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
						}}
					></video>

					<Text className={classes.description} color="dimmed">
						AI generated autocomplete, snippets, outline creation, real-time
						collaboration, and much, much more...
					</Text>

					<Center>
						<Group pt="md">
							<Button
								onClick={() => navigate("/auth")}
								size="xl"
								className={classes.control}
								variant="gradient"
								gradient={{ from: "blue", to: "cyan" }}
							>
								Get Started
							</Button>

							<Button
								size="xl"
								onClick={() =>
									window.open("https://discord.gg/HRkKvbtr6j", "_blank").focus()
								}
								variant="default"
								className={classes.control}
							>
								Need Help?
							</Button>
						</Group>
					</Center>
				</Container>

				<Center>
					<Text className={classes.description} color="dimmed" align="center">
						Loved by students from universities nationwide:
					</Text>
				</Center>

				<Space h="lg" />
				<CollegeCarousel />
				<Space h="lg" />

				<Features />
			</div>
		</AppShell>
	);
}
