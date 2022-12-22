import {
  RichTextEditor,
  Link,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { useEditor, BubbleMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconHighlight, IconDrone } from "@tabler/icons";
import { useDebounce } from "use-debounce";

import { Text, Group } from "@mantine/core";
import Mention from "@tiptap/extension-mention";
import suggestion from "./Suggestion";
import { useEffect, useState } from "react";
import {
  saveEssay,
  createEssay,
  loadEssay,
} from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { useSearchParams } from "react-router-dom";

function AutocompleteIconButton() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => {
        editor?.commands.insertContent(" /");
        editor?.view.dom.focus();
      }}
      aria-label="AI autocomplete sentence"
      title="AI autocomplete"
    >
      <IconDrone stroke={1.75} size={18} color={"blue"} />
    </RichTextEditor.Control>
  );
}

export default function CustomRTE() {
  // has data on timestamp etc 
  const [clientDocData, setClientDocData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [initalContent, setInitialContent] = useState("");


  const { user } = UserAuth();
  const editor = useEditor({
    extensions: [
      Mention.configure({
        HTMLAttributes: {
          class: "",
        },
        suggestion,
      }),
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],

    onCreate: ({ editor }) => {
      loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
        // neeed to set intial content so debouncer isn't called on first load
        setInitialContent(doc.content)
        setClientDocData(doc)
        editor.commands.setContent(doc.content)
      })
    },
  });

  // editor.on("create", ({editor}) => {
  //   console.log("created")
  //   loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
  //     // editor.commands.setContent("<p>Hello world can you save this</p>");

  //   });
  // })

  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 3000);



  useEffect(() => {

    if(debouncedEditor) {

      // makes sure we don't save on first load when there aren't any acutal changes other than loading from db

      if(editor?.getHTML() !== initalContent) {
        console.log("SAVING DOC")

        saveEssay(editor?.getHTML(), user.uid, searchParams.get("essayId"))
      }

    }

  }, [debouncedEditor])

  const toolbar = (
    <RichTextEditor.Toolbar sticky stickyOffset={60}>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.ClearFormatting />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.AlignLeft />
        <RichTextEditor.AlignCenter />
        <RichTextEditor.AlignJustify />
        <RichTextEditor.AlignRight />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <AutocompleteIconButton />
      </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>
  );

  return (
    <RichTextEditor
      styles={{
        root: { minHeight: "100%", backgroundColor: "#fff" },
        content: { backgroundColor: "green" },
      }}
      editor={editor}
    >
      {toolbar}

      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() => editor?.commands.insertContent("⭐")}
              aria-label="Insert star emoji"
              title="Insert star emoji"
            >
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                weight="bold"
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                p={5}
              >
                rewrite with AI
              </Text>
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content spellCheck />
    </RichTextEditor>
  );
}
