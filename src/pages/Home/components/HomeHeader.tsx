import {
	createStyles,
	Header,
	Autocomplete,
	Group,
	Burger,
	ActionIcon,
	Stack,
	Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconUser, IconBell } from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { loadEssayList } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	getMonthName,
	convertFirebaseTimestampToDate,
} from "../../../utils/misc";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useEventListener } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
	inner: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: "100%",
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
	const [searchFocus, setSearchFocus] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		loadEssayList(user.uid).then((essayList) => {
			let essaySearch = [];
			let sortedEssayList = essayList.sort(
				(a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
			);
			sortedEssayList.map((essay) => {
				const essayObject = {};
				essayObject["value"] = essay.title ? essay.title : "Untitled Document";
				essayObject["key"] = essay.essayId;
				let essayDate = convertFirebaseTimestampToDate(essay.lastEdit);
				essayObject["group"] =
					getMonthName(essayDate.getMonth()) + " " + essayDate.getDate();
				essaySearch.push(essayObject);
			});
			setEssayTitleArray(essaySearch);
		});
	}, []);

	// function SearchComponent(props: {
	// 	searchQuery;
	// 	setSearchQuery;
	// 	essayTitleArray;
	// }) {
	// 	// Define an event listener callback function
	// 	const handleKeyDown = useCallback((event) => {
	// 		setSearchFocus(true);
	// 		if (event.key === "Enter") {
	// 			setSearchFocus(false);
	// 			navigate({
	// 				pathname: "/",
	// 				search: `?${createSearchParams({ searchQuery: props.searchQuery })}`,
	// 			});
	// 		}
	// 	}, []);

	// 	// Add the event listener
	// 	const ref = useEventListener("keydown", handleKeyDown);

	// 	return (
	// 		<Autocomplete
	// 			variant="default"
	// 			autoFocus={searchFocus}
	// 			ref={ref}
	// 			value={searchQuery}
	// 			radius={"md"}
	// 			onChange={(event: string) => {
	// 				setSearchQuery(event);
	// 			}}
	// 			className={classes.search}
	// 			placeholder="Search"
	// 			icon={<IconSearch size={16} stroke={1.5} />}
	// 			data={essayTitleArray}
	// 			limit={4}
	// 			onItemSubmit={(item) => {
	// 				navigate({
	// 					pathname: "/compose",
	// 					search: `?${createSearchParams({ essayId: item.key })}`,
	// 				});
	// 			}}
	// 		/>
	// 	);
	// }

	return (
		<Header height={{ base: 50, md: 70 }} p="md">
			<div className={classes.inner}>
				<Group>
					<Burger opened={opened} onClick={toggle} size="sm" />
					<MantineLogo size={28} />
				</Group>

				{/* <SearchComponent
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					essayTitleArray={essayTitleArray}
				/> */}

				<Autocomplete
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
