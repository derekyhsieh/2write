import {
	createStyles,
	Header,
	Autocomplete,
	Group,
	Burger,
	Text,
	Image,
	Kbd,
	UnstyledButton,
	ThemeIcon,
	useMantineTheme,
	Drawer,
	Container,
	Divider,
	Button,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
	getMonthName,
	convertFirebaseTimestampToDate,
} from "../../../utils/misc";
import { createSearchParams, useNavigate } from "react-router-dom";
import logo from "../../../img/logo.png";
import UserMenu from "./UserMenu";
import { DocumentData } from "firebase/firestore";
import { isExternal } from "../../../utils/misc";
import {
	IconHome,
	IconPassword,
	IconArticle,
	IconBrandDiscord,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: "100%",
	},

	logo: {
		cursor: "pointer",
	},

	user: {
		color: theme.white,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: "background-color 100ms ease",

		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	search: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
		width: "60%",
	},

	tooltipTitle: {
		fontSize: theme.fontSizes.md,
	},

	avatarHover: {
		":hover": {
			outline: "3px solid #E9E9E9",
		},
	},

	avatarMenu: {
		outline: "3px solid #D4D4D4",
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

export default function HomeHeader(props: { essayList: DocumentData[] }) {
	const { user, logOut } = UserAuth();
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const { classes } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const [essayTitleArray, setEssayTitleArray] = useState([]);
	const searchInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const theme = useMantineTheme();

	useHotkeys([["mod+K", () => searchInput.current.focus()]]);

	useEffect(() => {
		let essaySearch = [];
		// Sort the essay list by the last edit date
		let sortedEssayList = props.essayList.sort(
			(a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
		);
		sortedEssayList.map((essay) => {
			const essayObject = {};
			// "Value" is used because it is the key that the Mantine AC (Autocomplete) component uses to search
			essayObject["value"] = essay.title ?? "Untitled Document";
			// "Key" is used because it is the key that AC uses to identify the selected item
			essayObject["key"] = essay.essayId;
			// "Group" is used because it is the key that AC uses to group the items
			let essayDate = convertFirebaseTimestampToDate(essay.lastEdit);
			essayObject["group"] =
				getMonthName(essayDate.getMonth()) +
				" " +
				essayDate.getDate() +
				(new Date().getFullYear() !== essayDate.getFullYear()
					? ", " + essayDate.getFullYear()
					: "");
			essaySearch.push(essayObject);
		});
		setEssayTitleArray(essaySearch);
	}, [props.essayList]);

	const rightSection = (
		<Kbd style={{ border: 0 }}>
			<Text>
				{navigator.userAgent.indexOf("Mac OS X") != -1 ? "⌘" : "Ctrl"}
				{" + K"}
			</Text>
		</Kbd>
	);

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
		<Header
			height={{ base: 60, md: 70 }}
			p="md"
			style={{ position: "fixed", top: 0, zIndex: 1 }}
		>
			<div className={classes.inner}>
				<Group
					align={"center"}
					onClick={() => navigate("/")}
					className={classes.logo}
				>
					<Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" />
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

				<Autocomplete
					ref={searchInput}
					variant="default"
					value={searchQuery}
					radius={"md"}
					onChange={(event: string) => {
						setSearchQuery(event);
					}}
					className={classes.search}
					placeholder="Search"
					icon={<IconSearch size={16} stroke={1.5} />}
					data={essayTitleArray}
					limit={4}
					onSearchQuery={() => {
						if (searchQuery !== "") {
							navigate({
								pathname: "/",
								search: `?${createSearchParams({ search: searchQuery })}`,
							});
							searchInput.current.blur();
						} else {
							searchInput.current.blur();
							navigate("/");
						}
					}}
					onItemSubmit={(item) => {
						navigate({
							pathname: "/compose",
							search: `?${createSearchParams({ essayId: item.key })}`,
						});
					}}
					// rightSectionWidth={80}
					// rightSection={rightSection}
					// styles={{ rightSection: { pointerEvents: "none" } }}
				/>

				<UserMenu
					userMenuOpened={userMenuOpened}
					setUserMenuOpened={setUserMenuOpened}
					classes={classes}
					user={user}
					logOut={logOut}
				/>
				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					padding="md"
					size={"full"}
					zIndex={1000000}
				>
					<Container sx={{ height: "calc(100vh - 60px)" }}>
						{links}

						<Divider
							my="sm"
							color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
						/>

						<Group position="center" grow pb="xl" px="md">
							<Button onClick={() => logOut()}>Logout</Button>
						</Group>
					</Container>
				</Drawer>
			</div>
		</Header>
	);
}
