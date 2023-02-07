import {
	createStyles,
	Header,
	Autocomplete,
	Group,
	Burger,
	Text,
	Image,
	Kbd,
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
}));

export default function HomeHeader(props: { essayList: DocumentData[] }) {
	const { user, logOut } = UserAuth();
	const [opened, { toggle }] = useDisclosure(false);

	const { classes } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const [essayTitleArray, setEssayTitleArray] = useState([]);
	const searchInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

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

	return (
		<Header
			height={{ base: 60, md: 70 }}
			p="md"
			style={{ position: "fixed", top: 0, zIndex: 1 }}
		>
			<div className={classes.inner}>
				<Group align={"center"} onClick={() => navigate("/")} className={classes.logo}>
					<Burger opened={opened} onClick={toggle} size="sm" />
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
			</div>
		</Header>
	);
}
