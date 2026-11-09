// Question bank for the Quiz page. c = topic (html / css / js)
const BANK = [];
function m(c, q, o, a, e) { BANK.push({ t: "mcq", c: c, q: q, o: o, a: a, e: e }); }
function tf(c, q, truth, e) { BANK.push({ t: "tf", c: c, q: q, o: ["True", "False"], a: truth ? 0 : 1, e: e }); }
function bug(c, code, o, a, e) { BANK.push({ t: "bug", c: c, q: "Find the error in this code:", code: code, o: o, a: a, e: e }); }
function out(c, code, o, a, e) { BANK.push({ t: "output", c: c, q: "What is the output?", code: code, o: o, a: a, e: e }); }
function fill(c, q, code, o, a, e) { BANK.push({ t: "fill", c: c, q: q, code: code, o: o, a: a, e: e }); }

// ---------- Multiple choice ----------
m("html", "Which tag creates the largest heading?", ["<h1>", "<h6>", "<head>", "<title>"], 0, "h1 is the largest heading and h6 the smallest.");
m("html", "Which tag creates a hyperlink?", ["<link>", "<a>", "<href>", "<url>"], 1, "The anchor tag <a> with an href attribute creates links.");
m("html", "Which attribute gives an image a text description?", ["title", "alt", "src", "text"], 1, "alt helps screen readers and shows if the image fails to load.");
m("html", "Which tag defines a table row?", ["<td>", "<th>", "<tr>", "<row>"], 2, "tr = table row, td = cell, th = header cell.");
m("html", "Which of these is a semantic element?", ["<div>", "<span>", "<b>", "<article>"], 3, "article describes its meaning; div and span do not.");
m("css", "Which property changes the text color?", ["font-color", "color", "text-color", "fg"], 1, "The color property sets text color.");
m("css", "Which property adds space outside an element?", ["padding", "margin", "gap", "border"], 1, "Margin is outside the border; padding is inside.");
m("css", "Which unit is relative to the root font size?", ["px", "em", "rem", "pt"], 2, "rem is relative to the root (html) font size.");
m("css", "Which declaration makes an element a flex container?", ["display: flex", "flex: 1", "position: flex", "float: flex"], 0, "display: flex turns on flexbox for the children.");
m("css", "Which selector targets the element with id 'menu'?", ["#menu", ".menu", "menu#", "*menu"], 0, "# is for ids and . is for classes.");
m("js", "Which keyword declares a constant?", ["var", "let", "const", "final"], 2, "const creates a variable that cannot be reassigned.");
m("js", "Which method adds an item to the end of an array?", ["push()", "pop()", "shift()", "slice()"], 0, "push adds to the end; pop removes from the end.");
m("js", "Which method finds an element by its id?", ["selectById", "getElementById", "findElement", "getById"], 1, "document.getElementById('id') returns the element.");
m("js", "What does JSON.parse() do?", ["Turns an object into text", "Turns JSON text into an object", "Sends data to a server", "Deletes JSON"], 1, "parse converts text to an object; stringify does the opposite.");
m("js", "Which operator checks value AND type?", ["=", "==", "===", "=>"], 2, "=== is strict equality.");
m("js", "What does typeof 'hi' return in JavaScript?", ["text", "string", "str", "char"], 1, "typeof returns the type name as a string.");

// ---------- True / False ----------
tf("html", "The <br> tag adds a line break and needs no closing tag.", true, "br is a self-closing (void) element.");
tf("html", "The <title> tag goes inside <body>.", false, "title goes inside <head>.");
tf("html", "An id should be unique within a page.", true, "Use classes for repeated styling; ids must be unique.");
tf("html", "The <img> tag needs a closing tag </img>.", false, "img is a void element with no closing tag.");
tf("css", "CSS stands for Cascading Style Sheets.", true, "CSS styles HTML pages.");
tf("css", "Padding adds space outside an element's border.", false, "Padding is inside the border; margin is outside.");
tf("css", "Flexbox can only arrange items in a row.", false, "flex-direction: column arranges items vertically.");
tf("css", "Media queries help make a website responsive.", true, "They apply styles depending on screen size.");
tf("js", "In JavaScript, array indexes start at 1.", false, "Arrays start at index 0.");
tf("js", "A variable declared with const can be reassigned.", false, "const cannot be reassigned.");
tf("js", "localStorage data stays after the browser is closed.", true, "It stays until it is cleared (unlike sessionStorage).");
tf("js", "In JavaScript, '5' + 3 results in the string '53'.", true, "The + operator joins text when one side is a string.");
tf("js", "=== compares both value and type.", true, "5 === '5' is false because the types differ.");
tf("js", "git push downloads changes from GitHub.", false, "git push uploads; git pull downloads.");

