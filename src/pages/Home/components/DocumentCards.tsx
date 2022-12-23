import {
	createStyles,
	SimpleGrid,
	Card,
	Image,
	Text,
	Container,
	AspectRatio,
	Group,
	Space,
	Flex,
	Stack,
	UnstyledButton,
	ActionIcon,
	Button,
	Menu,
	Center,
	MediaQuery,
	Modal,
	useMantineTheme,
	Loader,
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
	IconCloudUpload,
	IconX,
	IconDownload,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { createEssay, loadEssayList } from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const mockdata = [
	{
		title: "Top 10 places to visit in Norway this summer",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
		date: "June 12, 2021",
	},
	{
		title: "Best forests to visit in North America",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
		date: "January 6, 2021",
	},
	{
		title: "Hawaii beaches review: better than you think",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
		date: "December 12, 2020",
	},
	{
		title: "Mountains at night: 12 best locations to enjoy the view",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
		date: "November 12, 2020",
	},
];

const useStyles = createStyles((theme) => ({
	documentCard: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.01)",
			boxShadow: theme.shadows.md,
		},
	},

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
		height: "100%",
		backgroundColor: `${theme.colors.gray[0]}`,
	},
}));

interface DocumentCardsProps {}

export default function DocumentCards(props: {
	createModalOnClick?: Function;
	dropzoneModalOnClick?: Function;
	promptModalOnClick?: Function;
}) {
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();
	const { classes } = useStyles();
	const [ownerFilter, setOwnerFilter] = useState("Owned by anyone");
	const [ageFilter, setAgeFilter] = useState("Newest");

	const { user } = UserAuth();

	useEffect(() => {
		loadEssayList(user.uid).then((essayList) => {
			// sort essays by last edit and store in new array called sortedEssayList
			let sortedEssayList =
				ageFilter === "Newest"
					? essayList.sort(
							(a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
					  )
					: essayList.sort(
							(a, b) => a.lastEdit.toMillis() - b.lastEdit.toMillis()
					  );

			console.log(user.uid);

			setCards(
				sortedEssayList.map((essay, index) => (
					<Card
						key={essay.essayId}
						p="lg"
						radius="lg"
						component="a"
						href="#"
						withBorder
						shadow={"sm"}
						className={classes.documentCard}
						onClick={() => {
							navigate({
								pathname: "/compose",
								search: `?${createSearchParams({ essayId: essay.essayId, ...(!essay.title && { placeholder: (index + 1).toString() }) })}`,
							});
						}}
					>
						<AspectRatio
							ratio={1920 / 1080}
							dangerouslySetInnerHTML={{ __html: essay.content }}
						>
							{/* <Image
 							radius="md"
 							src={
 								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU"
 							}
 						/> */}
						</AspectRatio>
						<Stack>
							<Group mt="md" position="apart">
								<Text className={classes.title} mt={5} lineClamp={1}>
									{essay.title
										? essay.title
										: "Document ".concat((index + 1).toString())}
								</Text>
								<ActionIcon>
									<IconDots />
								</ActionIcon>
							</Group>
							<Group>
								<IconUsers stroke={"1.75"} />
								<Text
									color="dimmed"
									size="xs"
									transform="uppercase"
									weight={700}
								>
									Shared with 2 groups
								</Text>
							</Group>
						</Stack>
					</Card>
				))
			);
		});
	}, [ageFilter, ownerFilter]);

	const newDocumentArray = [
		{
			title: "Add document",
			template: false,
			onClickProps: "create",
			icon: <IconPlus />,
		},
		{
			title: "Upload document",
			template: false,
			onClickProps: "dropzone",
			icon: <IconUpload />,
		},
		{
			title: "Research Essay",
			template: true,
			onClickProps: "prompt",
			icon: <IconNews />,
		},
		{
			title: "Historical Essay",
			template: true,
			onClickProps: "prompt",
			icon: <IconBuildingArch />,
		},
		{
			title: "Argumentative Essay",
			template: true,
			onClickProps: "prompt",
			icon: <IconExclamationMark />,
		},
	];

	const TemplateCard = (props: {
		children:
			| string
			| number
			| boolean
			| React.ReactElement<any, string | React.JSXElementConstructor<any>>
			| React.ReactFragment
			| React.ReactPortal
			| null
			| undefined;
		templateTitle: string;
		className: string;
		onClick?: Function;
	}) => {
		return (
			<Card
				key={uuidv4()}
				p="lg"
				radius="lg"
				component="a"
				href="#"
				withBorder
				shadow={"sm"}
				className={props.className}
				onClick={() => (props.onClick ? props.onClick(true) : null)}
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
								{props.children}
							</ActionIcon>
						</Center>
						<Text className={classes.templateTitle} mt={5} align="center">
							{props.templateTitle}
						</Text>
					</Stack>
				</Center>
			</Card>
		);
	};

	const newDocCards = newDocumentArray.map((newDocItem) => (
		<TemplateCard
			templateTitle={newDocItem.title}
			className={
				newDocItem.template ? classes.templateCard : classes.addNewCard
			}
			onClick={
				newDocItem.onClickProps
					? newDocItem.onClickProps === "dropzone"
						? props.dropzoneModalOnClick
						: newDocItem.onClickProps === "create"
						? props.createModalOnClick
						: props.promptModalOnClick
					: undefined
			}
		>
			{newDocItem.icon}
		</TemplateCard>
	));

	return (
		<>
			<Container fluid className={classes.cardContainer} py={"xl"} px={"5%"}>
				<Stack spacing={0}>
					<SimpleGrid
						cols={5}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
						mb="xl"
					>
						{newDocCards}
					</SimpleGrid>
					<Group mb="xl">
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
					{cards.length === 0 ? (
						<Center>
							<Loader />
						</Center>
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
		</>
	);
}
