const p = getProgress();
document.getElementById("levelText").textContent = `Level ${Math.floor(p.xp / 100) + 1}`;
document.getElementById("xpBar").style.width = (p.xp % 100) + "%";
document.getElementById("xpText").textContent = `${p.xp} XP total · ${100 - (p.xp % 100)} XP to next level`;

const badges = document.getElementById("badges");
badges.innerHTML = p.badges.length
  ? p.badges.map(b => `<span class="badge">${b}</span>`).join("")
  : "<p>No badges yet. Complete levels and quizzes!</p>";

const chart = document.getElementById("chart");
const history = document.getElementById("history");
if (p.quizzes.length === 0) {
  chart.innerHTML = "<p>Take a quiz to see your chart.</p>";
  history.innerHTML = "<li>No quizzes yet.</li>";
} else {
  p.quizzes.slice(-8).forEach(z => {
    const pct = Math.round((z.score / z.total) * 100);
    chart.innerHTML += `<div style="height:${pct}%">${pct}%</div>`;
  });
  history.innerHTML = p.quizzes.slice().reverse()
    .map(z => `<li>${z.date}: ${z.score}/${z.total}</li>`).join("");
}

document.getElementById("resetAll").onclick = () => {
  if (confirm("Delete all progress?")) {
    localStorage.removeItem("progress");
    location.reload();
  }
};