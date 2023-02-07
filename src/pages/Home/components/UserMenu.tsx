import { Group, Menu, UnstyledButton, Avatar } from "@mantine/core";
import { convertURLToName } from "../../../utils/misc";
import { IconLogout } from "@tabler/icons";
import { IconMail, IconUser } from "@tabler/icons";

function UserMenu(props: {
	userMenuOpened: boolean;
	setUserMenuOpened: any;
	classes: any;
	user: any;
	logOut: any;
}) {

	return (
		<Group>
			<Menu
				width={260}
				position={"bottom-end"}
				transition={"pop-top-right"}
				transitionDuration={100}
				onClose={() => props.setUserMenuOpened(false)}
				onOpen={() => props.setUserMenuOpened(true)}
				opened={props.userMenuOpened}
			>
				<Menu.Target>
					<UnstyledButton className={props.classes.user}>
						<Group spacing={7}>
							<Avatar
								className={
									props.userMenuOpened
										? props.classes.avatarMenu
										: props.classes.avatarHover
								}
								src={props.user.photoURL}
								alt={props.user.displayName}
								radius="xl"
								size={40}
							/>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>
						<strong className={props.classes.tooltipTitle}>
							{convertURLToName(props.user.providerData[0].providerId)} Account
						</strong>
					</Menu.Label>
					{props.user.displayName && (
						<Menu.Item icon={<IconUser size={14} stroke={1.5} />} closeMenuOnClick={false}>
							{props.user.displayName}
						</Menu.Item>
					)}

					{props.user.email && (
						<Menu.Item icon={<IconMail size={14} stroke={1.5} />} closeMenuOnClick={false}>
							{props.user.email}
						</Menu.Item>
					)}
					<Menu.Divider />
					<Menu.Item
						onClick={props.logOut}
						icon={<IconLogout size={14} stroke={1.5} />}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}

export default UserMenu;
