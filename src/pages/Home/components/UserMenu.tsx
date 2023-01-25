import React from "react";
import {
	Group,
	Menu,
	Tooltip,
	UnstyledButton,
    Avatar,
} from "@mantine/core";
import { convertURLToName } from "../../../utils/misc";
import { IconLogout } from "@tabler/icons";

function UserMenu(props: {
	userMenuOpened: boolean;
	setUserMenuOpened: any;
	tooltipOpened: boolean;
	setTooltipOpened: any;
	classes: any;
	user: any;
    logOut: any;
}) {
	return (
		<Group>
			<Menu
				width={260}
				position="bottom-end"
				transition="pop-top-right"
				onClose={() => props.setUserMenuOpened(false)}
				onOpen={() => {
					props.setUserMenuOpened(true);
					props.setTooltipOpened(false);
				}}
				opened={props.userMenuOpened}
			>
				<Menu.Target>
					<UnstyledButton className={props.classes.user}>
						<Group spacing={7}>
							<Tooltip
								label={
									<>
										<strong className={props.classes.tooltipTitle}>
											{convertURLToName(props.user.providerData[0].providerId)}{" "}
											Account
										</strong>
										{props.user.displayName === "" || props.user.displayName ? <br /> : ""}
										{props.user.displayName}
										{props.user.email ? <br /> : ""}
										{props.user.email ? props.user.email : ""}
									</>
								}
								multiline
								transition="fade"
								transitionDuration={200}
								width={"auto"}
								onMouseEnter={() =>
									setTimeout(() => props.setTooltipOpened(true), 400)
								}
								onMouseLeave={() => props.setTooltipOpened(false)}
								opened={props.userMenuOpened ? false : props.tooltipOpened}
								style={{ backgroundColor: "#4B4B4B" }}
							>
								<Avatar
									className={
										props.userMenuOpened ? props.classes.avatarMenu : props.classes.avatarHover
									}
									src={props.user.photoURL}
									alt={props.user.displayName}
									radius="xl"
									size={40}
								/>
							</Tooltip>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
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
