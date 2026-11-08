const levels = [
  { id: "html", title: "Level 1: HTML Basics", info: "Tags, links, images, lists, forms." },
  { id: "css", title: "Level 2: CSS Styling", info: "Selectors, colors, flexbox, grid." },
  { id: "js", title: "Level 3: JavaScript Logic", info: "Variables, functions, DOM, events." },
  { id: "project", title: "Level 4: Final Project", info: "Build a small website by yourself." }
];

function renderLevels() {
  const p = getProgress();
  const box = document.getElementById("levels");
  box.innerHTML = "";
  levels.forEach((lv, i) => {
    const done = p.levelsDone.includes(lv.id);
    const unlocked = i === 0 || p.levelsDone.includes(levels[i - 1].id);
    const card = document.createElement("div");
    card.className = "card level" + (done ? " done" : "") + (unlocked ? "" : " locked");
    card.innerHTML = `<div><h3>${unlocked ? "" : "🔒 "}${lv.title}</h3><p>${lv.info}</p></div>`;
    const btn = document.createElement("button");
    btn.textContent = done ? "Completed ✔" : "Complete level (+50 XP)";
    btn.disabled = done || !unlocked;
    btn.onclick = () => {
      const prog = getProgress();
      prog.levelsDone.push(lv.id);
      store.set("progress", prog);
      addXP(50, lv.id === "project" ? "Quest Master" : lv.title.split(":")[0] + " Done");
      renderLevels();
    };
    card.appendChild(btn);
    box.appendChild(card);
  });
}
renderLevels();