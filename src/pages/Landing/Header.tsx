import {
	createStyles,
	Header,
	Image,
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	SimpleGrid,
	ThemeIcon,
	Anchor,
	Divider,
	Center,
	Box,
	Title,
	Burger,
	Drawer,
	Collapse,
	ScrollArea,
	Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconHome,
	IconPassword,
	IconArticle,
	IconBrandDiscord,
} from "@tabler/icons";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { isExternal } from "../../utils/misc";

const useStyles = createStyles((theme) => ({
	link: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,

		[theme.fn.smallerThan("sm")]: {
			height: 42,
			display: "flex",
			alignItems: "center",
			width: "100%",
		},

		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		}),
	},

	subLink: {
		width: "100%",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		borderRadius: theme.radius.md,

		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[7]
					: theme.colors.gray[0],
		}),

		"&:active": theme.activeStyles,
	},

	dropdownFooter: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[0],
		margin: -theme.spacing.md,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
		paddingBottom: theme.spacing.xl,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
		}`,
	},

	hiddenMobile: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},

	logo: {
		cursor: "pointer",
	},
}));

const linkArray = [
	{
		icon: IconHome,
		title: "Home",
		link: "/",
	},
	{
		icon: IconPassword,
		title: "Privacy",
		link: "/privacy",
	},
	{
		icon: IconArticle,
		title: "Terms & Conditions",
		link: "/terms",
	},
	{
		icon: IconBrandDiscord,
		title: "Discord",
		link: "https://discord.gg/HRkKvbtr6j",
	},
];

export function HeaderMegaMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const { classes, theme } = useStyles();
	const navigate = useNavigate();

	const links = linkArray.map((item) => (
		<UnstyledButton
			className={classes.subLink}
			key={item.title}
			onClick={() =>
				isExternal(item.link)
					? window.open(item.link, "_blank")
					: navigate(item.link)
			}
		>
			<Group position="left">
				<ThemeIcon size={34} variant="default" radius="md">
					<item.icon size={22} color={theme.fn.primaryColor()} />
				</ThemeIcon>
				<div>
					<Text size="sm" weight={500}>
						{item.title}
					</Text>
				</div>
			</Group>
		</UnstyledButton>
	));

	return (
		<Box pb={120}>
			<Header height={60} px="md">
				<Group position="apart" sx={{ height: "100%" }}>
					<Group className={classes.logo} onClick={() => navigate("/")}>
						<Image src={logo} width={35} height={35} mb={4} mr={-10} />
						<Text
							variant="gradient"
							gradient={{ from: "indigo", to: "black", deg: 30 }}
							sx={{ fontFamily: "Greycliff CF, sans-serif" }}
							ta="center"
							size={"xl"}
							fw={700}
						>
							2write
						</Text>
					</Group>

					<Group
						sx={{ height: "100%" }}
						spacing={0}
						className={classes.hiddenMobile}
					>
						<HoverCard
							width={600}
							position="bottom"
							radius="md"
							shadow="md"
							withinPortal
						></HoverCard>
					</Group>

					<Group className={classes.hiddenMobile}>
						<Button onClick={() => navigate("/auth")}>Sign up</Button>
					</Group>

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						className={classes.hiddenDesktop}
					/>
				</Group>
			</Header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="full"
				padding="md"
				className={classes.hiddenDesktop}
				zIndex={1000000}
			>
				<Container sx={{ height: "calc(100vh - 60px)" }}>
					{links}

					<Divider
						my="sm"
						color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
					/>

					<Group position="center" grow pb="xl" px="md">
						<Button onClick={() => navigate("/auth")}>Sign up</Button>
					</Group>
				</Container>
			</Drawer>
		</Box>
	);
}
