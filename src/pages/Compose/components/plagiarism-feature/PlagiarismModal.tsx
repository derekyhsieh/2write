import { Group, Stack, Title, Button } from "@mantine/core";
import { StatsRingCard } from "./StatsRingCard";

type Props = {
	setIsActive: (active: boolean) => void;
	classification: string;
	percentage: number;
	classificationTitles: string[];
	classificationDescription: string;
};

export function CreatePlagiarismModalContent({
	setIsActive,
	classification,
	percentage,
	classificationTitles,
	classificationDescription,
}: Props) {
	return (
		<Stack>
			<Title size={25} order={4} align="center">
				AI & Plagiarism Report
			</Title>

			<Group>
				<StatsRingCard
					classification={classification}
					percentage={percentage}
					classificationTitles={classificationTitles}
					classificationDescription={classificationDescription}
				/>
			</Group>

			<Button onClick={() => setIsActive(false)}>Okay</Button>
		</Stack>
	);
}
