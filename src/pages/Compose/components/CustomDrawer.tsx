import { Drawer, useMantineTheme } from "@mantine/core";

type DrawerProps = {
	setOpened: (value: string) => void;
	opened: boolean;
	children: React.ReactNode;
};

export function CustomDrawer({
	children,
	opened,
	setOpened,
}: DrawerProps) {
	const theme = useMantineTheme();

	return (
		<Drawer
			size={"lg"}
			opened={opened}
			onClose={() => {
				setOpened("null");
			}}
			overlayColor={
				theme.colorScheme === "dark"
					? theme.colors.dark[9]
					: theme.colors.gray[2]
			}
			overlayOpacity={0.55}
			overlayBlur={3}
			zIndex={9999}
		>
			{children}
		</Drawer>
	);
}
