const config = window.SITE_CONFIG;
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let activeCategory = "全部";
let notes = [...config.notes, ...JSON.parse(localStorage.getItem("localNotes") || "[]")];

document.querySelectorAll("[data-site-title]").forEach(el => el.textContent = config.title);
document.querySelector("[data-site-subtitle]").textContent = config.subtitle;
document.title = config.title;
$("#year").textContent = new Date().getFullYear();

function renderFilters() {
  const categories = ["全部", ...new Set(notes.map(note => note.category))];
  $("#filters").innerHTML = categories.map(category => `<button class="filter ${category === activeCategory ? "active" : ""}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => { activeCategory = button.dataset.category; renderFilters(); renderNotes(); }));
}

function renderNotes() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const filtered = notes.filter(note => (activeCategory === "全部" || note.category === activeCategory) && `${note.title} ${note.summary} ${note.category}`.toLowerCase().includes(query));
  $("#noteCount").textContent = `${filtered.length} 篇笔记`;
  $("#emptyState").hidden = filtered.length > 0;
  $("#notesGrid").innerHTML = filtered.map((note, index) => `<article class="note-card" tabindex="0" data-id="${notes.indexOf(note)}" style="--card-color:${note.color || "#58766a"};animation-delay:${index * 45}ms"><span class="note-category">${escapeHtml(note.category.toUpperCase())}</span><h3>${escapeHtml(note.title)}</h3><p>${escapeHtml(note.summary)}</p><div class="note-footer"><span>${escapeHtml(note.date)} · ${escapeHtml(note.readTime)}</span><span class="note-arrow">↗</span></div></article>`).join("");
  document.querySelectorAll(".note-card").forEach(card => { const open = () => openNote(notes[Number(card.dataset.id)]); card.addEventListener("click", open); card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") open(); }); });
}

function markdown(source) {
  let text = escapeHtml(source).replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  text = text.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/^&gt; (.+)$/gm,"<blockquote>$1</blockquote>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>').replace(/^- (.+)$/gm,"<li>$1</li>");
  text = text.replace(/(?:<li>.*<\/li>\n?)+/g, list => `<ul>${list}</ul>`).split(/\n{2,}/).map(block => /^<(h\d|pre|blockquote|ul)/.test(block) ? block : `<p>${block.replace(/\n/g,"<br>")}</p>`).join("");
  return text;
}

async function openNote(note) {
  try {
    const source = note.content ?? await fetch(note.file).then(response => { if (!response.ok) throw new Error(); return response.text(); });
    $("#dialogMeta").textContent = `${note.category} · ${note.date} · ${note.readTime}`;
    $("#noteContent").innerHTML = markdown(source);
    $("#noteDialog").showModal();
  } catch { showToast("无法读取笔记。请通过本地服务器或 GitHub Pages 打开网页"); }
}

function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200); }

$("#searchInput").addEventListener("input", renderNotes);
document.addEventListener("keydown", event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#searchInput").focus(); } });
$("#closeNote").addEventListener("click", () => $("#noteDialog").close());
$("#noteDialog").addEventListener("click", event => { if (event.target === $("#noteDialog")) $("#noteDialog").close(); });

const customizer = $("#customizer"), backdrop = $("#backdrop");
function toggleCustomizer(open) { customizer.classList.toggle("open", open); customizer.setAttribute("aria-hidden", String(!open)); backdrop.hidden = !open; }
$("#themeButton").addEventListener("click", () => toggleCustomizer(true));
$("#closeCustomizer").addEventListener("click", () => toggleCustomizer(false));
backdrop.addEventListener("click", () => toggleCustomizer(false));

function setBackground(value, save = true) { document.documentElement.style.setProperty("--wallpaper", value); if (save) localStorage.setItem("siteBackground", value); document.querySelectorAll(".background-option").forEach(el => el.classList.toggle("active", el.dataset.value === value)); }
$("#backgroundGrid").innerHTML = config.backgrounds.map(bg => `<button class="background-option" style="background:${bg.value}" data-value="${bg.value}" title="${escapeHtml(bg.name)}" aria-label="${escapeHtml(bg.name)}"></button>`).join("");
document.querySelectorAll(".background-option").forEach(button => button.addEventListener("click", () => setBackground(button.dataset.value)));
const savedBackground = localStorage.getItem("siteBackground"); if (savedBackground) setBackground(savedBackground, false);
$("#backgroundInput").addEventListener("change", event => { const file = event.target.files[0]; if (!file) return; if (file.size > 4 * 1024 * 1024) return showToast("图片过大，请选择小于 4MB 的图片"); const reader = new FileReader(); reader.onload = () => { setBackground(`url('${reader.result}')`); showToast("背景已保存到当前浏览器"); }; reader.readAsDataURL(file); });
$("#resetBackground").addEventListener("click", () => { localStorage.removeItem("siteBackground"); setBackground(config.backgrounds[0].value, false); });

$("#importButton").addEventListener("click", () => $("#noteFileInput").click());
$("#noteFileInput").addEventListener("change", async event => {
  const imported = await Promise.all([...event.target.files].map(async file => ({ title: file.name.replace(/\.(md|markdown|txt)$/i,""), summary: "从本地导入的学习笔记（仅保存在当前浏览器）", category: "本地笔记", date: new Date().toISOString().slice(0,10), readTime: `${Math.max(1, Math.ceil((await file.text()).length / 600))} 分钟`, color: "#e47050", content: await file.text() })));
  const localNotes = [...JSON.parse(localStorage.getItem("localNotes") || "[]"), ...imported]; localStorage.setItem("localNotes", JSON.stringify(localNotes)); notes.push(...imported); activeCategory = "全部"; renderFilters(); renderNotes(); showToast(`已导入 ${imported.length} 篇，仅保存在当前浏览器`); event.target.value = "";
});

renderFilters(); renderNotes();
