import {
	createStyles,
	Text,
	Card,
	RingProgress,
	Group,
	Stack,
	Center,
	Space,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	label: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: 25,
		lineHeight: 1,
	},

	lead: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: 22,
		lineHeight: 1,
	},

	inner: {
		display: "flex",

		[theme.fn.smallerThan(350)]: {
			flexDirection: "column",
		},
	},

	ring: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",

		[theme.fn.smallerThan(350)]: {
			justifyContent: "center",
			marginTop: theme.spacing.md,
		},
	},
}));

interface StatsRingCardProps {
	classification: string;
	percentage: number;
    classificationTitles: string[];
    classificationDescription: string;
}

export function StatsRingCard({
	classification,
	percentage,
    classificationTitles,
    classificationDescription,
}: StatsRingCardProps) {
	const { classes, theme } = useStyles();

	const isReal = classification.toLowerCase() === "real" ? true : false;

	return (
		<Card withBorder p="xl" radius="md" className={classes.card}>
			<Stack className={classes.inner}>
				<div>
					<div>
						<Center>
							<Group>
								<Text className={classes.lead} ta="center">
									{isReal ? classificationTitles[0] : classificationTitles[1]}
								</Text>
							</Group>
						</Center>
						<Space h={10} />
						<Text size="sm" color="dimmed" ta={"center"}>
                            {classificationDescription}
						</Text>
					</div>
				</div>

				<Center className={classes.ring}>
					<RingProgress
						roundCaps
						thickness={6}
						size={150}
						sections={[
							{
								value: percentage * 100,
								color: isReal ? theme.colors.teal[6] : theme.colors.red[6],
							},
						]}
						label={
							<div>
								<Text
									align="center"
									size="lg"
									className={classes.label}
									sx={{ fontSize: 22 }}
								>
									{(percentage * 100).toFixed(0)}%
								</Text>
								<Text align="center" size="xs" color="dimmed">
									Confident
								</Text>
							</div>
						}
					/>
				</Center>
			</Stack>
		</Card>
	);
}
