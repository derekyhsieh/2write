import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import { MentionList } from './MentionList'
import {cleanForAutocomplete, removeEmptyParagraphs} from "../../../utils/ExtractHTML"
// import { useFetch } from "../../hooks/useFetch";

export default {

  char: "/",
  startOfLine: false,
  command: ({ editor, range, props }) => {
    // props.command({ editor, range });

     function getAutocomplete()  {
      console.log(editor.getJSON())

      const editorContent = cleanForAutocomplete(editor.getHTML(), range)
      // range 75 to 76
      console.log(cleanForAutocomplete(editor.getHTML(), range))

      let autocomplete = ""
      fetch("/api/autocomplete", {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"prompt": editorContent})
    })
    .then((res) => res.json())
    .then((data) => {
      autocomplete = data.answer
        
    }).finally(() => {

      // editor destroy etc
      editor
      .chain()
      .focus()
      .deleteRange({from: range.from - 1, to: range.to})
      .insertContent(autocomplete)
      .run()

    } 
      )
    }

    getAutocomplete()

    // .run();
  },

  items: ({ query }) => {
    return [
      'Autocomplete Sentence'
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },

  render: () => {
    let reactRenderer
    let popup

    return {
      onStart: props => {
        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        reactRenderer.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return reactRenderer.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        reactRenderer.destroy()
      },
    }
  },
}