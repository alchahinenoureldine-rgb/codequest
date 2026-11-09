// Mastery: each level has a 0-100 score.
// Lessons +6 each, lesson quick quiz +1 per correct answer, Quiz Arena +4 per different correct question.
const MASTERY_NAMES = { html: "HTML", css: "CSS", js: "JavaScript", project: "Project" };
const TIERS = [
  { name: "Bronze", icon: "🥉", at: 25 },
  { name: "Silver", icon: "🥈", at: 50 },
  { name: "Gold", icon: "🥇", at: 75 },
  { name: "Master", icon: "💎", at: 100 }
];

function masteryOf(level, prog) {
  const p = prog || getProgress();
  const lessons = level.lessons.filter(l => p.lessonsDone.includes(l.id)).length * 6;
  let quick = 0;
  level.lessons.forEach(l => { quick += (p.lessonQuiz && p.lessonQuiz[l.id]) || 0; });
  const arena = ((p.arenaDone && p.arenaDone[level.id]) || []).length * 4;
  return Math.min(100, lessons + quick + arena);
}

function tierOf(score) {
  let t = -1;
  TIERS.forEach((x, i) => { if (score >= x.at) t = i; });
  return t;
}

function masteryLabel(level) {
  const t = tierOf(masteryOf(level));
  return t >= 0 ? " · " + TIERS[t].icon + " " + TIERS[t].name : "";
}

function showToast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4500);
}

// Gives new tier badges (+20 XP each). Returns the list of new badges.
function checkMastery() {
  const p = getProgress();
  const earned = [];
  LEVELS.forEach(level => {
    const t = tierOf(masteryOf(level, p));
    for (let i = 0; i <= t; i++) {
      const name = MASTERY_NAMES[level.id] + " " + TIERS[i].name;
      if (!p.badges.includes(name)) {
        p.badges.push(name);
        earned.push(TIERS[i].icon + " " + name);
      }
    }
  });
  if (earned.length) {
    p.xp += earned.length * 20;
    store.set("progress", p);
    showXP();
    showToast("New badge: " + earned.join(", ") + " (+" + earned.length * 20 + " XP)");
  }
  return earned;
}