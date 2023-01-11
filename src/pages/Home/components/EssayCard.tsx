import {
	createStyles,
	Card,
	Text,
	Group,
	Stack,
	ActionIcon,
	Image,
} from "@mantine/core";
import {
	IconDots,
	IconUsers,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import {
	createSearchParams,
	useNavigate,
} from "react-router-dom";
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
	imgXmlString: string;
}) {
	const [imgSrc, setImgSrc] = useState("");
    const navigate = useNavigate();
    const { classes } = useStyles();

	// useEffect(() => {
	// 	let xmlString = props.imgXmlString === "" ? "<p></p>" : props.imgXmlString;
	// 	let doc = new DOMParser().parseFromString(xmlString, "text/xml");
	// 	html2canvas(doc.body).then((canvas) => {
	// 		canvas.width = 1920;
	// 		canvas.height = 1080;
	// 		let image = canvas.toDataURL("image/jpeg");
	// 		setImgSrc(image);
	// 	});
	// }, []);

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
			<Stack>
				{/* <Image src={imgSrc} /> */}
				<div dangerouslySetInnerHTML={{ __html: props.imgXmlString }} />
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
