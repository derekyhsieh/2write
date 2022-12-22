function extractContent(s) {
  // Create a temporary element to hold the HTML

  const temp = document.implementation.createHTMLDocument().body;
  temp.innerHTML = s;

  // Extract the text content of the element
  let text = temp.textContent;

  // Replace <p> tags with newline characters if they don't have any inner HTML content


  return text;

};


function removeEmptyParagraphs(html) {
    // Create a temporary element to hold the HTML
    const temp = document.implementation.createHTMLDocument().body;
    temp.innerHTML = html;
  
    // Find all <p> elements that don't have children or inner text content
    const emptyParagraphs = temp.querySelectorAll('p:empty');
    emptyParagraphs.forEach(p => p.remove());
  
    // Extract the modified HTML content
    const modifiedHTML = temp.innerHTML;
  
    // Replace remaining <p> tags with newline characters
    return (modifiedHTML.replace(/<p>(?![^<]*>)[^<]*<\/p>/gi, '\n'));
  }



function cleanForAutocomplete(s, range) {


    // delete everything after range
    let content = extractContent(s)

    let filteredContent = deleteAfterRange(content, range.from - 1, range.to - 1)
    return filteredContent

}


function deleteAfterRange(str, startIndex, endIndex) {
    console.log(str.substring(0, startIndex))
    return str.substring(0, startIndex);
}


export { extractContent, cleanForAutocomplete, removeEmptyParagraphs };


// <p>This is the context of this paper.< /p>
// <p>
// <br class="ProseMirror-trailingBreak"></p >
//  <p>In the fifteenth and sixteenth centuries, European nations began to claim new lands in the Americas and the Pacific Ocean.This was the beginning of the Age of Exploration.< /p>