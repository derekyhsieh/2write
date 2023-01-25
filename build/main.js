import * as jsxRuntime from "react/jsx-runtime";
import React, { createContext, useState, useEffect, useContext, createElement, useRef } from "react";
import ReactDOM from "react-dom/client";
import { createStyles, UnstyledButton, Group, ThemeIcon, Text, Box, Header, Image, HoverCard, Button, Burger, Drawer, ScrollArea, AppShell, Center, Loader, Container, Title, Paper, Stack, useMantineTheme, Divider, Space, Textarea, Navbar, Tooltip, ActionIcon, TextInput, Modal, Select, MediaQuery, Aside, Card, SimpleGrid, Menu, Autocomplete, Avatar, MantineProvider } from "@mantine/core";
import { useNavigate, useSearchParams, createSearchParams, Routes, Route, BrowserRouter } from "react-router-dom";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { useDisclosure } from "@mantine/hooks";
import { IconCode, IconCoin, IconBook, IconFingerprint, IconChartPie3, IconNotification, IconBrandGoogle, IconBrandTwitter, IconBrandGithub, IconChartDonut, IconDeviceDesktopAnalytics, IconListCheck, IconSettings, IconChevronLeft, IconUser, IconDots, IconUsers, IconChevronDown, IconPlus, IconUpload, IconNews, IconBuildingArch, IconExclamationMark, IconSearch, IconLogout, IconDownload, IconX, IconCloudUpload, IconGauge, IconMessageChatbot, IconBallpen, IconClipboardTypography, IconFriends } from "@tabler/icons";
import { BubbleMenu, useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { doc, updateDoc, serverTimestamp, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useDebounce } from "use-debounce";
import { RichTextEditor as RichTextEditor$1 } from "@mantine/rte";
import html2canvas from "html2canvas";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { v4 } from "uuid";
import { Carousel } from "@mantine/carousel";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const firebaseConfig = {
  apiKey: "AIzaSyA4kmbCFgCJ130gNjTmK2Le5lPHqVX1pJ4",
  authDomain: "write-dev.firebaseapp.com",
  projectId: "write-dev",
  storageBucket: "write-dev.appspot.com",
  messagingSenderId: '"972560962982",',
  appId: "1:972560962982:web:ab500c8a2b2ce8f5fc6b67",
  measurementId: "G-8GS9V62LDR"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("No user found");
    }
  };
  const twitterSignIn = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("No user found");
    }
  };
  const githubSignIn = async () => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("No user found");
    }
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { googleSignIn, twitterSignIn, githubSignIn, logOut, user }, children });
};
const UserAuth = () => {
  return useContext(AuthContext);
};
const logo = "/assets/logo-a162cb79.png";
const useStyles$a = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    })
  },
  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0]
    }),
    "&:active": theme.activeStyles
  },
  dropdownFooter: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },
  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },
  logo: {
    cursor: "pointer"
  }
}));
const mockdata$1 = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting"
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes"
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without"
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its."
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase"
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews"
  }
];
function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  useDisclosure(false);
  const { classes, theme } = useStyles$a();
  const navigate = useNavigate();
  mockdata$1.map((item) => /* @__PURE__ */ jsx(UnstyledButton, { className: classes.subLink, children: /* @__PURE__ */ jsxs(Group, { noWrap: true, align: "flex-start", children: [
    /* @__PURE__ */ jsx(ThemeIcon, { size: 34, variant: "default", radius: "md", children: /* @__PURE__ */ jsx(item.icon, { size: 22, color: theme.fn.primaryColor() }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", weight: 500, children: item.title }),
      /* @__PURE__ */ jsx(Text, { size: "xs", color: "dimmed", children: item.description })
    ] })
  ] }) }, item.title));
  return /* @__PURE__ */ jsxs(Box, { pb: 120, children: [
    /* @__PURE__ */ jsx(Header, { height: 60, px: "md", children: /* @__PURE__ */ jsxs(Group, { position: "apart", sx: { height: "100%" }, children: [
      /* @__PURE__ */ jsxs(Group, { className: classes.logo, onClick: () => navigate("/"), children: [
        /* @__PURE__ */ jsx(Image, { src: logo, width: 35, height: 35, mb: 4, mr: -10 }),
        /* @__PURE__ */ jsx(
          Text,
          {
            variant: "gradient",
            gradient: { from: "indigo", to: "black", deg: 30 },
            sx: { fontFamily: "Greycliff CF, sans-serif" },
            ta: "center",
            size: "xl",
            fw: 700,
            children: "2write"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Group,
        {
          sx: { height: "100%" },
          spacing: 0,
          className: classes.hiddenMobile,
          children: /* @__PURE__ */ jsx(
            HoverCard,
            {
              width: 600,
              position: "bottom",
              radius: "md",
              shadow: "md",
              withinPortal: true
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(Group, { className: classes.hiddenMobile, children: /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/auth"), children: "Sign up" }) }),
      /* @__PURE__ */ jsx(
        Burger,
        {
          opened: drawerOpened,
          onClick: toggleDrawer,
          className: classes.hiddenDesktop
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        opened: drawerOpened,
        onClose: closeDrawer,
        size: "100%",
        padding: "md",
        className: classes.hiddenDesktop,
        zIndex: 1e6,
        children: /* @__PURE__ */ jsx(ScrollArea, { sx: { height: "calc(100vh - 60px)" }, mx: "-md", children: /* @__PURE__ */ jsx(Group, { position: "center", grow: true, pb: "xl", px: "md", children: /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/auth"), children: "Sign up" }) }) })
      }
    )
  ] });
}
function AuthPage() {
  const { user, googleSignIn, twitterSignIn, githubSignIn, logOut } = UserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      setIsLoading(false);
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignIn = async (signInCallback) => {
    try {
      setIsLoading(true);
      await signInCallback();
    } catch (error) {
      setIsLoading(false);
      window.location.reload();
      console.error(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);
  return /* @__PURE__ */ jsx(
    AppShell,
    {
      header: /* @__PURE__ */ jsx(Header, { height: 60, p: "sm", children: /* @__PURE__ */ jsx(HeaderMegaMenu, {}) }),
      children: isLoading && user == null ? /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsxs(Container, { size: 420, style: { transform: "translateY(40%)" }, children: [
        /* @__PURE__ */ jsx(
          Title,
          {
            align: "center",
            sx: (theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900
            }),
            children: "Log in"
          }
        ),
        /* @__PURE__ */ jsx(Text, { color: "dimmed", size: "lg", align: "center", mt: 5, children: "to enjoy all of our cool features ✌️" }),
        /* @__PURE__ */ jsx(Paper, { withBorder: true, shadow: "md", p: 30, mt: 20, radius: "lg", children: /* @__PURE__ */ jsxs(Stack, { children: [
          /* @__PURE__ */ jsxs(Stack, { children: [
            /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: async () => handleSignIn(googleSignIn),
                variant: "filled",
                leftIcon: /* @__PURE__ */ jsx(IconBrandGoogle, {}),
                w: "80%",
                radius: "md",
                color: "ocean-blue",
                children: "Sign in with Google"
              }
            ) }),
            /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: async () => handleSignIn(twitterSignIn),
                variant: "filled",
                leftIcon: /* @__PURE__ */ jsx(IconBrandTwitter, {}),
                w: "80%",
                radius: "md",
                color: "blue",
                children: "Sign in with Twitter"
              }
            ) }),
            /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: async () => handleSignIn(githubSignIn),
                variant: "filled",
                leftIcon: /* @__PURE__ */ jsx(IconBrandGithub, {}),
                w: "80%",
                radius: "md",
                color: "gray",
                children: "Sign in with GitHub"
              }
            ) })
          ] }),
          user && /* @__PURE__ */ jsx(Button, { color: "red", onClick: handleSignOut, children: "Log Out" })
        ] }) })
      ] })
    }
  );
}
const AutocompleteSnippets = Extension.create({
  addKeyboardShortcuts() {
    return {
      "Tab": () => {
        event.preventDefault();
        let snippet2;
        if (document.getElementById("autocomplete-snippet")) {
          snippet2 = document.getElementById("autocomplete-snippet").innerText;
        }
        document.getElementById("autocomplete-snippet").innerHTML = "";
        this.editor.commands.insertContent(snippet2);
        this.editor.commands.focus();
      }
    };
  },
  addProseMirrorPlugins() {
    function lastSentenceLong(str) {
      let paragraph = str;
      if (paragraph.slice(-1) == ".") {
        paragraph += " ";
      }
      const sentences = paragraph.split(". ");
      const lastSentence = sentences[sentences.length - 1];
      const words = lastSentence.split(" ");
      return words.length > 6;
    }
    let debounceTimeout;
    return [
      new Plugin({
        props: {
          decorations: (editor) => {
            var _a;
            const decorations = [];
            const doc2 = editor.doc;
            const selection = editor.selection;
            const tr = editor.tr;
            doc2.nodeAt(selection.$from.pos !== 1 ? selection.$from.pos - 1 : 1);
            const end = selection.$from.pos;
            const replace = tr.insertText("hello world", end, end);
            editor.applyTransaction(replace);
            const textContentOfCurrentParagraph = (_a = doc2.nodeAt(selection.$from.pos == 1 ? selection.$from.pos : selection.$from.pos - 1)) == null ? void 0 : _a.textContent;
            let textCount = 0;
            let nodeArray = [];
            doc2.nodesBetween(0, selection.$from.pos, (node, pos) => {
              if (nodeArray.length !== 0 && node.textContent !== nodeArray.at(-1).content) {
                textCount += node.nodeSize;
                console.log(textCount, node.textContent);
                const paraNode = {
                  content: node.textContent,
                  endCount: textCount
                };
                nodeArray.push(paraNode);
              } else if (nodeArray.length === 0) {
                textCount += node.nodeSize;
                console.log(textCount, node.textContent);
                const paraNode = {
                  content: node.textContent,
                  endCount: textCount
                };
                nodeArray.push(paraNode);
              }
            });
            const convertedSelection = selection.$to.pos + 1;
            if (convertedSelection == nodeArray.at(-1).endCount && selection.$from.pos !== 1 && lastSentenceLong(textContentOfCurrentParagraph) && textContentOfCurrentParagraph.slice(-1) == " ") {
              const decoration = Decoration.widget(selection.$from.pos, () => {
                console.log("DEBOUNCING");
                const placeholder = document.createElement("span");
                placeholder.id = "autocomplete-snippet";
                function debounce(_editorText) {
                  clearTimeout(debounceTimeout);
                  debounceTimeout = setTimeout(() => {
                    console.log("AUTOCOMPLETE");
                    let autocomplete = "";
                    fetch("/api/autocomplete", {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ "prompt": textContentOfCurrentParagraph })
                    }).then((res) => res.json()).then((data) => {
                      autocomplete = data.answer;
                      if (autocomplete[0] === " ") {
                        autocomplete = autocomplete.substring(1);
                      }
                    }).catch((err) => {
                      console.log(err);
                    }).finally(
                      () => {
                        placeholder.innerText = autocomplete;
                      }
                    );
                  }, 500);
                }
                debounce(doc2.textContent);
                placeholder.style.color = "gray";
                return placeholder;
              });
              decorations.push(decoration);
            }
            return DecorationSet.create(doc2, decorations);
          }
        }
      })
    ];
  }
});
const LoginContext = createContext({});
getStorage();
const saveEssay = async (docContent, userID, essayID) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  try {
    await updateDoc(essayRef, {
      lastEdit: serverTimestamp(),
      content: docContent
    });
  } catch (error) {
    console.log(error);
  }
};
const saveTitle = async (userID, essayID, title) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  try {
    await updateDoc(essayRef, {
      title
    });
  } catch (error) {
    console.log(error);
  }
};
const saveEssayPrompt = async (userID, essayID, essayPrompt) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  try {
    await updateDoc(essayRef, {
      essayPrompt
    });
  } catch (error) {
    console.log(error);
  }
};
const loadEssay = async (userID, essayID) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  const essaySnap = await getDoc(essayRef);
  if (essaySnap.exists()) {
    return essaySnap.data();
  } else {
    console.log("Essay does not exist");
  }
};
const loadEssayList = async (userID) => {
  const essayListRef = collection(db, "users", userID, "essays");
  const essayListSnap = await getDocs(essayListRef);
  const essayIds = essayListSnap.docs.map((doc2) => doc2.id);
  const essayList = essayListSnap.docs.map((doc2) => doc2.data());
  essayList.forEach((essay, index) => {
    essay["essayId"] = essayIds[index];
  });
  return essayList;
};
const createEssay = async (userID, essayID, essayPrompt) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  try {
    await setDoc(essayRef, {
      timestamp: serverTimestamp(),
      lastEdit: serverTimestamp(),
      content: "",
      essayPrompt
    });
  } catch (error) {
    console.log(error);
  }
};
const saveNotepad = async (userID, essayID, notepadContent) => {
  const essayRef = doc(db, "users", userID, "essays", essayID);
  try {
    await updateDoc(essayRef, {
      notepad: notepadContent
    });
  } catch (error) {
    console.log(error);
  }
};
function CustomDrawer({ children, opened, setOpened }) {
  const theme = useMantineTheme();
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      size: "lg",
      opened,
      onClose: () => setOpened("null"),
      overlayColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
      overlayOpacity: 0.55,
      overlayBlur: 3,
      children
    }
  );
}
const SettingsDrawer = ({ setOpened, opened }) => {
  return /* @__PURE__ */ jsx(CustomDrawer, { setOpened, opened: opened == "settings", children: /* @__PURE__ */ jsx(Button, { children: "Turn on vim" }) });
};
const AnalyticsDrawer = ({ setOpened, opened, editor }) => {
  function removeCapitalizedParentheses(str) {
    let result = "";
    let inParentheses = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        if (str[i + 1] === str[i + 1].toUpperCase()) {
          inParentheses = true;
        } else {
          result += str[i];
        }
      } else if (str[i] === ")") {
        if (inParentheses) {
          inParentheses = false;
        } else {
          result += str[i];
        }
      } else if (!inParentheses) {
        result += str[i];
      }
    }
    return result;
  }
  const [wordCount, setWordCount] = useState("");
  const [charCount, setCharCount] = useState("");
  const [citationWordCount, setCitationWordCount] = useState(0);
  useEffect(() => {
    if (opened === "analytics") {
      const textContent = editor.editor.view.state.doc.textContent;
      setWordCount(textContent.split(" ").length);
      setCharCount(textContent.length);
      setCitationWordCount(removeCapitalizedParentheses(textContent).split(" ").length);
    }
  }, [opened]);
  return /* @__PURE__ */ jsx(CustomDrawer, { setOpened, opened: opened == "analytics", children: /* @__PURE__ */ jsxs(Stack, { mx: 30, children: [
    /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Title, { children: "Analytics" }) }),
    /* @__PURE__ */ jsx(Divider, { size: "md", label: "Word Count", labelPosition: "center", styles: { label: { fontSize: "15px" } } }),
    /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Text, { children: wordCount }) }),
    /* @__PURE__ */ jsx(Space, { h: "sm" }),
    /* @__PURE__ */ jsx(Divider, { size: "md", label: "Character Count", labelPosition: "center", styles: { label: { fontSize: "15px" } } }),
    /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Text, { children: charCount }) }),
    /* @__PURE__ */ jsx(Space, { h: "sm" }),
    /* @__PURE__ */ jsx(Divider, { size: "md", label: "Word Count w/o Citation", labelPosition: "center", styles: { label: { fontSize: "15px" } } }),
    /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Text, { children: citationWordCount }) })
  ] }) });
};
const TodoDrawer = ({ setOpened, opened }) => {
  return /* @__PURE__ */ jsx(CustomDrawer, { setOpened, opened: opened == "todos", children: /* @__PURE__ */ jsx(Text, { children: "Hello Todo Drawer" }) });
};
const EssayDataDrawer = ({ setOpened, opened }) => {
  const { localDocData, setLocalDocData } = useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = UserAuth();
  const [essayPrompt, setEssayPrompt] = useState("");
  useEffect(() => {
    setEssayPrompt(localDocData.essayPrompt);
  }, [opened]);
  return /* @__PURE__ */ jsx(CustomDrawer, { setOpened, opened: opened == "data", children: /* @__PURE__ */ jsxs(Stack, { mx: 30, children: [
    /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Title, { children: "Essay Data" }) }),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        value: essayPrompt,
        placeholder: "What is the best way to cook pasta?",
        autosize: true,
        label: "Essay Prompt",
        onChange: (event2) => {
          saveEssayPrompt(user.uid, searchParams.get("essayId"), event2.currentTarget.value);
          setEssayPrompt(event2.currentTarget.value);
        }
      }
    )
  ] }) });
};
const useStyles$9 = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
    }
  },
  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color
    }
  }
}));
function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles$9();
  return /* @__PURE__ */ jsx(Tooltip, { label, position: "right", transitionDuration: 0, children: /* @__PURE__ */ jsx(
    UnstyledButton,
    {
      onClick,
      className: cx(classes.link, { [classes.active]: active }),
      children: /* @__PURE__ */ jsx(Icon, { stroke: 1.5 })
    }
  ) });
}
const iconsData = [
  { icon: IconChartDonut, label: "Essay Prompt", name: "data" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics", name: "analytics" },
  { icon: IconListCheck, label: "To-Dos", name: "todos" },
  { icon: IconSettings, label: "Settings", name: "settings" }
];
function NavbarMini(editor) {
  const [active, setActive] = useState(0);
  const [openDrawer, setOpenDrawer] = useState("null");
  const links = iconsData.map((link, index) => /* @__PURE__ */ createElement(
    NavbarLink,
    {
      onClick: () => {
        setActive(index);
        setOpenDrawer(link.name);
      },
      ...link,
      key: link.label,
      active: index === active
    }
  ));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SettingsDrawer, { opened: openDrawer, setOpened: setOpenDrawer }),
    /* @__PURE__ */ jsx(AnalyticsDrawer, { opened: openDrawer, setOpened: setOpenDrawer, editor }),
    /* @__PURE__ */ jsx(TodoDrawer, { opened: openDrawer, setOpened: setOpenDrawer }),
    /* @__PURE__ */ jsx(EssayDataDrawer, { opened: openDrawer, setOpened: setOpenDrawer }),
    /* @__PURE__ */ jsxs(Navbar, { height: "100vh", width: { base: 80 }, p: "md", children: [
      /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Image, { src: logo, width: 35, height: 35 }) }),
      /* @__PURE__ */ jsx(Navbar.Section, { grow: true, mt: 50, children: /* @__PURE__ */ jsx(Stack, { justify: "center", spacing: 0, children: links }) })
    ] })
  ] });
}
function CustomRTE({ localDocData, setLocalDocData, editor }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initalContent, setInitialContent] = useState("");
  const [isRewriteLoading, setIsRewriteLoading] = useState(false);
  const { user } = UserAuth();
  const getWordCountFromString = (str) => {
    console.log(str);
    return str.split(" ").length;
  };
  const [debouncedEditor] = useDebounce(editor == null ? void 0 : editor.state.doc.content, 2500);
  useEffect(() => {
    if (debouncedEditor) {
      if ((editor == null ? void 0 : editor.getHTML()) !== initalContent) {
        if ((editor == null ? void 0 : editor.getText()) !== "") {
          console.log("SAVING DOC");
          saveEssay(editor == null ? void 0 : editor.getHTML(), user.uid, searchParams.get("essayId"));
        }
      }
    }
  }, [debouncedEditor]);
  const toolbar = /* @__PURE__ */ jsxs(RichTextEditor.Toolbar, { sticky: true, stickyOffset: 60, children: [
    /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
      /* @__PURE__ */ jsx(RichTextEditor.Bold, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Italic, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Underline, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Strikethrough, {}),
      /* @__PURE__ */ jsx(RichTextEditor.ClearFormatting, {})
    ] }),
    /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
      /* @__PURE__ */ jsx(RichTextEditor.H1, {}),
      /* @__PURE__ */ jsx(RichTextEditor.H2, {}),
      /* @__PURE__ */ jsx(RichTextEditor.H3, {}),
      /* @__PURE__ */ jsx(RichTextEditor.H4, {})
    ] }),
    /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
      /* @__PURE__ */ jsx(RichTextEditor.Blockquote, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Hr, {}),
      /* @__PURE__ */ jsx(RichTextEditor.BulletList, {}),
      /* @__PURE__ */ jsx(RichTextEditor.OrderedList, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Subscript, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Superscript, {})
    ] }),
    /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
      /* @__PURE__ */ jsx(RichTextEditor.Link, {}),
      /* @__PURE__ */ jsx(RichTextEditor.Unlink, {})
    ] }),
    /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
      /* @__PURE__ */ jsx(RichTextEditor.AlignLeft, {}),
      /* @__PURE__ */ jsx(RichTextEditor.AlignCenter, {}),
      /* @__PURE__ */ jsx(RichTextEditor.AlignJustify, {}),
      /* @__PURE__ */ jsx(RichTextEditor.AlignRight, {})
    ] }),
    /* @__PURE__ */ jsx(RichTextEditor.ControlsGroup, {})
  ] });
  return /* @__PURE__ */ jsxs(
    RichTextEditor,
    {
      styles: {
        root: {
          minHeight: "100%",
          backgroundColor: "#fff"
        },
        content: {
          minHeight: "100%",
          height: "100%"
        }
      },
      editor,
      children: [
        toolbar,
        editor && /* @__PURE__ */ jsx(BubbleMenu, { editor, children: /* @__PURE__ */ jsx(RichTextEditor.ControlsGroup, { children: /* @__PURE__ */ jsxs(Stack, { spacing: 0, children: [
          /* @__PURE__ */ jsx(RichTextEditor.Control, { children: /* @__PURE__ */ jsxs(Text, { m: 3, fz: "md", weight: 600, children: [
            getWordCountFromString(
              editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                " "
              )
            ) + " ",
            "words"
          ] }) }),
          /* @__PURE__ */ jsx(RichTextEditor.Control, { children: isRewriteLoading ? /* @__PURE__ */ jsx(Loader, { h: 20, w: 20 }) : /* @__PURE__ */ jsx(
            Text,
            {
              variant: "gradient",
              gradient: { from: "indigo", to: "cyan", deg: 45 },
              weight: "semibold",
              sx: { fontFamily: "Greycliff CF, sans-serif" },
              p: 5,
              m: 5,
              onClick: async () => {
                setIsRewriteLoading(true);
                try {
                  const res = await fetch("/api/rewrite", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      prompt: editor.state.doc.textBetween(
                        editor.state.selection.from,
                        editor.state.selection.to,
                        " "
                      )
                    })
                  });
                  const data = await res.json();
                  setIsRewriteLoading(false);
                  editor == null ? void 0 : editor.commands.insertContent(data.answer);
                } catch (e) {
                  setIsRewriteLoading(false);
                  console.error(e);
                }
              },
              "aria-label": "Rewrite with AI",
              title: "Rewrite with AI",
              children: "Rewrite with AI"
            }
          ) })
        ] }) }) }),
        /* @__PURE__ */ jsx(RichTextEditor.Content, { spellCheck: true })
      ]
    }
  );
}
function DocumentHeader({ localDocData }) {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const { user } = UserAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleFocus, setTitleFocus] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    loadEssay(user.uid, searchParams.get("essayId")).then((doc2) => {
      setDocumentTitle(doc2.title ?? "Untitled Document");
    });
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%"
      },
      children: /* @__PURE__ */ jsxs(Group, { position: "apart", style: { width: "100vw" }, children: [
        /* @__PURE__ */ jsxs(Group, { children: [
          /* @__PURE__ */ jsx(ActionIcon, { onClick: navigateToHome, variant: "light", size: "lg", children: /* @__PURE__ */ jsx(IconChevronLeft, { size: 22 }) }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              value: documentTitle,
              onChange: (event2) => {
                setDocumentTitle(event2.currentTarget.value);
                saveTitle(user.uid, searchParams.get("essayId"), event2.currentTarget.value);
              },
              placeholder: "Essay Title",
              pl: titleFocus ? 0 : 11,
              variant: titleFocus ? "default" : "unstyled",
              onFocus: () => {
                setTitleFocus(true);
              },
              onBlur: () => {
                setTitleFocus(false);
              },
              styles: { root: { width: "700px" }, label: { width: "500px" } }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ActionIcon, { variant: "light", radius: "xl", size: "xl", color: "blue", children: /* @__PURE__ */ jsx(IconUser, {}) })
      ] })
    }
  );
}
function convertStringIntoHTML(str) {
  const indexOf = str.indexOf("\n");
  const cleanedStr = str.slice(indexOf + 2).replace(new RegExp("\r?\n", "g"), "<br />");
  return cleanedStr;
}
const NotepadEditor = "";
function Notepad() {
  const theme = useMantineTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const content = searchParams.get("isNewDoc") == "true" ? `
    <h3 style="text-align: center">Welcome to the AI Notepad ✨</h3>
    <p style="text-align: center">Brainstorm essay outlines with the integrated <strong>Create Outline</strong> button or jot down any notes here!</p>
    <ul><li><p>Paste links here to populate your essay works cited page ✅</p></li><li><p>Include references and images for later ✅</p></li><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, underline, <s>strike-through</s> ✅</p><p>Ordered and bullet lists ✅</p></li></ul></li></ul>` : "";
  const [editorValue, setEditorValue] = useState(content);
  const [debouncedEditor] = useDebounce(editorValue, 5e3);
  const { localDocData, setLocalDocData } = useContext(LoginContext);
  const { user } = UserAuth();
  useEffect(() => {
    if (editorValue !== "") {
      console.log(editorValue);
      console.log("saving notepad");
      saveNotepad(user.uid, searchParams.get("essayId"), editorValue);
    }
  }, [debouncedEditor]);
  useEffect(() => {
    setEditorValue(localDocData.notepad);
    console.log(localDocData.notepad);
  }, [localDocData]);
  const handleCreateOutline = () => {
    if (localDocData.hasOwnProperty("essayPrompt")) {
      const prompt = localDocData.essayPrompt;
      setIsLoading(true);
      fetch("/api/outline", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "prompt": prompt })
      }).then((res) => res.json()).then((returnedData) => {
        const cleanedHTML = convertStringIntoHTML(returnedData.answer);
        const notepadContent = `<h3>AI Outline</h3> <p>${cleanedHTML}</p>`;
        saveNotepad(user.uid, searchParams.get("essayId"), notepadContent);
        setEditorValue(notepadContent);
        let newState = localDocData;
        newState.notepad = notepadContent;
        setLocalDocData(newState);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setModalIsOpen(true);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Modal,
      {
        opened: modalIsOpen,
        centered: true,
        onClose: () => setModalIsOpen(false),
        withCloseButton: false,
        overlayColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        children: /* @__PURE__ */ jsx(CreateOutlineModalContent, { setIsActive: setModalIsOpen })
      }
    ),
    /* @__PURE__ */ jsxs(Group, { children: [
      /* @__PURE__ */ jsxs(Group, { position: "apart", style: { width: "100%" }, children: [
        /* @__PURE__ */ jsx(Title, { order: 2, children: "Notepad" }),
        /* @__PURE__ */ jsx(Button, { loading: isLoading, onClick: handleCreateOutline, radius: "md", size: "sm", children: "Create Outline" })
      ] }),
      /* @__PURE__ */ jsx(RichTextEditor$1, { styles: { root: { width: "100%" } }, value: editorValue, onChange: setEditorValue, controls: [
        ["bold", "italic", "underline", "link", "image"]
      ], id: "rte" })
    ] })
  ] });
}
const useStyles$8 = createStyles((theme) => ({
  root: {
    position: "relative"
  },
  input: {
    height: "auto",
    paddingTop: 18
  },
  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1
  }
}));
function CreateOutlineModalContent({ setIsActive }) {
  return /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Title, { size: "lg", order: 4, children: "Oops, you forgot to include your essay prompt!" }),
    /* @__PURE__ */ jsx(ContainedInputs, {}),
    /* @__PURE__ */ jsx(Button, { onClick: () => {
      setIsActive(false);
    }, children: "Generate ✨" })
  ] }) });
}
function ContainedInputs() {
  const { classes } = useStyles$8();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TextInput, { label: "Enter the prompt for your essay", placeholder: "Why is 2Write the best app?", classNames: classes }),
    /* @__PURE__ */ jsx(
      Select,
      {
        style: { marginTop: 20, zIndex: 2 },
        data: ["Research Essay", "Historical Essay", "Argumentative Essay", "Reflection Essay", "Other"],
        placeholder: "Argumentative Essay",
        label: "Pick which category your essay best fits under",
        classNames: classes
      }
    )
  ] });
}
function ComposeContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initalContent, setInitialContent] = useState("");
  const { user } = UserAuth();
  const theme = useMantineTheme();
  useState(false);
  const [localDocData, setLocalDocData] = useState(
    {
      content: "",
      timestamp: { seconds: 0, nanoseconds: 0 }
    }
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      AutocompleteSnippets,
      Superscript,
      SubScript,
      CharacterCount,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] })
    ],
    onCreate: ({ editor: editor2 }) => {
      loadEssay(user.uid, searchParams.get("essayId")).then((doc2) => {
        setInitialContent(doc2.content);
        console.log({ ...doc2 });
        setLocalDocData({ ...doc2 });
        editor2.commands.setContent(doc2.content == "" ? "    " : doc2.content);
      });
    }
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(LoginContext.Provider, { value: { localDocData, setLocalDocData }, children: /* @__PURE__ */ jsx(
    AppShell,
    {
      styles: {
        main: {
          background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      },
      navbarOffsetBreakpoint: "sm",
      asideOffsetBreakpoint: "sm",
      navbar: /* @__PURE__ */ jsx(NavbarMini, { editor }),
      aside: /* @__PURE__ */ jsx(MediaQuery, { smallerThan: "sm", styles: { display: "none" }, children: /* @__PURE__ */ jsx(Aside, { p: "md", hiddenBreakpoint: "sm", width: { sm: 300, md: 350, lg: 400 }, children: /* @__PURE__ */ jsx(Notepad, {}) }) }),
      header: /* @__PURE__ */ jsx(Header, { height: { base: 60, md: 70 }, p: "md", style: { position: "fixed", top: 0 }, children: /* @__PURE__ */ jsx(DocumentHeader, { localDocData }) }),
      children: /* @__PURE__ */ jsx(CustomRTE, { localDocData, setLocalDocData, editor })
    }
  ) }) });
}
function ComposePage() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ComposeContainer, {}) });
}
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString("en-US", { month: "long" });
}
function convertFirebaseTimestampToDate(timestamp) {
  return new Date(timestamp.seconds * 1e3);
}
function searchDocumentList(documentList, searchString) {
  const searchResults = documentList.map((document2) => {
    const titleScore = (document2.title ?? "Untitled Document").toLowerCase().includes(searchString.toLowerCase()) ? 1 : 0;
    const contentScore = document2.content.toLowerCase().includes(searchString.toLowerCase()) ? 0.5 : 0;
    const score = titleScore + contentScore;
    if (score === 0) {
      return null;
    }
    return { ...document2, score };
  });
  const filteredResults = searchResults.filter((result) => result !== null);
  return filteredResults.sort((a, b) => b.score - a.score);
}
const useStyles$7 = createStyles((theme) => ({
  documentCard: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md
    },
    display: "flex",
    alignItems: "flex-end"
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    width: "79%"
  }
}));
function EssayCard(props) {
  const [imgSrc, setImgSrc] = useState("");
  const navigate = useNavigate();
  const { classes } = useStyles$7();
  useEffect(() => {
    let html = props.imgHtmlString === "" ? "<p></p>" : props.imgHtmlString;
    let previewHtml = getPreview(html);
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.top = "-9999px";
    iframe.height = "200";
    iframe.width = "620";
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(previewHtml);
    iframe.contentWindow.document.close();
    html2canvas(iframe.contentWindow.document.body).then(function(canvas) {
      iframe.style.display = "none";
      let image = canvas.toDataURL("image/jpeg");
      setImgSrc(image);
    });
  }, [props.ageFilter, props.ownerFilter, props.searchParams]);
  const getPreview = (html) => {
    const preview = html.split(" ").slice(0, 120).join(" ");
    if (preview === "") {
      return "<p></p>";
    }
    return preview;
  };
  return /* @__PURE__ */ jsx(
    Card,
    {
      p: "lg",
      radius: "lg",
      component: "a",
      href: "#",
      withBorder: true,
      shadow: "sm",
      className: classes.documentCard,
      onClick: () => {
        navigate({
          pathname: "/compose",
          search: `?${createSearchParams({ essayId: props.essayId })}`
        });
      },
      children: /* @__PURE__ */ jsxs(Stack, { spacing: 0, children: [
        /* @__PURE__ */ jsx(Image, { src: imgSrc }),
        /* @__PURE__ */ jsxs(Stack, { children: [
          /* @__PURE__ */ jsxs(Group, { mt: "md", position: "apart", children: [
            /* @__PURE__ */ jsx(Text, { className: classes.title, mt: 5, lineClamp: 1, children: props.essayTitle ?? "Untitled Document" }),
            /* @__PURE__ */ jsx(ActionIcon, { children: /* @__PURE__ */ jsx(IconDots, {}) })
          ] }),
          /* @__PURE__ */ jsxs(Group, { children: [
            /* @__PURE__ */ jsx(IconUsers, { stroke: "1.75" }),
            /* @__PURE__ */ jsx(Text, { color: "dimmed", size: "xs", transform: "uppercase", weight: 700, children: "Shared with 2 groups" })
          ] })
        ] })
      ] })
    },
    props.essayId
  );
}
const useStyles$6 = createStyles((theme) => ({
  addNewCard: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: theme.shadows.md
    }
  },
  templateCard: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: theme.shadows.md
    },
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    width: "79%"
  },
  templateTitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600
  },
  cardContainer: {
    minHeight: "100%",
    backgroundColor: `${theme.colors.gray[0]}`
  }
}));
function HomePageCards(props) {
  const [cards, setCards] = useState([]);
  useNavigate();
  const { classes } = useStyles$6();
  const [ownerFilter, setOwnerFilter] = useState("Owned by anyone");
  const [ageFilter, setAgeFilter] = useState("Newest");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOnRenderLoadingComplete, setIsOnRenderLoadingComplete] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState(
    "sorry, we ran into an error retrieving your documents"
  );
  const { user } = UserAuth();
  const setEssayCards = (essayList) => {
    setCards(
      React.Children.toArray(
        essayList.map((essay) => /* @__PURE__ */ jsx(
          EssayCard,
          {
            essayId: essay.essayId,
            essayTitle: essay.title,
            imgHtmlString: essay.content,
            ageFilter,
            ownerFilter,
            searchParams
          }
        ))
      )
    );
  };
  useEffect(() => {
    loadEssayList(user.uid).then((essayList) => {
      let sortedEssayList = ageFilter === "Newest" ? essayList.sort(
        (a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
      ) : essayList.sort(
        (a, b) => a.lastEdit.toMillis() - b.lastEdit.toMillis()
      );
      if (searchParams.has("search")) {
        let searchResults = searchDocumentList(
          sortedEssayList,
          searchParams.get("search")
        );
        setNoResultsMessage("no results match your query :(");
        setEssayCards(searchResults);
        setIsOnRenderLoadingComplete(true);
      } else {
        setNoResultsMessage(
          "no documents found, create a new one using the buttons above"
        );
        setEssayCards(sortedEssayList);
        setIsOnRenderLoadingComplete(true);
      }
    });
  }, [ageFilter, ownerFilter, searchParams]);
  const templateArray = [
    {
      title: "Add document",
      template: false,
      onClick: "create",
      icon: /* @__PURE__ */ jsx(IconPlus, {}, 0)
    },
    {
      title: "Upload document",
      template: false,
      onClick: "dropzone",
      icon: /* @__PURE__ */ jsx(IconUpload, {}, 1)
    },
    {
      title: "Research Essay",
      template: true,
      onClick: "prompt",
      icon: /* @__PURE__ */ jsx(IconNews, {}, 2)
    },
    {
      title: "Historical Essay",
      template: true,
      onClick: "prompt",
      icon: /* @__PURE__ */ jsx(IconBuildingArch, {}, 3)
    },
    {
      title: "Argumentative Essay",
      template: true,
      onClick: "prompt",
      icon: /* @__PURE__ */ jsx(IconExclamationMark, {}, 4)
    }
  ];
  const templateCards = React.Children.toArray(
    templateArray.map((templateItem) => /* @__PURE__ */ jsx(
      Card,
      {
        p: "lg",
        radius: "lg",
        component: "a",
        href: "#",
        withBorder: true,
        shadow: "sm",
        className: templateItem.template ? classes.templateCard : classes.addNewCard,
        onClick: () => {
          if (templateItem.onClick) {
            if (templateItem.onClick === "dropzone") {
              props.dropzoneModalOnClick(true);
            } else if (templateItem.onClick === "create") {
              props.createModalOnClick(true);
            } else {
              props.promptModalOnClick(true);
            }
          }
        },
        children: /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsxs(Stack, { children: [
          /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(
            ActionIcon,
            {
              radius: "xl",
              size: "xl",
              gradient: { from: "indigo", to: "cyan", deg: 45 },
              variant: "gradient",
              p: 10,
              children: templateItem.icon
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { className: classes.templateTitle, mt: 5, align: "center", children: templateItem.title })
        ] }) })
      }
    ))
  );
  return /* @__PURE__ */ jsx(
    Container,
    {
      fluid: true,
      className: classes.cardContainer,
      pb: 24,
      px: "5%",
      pt: { base: 84, md: 94 },
      children: /* @__PURE__ */ jsxs(Stack, { spacing: 0, children: [
        !searchParams.has("search") && /* @__PURE__ */ jsx(
          SimpleGrid,
          {
            cols: 5,
            breakpoints: [{ maxWidth: "sm", cols: 1 }],
            mb: "xl",
            children: templateCards
          }
        ),
        /* @__PURE__ */ jsxs(Group, { mb: "xl", position: "apart", children: [
          searchParams.has("search") && /* @__PURE__ */ jsxs(Title, { className: classes.title, children: [
            " ",
            "Search Results",
            " "
          ] }),
          /* @__PURE__ */ jsxs(Group, { position: "apart", children: [
            /* @__PURE__ */ jsxs(Menu, { transitionDuration: 150, transition: "scale-y", children: [
              /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { variant: "default", radius: "md", children: /* @__PURE__ */ jsxs(Group, { position: "apart", children: [
                ownerFilter,
                " ",
                /* @__PURE__ */ jsx(IconChevronDown, {})
              ] }) }) }),
              /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setOwnerFilter("Owned by anyone"), children: "Owned by anyone" }),
                /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setOwnerFilter("Owned by me"), children: "Owned by me" }),
                /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setOwnerFilter("Not owned by me"), children: "Not owned by me" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Menu, { transitionDuration: 150, transition: "scale-y", children: [
              /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { variant: "default", radius: "md", children: /* @__PURE__ */ jsxs(Group, { position: "apart", children: [
                ageFilter,
                " ",
                /* @__PURE__ */ jsx(IconChevronDown, {})
              ] }) }) }),
              /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setAgeFilter("Newest"), children: "Newest" }),
                /* @__PURE__ */ jsx(Menu.Item, { onClick: () => setAgeFilter("Oldest"), children: "Oldest" })
              ] })
            ] })
          ] })
        ] }),
        cards.length === 0 ? isOnRenderLoadingComplete ? /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(
          Text,
          {
            color: "dimmed",
            transform: "uppercase",
            weight: 700,
            align: "center",
            children: noResultsMessage
          }
        ) }) : /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsx(
          SimpleGrid,
          {
            cols: 3,
            breakpoints: [{ maxWidth: "sm", cols: 1 }],
            mb: "xl",
            children: cards
          }
        )
      ] })
    }
  );
}
const useStyles$5 = createStyles((theme) => ({
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    cursor: "pointer"
  },
  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",
    [theme.fn.smallerThan("xs")]: {
      display: "none"
    }
  },
  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none"
    }
  },
  userActive: {},
  search: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    },
    width: "60%"
  }
}));
function HomeHeader() {
  const { user, logOut } = UserAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles$5();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [essayTitleArray, setEssayTitleArray] = useState([]);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadEssayList(user.uid).then((essayList) => {
      let essaySearch = [];
      let sortedEssayList = essayList.sort(
        (a, b) => b.lastEdit.toMillis() - a.lastEdit.toMillis()
      );
      sortedEssayList.map((essay) => {
        const essayObject = {};
        essayObject["value"] = essay.title ?? "Untitled Document";
        essayObject["key"] = essay.essayId;
        let essayDate = convertFirebaseTimestampToDate(essay.lastEdit);
        essayObject["group"] = getMonthName(essayDate.getMonth()) + " " + essayDate.getDate() + (new Date().getFullYear() !== essayDate.getFullYear() ? ", " + essayDate.getFullYear() : "");
        essaySearch.push(essayObject);
      });
      setEssayTitleArray(essaySearch);
    });
  }, []);
  return /* @__PURE__ */ jsx(
    Header,
    {
      height: { base: 60, md: 70 },
      p: "md",
      style: { position: "fixed", top: 0, zIndex: 1 },
      children: /* @__PURE__ */ jsxs("div", { className: classes.inner, children: [
        /* @__PURE__ */ jsxs(Group, { align: "center", onClick: () => window.location.reload(), children: [
          /* @__PURE__ */ jsx(Burger, { opened, onClick: toggle, size: "sm" }),
          /* @__PURE__ */ jsx(Image, { src: logo, width: 35, height: 35, mb: 4, mr: -10 }),
          /* @__PURE__ */ jsx(
            Text,
            {
              variant: "gradient",
              gradient: { from: "indigo", to: "black", deg: 30 },
              sx: { fontFamily: "Greycliff CF, sans-serif" },
              ta: "center",
              size: "xl",
              fw: 700,
              children: "2write"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Autocomplete,
          {
            ref: searchInput,
            variant: "default",
            value: searchQuery,
            radius: "md",
            onChange: (event2) => {
              setSearchQuery(event2);
            },
            className: classes.search,
            placeholder: "Search",
            icon: /* @__PURE__ */ jsx(IconSearch, { size: 16, stroke: 1.5 }),
            data: essayTitleArray,
            limit: 4,
            onSearchQuery: () => {
              if (searchQuery !== "") {
                navigate({
                  pathname: "/",
                  search: `?${createSearchParams({ search: searchQuery })}`
                });
              } else {
                searchInput.current.blur();
                navigate("/");
              }
            },
            onItemSubmit: (item) => {
              navigate({
                pathname: "/compose",
                search: `?${createSearchParams({ essayId: item.key })}`
              });
            }
          }
        ),
        /* @__PURE__ */ jsx(Group, { children: /* @__PURE__ */ jsxs(
          Menu,
          {
            width: 260,
            position: "bottom-end",
            transition: "pop-top-right",
            onClose: () => setUserMenuOpened(false),
            onOpen: () => setUserMenuOpened(true),
            children: [
              /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(
                UnstyledButton,
                {
                  className: cx(classes.user, { [classes.userActive]: userMenuOpened }),
                  children: /* @__PURE__ */ jsxs(Group, { spacing: 7, children: [
                    /* @__PURE__ */ jsx(Avatar, { src: user.photoURL, alt: user.displayName, radius: "xl", size: 30 }),
                    /* @__PURE__ */ jsx(Text, { weight: 500, size: "sm", sx: { lineHeight: 1, color: theme.black }, mr: 3, children: user.displayName }),
                    /* @__PURE__ */ jsx(IconChevronDown, { size: 12, stroke: 1.5 })
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsx(Menu.Dropdown, { children: /* @__PURE__ */ jsx(Menu.Item, { onClick: logOut, icon: /* @__PURE__ */ jsx(IconLogout, { size: 14, stroke: 1.5 }), children: "Logout" }) })
            ]
          }
        ) })
      ] })
    }
  );
}
const useStyles$4 = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30
  },
  dropzone: {
    borderWidth: 1,
    paddingBottom: 50
  },
  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
  },
  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20
  }
}));
function CreateDropzoneModalContent({ setIsActive }) {
  return /* @__PURE__ */ jsx(DropzoneButton, { onDrop: setIsActive });
}
function DropzoneButton(props) {
  const { classes, theme } = useStyles$4();
  const openRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: classes.wrapper, children: [
    /* @__PURE__ */ jsx(
      Dropzone,
      {
        openRef,
        onDrop: () => {
          props.onDrop(false);
        },
        className: classes.dropzone,
        radius: "lg",
        accept: [MIME_TYPES.doc, MIME_TYPES.docx],
        maxSize: 30 * 1024 ** 2,
        children: /* @__PURE__ */ jsxs("div", { style: { pointerEvents: "none" }, children: [
          /* @__PURE__ */ jsxs(Group, { position: "center", children: [
            /* @__PURE__ */ jsx(Dropzone.Accept, { children: /* @__PURE__ */ jsx(
              IconDownload,
              {
                size: 50,
                color: theme.colors[theme.primaryColor][6],
                stroke: 1.5
              }
            ) }),
            /* @__PURE__ */ jsx(Dropzone.Reject, { children: /* @__PURE__ */ jsx(IconX, { size: 50, color: theme.colors.red[6], stroke: 1.5 }) }),
            /* @__PURE__ */ jsx(Dropzone.Idle, { children: /* @__PURE__ */ jsx(
              IconCloudUpload,
              {
                size: 50,
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
                stroke: 1.5
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(Text, { align: "center", weight: 700, size: "lg", mt: "xl", children: [
            /* @__PURE__ */ jsx(Dropzone.Accept, { children: "Drop files here" }),
            /* @__PURE__ */ jsx(Dropzone.Reject, { children: "Files other than DOC or DOCX" }),
            /* @__PURE__ */ jsx(Dropzone.Idle, { children: "Upload document" })
          ] }),
          /* @__PURE__ */ jsxs(Text, { align: "center", size: "sm", mt: "xs", color: "dimmed", children: [
            "Drag'n'drop files here to upload. We can accept only",
            " ",
            /* @__PURE__ */ jsx("i", { children: ".doc" }),
            " or ",
            /* @__PURE__ */ jsx("i", { children: ".docx" }),
            " files."
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: classes.control,
        size: "md",
        radius: "xl",
        onClick: () => {
          var _a;
          return (_a = openRef.current) == null ? void 0 : _a.call(openRef);
        },
        children: "Select files"
      }
    )
  ] });
}
const useStyles$3 = createStyles((theme) => ({
  root: {
    position: "relative"
  },
  input: {
    height: "auto",
    paddingTop: 18
  },
  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1
  }
}));
function CreatePromptModalContent({ setIsActive }) {
  const [essayPromptValue, setEssayPromptValue] = useState("");
  const navigate = useNavigate();
  const { user } = UserAuth();
  const generateEssay = () => {
    const essayID = v4();
    createEssay(
      user.uid,
      essayID,
      essayPromptValue === "" ? null : essayPromptValue
    ).then(() => {
      navigate({
        pathname: "/compose",
        search: `?${createSearchParams({ essayId: essayID, isNewDoc: "true", placeholder: "1" })}`
      });
    });
  };
  return /* @__PURE__ */ jsxs(Stack, { children: [
    /* @__PURE__ */ jsx(Title, { size: "lg", order: 4, align: "center", children: "Enter your essay prompt below (optional)" }),
    /* @__PURE__ */ jsx(
      PromptContainedInputs,
      {
        setEssayPromptValue,
        essayPromptValue
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => {
          generateEssay();
        },
        children: "Generate ✨"
      }
    )
  ] });
}
function PromptContainedInputs({
  setEssayPromptValue,
  essayPromptValue
}) {
  const { classes } = useStyles$3();
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    TextInput,
    {
      value: essayPromptValue,
      onChange: (event2) => setEssayPromptValue(event2.currentTarget.value),
      label: "Enter the prompt for your essay",
      placeholder: "Why is 2Write the best app?",
      classNames: classes
    }
  ) });
}
function HomePageContainer() {
  const [dropzoneModalIsOpen, setDropzoneModalIsOpen] = useState(false);
  const [promptModalIsOpen, setPromptModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const theme = useMantineTheme();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Modal,
      {
        opened: dropzoneModalIsOpen,
        centered: true,
        onClose: () => setDropzoneModalIsOpen(false),
        withCloseButton: false,
        overlayColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        trapFocus: true,
        children: /* @__PURE__ */ jsx(CreateDropzoneModalContent, { setIsActive: setDropzoneModalIsOpen })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        opened: promptModalIsOpen,
        centered: true,
        onClose: () => setPromptModalIsOpen(false),
        withCloseButton: false,
        overlayColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        children: /* @__PURE__ */ jsx(CreatePromptModalContent, { setIsActive: setPromptModalIsOpen })
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        opened: createModalIsOpen,
        centered: true,
        onClose: () => setCreateModalIsOpen(false),
        withCloseButton: false,
        overlayColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        overlayOpacity: 0.55,
        overlayBlur: 3,
        children: /* @__PURE__ */ jsx(CreatePromptModalContent, { setIsActive: setCreateModalIsOpen })
      }
    ),
    /* @__PURE__ */ jsx(HomeHeader, {}),
    /* @__PURE__ */ jsx(
      HomePageCards,
      {
        createModalOnClick: setCreateModalIsOpen,
        dropzoneModalOnClick: setDropzoneModalIsOpen,
        promptModalOnClick: setPromptModalIsOpen
      }
    )
  ] });
}
function HomePage() {
  return /* @__PURE__ */ jsx(HomePageContainer, {});
}
const stanford = "/assets/stanford-2f0bc00b.png";
const cornell = "/assets/cornell-d5139dc3.png";
const berkeley = "/assets/berkeley-a7b6fdf0.png";
const mit = "/assets/mit-b5e669b3.png";
const harvard = "/assets/harvard-198b0f43.png";
const useStyles$2 = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black
  },
  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1
      }
    }
  },
  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0
  },
  carouselIndicator: {
    width: 4,
    height: 4,
    backgroundColor: "black",
    transition: "width 250ms ease",
    "&[data-active]": {
      width: 16
    }
  }
}));
function CollegeCarousel() {
  useStyles$2();
  const [embla, setEmbla] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!embla)
        return;
      const engine = embla.internalEngine();
      engine.scrollBody.useSpeed(0.03);
      engine.scrollTo.index(99999, -1);
    }, 500);
    return () => clearInterval(interval);
  }, [embla]);
  return /* @__PURE__ */ jsxs(
    Carousel,
    {
      withIndicators: false,
      withControls: false,
      draggable: false,
      slideSize: "33.333333%",
      slideGap: 0,
      breakpoints: [
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%" }
      ],
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      getEmblaApi: setEmbla,
      children: [
        /* @__PURE__ */ jsx(Carousel.Slide, { children: /* @__PURE__ */ jsx(
          Image,
          {
            width: 200,
            height: 80,
            radius: "md",
            src: stanford
          }
        ) }),
        /* @__PURE__ */ jsx(Carousel.Slide, { children: /* @__PURE__ */ jsx(
          Image,
          {
            width: 200,
            height: 80,
            radius: "md",
            src: berkeley
          }
        ) }),
        /* @__PURE__ */ jsx(Carousel.Slide, { children: /* @__PURE__ */ jsx(
          Image,
          {
            width: 200,
            height: 80,
            radius: "md",
            src: cornell
          }
        ) }),
        /* @__PURE__ */ jsx(Carousel.Slide, { children: /* @__PURE__ */ jsx(
          Image,
          {
            width: 200,
            height: 80,
            radius: "md",
            src: mit
          }
        ) }),
        /* @__PURE__ */ jsx(Carousel.Slide, { children: /* @__PURE__ */ jsx(
          Image,
          {
            width: 200,
            height: 80,
            radius: "md",
            src: harvard
          }
        ) })
      ]
    }
  );
}
const mockdata = [
  {
    title: "AI Autocomplete",
    description: "Let artificial intelligence convert your ideas into real sentences",
    icon: IconGauge
  },
  {
    title: "Plagarism-free",
    description: "2write ensures all concent generated is original, checked against Turnitin",
    icon: IconUser
  },
  {
    title: "Outline Assistant",
    description: "Generate useful essay outlines to structure your essay.",
    icon: IconMessageChatbot
  },
  {
    title: "Rewrite Sentences",
    description: "Have a phrase that just doesn't flow? Have 2write rewrite it.",
    icon: IconBallpen
  },
  {
    title: "Bibliography Generation",
    description: "Automatically create bibliography from a group of links",
    icon: IconClipboardTypography
  },
  {
    title: "Real-time collaboration",
    description: "Allows multiple users to work together on the same document or project at the same time.",
    icon: IconFriends
  }
];
const useStyles$1 = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24
    }
  },
  description: {
    maxWidth: 600,
    margin: "auto",
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`
  },
  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm
    }
  }
}));
function Features() {
  const { classes, theme } = useStyles$1();
  const features = mockdata.map((feature) => /* @__PURE__ */ jsxs(Card, { shadow: "md", radius: "md", className: classes.card, p: "xl", children: [
    /* @__PURE__ */ jsx(feature.icon, { size: 50, stroke: 2, color: theme.fn.primaryColor() }),
    /* @__PURE__ */ jsx(Text, { size: "lg", weight: 500, className: classes.cardTitle, mt: "md", children: feature.title }),
    /* @__PURE__ */ jsx(Text, { size: "sm", color: "dimmed", mt: "sm", children: feature.description })
  ] }, feature.title));
  return /* @__PURE__ */ jsxs(Container, { size: "lg", py: "xl", children: [
    /* @__PURE__ */ jsx(Title, { order: 2, className: classes.title, align: "center", mt: "sm", children: "Features for your next writing assignment" }),
    /* @__PURE__ */ jsx(Text, { color: "dimmed", className: classes.description, align: "center", mt: "md" }),
    /* @__PURE__ */ jsx(SimpleGrid, { cols: 3, spacing: "xl", mt: 50, breakpoints: [{ maxWidth: "md", cols: 1 }], children: features })
  ] });
}
const BREAKPOINT = "@media (max-width: 755px)";
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
  },
  inner: {
    position: "relative",
    paddingTop: -10,
    paddingBottom: 50,
    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 20
    }
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    marginBottom: theme.spacing.xl,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    textAlign: "center",
    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2
    }
  },
  description: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    textAlign: "center",
    marginTop: theme.spacing.sm,
    fontSize: 24,
    [BREAKPOINT]: {
      fontSize: 18
    }
  },
  controls: {
    marginTop: theme.spacing.xl * 2,
    [BREAKPOINT]: {
      marginTop: theme.spacing.xl
    }
  },
  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,
    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1
    }
  }
}));
function LandingPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(
    AppShell,
    {
      header: /* @__PURE__ */ jsx(Header, { height: 60, p: "sm", children: /* @__PURE__ */ jsx(HeaderMegaMenu, {}) }),
      children: /* @__PURE__ */ jsxs("div", { className: classes.wrapper, children: [
        /* @__PURE__ */ jsxs(Container, { size: 700, className: classes.inner, children: [
          /* @__PURE__ */ jsxs("h1", { className: classes.title, children: [
            /* @__PURE__ */ jsx(
              Text,
              {
                ta: "center",
                component: "span",
                variant: "gradient",
                gradient: { from: "blue", to: "cyan" },
                inherit: true,
                children: "Turbocharge"
              }
            ),
            " ",
            "your writing with AI"
          ] }),
          /* @__PURE__ */ jsx(
            "video",
            {
              src: "https://firebasestorage.googleapis.com/v0/b/write-dev.appspot.com/o/2write%20landing%20page%20video.mp4?alt=media&token=4fd3e374-3e92-4398-b22e-3c16b93802cb",
              loop: true,
              autoPlay: true,
              muted: true,
              playsInline: true,
              style: {
                width: "100%",
                marginTop: "10px",
                height: "100%",
                borderRadius: "8px",
                display: "block",
                objectFit: "cover",
                backgroundColor: "rgba(0,0,0,0)",
                objectPosition: "50% 50%",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              }
            }
          ),
          /* @__PURE__ */ jsx(Text, { className: classes.description, color: "dimmed", children: "AI generated autocomplete, snippets, outline creation, real-time collaboration, and much much more..." }),
          /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsxs(Group, { pt: "md", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => navigate("/auth"),
                size: "xl",
                className: classes.control,
                variant: "gradient",
                gradient: { from: "blue", to: "cyan" },
                children: "Get Started"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                component: "a",
                href: "https://youtube.com",
                size: "xl",
                variant: "default",
                className: classes.control,
                children: "Need Help?"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Center, { children: /* @__PURE__ */ jsx(Text, { className: classes.description, color: "dimmed", align: "center", children: "Loved by students from universities nationwide." }) }),
        /* @__PURE__ */ jsx(Space, { h: "lg" }),
        /* @__PURE__ */ jsx(CollegeCarousel, {}),
        /* @__PURE__ */ jsx(Space, { h: "lg" }),
        /* @__PURE__ */ jsx(Features, {})
      ] })
    }
  );
}
const ProtectedAuth = (props) => {
  const { children } = props;
  const auth2 = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth2, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("unauthorized");
        navigate("/landing");
      }
    });
    return () => AuthCheck();
  }, [auth2]);
  if (loading)
    return /* @__PURE__ */ jsx("p", {});
  return /* @__PURE__ */ jsx(Fragment, { children });
};
function App() {
  return /* @__PURE__ */ jsx(AuthContextProvider, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/",
        element: /* @__PURE__ */ jsx(ProtectedAuth, { children: /* @__PURE__ */ jsx(HomePage, {}) })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/landing", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/compose",
        element: /* @__PURE__ */ jsx(ProtectedAuth, { children: /* @__PURE__ */ jsx(ComposePage, {}) })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/auth", element: /* @__PURE__ */ jsx(AuthPage, {}) })
  ] }) });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(
    MantineProvider,
    {
      withGlobalStyles: true,
      withNormalizeCSS: true,
      theme: {
        colorScheme: "light",
        colors: {
          "ocean-blue": [
            "#7AD1DD",
            "#5FCCDB",
            "#44CADC",
            "#2AC9DE",
            "#1AC2D9",
            "#11B7CD",
            "#09ADC3",
            "#0E99AC",
            "#128797",
            "#147885"
          ]
        }
      },
      children: /* @__PURE__ */ jsx(App, {})
    }
  ) }) })
);
