const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

// Dark / light mode
if (store.get("theme", "dark") === "light") document.body.classList.add("light");
document.getElementById("themeBtn")?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  store.set("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// XP and levels (100 XP per level)
function getProgress() {
  return store.get("progress", { xp: 0, badges: [], quizzes: [], levelsDone: [] });
}
function addXP(amount, badge) {
  const p = getProgress();
  p.xp += amount;
  if (badge && !p.badges.includes(badge)) p.badges.push(badge);
  store.set("progress", p);
  showXP();
}
function showXP() {
  const p = getProgress();
  const el = document.getElementById("xpBadge");
  if (el) el.textContent = `Lv ${Math.floor(p.xp / 100) + 1} · ${p.xp} XP`;
}
showXP();