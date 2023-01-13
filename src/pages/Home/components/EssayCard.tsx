import {
	createStyles,
	Card,
	Text,
	Group,
	Stack,
	ActionIcon,
	Image,
} from "@mantine/core";
import { IconDots, IconUsers } from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const useStyles = createStyles((theme) => ({
	documentCard: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.01)",
			boxShadow: theme.shadows.md,
		},

		display: "flex",
		alignItems: "flex-end",
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 600,
		width: "79%",
	},
}));

export default function EssayCard(props: {
	essayId: string;
	essayTitle: string;
	imgHtmlString: string;
	ageFilter: string;
	ownerFilter: string;
	searchParams: URLSearchParams;
}) {
	const [imgSrc, setImgSrc] = useState("");
	const navigate = useNavigate();
	const { classes } = useStyles();

	useEffect(() => {
		let html = props.imgHtmlString === "" ? "<p></p>" : props.imgHtmlString;
		let previewHtml = getPreview(html);
		const iframe = document.createElement("iframe");
		iframe.style.position = "absolute";
		iframe.style.top = "-9999px";
		iframe.height = "200";
		iframe.width = "620";
		document.body.appendChild(iframe); // 👈 still required
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(previewHtml);
		iframe.contentWindow.document.close();
		html2canvas(iframe.contentWindow.document.body).then(function (canvas) {
			iframe.style.display = "none";
			let image = canvas.toDataURL("image/jpeg");
			setImgSrc(image);
		});
	}, [props.ageFilter, props.ownerFilter, props.searchParams]);

	// Splits the HTML string into an array of words, then takes the first 120 words, and joins them back into a string.
	// If the string is empty, it returns <p></p>.

	const getPreview = (html: string): string => {
		const preview = html.split(" ").slice(0, 120).join(" ");
		if (preview === "") {
			return "<p></p>";
		}
		return preview;
	};

	return (
		<Card
			key={props.essayId}
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
					search: `?${createSearchParams({ essayId: props.essayId })}`,
				});
			}}
		>
			<Stack spacing={0}>
				<Image src={imgSrc} />
				<Stack>
					<Group mt="md" position="apart">
						<Text className={classes.title} mt={5} lineClamp={1}>
							{props.essayTitle ?? "Untitled Document"}
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
			</Stack>
		</Card>
	);
}
