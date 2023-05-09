import nlp from "compromise";
import Sentiment from "sentiment";
import { IconMoodAngry, IconMoodHappy, IconMoodNeutral } from "@tabler/icons";
import { ActionIcon, Group, Text } from "@mantine/core";
import { ReactElement } from "react";

export function removeCapitalizedParentheses(str) {
	let result = "";
	let inParentheses = false;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === "(") {
			if (str[i + 1] === str[i + 1].toUpperCase()) {
				inParentheses = true;
			} else {
				result += str[i];
			}
		} else if (str[i] === ")") {
			if (inParentheses) {
				inParentheses = false;
			} else {
				result += str[i];
			}
		} else if (!inParentheses) {
			result += str[i];
		}
	}
	return result;
}

export function removePeriods(arr) {
	return arr.filter((str: string) => str !== ".");
}

export function getTopWords(text: string, numWords: number = 5): string[] {
	const words = nlp(text).terms().not("#StopWord").out("array");
	const freq = {};
	words.forEach((word) => {
		if (freq[word]) {
			freq[word]++;
		} else {
			freq[word] = 1;
		}
	});
	const sortedWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
	return sortedWords.slice(0, numWords);
}

export function getReadingTime(
	text: string,
	wordsPerMinute: number = 200
): number {
	const wordCount = nlp(text).terms().not("#StopWord").out("array").length;
	return Math.ceil(wordCount / wordsPerMinute);
}

export function getSentimentAnalysis(inputText: string): string {
	const sentimentAnalyzer = new Sentiment();
	const result = sentimentAnalyzer.analyze(inputText);
	const sentimentDescription =
		result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral";
	return sentimentDescription;
}

export function sentimentAnalysisIcon(
	inputText: string
): ReactElement<any, any> {
	if (inputText.toLowerCase() === "positive") {
		return (
			<Group>
				<ActionIcon color="teal">
					<IconMoodHappy />
				</ActionIcon>
				<Text color="teal">Positive</Text>
				<ActionIcon color="teal">
					<IconMoodHappy />
				</ActionIcon>
			</Group>
		);
	} else if (inputText.toLowerCase() === "negative") {
		return (
			<Group>
				<ActionIcon color="red">
					<IconMoodAngry />
				</ActionIcon>
				<Text color="red">Negative</Text>
				<ActionIcon color="red">
					<IconMoodAngry />
				</ActionIcon>
			</Group>
		);
	} else if (inputText.toLowerCase() === "neutral") {
		return (
			<Group>
				<ActionIcon color="yellow">
					<IconMoodNeutral />
				</ActionIcon>
				<Text color="yellow">Neutral</Text>
				<ActionIcon color="yellow">
					<IconMoodNeutral />
				</ActionIcon>
			</Group>
		);
	}
}
