const LEVELS = [
  {
    id: "html", title: "Level 1: HTML Basics", info: "Structure web pages with tags.",
    lessons: [
      { id: "html1", title: "Page structure",
        text: "Every HTML page has a doctype, a head for settings and a body for visible content.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>` },
      { id: "html2", title: "Text and links",
        text: "Use h1-h6 for headings, p for paragraphs and a for links.",
        code: `<h1>Main title</h1>
<p>This is a <strong>bold</strong> and <em>italic</em> word.</p>
<a href="https://rhu.edu.lb" target="_blank">Visit RHU</a>` },
      { id: "html3", title: "Lists and images",
        text: "ul makes bullet lists, ol makes numbered lists. img shows a picture and needs an alt text.",
        code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
<ol>
  <li>Learn</li>
  <li>Practice</li>
</ol>
<img src="photo.jpg" alt="My photo" width="200">` },
      { id: "html4", title: "Tables and forms",
        text: "Tables show data in rows and columns. Forms collect user input.",
        code: `<table border="1">
  <tr><th>Name</th><th>Grade</th></tr>
  <tr><td>Sara</td><td>90</td></tr>
</table>
<form>
  <label for="n">Name</label>
  <input id="n" type="text" required>
  <button type="submit">Send</button>
</form>` },
      { id: "html5", title: "Semantic layout",
        text: "Semantic tags describe the meaning of each part of the page and help accessibility and SEO.",
        code: `<header>Site title</header>
<nav>Menu links</nav>
<main>
  <section>Main content</section>
  <aside>Side notes</aside>
</main>
<footer>Copyright</footer>` }
    ]
  },
  {
    id: "css", title: "Level 2: CSS Styling", info: "Make pages beautiful and responsive.",
    lessons: [
      { id: "css1", title: "Selectors and colors",
        text: "Selectors choose which elements to style. Use element, .class and #id selectors.",
        code: `h1 { color: teal; }
.note { background: #fef3c7; padding: 10px; }
#title { font-size: 2rem; }` },
      { id: "css2", title: "The box model",
        text: "Every element is a box made of content, padding, border and margin.",
        code: `.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 15px;
  border-radius: 10px;
}` },
      { id: "css3", title: "Flexbox",
        text: "Flexbox arranges items in a row or column and aligns them easily.",
        code: `.row {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}` },
      { id: "css4", title: "CSS Grid",
        text: "Grid creates layouts with rows and columns at the same time.",
        code: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}` },
      { id: "css5", title: "Responsive design",
        text: "Media queries change the style depending on screen size, so your site works on phones.",
        code: `.menu { display: flex; }

@media (max-width: 600px) {
  .menu { flex-direction: column; }
}` }
    ]
  },
  {
    id: "js", title: "Level 3: JavaScript Logic", info: "Make pages interactive.",
    lessons: [
      { id: "js1", title: "Variables and types",
        text: "Use const for values that do not change and let for values that do.",
        code: `const name = "Noureddine";
let age = 20;
let isStudent = true;
console.log(name, age, isStudent);` },
      { id: "js2", title: "Functions and conditions",
        text: "Functions are reusable blocks of code. if/else lets code make decisions.",
        code: `function grade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else return "C";
}
console.log(grade(85));` },
      { id: "js3", title: "Arrays and loops",
        text: "Arrays store lists of values. Loops repeat code for each item.",
        code: `const langs = ["HTML", "CSS", "JS"];
for (const l of langs) {
  console.log(l);
}
langs.push("Git");
console.log(langs.length);` },
      { id: "js4", title: "DOM and events",
        text: "The DOM lets JavaScript change the page. Events react to clicks and typing.",
        code: `const btn = document.getElementById("b");
btn.addEventListener("click", () => {
  document.getElementById("msg").textContent = "Clicked!";
});` },
      { id: "js5", title: "localStorage",
        text: "localStorage saves data in the browser, even after the page is closed.",
        code: `localStorage.setItem("user", JSON.stringify({ name: "Sara" }));
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name);` }
    ]
  },
  {
    id: "project", title: "Level 4: Final Project", info: "Build and publish your own website.",
    lessons: [
      { id: "pr1", title: "Plan your website",
        text: "Decide the pages, the navigation and the colors before writing code.",
        code: `my-site/
  index.html
  about.html
  contact.html
  css/style.css
  js/main.js` },
      { id: "pr2", title: "Build the structure",
        text: "Write the HTML for each page using the same nav and footer.",
        code: `<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
</nav>
<main>...</main>
<footer>My site</footer>` },
      { id: "pr3", title: "Style it",
        text: "Use CSS variables so you can change the whole theme in one place.",
        code: `:root { --main: #0284c7; --bg: #f1f5f9; }
body { background: var(--bg); }
a { color: var(--main); }` },
      { id: "pr4", title: "Add interactivity",
        text: "Add a feature such as a dark mode button or a validated form.",
        code: `document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
};` },
      { id: "pr5", title: "Publish on GitHub Pages",
        text: "Push your code to GitHub, then enable Pages in the repository settings.",
        code: `git add .
git commit -m "Final version"
git push
# Settings > Pages > branch main > Save` }
    ]
  }
];

function isLevelUnlocked(index) {
  return index === 0 || getProgress().levelsDone.includes(LEVELS[index - 1].id);
}
function lessonsDoneCount(level) {
  const p = getProgress();
  return level.lessons.filter(l => p.lessonsDone.includes(l.id)).length;
}