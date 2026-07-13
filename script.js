const config = window.PORTFOLIO_CONFIG;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
let activeCategory = "全部";
let calendarCursor = new Date();
let selectedActivityDate = "";

function fillProfile() {
  const p = config.profile;
  $$('[data-full-name]').forEach(el => el.textContent = p.fullName);
  $$('[data-first-name]').forEach(el => el.textContent = p.firstName);
  $$('[data-last-name]').forEach(el => el.textContent = p.lastName);
  $$('[data-initial]').forEach(el => el.textContent = p.initial);
  $$('[data-location]').forEach(el => el.textContent = p.location);
  $('[data-profile-intro]').textContent = p.intro;
  $('[data-about-lead]').textContent = p.aboutLead;
  $('[data-about-detail]').textContent = p.aboutDetail;
  $('[data-motto]').textContent = p.motto;
  $('#heroPrimaryRole').textContent = p.roles[0];
  document.title = `${p.fullName} · Personal Space`;
}

function renderStaticSections() {
  $('#quickFacts').innerHTML = config.facts.map(fact => `<div class="fact"><span>${escapeHtml(fact.label.toUpperCase())}</span><strong>${escapeHtml(fact.value)}</strong></div>`).join('');
  $('#skillCloud').innerHTML = config.skills.map((skill, index) => `<div class="skill-pill"><span>0${index + 1}</span>${escapeHtml(skill.name)}</div>`).join('');
  $('#skillBars').innerHTML = config.skills.slice(0, 5).map(skill => `<div class="skill-row"><header><span>${escapeHtml(skill.name)}</span><span>${skill.level}%</span></header><div class="skill-bar"><i style="--level:${skill.level}%"></i></div></div>`).join('');
  $('#timeline').innerHTML = config.timeline.map((item, index) => `<article class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 60}"><div class="timeline-period">${escapeHtml(item.period)}</div><div><span class="timeline-type">${escapeHtml(item.type.toUpperCase())}</span><h3>${escapeHtml(item.title)}</h3><strong class="timeline-place">${escapeHtml(item.place)}</strong><p>${escapeHtml(item.description)}</p></div></article>`).join('');
  $('#heroQuickInfo').innerHTML = config.facts.map(fact => `<div><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value)}</strong></div>`).join('');
  $('#heroSocialLinks').innerHTML = config.social.map(item => `<a href="${escapeHtml(item.url)}" ${item.url.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''} aria-label="${escapeHtml(item.label)}"><i data-lucide="${escapeHtml(item.icon)}"></i><span>${escapeHtml(item.label)}</span></a>`).join('');
}

function typeRoles() {
  const target = $('#typedRole');
  if (!target || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let roleIndex = 0, charIndex = config.profile.roles[0].length, deleting = true;
  setInterval(() => {
    const role = config.profile.roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = role.slice(0, Math.max(0, charIndex)) + (charIndex % 2 ? '|' : '');
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % config.profile.roles.length; }
    if (charIndex >= config.profile.roles[roleIndex].length) deleting = true;
  }, 115);
}

