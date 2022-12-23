
// This function is used to convert all instances of "\n" into line break tags for the quill.js editor
function convertStringIntoHTML(str: string) {

    // delete first \n bc looks weird in text editor
    const indexOf = str.indexOf("\n")

    
    const cleanedStr =  str.slice(indexOf + 2).replace(new RegExp('\r?\n','g'), '<br />');


    return cleanedStr

}

export {convertStringIntoHTML}