let openLesson = null;
let firstRender = true;

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
  renderLessons();
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
    title.textContent = (unlocked ? "" : "🔒 ") + level.title + " (" + count + "/" + level.lessons.length + ")";
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

      d.append(s, text, pre, btn);
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