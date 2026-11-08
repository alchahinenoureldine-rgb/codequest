const htmlEl = document.getElementById("html");
const cssEl = document.getElementById("css");
const jsEl = document.getElementById("js");
const preview = document.getElementById("preview");

const defaults = {
  html: "<h1>Hello CodeQuest!</h1>\n<button id='b'>Click me</button>",
  css: "h1 { color: teal; }",
  js: "document.getElementById('b').onclick = () => alert('You did it!');"
};
const saved = store.get("playground", defaults);
htmlEl.value = saved.html; cssEl.value = saved.css; jsEl.value = saved.js;

function run() {
  preview.srcdoc = `<style>${cssEl.value}</style>${htmlEl.value}<script>${jsEl.value}<\/script>`;
}
[htmlEl, cssEl, jsEl].forEach(el => el.addEventListener("input", run));

document.getElementById("save").onclick = () => {
  store.set("playground", { html: htmlEl.value, css: cssEl.value, js: jsEl.value });
  addXP(5, "First Save");
  alert("Saved! +5 XP");
};
document.getElementById("reset").onclick = () => {
  htmlEl.value = defaults.html; cssEl.value = defaults.css; jsEl.value = defaults.js; run();
};
run();