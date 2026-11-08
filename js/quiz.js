const questions = [
  { q: "Which tag creates a hyperlink?", o: ["<link>", "<a>", "<href>", "<p>"], a: 1 },
  { q: "Which CSS property changes text color?", o: ["font-color", "text-style", "color", "fg"], a: 2 },
  { q: "Which method selects an element by id?", o: ["getElementById", "queryAll", "findId", "select"], a: 0 },
  { q: "Which keyword declares a constant in JS?", o: ["var", "let", "const", "static"], a: 2 }
];
let current = 0, score = 0, time = 20, interval;

function loadQuestion() {
  if (current >= questions.length) return finish();
  const item = questions[current];
  document.getElementById("question").textContent = item.q;
  const box = document.getElementById("options");
  box.innerHTML = "";
  item.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.onclick = () => answer(i, btn);
    box.appendChild(btn);
  });
  time = 20;
  clearInterval(interval);
  interval = setInterval(() => {
    document.getElementById("timer").textContent = --time;
    if (time <= 0) { current++; loadQuestion(); }
  }, 1000);
}

function answer(i, btn) {
  clearInterval(interval);
  const right = questions[current].a;
  btn.classList.add(i === right ? "correct" : "wrong");
  if (i === right) score++;
  document.querySelectorAll(".option").forEach(b => b.disabled = true);
  setTimeout(() => { current++; loadQuestion(); }, 900);
}

function finish() {
  clearInterval(interval);
  const xp = score * 20;
  document.getElementById("options").innerHTML = "";
  document.getElementById("question").textContent = "Quiz complete!";
  document.getElementById("result").textContent = `Score: ${score}/${questions.length} · +${xp} XP`;
  const p = getProgress();
  p.quizzes.push({ date: new Date().toLocaleDateString(), score, total: questions.length });
  store.set("progress", p);
  addXP(xp, score === questions.length ? "Perfect Score" : null);
}
loadQuestion();