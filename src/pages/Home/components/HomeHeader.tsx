import {
	createStyles,
	Header,
	Autocomplete,
	Group,
	Burger,
	Text,
	ActionIcon,
	Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconUser, IconBell } from "@tabler/icons";
import { loadEssayList } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
	getMonthName,
	convertFirebaseTimestampToDate,
} from "../../../utils/misc";
import { createSearchParams, useNavigate } from "react-router-dom";
import logo from "../../../img/logo.png";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: "100%",
		cursor: "pointer"
	},

	search: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
		width: "60%",
	},
}));

interface HomeHeaderProps {}

export default function HomeHeader() {
	const { user } = UserAuth();
	const [opened, { toggle }] = useDisclosure(false);
	const { classes } = useStyles();
	const [searchQuery, setSearchQuery] = useState("");
	const [essayTitleArray, setEssayTitleArray] = useState([]);
	const searchInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		loadEssayList(user.uid).then((essayList) => {
			let essaySearch = [];
			// Sort the essay list by the last edit date
			let sortedEssayList = essayList.sort(
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
		});
	}, []);

	return (
		<Header
			height={{ base: 60, md: 70 }}
			p="md"
			style={{ position: "fixed", top: 0, zIndex: 1 }}
		>
			<div className={classes.inner}>
				<Group align={"center"} onClick={() => window.location.reload()}>
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
				/>

				<Group>
					<ActionIcon>
						<IconBell />
					</ActionIcon>
					<ActionIcon variant="light" radius="xl" size="xl" color="blue">
						<IconUser />
					</ActionIcon>
				</Group>
			</div>
		</Header>
	);
}
