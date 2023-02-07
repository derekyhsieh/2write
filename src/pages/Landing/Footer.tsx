import {
	createStyles,
	Text,
	Container,
	ActionIcon,
	Group,
	Image,
} from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	footer: {
		paddingTop: theme.spacing.xl * 2,
		paddingBottom: theme.spacing.xl * 2,
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	logo: {
		maxWidth: 200,

		[theme.fn.smallerThan("sm")]: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
	},

	description: {
		marginTop: 5,

		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
			textAlign: "center",
		},
	},

	inner: {
		display: "flex",
		justifyContent: "space-between",

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},

	groups: {
		display: "flex",
		flexWrap: "wrap",

		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	wrapper: {
		width: 160,
	},

	link: {
		display: "block",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[6],
		fontSize: theme.fontSizes.sm,
		paddingTop: 3,
		paddingBottom: 3,
		cursor: "pointer",

		"&:hover": {
			textDecoration: "underline",
		},
	},

	title: {
		fontSize: theme.fontSizes.lg,
		fontWeight: 700,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		marginBottom: theme.spacing.xs / 2,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	afterFooter: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing.xl,
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,

		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		},
	},

	social: {
		[theme.fn.smallerThan("sm")]: {
			marginTop: theme.spacing.xs,
		},
	},
}));

interface FooterLinksProps {
	data: {
		title: string;
		links: { label: string; link: string }[];
	}[];
}

export function FooterLinks({ data }: FooterLinksProps) {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const groups = data.map((group) => {
		const links = group.links.map((link, index) => (
			<Text<"a">
				key={index}
				className={classes.link}
				component="a"
				onClick={(event) => {
					event.preventDefault();
					navigate(link.link);
				}}
			>
				{link.label}
			</Text>
		));

		return (
			<div className={classes.wrapper} key={group.title}>
				<Text className={classes.title}>{group.title}</Text>
				{links}
			</div>
		);
	});

	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				<div className={classes.logo}>
					<Image src={logo} height={30} width={30} />
					<Text size="xs" color="dimmed" className={classes.description}>
						Turbocharge your writing with AI powered tools.
					</Text>
				</div>
				<div className={classes.groups}>{groups}</div>
			</Container>
			<Container className={classes.afterFooter}>
				<Text color="dimmed" size="sm">
					© {new Date().getFullYear()} 2write. All rights reserved.
				</Text>

				<Group spacing={0} className={classes.social} position="right" noWrap>
					<ActionIcon
						onClick={() =>
							window.open("https://discord.gg/HRkKvbtr6j", "_blank").focus()
						}
						size="lg"
					>
						<IconBrandDiscord size={18} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Container>
		</footer>
	);
}
