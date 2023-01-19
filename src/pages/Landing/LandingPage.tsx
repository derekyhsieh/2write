import { createStyles, Container, Text, Button, Group, AppShell, Header, Image } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import { HeaderMegaMenu } from './Header';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		boxSizing: 'border-box',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

	inner: {
		position: 'relative',
		paddingTop: 200,
		paddingBottom: 120,

		[BREAKPOINT]: {
			paddingBottom: 80,
			paddingTop: 80,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 62,
		fontWeight: 900,
		lineHeight: 1.1,
		margin: 0,
		padding: 0,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,

		[BREAKPOINT]: {
			fontSize: 42,
			lineHeight: 1.2,
		},
	},

	description: {
		marginTop: theme.spacing.xl,
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

	return (
		<AppShell
			header={<Header height={60} p={"sm"}><HeaderMegaMenu /></Header>}
		>
			<div className={classes.wrapper}>
				<Container size={700} className={classes.inner}>
					<h1 className={classes.title}>
						<Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
							Turbocharge
						</Text>{' '}
						your writing with AI
					</h1>

					<Text className={classes.description} color="dimmed">
						AI generated autocomplete, snippets, outline creation, real-time collaboration, and much much more...
					</Text>

					<Group className={classes.controls}>
						<Button
							size="xl"
							className={classes.control}
							variant="gradient"
							gradient={{ from: 'blue', to: 'cyan' }}
						>
							Get Started
						</Button>

						<Button
							component="a"
							href="https://youtube.com"
							size="xl"
							variant="default"
							className={classes.control}
							leftIcon={<GithubIcon size={20} />}
						>
							Need Help?
						</Button>
					</Group>
				</Container>
				<Container size={700} className={classes.inner}>
					<div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
						<Image
							radius="md"
							src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
							alt="Random unsplash image"
						/>
					</div>
				</Container>
			</div>
		</AppShell>
	);
}