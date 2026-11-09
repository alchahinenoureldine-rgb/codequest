// 5 optional quick questions per lesson: [question, [options], indexOfCorrect]
const LESSON_QUIZZES = {
  html1: [
    ["Which tag holds the visible content of a page?", ["<head>", "<body>", "<title>", "<meta>"], 1],
    ["What does <!DOCTYPE html> tell the browser?", ["The page uses HTML5", "The page title", "The page language", "The CSS file"], 0],
    ["Where do you put the title shown in the browser tab?", ["Inside <body>", "Inside <footer>", "Inside <head>", "Inside <h1> only"], 2],
    ["Which tag sets the character encoding?", ["<title>", "<html lang>", "<link>", "<meta charset='UTF-8'>"], 3],
    ["Which tag is the root that wraps the whole page?", ["<body>", "<main>", "<head>", "<html>"], 3]
  ],
  html2: [
    ["Which tag makes the biggest heading?", ["<h6>", "<h1>", "<head>", "<p>"], 1],
    ["Which attribute holds a link's destination?", ["src", "link", "href", "url"], 2],
    ["Which tag shows text as important (bold)?", ["<strong>", "<em>", "<br>", "<small>"], 0],
    ["What does target='_blank' do?", ["Deletes the link", "Opens the link in a new tab", "Blanks the text", "Makes it bold"], 1],
    ["Which tag creates a paragraph?", ["<para>", "<text>", "<pp>", "<p>"], 3]
  ],
  html3: [
    ["Which tag creates a bullet list?", ["<ol>", "<ul>", "<li>", "<list>"], 1],
    ["Which tag creates a numbered list?", ["<ol>", "<ul>", "<nl>", "<dl>"], 0],
    ["Which attribute gives an image a text description?", ["title", "name", "alt", "src"], 2],
    ["Which attribute sets the image file?", ["href", "alt", "file", "src"], 3],
    ["Each item inside a list uses which tag?", ["<item>", "<li>", "<ul>", "<td>"], 1]
  ],
  html4: [
    ["Which tag creates a table row?", ["<td>", "<th>", "<tr>", "<row>"], 2],
    ["Which tag is a table header cell?", ["<th>", "<tr>", "<td>", "<tab>"], 0],
    ["Which tag links a text label to an input?", ["<span>", "<tag>", "<name>", "<label>"], 3],
    ["Which attribute makes a field mandatory?", ["must", "required", "needed", "validate"], 1],
    ["Which input type hides the typed characters?", ["hidden", "secret", "password", "text"], 2]
  ],
  html5: [
    ["Which tag holds the main navigation links?", ["<menu>", "<nav>", "<header>", "<aside>"], 1],
    ["Which tag holds the unique main content?", ["<main>", "<div>", "<section>", "<body>"], 0],
    ["Why use semantic tags?", ["They make pages slower", "They add colors", "They describe meaning and help accessibility and SEO", "They replace CSS"], 2],
    ["Which tag is for side notes or related content?", ["<footer>", "<header>", "<nav>", "<aside>"], 3],
    ["Which tag usually holds copyright info at the bottom?", ["<footer>", "<aside>", "<header>", "<main>"], 0]
  ],
  css1: [
    ["Which selector targets a class named note?", ["#note", ".note", "note", "*note"], 1],
    ["Which selector targets an element with id title?", ["#title", ".title", "title()", "@title"], 0],
    ["Which property changes the text color?", ["background", "font-color", "text-style", "color"], 3],
    ["Which property sets the background?", ["bgcolor", "background", "back", "fill"], 1],
    ["Which is a valid hex color?", ["38bdf8#", "hex(38bdf8)", "#zzzzzz", "#38bdf8"], 3]
  ],
  css2: [
    ["Box model order from inside to outside?", ["Margin, border, padding, content", "Content, padding, border, margin", "Content, margin, padding, border", "Padding, content, margin, border"], 1],
    ["Which property adds space inside the border?", ["margin", "gap", "padding", "spacing"], 2],
    ["Which property adds space outside the border?", ["margin", "padding", "outline", "inset"], 0],
    ["Which property rounds the corners?", ["round", "corner", "border-radius", "curve"], 2],
    ["What does border: 2px solid black set?", ["Only the width", "Width, style and color", "Only the color", "The margin"], 1]
  ],
  css3: [
    ["Which declaration turns on flexbox?", ["display: flex;", "flex: on;", "layout: flex;", "position: flex;"], 0],
    ["Which property adds space between flex items?", ["space", "margin-flex", "gap", "padding-all"], 2],
    ["Which property aligns items along the main axis?", ["align-items", "justify-content", "flex-wrap", "order"], 1],
    ["How do you stack flex items in a column?", ["flex-flow: row;", "display: column;", "align: vertical;", "flex-direction: column;"], 3],
    ["Which property aligns items on the cross axis?", ["justify-content", "text-align", "align-items", "float"], 2]
  ],
  css4: [
    ["Which declaration turns on grid?", ["display: table;", "display: grid;", "grid: on;", "layout: grid;"], 1],
    ["What does repeat(3, 1fr) create?", ["3 equal columns", "3 rows of text", "1 column 3 times wider", "3 pixel columns"], 0],
    ["Which property defines the columns?", ["grid-columns", "columns-grid", "grid-template-columns", "grid-cols"], 2],
    ["Which property adds space between grid cells?", ["margin", "gap", "padding", "border"], 1],
    ["What does 1fr mean?", ["1 pixel", "1 frame", "1 font row", "1 fraction of free space"], 3]
  ],
  css5: [
    ["What do media queries do?", ["Play videos", "Apply styles depending on screen size", "Load images faster", "Validate forms"], 1],
    ["Which meta tag helps pages fit phones?", ["viewport", "charset", "author", "robots"], 0],
    ["Which rule applies at 600px wide or less?", ["@media (min-width: 600px)", "@screen (600px)", "@media (max-width: 600px)", "@width 600px"], 2],
    ["Which unit is relative to the root font size?", ["px", "rem", "pt", "cm"], 1],
    ["Designing for small screens first is called?", ["Mobile-first", "Desktop-only", "Print-first", "Table-first"], 0]
  ],
  js1: [
    ["Which keyword declares a constant?", ["let", "var", "const", "fixed"], 2],
    ["Which keyword declares a variable that can change?", ["let", "const", "static", "def"], 0],
    ["Which of these is a string?", ["42", "true", "'Hello'", "null"], 2],
    ["What does console.log() do?", ["Shows a popup", "Prints to the browser console", "Saves a file", "Clears memory"], 1],
    ["Which is a boolean value?", ["'true'", "true", "1.5", "[]"], 1]
  ],
  js2: [
    ["Which keyword sends a value back from a function?", ["send", "output", "return", "give"], 2],
    ["What does grade(95) return in the lesson code?", ["A", "B", "C", "95"], 0],
    ["Which keyword starts a decision?", ["when", "check", "if", "maybe"], 2],
    ["What does === check?", ["Assignment", "Equal value and type", "Only the type", "Greater than"], 1],
    ["What does grade(70) return in the lesson code?", ["A", "B", "C", "undefined"], 2]
  ],
  js3: [
    ["Which index is the first item of an array?", ["1", "0", "-1", "first"], 1],
    ["Which method adds an item to the end of an array?", ["push()", "add()", "append()", "insert()"], 0],
    ["What does array.length return?", ["The last item", "The number of items", "The first index", "The type"], 1],
    ["How many times does the loop run for an array of 3 items?", ["1", "2", "3", "4"], 2],
    ["In ['HTML','CSS','JS'], what is langs[1]?", ["HTML", "CSS", "JS", "undefined"], 1]
  ],
  js4: [
    ["What does DOM stand for?", ["Data Object Model", "Document Object Model", "Display Order Map", "Dynamic Output Method"], 1],
    ["Which method finds an element by its id?", ["getElementById()", "findId()", "selectId()", "queryId()"], 0],
    ["Which method reacts to a click?", ["onPress()", "clickIt()", "waitFor()", "addEventListener('click', fn)"], 3],
    ["Which property changes an element's text?", ["textContent", "textStyle", "words", "stringValue"], 0],
    ["What is an event?", ["A CSS rule", "An action like a click or key press", "A kind of variable", "A file type"], 1]
  ],
  js5: [
    ["What does localStorage do?", ["Saves data in the browser", "Uploads to a server", "Deletes cookies", "Runs faster code"], 0],
    ["Which method saves an item?", ["getItem()", "setItem()", "saveItem()", "putItem()"], 1],
    ["Which method reads an item?", ["readItem()", "fetchItem()", "getItem()", "loadItem()"], 2],
    ["Why use JSON.stringify before saving an object?", ["localStorage only stores strings", "To make it faster", "To add colors", "To encrypt it"], 0],
    ["Does localStorage data stay after closing the browser?", ["No, never", "Only for 1 minute", "Only on mobile", "Yes, until it is cleared"], 3]
  ],
  pr1: [
    ["What should you decide before coding?", ["Only the colors", "Pages, navigation and colors", "The server price", "Nothing"], 1],
    ["In the sample structure, where is style.css?", ["js/", "css/", "index/", "root only"], 1],
    ["Which file is usually the home page?", ["home.css", "main.js", "index.html", "start.txt"], 2],
    ["Why keep code in separate folders?", ["Easier to organize and maintain", "It makes the page red", "Browsers require it", "It deletes bugs"], 0],
    ["What keeps navigation consistent?", ["Different menus everywhere", "No menu", "Using images only", "Using the same nav on every page"], 3]
  ],
  pr2: [
    ["Which tag wraps navigation links?", ["<nav>", "<aside>", "<table>", "<form>"], 0],
    ["Where does the footer go?", ["Before the head", "At the bottom of the page", "Inside the title", "Inside the nav only"], 1],
    ["Which attribute of <a> sets the page to open?", ["src", "link", "href", "to"], 2],
    ["Why reuse the same nav on all pages?", ["It looks different each time", "Visitors move around easily", "It saves colors", "HTML requires it"], 1],
    ["Which file would hold the about page?", ["about.html", "about.css", "about.js", "about.png"], 0]
  ],
  pr3: [
    ["How are CSS variables declared?", ["$name", "--name", "@name", "#name"], 1],
    ["Which function reads a CSS variable?", ["get()", "use()", "var()", "read()"], 2],
    ["Where are global CSS variables usually declared?", [":root", "body.footer", "@media", "head"], 0],
    ["What is the benefit of CSS variables?", ["Faster internet", "Automatic JavaScript", "Smaller images", "Change the theme in one place"], 3],
    ["What does background: var(--bg) do?", ["Creates a variable", "Uses the value of --bg", "Deletes --bg", "Sets a border"], 1]
  ],
  pr4: [
    ["Which method toggles a class on an element?", ["classList.toggle()", "class.switch()", "toggleClass()", "style.class()"], 0],
    ["A dark mode button usually changes what?", ["The browser", "A class on the body", "The server", "The file name"], 1],
    ["What can remember the chosen theme between visits?", ["alert()", "console.log()", "localStorage", "prompt()"], 2],
    ["Which feature checks user input before sending?", ["Flexbox", "Semantic tags", "Media queries", "Form validation"], 3],
    ["Which event fires when a form is sent?", ["click", "submit", "load", "hover"], 1]
  ],
  pr5: [
    ["Which command uploads commits to GitHub?", ["git push", "git save", "git send", "git up"], 0],
    ["Which command saves a snapshot locally?", ["git add .", "git commit", "git pull", "git clone"], 1],
    ["Where do you enable GitHub Pages?", ["VS Code settings", "Windows settings", "Browser history", "Repository Settings > Pages"], 3],
    ["Which command downloads a repository?", ["git add", "git push", "git clone", "git commit"], 2],
    ["Is GitHub Pages free for public repositories?", ["Yes", "No, it costs monthly", "Only with a license", "Only for companies"], 0]
  ]
};