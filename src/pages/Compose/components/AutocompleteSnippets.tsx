import { IconFaceId } from "@tabler/icons";
import { Editor, Extension } from "@tiptap/core";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { useDebounce } from "use-debounce";
import "./Loader.css"


const snippet = " resulting in distinct and profound patterns of social development."

export const AutocompleteSnippets = Extension.create({
    // @ts-ignore
    addKeyboardShortcuts() {
        return {
            // ↓ your new keyboard shortcut
            'Tab': () => {
                event.preventDefault();

                let snippet;

                if (document.getElementById("autocomplete-snippet")) {
                    snippet = document.getElementById("autocomplete-snippet").innerText
                }

                document.getElementById("autocomplete-snippet").innerHTML = ''

                this.editor.commands.insertContent(snippet)
                this.editor.commands.focus()
            },
        }
    },

    addProseMirrorPlugins() {



        function lastSentenceLong(str: string) {
            let paragraph = str

            // ensures function word count will be counted correctly
            if (paragraph.slice(-1) == ".") {
                paragraph += " ";
            }

            // Split the paragraph into sentences
            const sentences = paragraph.split('. ');
            // Get the last sentence
            const lastSentence = sentences[sentences.length - 1];
            // Split the last sentence into words
            const words = lastSentence.split(' ');
            // Return true if the last sentence has more than 5 words, false otherwise
            return words.length > 6
        }

        let debounceTimeout;




        return [
            new Plugin({
                props: {
                    decorations: (editor) => {
                        const decorations: Decoration[] = [];
                        // console.log(`Node Size: ${doc.nodeSize}`)
                        const doc = editor.doc
                        const selection = editor.selection
                        const tr = editor.tr

                        const docNode = doc.nodeAt(selection.$from.pos !== 1 ? selection.$from.pos - 1 : 1)
                        // console.log(`Length: ${docNode?.toString().length}`)
                        // console.log(`Doc Node: ${doc.nodeAt(selection.$from.pos)}`)

                        // console.log(`Cursor Selection: ${selection.$from.pos}`)
                        const end = selection.$from.pos
                        // const replace = state.tr.replace(end-1, end-1, snippet);

                        const replace = tr.insertText("hello world", end, end)
                        editor.applyTransaction(replace)

                        // editor.view.updateState(newState);



                        // console.log(doc.nodeAt(selection.$from.pos.toString())

                        // console.log(`Doc Node: ${doc.nodeAt(selection.$from.pos - 1)}`)

                        // const currentNode = doc.nodeAt(selection.$from.post)

                        const textContentOfCurrentParagraph = doc.nodeAt(selection.$from.pos == 1 ? selection.$from.pos : selection.$from.pos - 1)?.textContent







                        let textCount = 0;
                        // console.log(`Converted Selection: ${convertedSelection}`)
                        let nodeArray = []

                        doc.nodesBetween(0, selection.$from.pos, (node, pos,) => {

                            if (nodeArray.length !== 0 && node.textContent !== nodeArray.at(-1).content) {
                                textCount += node.nodeSize

                                // get position of node at index with prosemirror

                                console.log(textCount, node.textContent)

                                const paraNode = {
                                    content: node.textContent,
                                    endCount: textCount,
                                }





                                nodeArray.push(paraNode)
                            } else if (nodeArray.length === 0) {
                                textCount += node.nodeSize
                                console.log(textCount, node.textContent)

                                const paraNode = {
                                    content: node.textContent,
                                    endCount: textCount,
                                }

                                nodeArray.push(paraNode)
                            }



                            // console.log(textCount)
                            // console.log(`Text Count: ${textCount}`)
                            // console.log(convertedSelection == textCount && selection.$from.pos !== 1 && lastSentenceLong(textContentOfCurrentParagraph) && textContentOfCurrentParagraph.slice(-1) == " ")

                            // && convertedSelection >= textContentOfCurrentParagraph?.length


                        })

                        const convertedSelection = selection.$to.pos + 1

                        if (convertedSelection == nodeArray.at(-1).endCount && selection.$from.pos !== 1 && lastSentenceLong(textContentOfCurrentParagraph) && textContentOfCurrentParagraph.slice(-1) == " ") {
                            const decoration = Decoration.widget(selection.$from.pos, () => {
                                console.log("DEBOUNCING")

                                // const loader = document.createElement("span");
                                const placeholder = document.createElement("span");
                                // give it element id of autocomplete-snippet
                                placeholder.id = "autocomplete-snippet";
                                placeholder.className = "dot-flashing"

                                const textEditor = document.getElementsByClassName("mantine-RichTextEditor-content mantine-3f8va4")

                                textEditor[0].classList.add("hide-cursor")

                                function debounce(_editorText: string) {
                                    clearTimeout(debounceTimeout);

                                    debounceTimeout = setTimeout(() => {
                                        console.log("AUTOCOMPLETE")




                                        let autocomplete = ""
                                        fetch("/api/autocomplete", {
                                            method: "post",
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ "prompt": textContentOfCurrentParagraph })
                                        })
                                            .then((res) => res.json())
                                            .then((data) => {

                                                autocomplete = data.answer

                                                if (autocomplete[0] === " ") {
                                                    autocomplete = autocomplete.substring(1)

                                                }

                                            })
                                            .catch((err) => {
                                                console.log(err)
                                                var elems = document.querySelectorAll(".widget.hover");

                                                [].forEach.call(elems, function (el) {
                                                    el.classList.remove("hover");
                                                });
                                            })

                                            .finally(() => {
                                                placeholder.className = ""
                                                placeholder.innerText = autocomplete
                                                const input = document.getElementsByClassName("hide-cursor")
                                                // input[0].remove("hide-cursor")


                                                // remove hid cursor class


                                                var elems = document.querySelectorAll(".hide-cursor");

                                                [].forEach.call(elems, function (el) {
                                                    el.classList.remove("hide-cursor");
                                                });

                                                return placeholder
                                            }

                                            )
                                    }, 500);
                                }


                                debounce(doc.textContent)


                                placeholder.style.color = "gray";
                                var elems = document.querySelectorAll(".hide-cursor");

                                [].forEach.call(elems, function (el) {
                                    el.classList.remove("hide-cursor");
                                });

                                return placeholder;


                            });
                            decorations.push(decoration);
                        }


                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});
