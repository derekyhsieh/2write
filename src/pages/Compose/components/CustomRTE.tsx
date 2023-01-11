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
import {CharacterCount} from "@tiptap/extension-character-count"

import { Text, Group } from "@mantine/core";
import Mention from "@tiptap/extension-mention";
import { useEffect, useState } from "react";
import {
  saveEssay,
  createEssay,
  loadEssay,
} from "../../../services/FirestoreHelpers";
import { UserAuth } from "../../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { AutocompleteSnippets } from "./AutocompleteSnippets";

// function AutocompleteIconButton() {
//   const { editor } = useRichTextEditorContext();
//   return (
//     <RichTextEditor.Control
//       onClick={() => {
//         editor?.commands.insertContent(" /");
//         editor?.view.dom.focus();
//       }}
//       aria-label="AI autocomplete sentence"
//       title="AI autocomplete"
//     >
//       <IconDrone stroke={1.75} size={18} color={"blue"} />
//     </RichTextEditor.Control>
//   );
// }

export default function CustomRTE({localDocData, setLocalDocData}) {
  // has data on timestamp etc 

  const [searchParams, setSearchParams] = useSearchParams();
  const [initalContent, setInitialContent] = useState("");


  const { user } = UserAuth();
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
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],

    onCreate: ({ editor }) => {
      loadEssay(user.uid, searchParams.get("essayId")).then((doc) => {
        // neeed to set intial content so debouncer isn't called on first load
        setInitialContent(doc.content)
        console.log({...doc})
        setLocalDocData({...doc})
        editor.commands.setContent(doc.content)
      })
    },

  });

  const getWordCountFromString = (str: string) => {
    console.log(str)
      return str.split(" ").length;
  }

  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2500);

  useEffect(() => {

    if(debouncedEditor) {

      // makes sure we don't save on first load when there aren't any acutal changes other than loading from db

      if(editor?.getHTML() !== initalContent) {

        if(editor?.getText() !== "") {
          console.log("SAVING DOC")
          saveEssay(editor?.getHTML(), user.uid, searchParams.get("essayId"))
        }

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
      </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>
  );

  return (
    <RichTextEditor
      styles={{
        root: { minHeight: "100%", backgroundColor: "#fff" },
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
              <Text m={3} fz="md" weight={600}>
                {
                  getWordCountFromString(editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, " ")) + " "
                }
                 words
              </Text>
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                weight="semibold"
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                p={5}
                m={5}
              >
                rewrite with ai
              </Text>
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content spellCheck />
    </RichTextEditor>
  );
}
