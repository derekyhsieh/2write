import React, { FC, SetStateAction, useEffect, useState } from "react";
import { CustomDrawer } from "./CustomDrawer";
import { Center, Stack, Title } from "@mantine/core";
import {
	removePeriods,
	removeCapitalizedParentheses,
} from "../../../utils/analytics";
import AnalyticsSection from "./AnalyticsSection";
import {
	getReadingTime,
	getTopWords,
	getSentimentAnalysis,
} from "../../../utils/analytics";

interface AnalyticsDrawerProps {
	setOpened: React.Dispatch<SetStateAction<string>>;
	opened: string;
	editor: any;
}

const AnalyticsDrawer: FC<AnalyticsDrawerProps> = ({
	setOpened,
	opened,
	editor,
}) => {
	const [wordCount, setWordCount] = useState("");
	const [charCount, setCharCount] = useState("");
	const [citationWordCount, setCitationWordCount] = useState(0); // word count without citations
	const [topWords, setTopWords] = useState([""]); // top 5 words
	const [readingTime, setReadingTime] = useState(""); // reading time in minutes
	const [sentimentAnalysis, setSentimentAnalysis] = useState(""); // sentiment analysis string

	useEffect(() => {
		// console.log(editor.state.doc.textContent)
		if (opened === "analytics") {
			const textContent = editor.editor.view.state.doc.textContent;

			setWordCount(removePeriods(textContent.split(" ")).length);
			setCharCount(textContent.length);
			setCitationWordCount(
				removePeriods(removeCapitalizedParentheses(textContent).split(" "))
					.length
			);
			setTopWords(getTopWords(textContent));
			// adds s if reading time is multiple minutes
			setReadingTime(
				getReadingTime(textContent).toString() +
					` minute${getReadingTime(textContent) === 1 ? "" : "s"}`
			);
			setSentimentAnalysis(getSentimentAnalysis(textContent));
		}
	}, [opened]);

	return (
		<CustomDrawer setOpened={setOpened} opened={opened == "analytics"}>
			<Stack mx={30}>
				<Center>
					<Title>Analytics</Title>
				</Center>

				<AnalyticsSection
					displayText={wordCount}
					dividerLabel="Word Count"
					isFirst={true}
				/>

				<AnalyticsSection
					displayText={charCount}
					dividerLabel="Character Count"
				/>

				<AnalyticsSection
					displayText={citationWordCount}
					dividerLabel="Word Count w/o Citations"
				/>

				<AnalyticsSection
					displayText={topWords}
					dividerLabel="Top Words"
					isTopWords={true}
				/>

				<AnalyticsSection
					displayText={readingTime}
					dividerLabel="Reading Time"
				/>

				<AnalyticsSection
					displayText={sentimentAnalysis}
					isSentimentAnalysis={true}
					dividerLabel="Sentiment Analysis"
				/>
			</Stack>
		</CustomDrawer>
	);
};

export default AnalyticsDrawer;
