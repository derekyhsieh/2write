import { DocumentData } from "firebase/firestore";

function getMonthName(monthNumber) {
	const date = new Date();
	date.setMonth(monthNumber);

	return date.toLocaleString("en-US", { month: "long" });
}

function convertFirebaseTimestampToDate(timestamp) {
	return new Date(timestamp.seconds * 1000);
}

// search through doc list, assign score based on if search term
// is in title or content, title weighted higher than content
// returns sorted list of documents by score
function searchDocumentList(
	documentList: DocumentData[],
	searchString: string
) {
	const searchResults = documentList.map((document) => {
		const titleScore = (document.title ?? "Untitled Document")
			.toLowerCase()
			.includes(searchString.toLowerCase())
			? 1
			: 0;
		const contentScore = document.content
			.toLowerCase()
			.includes(searchString.toLowerCase())
			? 0.5
			: 0;
		const score = titleScore + contentScore;
		if (score === 0) {
			return null;
		}
		return { ...document, score };
	});

	const filteredResults = searchResults.filter((result) => result !== null);
	return filteredResults.sort((a, b) => b.score - a.score);
}

// function to convert company URLs such as "google.com" to "Google"
function convertURLToName(url) {
	let name = url.split(".")[0];
	name = name.charAt(0).toUpperCase() + name.slice(1);
	return name;
}

// check if string starts with http
const isExternal = (link: string) => {
	return link.startsWith("http");
};

export {
	getMonthName,
	convertFirebaseTimestampToDate,
	searchDocumentList,
	convertURLToName,
	isExternal,
};
