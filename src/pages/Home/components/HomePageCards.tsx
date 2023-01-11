import {
	createStyles,
	SimpleGrid,
	Card,
	Text,
	Container,
	AspectRatio,
	Group,
	Stack,
	ActionIcon,
	Button,
	Menu,
	Center,
	Title,
	Loader,
	Image,
} from "@mantine/core";
import {
	IconDots,
	IconUsers,
	IconChevronDown,
	IconPlus,
	IconNews,
	IconBuildingArch,
	IconExclamationMark,
	IconUpload,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { loadEssayList } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { searchDocumentList } from "../../../utils/misc";
import { DocumentData } from "firebase/firestore";
import EssayCard from "./EssayCard";

const useStyles = createStyles((theme) => ({
	addNewCard: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.03)",
			boxShadow: theme.shadows.md,
		},
	},

	templateCard: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.03)",
			boxShadow: theme.shadows.md,
		},
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 600,
		width: "79%",
	},

	templateTitle: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 600,
	},

	cardContainer: {
		minHeight: "100%",
		backgroundColor: `${theme.colors.gray[0]}`,
	},
}));

export default function HomePageCards(props: {
	createModalOnClick?: Function;
	dropzoneModalOnClick?: Function;
	promptModalOnClick?: Function;
}) {
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();
	const { classes } = useStyles();
	const [ownerFilter, setOwnerFilter] = useState("Owned by anyone");
	const [ageFilter, setAgeFilter] = useState("Newest");
	const [searchParams, setSearchParams] = useSearchParams();
	const [isOnRenderLoadingComplete, setIsOnRenderLoadingComplete] =
		useState(false);
	const [noResultsMessage, setNoResultsMessage] = useState(
		"sorry, we ran into an error retrieving your documents"
	);

	const { user } = UserAuth();

	const setEssayCards = (essayList: DocumentData[]) => {
		setCards(
			React.Children.toArray(
				essayList.map((essay) => (
					<EssayCard
						essayId={essay.essayId}
						essayTitle={essay.title}
						imgXmlString={essay.content}
					/>
				))
			)
		);
	};

	useEffect(() => {
		// load the user's essay list from firebase
		loadEssayList(user.uid).then((essayList) => {
			// sort the essay list by last edit date
			let sortedEssayList =
				ageFilter === "Newest"
					? essayList.sort(
							(a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
					  )
					: essayList.sort(
							(a, b) => a.lastEdit.toMillis() - b.lastEdit.toMillis()
					  );
			if (searchParams.has("search")) {
				// search the essay list based on the search query
				let searchResults = searchDocumentList(
					sortedEssayList,
					searchParams.get("search")
				);
				// set the search results as the essay cards
				setNoResultsMessage("no results match your query :(");
				setEssayCards(searchResults);
				setIsOnRenderLoadingComplete(true);
			} else {
				// if the user is not searching, set the essay cards to the sorted essay list
				setNoResultsMessage(
					"no documents found, create a new one using the buttons above"
				);
				setEssayCards(sortedEssayList);
				setIsOnRenderLoadingComplete(true);
			}
		});
	}, [ageFilter, ownerFilter, searchParams]);

	const templateArray = [
		{
			title: "Add document",
			template: false,
			onClick: "create",
			icon: <IconPlus key={0} />,
		},
		{
			title: "Upload document",
			template: false,
			onClick: "dropzone",
			icon: <IconUpload key={1} />,
		},
		{
			title: "Research Essay",
			template: true,
			onClick: "prompt",
			icon: <IconNews key={2} />,
		},
		{
			title: "Historical Essay",
			template: true,
			onClick: "prompt",
			icon: <IconBuildingArch key={3} />,
		},
		{
			title: "Argumentative Essay",
			template: true,
			onClick: "prompt",
			icon: <IconExclamationMark key={4} />,
		},
	];

	const templateCards = React.Children.toArray(
		templateArray.map((templateItem) => (
			<Card
				p="lg"
				radius="lg"
				component="a"
				href="#"
				withBorder
				shadow={"sm"}
				className={
					templateItem.template ? classes.templateCard : classes.addNewCard
				}
				onClick={() => {
					// If the new document option has an onClick function, then
					// the user clicked on a document that has a custom click
					// behavior. If the value of the onClick property is
					// "dropzone", then use the dropzone onClick function. If the value
					// is "create", then show the create modal. Otherwise, show
					// the prompt modal.
					if (templateItem.onClick) {
						if (templateItem.onClick === "dropzone") {
							props.dropzoneModalOnClick(true);
						} else if (templateItem.onClick === "create") {
							props.createModalOnClick(true);
						} else {
							props.promptModalOnClick(true);
						}
					}
				}}
			>
				<Center>
					<Stack>
						<Center>
							<ActionIcon
								radius="xl"
								size="xl"
								gradient={{ from: "indigo", to: "cyan", deg: 45 }}
								variant="gradient"
								p={10}
							>
								{templateItem.icon}
							</ActionIcon>
						</Center>
						<Text className={classes.templateTitle} mt={5} align="center">
							{templateItem.title}
						</Text>
					</Stack>
				</Center>
			</Card>
		))
	);

	return (
		<Container
			fluid
			className={classes.cardContainer}
			pb={24}
			px={"5%"}
			pt={{ base: 84, md: 94 }}
		>
			{/* for container, padding bottom is normal padding, padding top is normal padding plus breakpoint heights of header */}
			<Stack spacing={0}>
				{!searchParams.has("search") && (
					<SimpleGrid
						cols={5}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
						mb="xl"
					>
						{templateCards}
					</SimpleGrid>
				)}
				<Group mb="xl" position="apart">
					{searchParams.has("search") && (
						<Title className={classes.title}> {"Search Results"} </Title>
					)}
					<Group position="apart">
						<Menu transitionDuration={150} transition="scale-y">
							<Menu.Target>
								<Button variant="default" radius="md">
									<Group position="apart">
										{ownerFilter} <IconChevronDown />
									</Group>
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => setOwnerFilter("Owned by anyone")}>
									Owned by anyone
								</Menu.Item>
								<Menu.Item onClick={() => setOwnerFilter("Owned by me")}>
									Owned by me
								</Menu.Item>
								<Menu.Item onClick={() => setOwnerFilter("Not owned by me")}>
									Not owned by me
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
						<Menu transitionDuration={150} transition="scale-y">
							<Menu.Target>
								<Button variant="default" radius="md">
									<Group position="apart">
										{ageFilter} <IconChevronDown />
									</Group>
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => setAgeFilter("Newest")}>
									Newest
								</Menu.Item>
								<Menu.Item onClick={() => setAgeFilter("Oldest")}>
									Oldest
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Group>
				{/* 
				displays cards
				if there are no cards, checks if the on render loading is complete
				if it is, displays the no results message, otherwise shows a loader 
				*/}
				{cards.length === 0 ? (
					isOnRenderLoadingComplete ? (
						<Center>
							<Text
								color="dimmed"
								transform="uppercase"
								weight={700}
								align="center"
							>
								{noResultsMessage}
							</Text>
						</Center>
					) : (
						<Center>
							<Loader />
						</Center>
					)
				) : (
					<SimpleGrid
						cols={3}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
						mb="xl"
					>
						{cards}
					</SimpleGrid>
				)}
			</Stack>
		</Container>
	);
}
