import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import { MentionList } from './MentionList'

export default {

  char: "/",
  startOfLine: false,
  // command: ({ editor, range, props }) => {
  //   props.command({ editor, range });
  // },
  command: ({ editor, range }) => {
    console.log(range)
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent('This is the autocompleted sentence')
      .run();
  },

  items: ({ query }) => {
    return [
      'This is the autocompleted sentence', 
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