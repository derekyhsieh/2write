import {
	Center,
	Divider,
	Text,
	Space,
	Badge,
	Group,
	ActionIcon,
} from "@mantine/core";
import { Children } from "react";
import { sentimentAnalysisIcon } from "../../../utils/analytics";

type AnalyticsSectionProps = {
	displayText: any;
	dividerLabel: string;
	isFirst?: boolean;
	isTopWords?: boolean;
	isSentimentAnalysis?: boolean;
};

function AnalyticsSection({
	displayText,
	dividerLabel,
	isFirst = false,
	isTopWords = false,
	isSentimentAnalysis = false,
}: AnalyticsSectionProps) {
	return (
		<>
			{!isFirst && <Space h="sm" />}

			<Divider
				size="md"
				label={dividerLabel}
				labelPosition="center"
				styles={{ label: { fontSize: "15px" } }}
			/>

			<Center>
				{isTopWords ? (
					<Group style={{ justifyContent: "center" }}>
						{Children.toArray(
							displayText.map((word: string) => {
								return (
									<Center>
										<Badge variant="outline" color="blue">
											{word}
										</Badge>
									</Center>
								);
							})
						)}
					</Group>
				) : (
					<Text>{isSentimentAnalysis ? sentimentAnalysisIcon(displayText) : displayText}</Text>
				)}
			</Center>
		</>
	);
}

export default AnalyticsSection;