// ---------- Find the error ----------
bug("html", "<a src='page.html'>Home</a>", ["The tag should be <link>", "A link needs href, not src", "Home must be uppercase", "The closing tag is missing"], 1, "Links use the href attribute.");
bug("html", "<img href='photo.jpg' alt='Me'>", ["alt is not allowed on images", "img must end with </img>", "photo.jpg must be a png", "img needs src, not href"], 3, "Images use src to point to the file.");
bug("html", "<p>Hello <strong>world</p></strong>", ["Tags are closed in the wrong order", "strong is not a real tag", "p cannot contain text", "A semicolon is missing"], 0, "Close tags in reverse order: </strong> then </p>.");
bug("css", "h1 {\n  color: red\n  font-size: 20px;\n}", ["h1 is not a valid selector", "A semicolon is missing after red", "Curly braces are not allowed", "font-size must be in quotes"], 1, "Every declaration ends with a semicolon.");
bug("css", "p { colour: blue; }", ["p needs a dot before it", "blue is not a color", "colour should be spelled color", "Braces should be ( )"], 2, "CSS uses the American spelling: color.");
bug("css", ".card ( padding: 10px; )", ["Should use curly braces { }", "padding does not exist", "10px is invalid", "Needs a # before card"], 0, "CSS rules are wrapped in { }.");
bug("js", "const x = 5;\nx = 10;", ["Missing quotes around 5", "x is a reserved word", "Semicolons are not allowed", "A const cannot be reassigned"], 3, "Use let if the value must change.");
bug("js", "let score = 90;\nif (score = 90) {\n  console.log('A');\n}", ["= assigns a value; use === to compare", "console.log needs double quotes", "if needs a semicolon", "let cannot be used here"], 0, "A single = assigns; use === inside conditions.");
bug("js", "for (let i = 0; i < 3; i++ {\n  console.log(i);\n}", ["let is not allowed in loops", "console.log needs quotes", "i++ is invalid", "A closing parenthesis ) is missing"], 3, "The for(...) header must close with ).");
bug("js", "const langs = ['HTML', 'CSS'];\nconsole.log(langs.lenght);", ["const cannot hold arrays", "lenght is misspelled, use length", "Quotes must be double", "push is missing"], 1, "The property is spelled length.");
bug("js", "document.getElementById('btn').onclick = () => {\n  alert('Hi');\n", ["alert is not a function", "getElementById must be lowercase", "The closing brace }; is missing", "onclick must be uppercase"], 2, "Every opening { needs a closing }.");

// ---------- Predict the output ----------
out("js", "console.log(2 + 3);", ["23", "5", "undefined", "Error"], 1, "Numbers are added: 5.");
out("js", "console.log('2' + 3);", ["5", "23", "Error", "NaN"], 1, "With a string, + joins text: '23'.");
out("js", "const a = [1, 2, 3];\nconsole.log(a.length);", ["2", "4", "undefined", "3"], 3, "The array has 3 items.");
out("js", "let x = 10;\nx += 5;\nconsole.log(x);", ["15", "105", "5", "x"], 0, "x += 5 means x = x + 5.");
out("js", "console.log(typeof true);", ["string", "boolean", "bool", "true"], 1, "true is a boolean.");
out("js", "const arr = ['a', 'b', 'c'];\nconsole.log(arr[1]);", ["a", "c", "undefined", "b"], 3, "Index 1 is the second item.");
out("js", "console.log(10 > 5 && 3 > 4);", ["true", "false", "undefined", "Error"], 1, "&& needs both sides true; 3 > 4 is false.");
out("js", "console.log(5 === '5');", ["true", "false", "5", "Error"], 1, "Different types, so strict equality is false.");

// ---------- Fill the blank ----------
fill("html", "Complete the code so the link opens in a new tab.", "<a href='page.html' target='____'>Open</a>", ["_new", "_blank", "_self", "_tab"], 1, "target='_blank' opens a new tab.");
fill("css", "Complete the flexbox code.", ".row { display: ____; gap: 1rem; }", ["flex", "block", "float", "inline-list"], 0, "display: flex enables flexbox.");
fill("css", "Choose the selector for the class 'card'.", "____ { padding: 10px; }", ["#card", "card.", "*card", ".card"], 3, "Classes start with a dot.");
fill("js", "Choose the missing keyword.", "____ name = 'Sara'; // cannot be changed", ["let", "const", "var", "func"], 1, "const creates a constant.");
fill("js", "Choose the method that adds 'Git' to the end.", "langs.____('Git');", ["pop", "shift", "add", "push"], 3, "push adds to the end of an array.");
fill("css", "Choose the missing value for a 3-column layout.", ".g { display: ____; grid-template-columns: repeat(3, 1fr); }", ["flex", "table", "grid", "column"], 2, "grid-template-columns needs display: grid.");
fill("css", "Complete the media query for small screens.", "@media (____: 600px) { .menu { display: none; } }", ["width-max", "maxwidth", "max-width", "screen"], 2, "max-width applies up to 600px.");
fill("js", "Choose the method that saves to the browser.", "localStorage.____('theme', 'dark');", ["getItem", "setItem", "saveItem", "addItem"], 1, "setItem saves; getItem reads.");