function renderFilters() {
  const categories = ['全部', ...new Set(config.notes.map(note => note.category))];
  $('#noteFilters').innerHTML = categories.map(category => `<button class="note-filter ${category === activeCategory ? 'active' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  $$('.note-filter').forEach(button => button.addEventListener('click', () => { activeCategory = button.dataset.category; renderFilters(); renderNotes(); }));
}

function renderNotes() {
  const query = $('#noteSearch').value.trim().toLowerCase();
  const notes = config.notes.filter(note => (activeCategory === '全部' || note.category === activeCategory) && `${note.title} ${note.summary} ${note.category}`.toLowerCase().includes(query));
  $('#emptyState').hidden = notes.length > 0;
  $('#noteGrid').innerHTML = notes.map((note, index) => `<article class="note-card" tabindex="0" data-note-index="${config.notes.indexOf(note)}" style="--note-color:${note.color}" data-aos="fade-up" data-aos-delay="${index * 70}" data-tilt data-tilt-max="2"><span class="note-index">0${config.notes.indexOf(note) + 1} / ${escapeHtml(note.category)}</span><h3>${escapeHtml(note.title)}</h3><p>${escapeHtml(note.summary)}</p><footer><span>${escapeHtml(note.date)} · ${escapeHtml(note.readTime)}</span><span class="arrow">↗</span></footer></article>`).join('');
  $$('.note-card').forEach(card => {
    const open = () => openNote(config.notes[Number(card.dataset.noteIndex)]);
    card.addEventListener('click', open);
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(); });
  });
  if (window.VanillaTilt) VanillaTilt.init($$('[data-tilt]'), { glare: true, 'max-glare': .08 });
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function renderActivityList(events = config.activity) {
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  $('#activityCount').textContent = sorted.length;
  $('#activityList').innerHTML = sorted.length ? sorted.slice(0, 8).map(event => `
    <article class="activity-item">
      <div class="activity-icon ${event.type === 'note' ? 'note' : ''}"><i data-lucide="${event.type === 'note' ? 'file-text' : 'wand-sparkles'}"></i></div>
      <div><time>${escapeHtml(event.date)}</time><h4>${escapeHtml(event.title)}</h4><p>${escapeHtml(event.detail)}</p></div>
    </article>`).join('') : '<div class="empty-state">这一天还没有记录。</div>';
  if (window.lucide) lucide.createIcons();
}

function renderCalendar() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - startOffset);
  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  $('#calendarYear').textContent = year;
  $('#calendarMonth').textContent = monthNames[month];
  const days = [];
  for (let index = 0; index < 42; index++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const key = dateKey(date.getFullYear(), date.getMonth(), date.getDate());
    const events = config.activity.filter(event => event.date === key);
    const isToday = key === dateKey(today.getFullYear(), today.getMonth(), today.getDate());
    days.push(`<button class="calendar-day ${date.getMonth() !== month ? 'muted' : ''} ${isToday ? 'today' : ''} ${selectedActivityDate === key ? 'selected' : ''}" data-date="${key}" aria-label="${key}${events.length ? `，${events.length} 条记录` : ''}"><span class="day-number">${date.getDate()}</span>${events.length ? `<span class="event-dots">${events.slice(0, 3).map(event => `<i class="event-dot ${event.type === 'note' ? 'note' : ''}"></i>`).join('')}</span>` : ''}</button>`);
  }
  $('#calendarGrid').innerHTML = days.join('');
  $$('.calendar-day').forEach(button => button.addEventListener('click', () => {
    selectedActivityDate = selectedActivityDate === button.dataset.date ? '' : button.dataset.date;
    renderCalendar();
    renderActivityList(selectedActivityDate ? config.activity.filter(event => event.date === selectedActivityDate) : config.activity);
  }));
}

function markdown(source) {
  let text = escapeHtml(source).replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>').replace(/^- (.+)$/gm, '<li>$1</li>');
  text = text.replace(/(?:<li>.*<\/li>\n?)+/g, list => `<ul>${list}</ul>`).split(/\n{2,}/).map(block => /^<(h\d|pre|blockquote|ul)/.test(block) ? block : `<p>${block.replace(/\n/g, '<br>')}</p>`).join('');
  return text;
}

async function openNote(note) {
  try {
    const response = await fetch(note.file);
    if (!response.ok) throw new Error();
    $('#dialogMeta').textContent = `${note.category} · ${note.date} · ${note.readTime}`;
    $('#noteContent').innerHTML = markdown(await response.text());
    $('#noteDialog').showModal();
  } catch { showToast('无法读取笔记；请通过 GitHub Pages 或本地服务器访问'); }
}

function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  $('#pageProgress').style.width = `${scrollable > 0 ? scrollY / scrollable * 100 : 0}%`;
  $('#siteHeader').classList.toggle('scrolled', scrollY > 30);
  let current = '';
  $$('main section[id]').forEach(section => { if (scrollY >= section.offsetTop - 180) current = section.id; });
  $$('#mainNav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}

function localClock() {
  $('#localTime').textContent = `${new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())} CST`;
}

const appearancePanel = $('#appearancePanel');
function togglePanel(open) { appearancePanel.classList.toggle('open', open); appearancePanel.setAttribute('aria-hidden', String(!open)); $('#panelBackdrop').hidden = !open; }
function applyTheme(theme, save = true) {
  const root = document.documentElement;
  root.style.setProperty('--accent', theme.accent); root.style.setProperty('--accent-2', theme.accent2); root.style.setProperty('--bg', theme.bg); root.style.setProperty('--ink', theme.ink);
  if (save) localStorage.setItem('portfolioTheme', theme.name);
  $$('.theme-option').forEach(button => button.classList.toggle('active', button.dataset.theme === theme.name));
}
function renderThemes() {
  $('#themeOptions').innerHTML = config.themes.map(theme => `<button class="theme-option" data-theme="${escapeHtml(theme.name)}"><span class="theme-swatch"><i style="background:${theme.accent}"></i><i style="background:${theme.accent2}"></i></span>${escapeHtml(theme.name)}</button>`).join('');
  $$('.theme-option').forEach(button => button.addEventListener('click', () => applyTheme(config.themes.find(theme => theme.name === button.dataset.theme))));
  const saved = localStorage.getItem('portfolioTheme');
  applyTheme(config.themes.find(theme => theme.name === saved) || config.themes[0], false);
}

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 3000); }

function initDinoCanvas() {
  const canvas = $('#dinoCanvas');
  const runner = $('.dino-runner');
  if (!canvas || !runner) return;
  const context = canvas.getContext('2d');
  const sprite = new Image();
  // Native 2x sprite frames. Canvas and CSS use the same 88:94 ratio.
  const frame = { y: 2, width: 88, height: 94, jumpX: 1678, runX: [1854, 1942] };
  let lastFrame = -1;

  const paintFrame = sourceX => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;
    context.drawImage(sprite, sourceX, frame.y, frame.width, frame.height, 0, 0, canvas.width, canvas.height);
  };

  sprite.onload = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return paintFrame(frame.jumpX);
    const animate = time => {
      const jumpAnimation = runner.getAnimations().find(animation => animation.animationName === 'dinoJump');
      const cycleTime = Number(jumpAnimation?.currentTime || 0) % 2400;
      const jumping = cycleTime >= 576 && cycleTime < 1680;
      const nextFrame = jumping ? 2 : Math.floor(time / 115) % 2;
      if (nextFrame !== lastFrame) {
        paintFrame(nextFrame === 2 ? frame.jumpX : frame.runX[nextFrame]);
        lastFrame = nextFrame;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };
  sprite.src = 'assets/dino-sprite-sheet.png?v=20260713-10';
}

fillProfile(); renderStaticSections(); renderFilters(); renderNotes(); renderCalendar(); renderActivityList(); renderThemes(); typeRoles(); initDinoCanvas(); localClock(); setInterval(localClock, 30000);
$('#year').textContent = new Date().getFullYear();
$('#noteSearch').addEventListener('input', renderNotes);
$('#calendarPrev').addEventListener('click', () => { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1); selectedActivityDate = ''; renderCalendar(); renderActivityList(); });
$('#calendarNext').addEventListener('click', () => { calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1); selectedActivityDate = ''; renderCalendar(); renderActivityList(); });
$('#calendarToday').addEventListener('click', () => { calendarCursor = new Date(); selectedActivityDate = dateKey(calendarCursor.getFullYear(), calendarCursor.getMonth(), calendarCursor.getDate()); renderCalendar(); renderActivityList(config.activity.filter(event => event.date === selectedActivityDate)); });
$('#closeNote').addEventListener('click', () => $('#noteDialog').close());
$('#noteDialog').addEventListener('click', event => { if (event.target === $('#noteDialog')) $('#noteDialog').close(); });
$('#printResume').addEventListener('click', () => print()); $('#printResumeSecondary').addEventListener('click', () => print());
$('#appearanceButton').addEventListener('click', () => togglePanel(true)); $('#closeAppearance').addEventListener('click', () => togglePanel(false)); $('#panelBackdrop').addEventListener('click', () => togglePanel(false));
$('#menuButton').addEventListener('click', () => $('#mainNav').classList.toggle('open')); $$('#mainNav a').forEach(link => link.addEventListener('click', () => $('#mainNav').classList.remove('open')));
$('#backgroundInput').addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; if (file.size > 4 * 1024 * 1024) return showToast('请选择小于 4MB 的图片'); const reader = new FileReader(); reader.onload = () => { $('.site-bg').style.backgroundImage = `url('${reader.result}')`; localStorage.setItem('portfolioBackground', reader.result); showToast('背景已保存到当前浏览器'); }; reader.readAsDataURL(file); });
$('#resetAppearance').addEventListener('click', () => { localStorage.removeItem('portfolioTheme'); localStorage.removeItem('portfolioBackground'); $('.site-bg').style.backgroundImage = ''; applyTheme(config.themes[0], false); showToast('已恢复默认外观'); });
const savedBg = localStorage.getItem('portfolioBackground'); if (savedBg) $('.site-bg').style.backgroundImage = `url('${savedBg}')`;
addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
if (window.lucide) lucide.createIcons();
if (window.AOS) AOS.init({ duration: 700, once: true, offset: 70, easing: 'ease-out-cubic' });
