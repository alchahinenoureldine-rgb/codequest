(function () {
  var app = document.getElementById("quizApp");
  var QTIME = { mcq: 20, tf: 12, fill: 20, output: 25, bug: 30 };
  var TOPICS = { all: "All topics", html: "HTML", css: "CSS", js: "JavaScript" };
  var TYPES = { all: "Mixed (all types)", mcq: "Multiple choice", tf: "True / False", bug: "Find the error", output: "Predict the output", fill: "Fill the blank" };
  var TNAME = { mcq: "Multiple choice", tf: "True / False", bug: "Find the error", output: "Predict the output", fill: "Fill the blank" };
  var game = null, timerId = null;

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function field(label, opts, def) {
    var wrap = el("div", "field-row");
    wrap.appendChild(el("label", null, label));
    var sel = document.createElement("select");
    Object.keys(opts).forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.textContent = opts[k];
      if (k === def) o.selected = true;
      sel.appendChild(o);
    });
    wrap.appendChild(sel);
    return { wrap: wrap, sel: sel };
  }
  function prepare(q) {
    var correct = q.o[q.a];
    var opts = q.t === "tf" ? q.o.slice() : shuffle(q.o);
    return { t: q.t, c: q.c, q: q.q, code: q.code, e: q.e, o: opts, a: opts.indexOf(correct) };
  }

  // ---------- Setup screen ----------
  function showSetup() {
    clearInterval(timerId);
    app.innerHTML = "";
    var card = el("div", "card");
    card.appendChild(el("h3", null, "Choose your challenge"));

    var qz = getProgress().quizzes;
    if (qz.length) {
      var sum = 0, best = 0;
      qz.forEach(function (z) {
        var pct = Math.round((z.score / z.total) * 100);
        sum += pct; if (pct > best) best = pct;
      });
      card.appendChild(el("p", "explain", "📈 Quizzes taken: " + qz.length + " · Average: " + Math.round(sum / qz.length) + "% · Best: " + best + "%"));
    }

    var topic = field("Topic", TOPICS, "all");
    var type = field("Question type", TYPES, "all");
    var len = field("Number of questions", { "5": "5 questions", "10": "10 questions", "15": "15 questions" }, "10");
    card.append(topic.wrap, type.wrap, len.wrap);

    var rules = el("p", null, "Every question is shuffled and timed. Each correct answer gives +10 XP, a perfect quiz gives +20 bonus XP, and a 5-answer streak earns a badge.");
    rules.style.marginTop = "1rem";
    card.appendChild(rules);

    var go = el("button", null, "Start quiz");
    go.style.marginTop = "1rem";
    go.onclick = function () {
      var pool = BANK.filter(function (q) {
        return (topic.sel.value === "all" || q.c === topic.sel.value) &&
               (type.sel.value === "all" || q.t === type.sel.value);
      });
      if (!pool.length) { alert("No questions for this choice. Try another one."); return; }
      var n = Math.min(parseInt(len.sel.value, 10), pool.length);
      begin(shuffle(pool).slice(0, n).map(prepare), topic.sel.value, type.sel.value);
    };
    card.appendChild(go);
    app.appendChild(card);
  }

  function begin(qs, topic, type) {
    game = { qs: qs, i: 0, score: 0, streak: 0, best: 0, wrong: [], topic: topic, type: type };
    showQuestion();
  }

  // ---------- Question screen ----------
  function showQuestion() {
    clearInterval(timerId);
    var g = game, q = g.qs[g.i], locked = false;
    app.innerHTML = "";

    var top = el("div", "stats");
    var counter = el("span", null, "Question " + (g.i + 1) + "/" + g.qs.length);
    var scoreSpan = el("span", null, "✅ " + g.score);
    var streakSpan = el("span", null, "🔥 Streak " + g.streak);
    var timerSpan = el("span");
    top.append(counter, scoreSpan, streakSpan, timerSpan);
    app.appendChild(top);

    var bar = el("div", "bar"), fillBar = el("div");
    fillBar.style.width = (g.i / g.qs.length) * 100 + "%";
    bar.appendChild(fillBar);
    app.appendChild(bar);

    var card = el("div", "card");
    card.appendChild(el("span", "tag", TNAME[q.t] + " · " + TOPICS[q.c]));
    card.appendChild(el("h3", null, q.q));
    if (q.code) card.appendChild(el("pre", null, q.code));
    var box = el("div");
    var fb = el("div", "explain"); fb.hidden = true;
    var next = el("button", null, g.i === g.qs.length - 1 ? "See results" : "Next question");
    next.hidden = true; next.style.marginTop = "1rem";
    card.append(box, fb, next);
    app.appendChild(card);

    var buttons = q.o.map(function (text, idx) {
      var b = el("button", "option", text);
      b.onclick = function () { resolve(idx); };
      box.appendChild(b);
      return b;
    });

    function resolve(choice) {
      if (locked) return;
      locked = true; clearInterval(timerId);
      var ok = choice === q.a;
      buttons.forEach(function (b, idx) {
        b.disabled = true;
        if (idx === q.a) b.classList.add("correct");
        else if (idx === choice) b.classList.add("wrong");
      });
      if (ok) { g.score++; g.streak++; if (g.streak > g.best) g.best = g.streak; }
      else { g.streak = 0; g.wrong.push({ q: q, chosen: choice }); }
      scoreSpan.textContent = "✅ " + g.score;
      streakSpan.textContent = "🔥 Streak " + g.streak;
      fb.hidden = false;
      fb.textContent = (choice === -1 ? "⏰ Time is up! " : ok ? "✅ Correct! " : "❌ Not quite. ") +
        "Answer: " + q.o[q.a] + ". " + (q.e || "");
      next.hidden = false;
    }

    var time = QTIME[q.t];
    timerSpan.textContent = "⏱️ " + time + "s";
    timerId = setInterval(function () {
      time--;
      timerSpan.textContent = "⏱️ " + time + "s";
      if (time <= 0) resolve(-1);
    }, 1000);

    next.onclick = function () {
      g.i++;
      if (g.i >= g.qs.length) showResults(); else showQuestion();
    };
  }

  // ---------- Results screen ----------
  function showResults() {
    var g = game, total = g.qs.length;
    var pct = Math.round((g.score / total) * 100);
    var xp = g.score * 10 + (g.score === total ? 20 : 0);

    var p = getProgress();
    p.quizzes.push({ date: new Date().toLocaleDateString(), score: g.score, total: total, topic: g.topic, type: g.type });
    store.set("progress", p);
    addXP(xp, g.score === total ? "Perfect Score" : null);
    if (g.best >= 5) addXP(0, "Streak Master");

    app.innerHTML = "";
    var card = el("div", "card");
    var msg = pct >= 90 ? "🏆 Excellent!" : pct >= 70 ? "👏 Great job!" : pct >= 50 ? "👍 Good effort!" : "📚 Keep practicing!";
    card.appendChild(el("h3", null, msg));
    card.appendChild(el("div", "big", g.score + "/" + total + " (" + pct + "%)"));
    card.appendChild(el("p", null, "+" + xp + " XP · Best streak: " + g.best + " 🔥"));

    var row = el("div");
    row.style.marginTop = "1rem";
    var again = el("button", null, "Play again");
    again.onclick = function () {
      var pool = BANK.filter(function (q) {
        return (g.topic === "all" || q.c === g.topic) && (g.type === "all" || q.t === g.type);
      });
      begin(shuffle(pool).slice(0, total).map(prepare), g.topic, g.type);
    };
    var change = el("button", null, "Change settings");
    change.style.marginLeft = ".5rem";
    change.onclick = showSetup;
    row.append(again, change);
    if (g.wrong.length) {
      var retry = el("button", null, "Practice my mistakes");
      retry.style.marginLeft = ".5rem";
      retry.onclick = function () {
        begin(g.wrong.map(function (w) { return prepare({ t: w.q.t, c: w.q.c, q: w.q.q, code: w.q.code, e: w.q.e, o: w.q.o, a: w.q.a }); }), g.topic, g.type);
      };
      row.appendChild(retry);
    }
    card.appendChild(row);
    app.appendChild(card);

    if (g.wrong.length) {
      var rev = el("div", "card");
      rev.style.marginTop = "1rem";
      rev.appendChild(el("h3", null, "Review your mistakes"));
      g.wrong.forEach(function (w) {
        var item = el("div", "review");
        item.appendChild(el("strong", null, w.q.q));
        if (w.q.code) item.appendChild(el("pre", null, w.q.code));
        item.appendChild(el("p", null, "Your answer: " + (w.chosen === -1 ? "no answer (time up)" : w.q.o[w.chosen])));
        item.appendChild(el("p", null, "Correct answer: " + w.q.o[w.q.a]));
        item.appendChild(el("p", null, "💡 " + (w.q.e || "")));
        rev.appendChild(item);
      });
      app.appendChild(rev);
    }
  }

  showSetup();
})();