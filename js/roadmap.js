function renderLevels() {
  const p = getProgress();
  const box = document.getElementById("levels");
  box.innerHTML = "";

  LEVELS.forEach((level, i) => {
    const unlocked = isLevelUnlocked(i);
    const done = p.levelsDone.includes(level.id);
    const count = lessonsDoneCount(level);
    const pct = (count / level.lessons.length) * 100;

    const card = document.createElement("div");
    card.className = "card level" + (done ? " done" : "") + (unlocked ? "" : " locked");
    card.innerHTML =
      '<div style="flex:1">' +
      "<h3>" + (unlocked ? "" : "🔒 ") + level.title + "</h3>" +
      "<p>" + level.info + "</p>" +
      '<div class="bar"><div style="width:' + pct + '%"></div></div>' +
      "<small>" + count + "/" + level.lessons.length + " lessons completed</small>" +
      "</div>";

    if (unlocked) {
      const a = document.createElement("a");
      a.className = "btn";
      a.href = "lessons.html#" + level.id;
      a.textContent = done ? "Review lessons" : count > 0 ? "Continue" : "Start";
      card.appendChild(a);
    } else {
      const b = document.createElement("button");
      b.textContent = "Locked";
      b.disabled = true;
      card.appendChild(b);
    }
    box.appendChild(card);
  });
}
renderLevels();