function renderLevels() {
  const p = getProgress();
  const box = document.getElementById("levels");
  box.innerHTML = '<p class="explain">💡 Lessons unlock the next level. Mastery (lessons + lesson quizzes + Quiz Arena) upgrades your badge: 🥉 25 · 🥈 50 · 🥇 75 · 💎 100.</p>';

  LEVELS.forEach((level, i) => {
    const unlocked = isLevelUnlocked(i);
    const done = p.levelsDone.includes(level.id);
    const count = lessonsDoneCount(level);
    const pct = (count / level.lessons.length) * 100;
    const score = masteryOf(level, p);
    const t = tierOf(score);
    const next = TIERS[t + 1];
    const badgeText = t >= 0 ? TIERS[t].icon + " " + TIERS[t].name : "No badge yet";
    const nextText = next ? " · next: " + next.icon + " at " + next.at : " · Maxed!";

    const card = document.createElement("div");
    card.className = "card level" + (done ? " done" : "") + (unlocked ? "" : " locked");
    card.innerHTML =
      '<div style="flex:1">' +
      "<h3>" + (unlocked ? "" : "🔒 ") + level.title + "</h3>" +
      "<p>" + level.info + "</p>" +
      '<div class="bar"><div style="width:' + pct + '%"></div></div>' +
      "<small>" + count + "/" + level.lessons.length + " lessons completed</small>" +
      '<div class="bar mastery"><div style="width:' + score + '%"></div></div>' +
      "<small>⭐ Mastery " + score + "/100 · " + badgeText + nextText + "</small>" +
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