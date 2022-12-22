export interface DocumentJSON {
    type:    string;
    content: DocumentJSONContent[];
}

export interface DocumentJSONContent {
    type:     string;
    attrs:    Attrs;
    content?: ContentContent[];
}

export interface Attrs {
    textAlign: string;
}

export interface ContentContent {
    type: string;
    text: string;
}

interface IRange {
    from: number;
    to: number;
}

function deleteEverythingAfterSlash(doc: DocumentJSON, range: IRange) {

    let text = ""

    doc.content.forEach((content) => {
        if(content.type == "paragraph" && content.hasOwnProperty("content"))  {
            text += (content.content[0].text)

        } else {
            text += "\n"
        }
    })
}

function returnOnlyParagraphUserIsTypingIn(text: string) {

    let index = text.lastIndexOf("\n")

    return text.substring(index + 1)

}


// function converts tiptap editor json to plain text, converting all blank paragraph tags into "\n" instances, cuts off all text after user's autocomplete target, and returns only the paragraph the user is currently trying to autocomplete in order to save openai token usage

function convertEditorJSONToPlainText(doc: DocumentJSON, range: IRange) {

    console.log(doc)


    // need to subtract by one bc tiptap weird and starts counting text by 1 instead of 0 wtf

    const startIndex = range.from - 1

    let indexCounter = 1

    let text = ""

    doc.content.forEach((content) => {
        if(content.type == "paragraph" && content.content[0].hasOwnProperty("text"))  {
            for(const c of content.content[0].text) {
                if(indexCounter < startIndex) {
                text += c
                indexCounter += 1
                } else {

                    console.log(returnOnlyParagraphUserIsTypingIn(text))



                    return returnOnlyParagraphUserIsTypingIn(text)
                }
            }

        } else {
            text += "\n"
        }
    })
    console.log(returnOnlyParagraphUserIsTypingIn(text))
    return returnOnlyParagraphUserIsTypingIn(text)

}

export {convertEditorJSONToPlainText}