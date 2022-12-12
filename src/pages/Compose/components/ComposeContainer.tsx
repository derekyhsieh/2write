import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

export default function ComposeContainer() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow mt="lg">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text>Navbar</Text>
              </div>
            </Navbar.Section>
            <Navbar.Section>
              <Text>Footer</Text>
            </Navbar.Section>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300, lg: 500 }}>
              <Text>AI Notepad sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Heaer</Text>
            </div>
          </Header>
        }
      >
        <Text>Rich Text Editor</Text>
      </AppShell>
    </div>
  );
}
