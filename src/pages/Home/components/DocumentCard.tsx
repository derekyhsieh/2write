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
} from "@mantine/core";
import { IconDots, IconUsers } from "@tabler/icons";

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
	card: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.01)",
			boxShadow: theme.shadows.md,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 600,
		width: "79%",
	},
}));

export default function DocumentCard() {
	const { classes } = useStyles();

	const cards = mockdata.map((article) => (
		<Card
			key={article.title}
			p="lg"
			radius="lg"
			component="a"
			href="#"
			className={classes.card}
		>
			<AspectRatio ratio={1920 / 1080}>
				<Image radius="md" src={article.image} />
				{/* height={200} width={400} */}
			</AspectRatio>
			<Stack>
				<Group mt="md" position="apart">
					<Text className={classes.title} mt={5} lineClamp={1}>
						{article.title}
					</Text>
					<UnstyledButton>
						<IconDots />
					</UnstyledButton>
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

	return (
		<Container size="xl">
			<SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
				{/* <Card key={"add-new-document"} p="md" radius="lg" component="a" href="#" className={classes.card}>
        <Stack spacing={"xs"}>
      <AspectRatio ratio={1920 / 1080}>
        <Image radius="md" src={"https://blog.iamsuleiman.com/wp-content/uploads/2015/04/components_buttons_usage1-e1429491758281.png"} />
        </AspectRatio>
      <Text className={classes.title}>
        {"CREATE EMPTY"}
      </Text>
      </Stack>
        </Card> */}
				{cards}
			</SimpleGrid>
		</Container>
	);
}
