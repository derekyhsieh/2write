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
} from "@mantine/core";
import {
	IconDots,
	IconUsers,
	IconChevronDown,
	IconPlus,
	IconNews,
	IconBuildingArch,
	IconExclamationMark,
	IconBulb,
	TablerIcon,
} from "@tabler/icons";
import React, { useState } from "react";

const mockdata = [
	{
		title: "Top 10 places to visit in Norway this summer",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
	},
	{
		title: "Best forests to visit in North America",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
	},
	{
		title: "Hawaii beaches review: better than you think",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
	},
	{
		title: "Mountains at night: 12 best locations to enjoy the view",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwegyXlV-Wy1U1nCq-M02IQkGPo6ki4nxxp__sxKDKNnPjbtqLFSZtAyxqrlzx7lKR74&usqp=CAU",
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

	addNewTemplateCard: {
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

interface DocumentCardProps {}

export default function DocumentCard() {
	const { classes } = useStyles();
	const [ownerFilter, setOwnerFilter] = useState("Owned by anyone");
	const [ageFilter, setAgeFilter] = useState("Newest");

	const cards = mockdata.map((article) => (
		<Card
			key={article.title}
			p="lg"
			radius="lg"
			component="a"
			href="#"
			withBorder
			shadow={"sm"}
			className={classes.documentCard}
		>
			<AspectRatio ratio={1920 / 1080}>
				<Image radius="md" src={article.image} />
			</AspectRatio>
			<Stack>
				<Group mt="md" position="apart">
					<Text className={classes.title} mt={5} lineClamp={1}>
						{article.title}
					</Text>
					<ActionIcon>
						<IconDots />
					</ActionIcon>
				</Group>
				<Group>
					<IconUsers stroke={"1.75"} />
					<Text color="dimmed" size="xs" transform="uppercase" weight={700}>
						Shared with 2 groups
					</Text>
				</Group>
			</Stack>
		</Card>
	));

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
	}) => {
		return (
			<Card
				key={"add"}
				p="lg"
				radius="lg"
				component="a"
				href="#"
				withBorder
				shadow={"sm"}
				className={props.className}
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

	return (
		<Container fluid className={classes.cardContainer} py={"xl"} px={"5%"}>
			<Stack spacing={0}>
				<SimpleGrid
					cols={5}
					breakpoints={[{ maxWidth: "sm", cols: 1 }]}
					mb="xl"
				>
					<TemplateCard
						templateTitle="Add document"
						className={classes.addNewTemplateCard}
					>
						<IconPlus />
					</TemplateCard>
					<TemplateCard
						templateTitle="Research Essay"
						className={classes.templateCard}
					>
						<IconNews />
					</TemplateCard>
					<TemplateCard
						templateTitle="Historical Essay"
						className={classes.templateCard}
					>
						<IconBuildingArch />
					</TemplateCard>
					<TemplateCard
						templateTitle="Argumentative Essay"
						className={classes.templateCard}
					>
						<IconExclamationMark />
					</TemplateCard>
					<TemplateCard
						templateTitle="Reflection Essay"
						className={classes.templateCard}
					>
						<IconBulb />
					</TemplateCard>
				</SimpleGrid>
				<Group mb="xl">
					<Menu transitionDuration={150} transition="rotate-right">
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
					<Menu transitionDuration={150} transition="rotate-right">
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
				<SimpleGrid
					cols={3}
					breakpoints={[{ maxWidth: "sm", cols: 1 }]}
					mb="xl"
				>
					{cards}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
