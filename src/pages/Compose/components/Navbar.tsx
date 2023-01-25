import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Image,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconListCheck,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconChartDonut,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { CustomDrawer } from "./CustomDrawer";
import logo from "../../../../public/logo.png"
import SettingsDrawer from "./SettingsDrawer";
import AnalyticsDrawer from "./AnalyticsDrawer";
import TodoDrawer from "./TodoDrawer";
import EssayDataDrawer from "./EssayDataDrawer";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const iconsData = [
  { icon: IconChartDonut, label: "Essay Prompt", name: "data" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", name: "analytics" },
  { icon: IconListCheck, label: "To-Dos", name: "todos" },
  { icon: IconSettings, label: "Settings", name: "settings" },
];

export function NavbarMini(editor) {
  const [active, setActive] = useState(0);

  const [openDrawer, setOpenDrawer] = useState("null");

  const links = iconsData.map((link, index) => (
    <NavbarLink
      onClick={() => {
        setActive(index);
        setOpenDrawer(link.name);
      }}
      {...link}
      key={link.label}
      active={index === active}
    />
  ));

  return (
    <>
      <SettingsDrawer opened={openDrawer} setOpened={setOpenDrawer} />
      <AnalyticsDrawer opened={openDrawer} setOpened={setOpenDrawer} editor={editor}/>
      <TodoDrawer opened={openDrawer} setOpened={setOpenDrawer}/>
      <EssayDataDrawer opened={openDrawer} setOpened={setOpenDrawer} />

      <Navbar height={"100vh"} width={{ base: 80 }} p="md">
        <Center>
          <Image src={logo} width={35} height={35}/>
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
