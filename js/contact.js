document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();
  let valid = true;

  const setErr = (id, text) => { document.getElementById(id).textContent = text; if (text) valid = false; };
  setErr("nameErr", name.length < 3 ? "Name must be at least 3 characters." : "");
  setErr("emailErr", /^\S+@\S+\.\S+$/.test(email) ? "" : "Enter a valid email address.");
  setErr("msgErr", msg.length < 10 ? "Message must be at least 10 characters." : "");

  const ok = document.getElementById("ok");
  if (valid) {
    const list = store.get("messages", []);
    list.push({ name, email, msg, date: new Date().toLocaleString() });
    store.set("messages", list);
    ok.textContent = "Thank you " + name + "! Your message was received.";
    e.target.reset();
  } else {
    ok.textContent = "";
  }
});