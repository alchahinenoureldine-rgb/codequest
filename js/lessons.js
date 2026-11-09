let openLesson = null;
let firstRender = true;

function shuffleArr(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function completeLesson(levelIndex, lessonId) {
  const level = LEVELS[levelIndex];
  const p = getProgress();
  if (p.lessonsDone.includes(lessonId)) return;

  p.lessonsDone.push(lessonId);
  const allDone = level.lessons.every(l => p.lessonsDone.includes(l.id));
  if (allDone && !p.levelsDone.includes(level.id)) p.levelsDone.push(level.id);
  store.set("progress", p);

  addXP(10);
  if (allDone) {
    addXP(50, level.title.split(":")[0] + " Done");
        alert("🎉 " + level.title + " completed! +50 XP. The next level is unlocked.");
  }
  checkMastery();
  renderLessons();
}


// Optional quick quiz: 5 questions, +2 XP for each new correct answer (best score counts)
function buildMiniQuiz(lesson) {
  const wrap = document.createElement("div");
  wrap.className = "mini";
  const data = typeof LESSON_QUIZZES !== "undefined" ? LESSON_QUIZZES[lesson.id] : null;
  if (!data) return wrap;

  const label = () => {
    const best = (getProgress().lessonQuiz || {})[lesson.id];
    return "📝 Quick quiz (optional)" + (best !== undefined ? " · best " + best + "/5" : "");
  };
  const toggle = document.createElement("button");
  toggle.textContent = label();
  const panel = document.createElement("div");
  panel.hidden = true;
  toggle.onclick = () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden && !panel.hasChildNodes()) renderQuiz();
  };
  wrap.append(toggle, panel);

  function renderQuiz() {
    panel.innerHTML = "";
    const picked = [];
    const buttons = [];
    const qs = data.map(item => {
      const correct = item[1][item[2]];
      const opts = shuffleArr(item[1]);
      return { q: item[0], opts: opts, answer: opts.indexOf(correct) };
    });

    qs.forEach((qq, qi) => {
      const block = document.createElement("div");
      block.className = "mq";
      const h = document.createElement("h4");
      h.textContent = (qi + 1) + ". " + qq.q;
      block.appendChild(h);
      buttons[qi] = [];
      qq.opts.forEach((text, oi) => {
        const b = document.createElement("button");
        b.className = "option";
        b.textContent = text;
        b.onclick = () => {
          picked[qi] = oi;
          buttons[qi].forEach(x => x.classList.remove("selected"));
          b.classList.add("selected");
        };
        buttons[qi].push(b);
        block.appendChild(b);
      });
      panel.appendChild(block);
    });

    const result = document.createElement("p");
    result.className = "explain";
    result.hidden = true;
    const retry = document.createElement("button");
    retry.textContent = "Try again";
    retry.hidden = true;
    retry.onclick = renderQuiz;
    const check = document.createElement("button");
    check.textContent = "Check answers";

    check.onclick = () => {
      let score = 0;
      qs.forEach((qq, qi) => {
        buttons[qi].forEach((b, oi) => {
          b.disabled = true;
          b.classList.remove("selected");
          if (oi === qq.answer) b.classList.add("correct");
          else if (oi === picked[qi]) b.classList.add("wrong");
        });
        if (picked[qi] === qq.answer) score++;
      });

      const prog = getProgress();
      prog.lessonQuiz = prog.lessonQuiz || {};
      const prev = prog.lessonQuiz[lesson.id] || 0;
      let gain = 0;
      if (score > prev) {
        gain = (score - prev) * 2;
        prog.lessonQuiz[lesson.id] = score;
        store.set("progress", prog);
        addXP(gain, score === 5 ? "Quiz Ace" : null);
      }
      result.textContent = "Score: " + score + "/5 · " +
        (gain ? "+" + gain + " XP" : "no new XP (beat your best score to earn more)");
      result.hidden = false;
      check.hidden = true;
      retry.hidden = false;
      toggle.textContent = label();
      checkMastery();
    };
    panel.append(check, result, retry);
  }
  return wrap;
}

function renderLessons() {
  const scroll = window.scrollY;
  const p = getProgress();
  const box = document.getElementById("lessonList");
  box.innerHTML = "";

  LEVELS.forEach((level, i) => {
    const unlocked = isLevelUnlocked(i);
    const count = lessonsDoneCount(level);

    const section = document.createElement("section");
    section.id = level.id;
    section.className = "level-section";

    const title = document.createElement("h3");
        title.textContent = (unlocked ? "" : "🔒 ") + level.title + " (" + count + "/" + level.lessons.length + ")" + masteryLabel(level);
    section.appendChild(title);

    if (!unlocked) {
      const note = document.createElement("p");
      note.textContent = "Finish all 5 lessons of the previous level to unlock this level.";
      section.appendChild(note);
      section.classList.add("locked");
      box.appendChild(section);
      return;
    }

    level.lessons.forEach((lesson, n) => {
      const done = p.lessonsDone.includes(lesson.id);
      const d = document.createElement("details");
      d.open = lesson.id === openLesson;
      d.addEventListener("toggle", () => { if (d.open) openLesson = lesson.id; });

      const s = document.createElement("summary");
      s.textContent = (done ? "✅ " : "📘 ") + "Lesson " + (n + 1) + ": " + lesson.title;

      const text = document.createElement("p");
      text.textContent = lesson.text;

      const pre = document.createElement("pre");
      pre.textContent = lesson.code;

      const btn = document.createElement("button");
      btn.textContent = done ? "Completed ✔" : "Mark as complete (+10 XP)";
      btn.disabled = done;
      btn.style.marginTop = ".8rem";
      btn.onclick = () => { openLesson = lesson.id; completeLesson(i, lesson.id); };

      d.append(s, text, pre, btn, buildMiniQuiz(lesson));
      section.appendChild(d);
    });

    box.appendChild(section);
  });

  if (firstRender && location.hash) {
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  } else {
    window.scrollTo(0, scroll);
  }
  firstRender = false;
}

renderLessons();