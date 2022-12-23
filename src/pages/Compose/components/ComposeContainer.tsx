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
import { NavbarMini } from "./Navbar";
import CustomRichContainer from "./CustomRTE";
import CustomRTE from "./CustomRTE";
import DocumentHeader from "./DocumentHeader";
import Notepad from "./Notepad";

export default function ComposeContainer() {  

  


  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // document metadata
  const [localDocData, setLocalDocData] = useState<
  {
    content: string,
    essayPrompt?: string,
    timestamp: {
      seconds: number, 
      nanoseconds: number
    }, 
    lastEdit?: {
      seconds: number,
      nanoseconds: number
    },
    title?: string,
  }>(
    {content: "", timestamp: {seconds: 0, nanoseconds: 0}
  }
  )

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
        navbar={<NavbarMini />}
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 300, md: 350, lg: 400 }}>
              <Notepad localDocData={localDocData}/>
            </Aside>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
              <DocumentHeader localDocData={localDocData}/>
          </Header>
        }
      >
        <CustomRTE localDocData={localDocData} setLocalDocData={setLocalDocData}/>
      </AppShell>
    </div>
  );
}
