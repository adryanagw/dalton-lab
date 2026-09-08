/* =====================================================================
   DALTON LAB — app.js
   Shared shell logic: theme, auth, routing, WhatsApp links, and a small
   set of GENERIC interactive engines (accordion, tab-switch, filter,
   click-detail, quiz, leveled exercises) that any chapter content file
   can plug into just by using the right data-attributes. No
   chapter-specific JS needed.

   Chapter HTML, quiz JSON, and exercise JSON are NOT static files — they
   live in /content-private (outside the public/ output dir Vercel
   serves) and are only ever returned by the /api/content, /api/quiz,
   and /api/exercise serverless functions, which require a valid,
   unexpired session token (see /api/_auth.js). Login, orders, progress,
   and quiz/exercise results all go through /api/* functions backed by
   Postgres (Neon) — see /api/_db.js and db/schema.sql. Google Sheets /
   Apps Script (gas/Code.gs) is no longer used anywhere; that file is
   kept only as historical reference.
   ===================================================================== */

/* =====================================================================
   ICON SYSTEM — replaces emoji used as functional UI icons (nav, buttons,
   subject markers, status messages) with a small set of hand-authored
   minimal-line SVGs. Emoji left inside chapter body copy as an informal
   voice/tone device are untouched — this is specifically about icons
   that stand in for meaning (a subject, a warning, a checkmark), not
   personality flourishes in prose.
   ===================================================================== */
const ICON_PATHS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'bar-chart': '<path d="M3 3v18h18"/><path d="M8 17v-5M13 17V9M18 17V6"/>',
  leaf: '<path d="M6 20C6 14 9 9 18 5c0 8-4 13-10 15-1 .3-2 .3-2 0z"/><path d="M6 20c1-3 3-6 6-8"/>',
  function: '<path d="M3 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/>',
  flask: '<path d="M9 2v6L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2"/><path d="M9 2h6"/><path d="M7 15h10"/>',
  atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-4v12l-6-4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><circle cx="18" cy="8" r="2.5"/><path d="M16.5 13.2c2.6.4 4.5 2.7 4.5 5.3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/>',
  'alert-triangle': '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.5v.1"/>',
  check: '<path d="M4 12.5l5 5L20 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  'book-open': '<path d="M12 6c-2-1.5-5-2-8-1v14c3-1 6-.5 8 1 2-1.5 5-2 8-1V5c-3-1-6-.5-8 1z"/><path d="M12 6v14"/>',
  'trending-up': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'
};
function icon(name, extraClass){
  const path = ICON_PATHS[name];
  if(!path) return '';
  return `<svg class="icon${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

/* ===== Theme toggle ===== */
function getCurrentTheme(){
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
function setTheme(theme){
  if(theme === 'dark'){
    document.documentElement.setAttribute('data-theme','dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try{ localStorage.setItem('daltonlab_theme', theme); }catch(e){}
  const toggleBtn = document.getElementById('themeToggle');
  if(toggleBtn){
    toggleBtn.setAttribute('aria-pressed', theme === 'dark');
    toggleBtn.title = theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap';
  }
}
document.getElementById('themeToggle').addEventListener('click',()=>{
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
});
setTheme(getCurrentTheme());

/* ===== Mobile nav ===== */
document.getElementById('hamburgerBtn').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a=>{
  a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open'));
});

/* =====================================================================
   CATALOG — the ONE place you touch to add a new subject or chapter.
   Each bab just points at a content file (pure HTML, no JS) and an
   optional quiz file (pure JSON, no JS). Everything else is automatic.
   ===================================================================== */
const subjectsData = {
  ekonomi: {
    name:'Ekonomi', icon:'bar-chart', ready:true,
    desc:'Badan usaha, koperasi, manajemen, dan seluk-beluk ekonomi lainnya.',
    babs:[
      {id:'bab1-badan-usaha', num:'Bab 1', title:'Badan Usaha, Koperasi & Manajemen', desc:'Bentuk-bentuk badan usaha, BUMN/BUMD, koperasi & kalkulator SHU, dasar manajemen.', ready:true},
    ]
  },
  biologi: {
    name:'Biologi', icon:'leaf', ready:true,
    desc:'Sel, jaringan, sistem organ tubuh, dan makhluk hidup lainnya.',
    babs:[
      {id:'bab1-sel', num:'Bab 1', title:'Sel: Unit Dasar Kehidupan', desc:'Sejarah penemuan sel, komponen kimiawi & struktural, organel, transpor membran, hingga reproduksi sel.', ready:true},
    ]
  },
  matematika: {
    name:'Matematika', icon:'function', ready:true,
    desc:'Eksponen, logaritma, aljabar, geometri, statistika, dan lainnya.',
    babs:[
      {id:'bab1-eksponen-logaritma', num:'Bab 1', title:'Eksponen & Logaritma', desc:'Sifat-sifat bilangan berpangkat, bentuk akar, fungsi eksponensial, sifat-sifat logaritma, hingga persamaan sederhana keduanya — plus latihan bertingkat per topik.', ready:true},
    ]
  },
  kimia: {
    name:'Kimia', icon:'flask', ready:false,
    desc:'Struktur atom, ikatan kimia, stoikiometri, dan lainnya.',
    babs:[]
  },
  fisika: {
    name:'Fisika', icon:'atom', ready:false,
    desc:'Mekanika, listrik-magnet, gelombang, dan lainnya.',
    babs:[]
  },
};

/* =====================================================================
   PACKAGES — all-access bundles. EDIT the prices/durations here, and
   PAYMENT_INFO_HTML below with your real bank/QRIS details, before
   going live.
   ===================================================================== */
const PACKAGES = [
  { id: 'p30',  label: '1 Bulan', hari: 30,  harga: 49000,  note: '' },
  { id: 'p90',  label: '3 Bulan', hari: 90,  harga: 129000, note: 'Hemat 12%' },
  { id: 'p365', label: '1 Tahun', hari: 365, harga: 399000, note: 'Paling Worth It' },
];

// EDIT: ganti dengan rekening/QRIS asli sebelum go-live.
const PAYMENT_INFO_HTML = `
  <div class="pay-row"><span>Transfer Bank</span><b>BCA 1234567890 a.n. Dalton Lab</b></div>
  <div class="pay-row"><span>QRIS / E-wallet</span><b>Ketik "QRIS" di chat WhatsApp</b></div>
`;

function fmtRp(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

/* ===== WhatsApp marketing links ===== */
const WHATSAPP_NUMBER = '6282136673896'; // 082136673896 in international format

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
document.getElementById('waFloat').href = waLink('Halo Dalton Lab! Aku pengen tau lebih lanjut soal akses materi & bimbingan tutor di sini 🙌');
document.getElementById('homeWaBtn').href = waLink('Halo Dalton Lab! Aku mau nanya-nanya soal kelas bimbingan (privat/grup) via Zoom 🙌');

/* =====================================================================
   PACKAGE PURCHASE — package picker + order form on the sign-in view.
   Submits an order to /api/order, which lands as a pending row in
   Postgres for the admin to approve at /admin.html.
   ===================================================================== */
let selectedPackage = null;
let lastOrderId = null;

function renderPackages() {
  const grid = document.getElementById('packageGrid');
  grid.innerHTML = PACKAGES.map(p => `
    <button type="button" class="package-card" data-pkg="${p.id}">
      ${p.note ? `<span class="package-note">${p.note}</span>` : ''}
      <span class="package-label">${p.label}</span>
      <span class="package-price">${fmtRp(p.harga)}</span>
      <span class="package-sub">${p.hari} hari akses penuh ke semua mata pelajaran</span>
    </button>`).join('');
  grid.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => selectPackage(card.dataset.pkg));
  });
}
renderPackages();

function selectPackage(pkgId) {
  selectedPackage = PACKAGES.find(p => p.id === pkgId);
  if (!selectedPackage) return;
  document.getElementById('packageGrid').querySelectorAll('.package-card').forEach(c => {
    c.classList.toggle('active', c.dataset.pkg === pkgId);
  });
  document.getElementById('orderFormTitle').textContent = `Beli Paket ${selectedPackage.label} — ${fmtRp(selectedPackage.harga)}`;
  document.getElementById('orderForm').style.display = '';
  document.getElementById('orderSuccess').style.display = 'none';
  document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetOrderPanel() {
  selectedPackage = null;
  lastOrderId = null;
  document.getElementById('packageGrid').querySelectorAll('.package-card').forEach(c => c.classList.remove('active'));
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccess').style.display = 'none';
  document.getElementById('orderError').classList.remove('show');
  document.getElementById('orderNama').value = '';
  document.getElementById('orderWa').value = '';
  document.getElementById('orderUsername').value = '';
}

document.getElementById('orderFormBack').addEventListener('click', () => {
  document.getElementById('orderForm').style.display = 'none';
  selectedPackage = null;
  document.getElementById('packageGrid').querySelectorAll('.package-card').forEach(c => c.classList.remove('active'));
});

function showOrderError(msg) {
  const el = document.getElementById('orderError');
  el.textContent = msg;
  el.classList.add('show');
}

document.getElementById('orderSubmitBtn').addEventListener('click', submitOrder);

async function submitOrder() {
  const nama = document.getElementById('orderNama').value.trim();
  const wa = document.getElementById('orderWa').value.trim();
  const username = document.getElementById('orderUsername').value.trim().toLowerCase();
  document.getElementById('orderError').classList.remove('show');

  if (!selectedPackage) { showOrderError('Pilih paketnya dulu ya.'); return; }
  if (!nama || !wa || !username) { showOrderError('Nama, WhatsApp, sama username-nya diisi dulu ya.'); return; }

  const btn = document.getElementById('orderSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Memproses…';
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama, whatsapp: wa, username,
        paket: selectedPackage.label, durasiHari: selectedPackage.hari, harga: selectedPackage.harga
      })
    });
    const data = await res.json();
    if (data.success) {
      lastOrderId = data.orderId;
      showOrderSuccess(nama, username);
    } else {
      showOrderError(data.message || 'Gagal bikin pesanan. Coba lagi ya.');
    }
  } catch (err) {
    showOrderError('Gagal terhubung ke server. Periksa koneksi internet kamu.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Lanjut ke Pembayaran →';
  }
}

function showOrderSuccess(nama, username) {
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccess').style.display = '';
  document.getElementById('orderIdOut').textContent = lastOrderId || '-';
  document.getElementById('paymentBox').innerHTML = PAYMENT_INFO_HTML;
  const msg = `Halo Dalton Lab! Aku mau konfirmasi pembayaran paket ${selectedPackage.label} (${fmtRp(selectedPackage.harga)}).\nID Pesanan: ${lastOrderId}\nNama: ${nama}\nUsername: ${username}\n\nIni bukti transfernya 👇`;
  document.getElementById('orderWaBtn').href = waLink(msg);
}

/* ===== Session / auth ===== */
function getSession(){
  try{
    const raw = localStorage.getItem('daltonlab_session');
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function saveSession(session){
  localStorage.setItem('daltonlab_session', JSON.stringify(session));
  renderSessionBadge();
}
function clearSession(){
  localStorage.removeItem('daltonlab_session');
  renderSessionBadge();
}
function hasAccess(){
  const s = getSession();
  if(!s || !s.expiresAt) return false;
  return new Date(s.expiresAt).getTime() > Date.now();
}
function renderSessionBadge(){
  const badge = document.getElementById('sessionBadge');
  const s = getSession();
  if(s){
    badge.style.display = 'flex';
    const expiryStr = s.expiresAt ? new Date(s.expiresAt).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : null;
    const statusHtml = hasAccess()
      ? `<span class="session-status ok">Aktif s.d. ${expiryStr}</span>`
      : `<span class="session-status expired">Paket habis</span>`;
    badge.innerHTML = `${s.nama || s.username} ${statusHtml} <button id="logoutBtn">Keluar</button>`;
    document.getElementById('logoutBtn').addEventListener('click',()=>{
      clearSession();
      goToHome();
    });
  } else {
    badge.style.display = 'none';
    badge.innerHTML = '';
  }
}
renderSessionBadge();

/* =====================================================================
   PROGRESS — per-student, per-chapter, saved server-side (not just this
   browser) so it follows the student across devices.
   ===================================================================== */
let progressCache = {};

async function fetchProgress(){
  const session = getSession();
  progressCache = {};
  if(!session || !session.token) return;
  try{
    const res = await fetch('/api/progress', {
      headers: { 'Authorization': 'Bearer ' + session.token }
    });
    const data = await res.json();
    if(data.success) progressCache = data.progress || {};
  }catch(err){ /* non-critical — progress badges just won't show this load */ }
}

function markProgress(babId, status){
  const session = getSession();
  if(!session || !session.token || !babId) return;
  if(status === 'completed' || !progressCache[babId]) progressCache[babId] = status;
  fetch('/api/progress', {
    method:'POST',
    headers:{'Content-Type':'application/json', 'Authorization':'Bearer ' + session.token},
    body: JSON.stringify({babId, status})
  }).catch(()=>{});
}

// Runs after progressCache/fetchProgress/markProgress are all declared above
// (fixes a bug where this used to fire before `let progressCache` existed —
// harmless for anonymous visitors since getSession() is null, but would
// throw a ReferenceError for any returning logged-in student).
if(getSession()) fetchProgress().then(renderContinueBanner);

/* =====================================================================
   VIEW ROUTER
   ===================================================================== */
const viewHome = document.getElementById('view-home');
const viewBabs = document.getElementById('view-babs');
const viewSignin = document.getElementById('view-signin');
const viewLesson = document.getElementById('view-lesson');
let activeSubjectKey = 'ekonomi';
let activeBabId = null;

function renderSubjectGrid(){
  const grid = document.getElementById('subjectGrid');
  grid.innerHTML = Object.entries(subjectsData).map(([key,s])=>`
    <div class="subject-row ${s.ready?'ready':'soon'}" data-subject="${key}">
      <span class="subj-icon-wrap">${icon(s.icon)}</span>
      <div class="subj-body">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
      <span class="subj-status">${s.ready ? 'Tersedia' : 'Segera Hadir'}</span>
    </div>`).join('');
  grid.querySelectorAll('.subject-row').forEach(row=>{
    row.addEventListener('click',()=>enterSubject(row.dataset.subject));
  });
}
renderSubjectGrid();

/* "Lanjutkan belajar" — if the student has a chapter marked 'started'
   (not yet 'completed') anywhere, surface a direct shortcut back into it
   instead of making them re-navigate subject -> chapter list every visit. */
function renderContinueBanner(){
  const banner = document.getElementById('continueBanner');
  const session = getSession();
  if(!session || !hasAccess()){ banner.style.display = 'none'; return; }

  let found = null;
  for(const [subjectKey, s] of Object.entries(subjectsData)){
    for(const b of s.babs){
      if(progressCache[b.id] === 'started'){ found = {subjectKey, subject:s, bab:b}; break; }
    }
    if(found) break;
  }
  if(!found){ banner.style.display = 'none'; return; }

  banner.style.display = '';
  banner.innerHTML = `
    <div>
      <div class="cb-label">Lanjutkan Belajar</div>
      <div class="cb-title">${found.subject.name} · ${found.bab.title}</div>
    </div>
    ${icon('trending-up','cb-arrow')}
  `;
  banner.onclick = () => {
    activeSubjectKey = found.subjectKey;
    goToLesson(found.bab.id);
  };
}

function hideAllViews(){
  viewHome.style.display = 'none';
  viewBabs.style.display = 'none';
  viewSignin.style.display = 'none';
  viewLesson.style.display = 'none';
}

function goToHome(){
  hideAllViews();
  viewHome.style.display = '';
  document.querySelectorAll('.subject-link').forEach(l=>l.classList.remove('active'));
  renderSubjectGrid();
  renderContinueBanner();
  const session = getSession();
  document.getElementById('homeGreeting').textContent = session
    ? `Halo, ${session.nama || session.username}!`
    : 'Mau belajar apa hari ini?';
  window.scrollTo({top:0,behavior:'instant'});
}

function enterSubject(subjectKey){
  activeSubjectKey = subjectKey;
  if(hasAccess()){
    goToBabs(subjectKey);
  } else {
    goToSignIn(subjectKey);
  }
}

function goToSignIn(subjectKey){
  activeSubjectKey = subjectKey;
  const s = subjectsData[subjectKey];
  const session = getSession();
  const packagesPanel = document.getElementById('packagesPanel');
  const toggleBtn = document.getElementById('togglePackagesBtn');
  const loginBlock = document.getElementById('loginBlock');

  const expired = session && session.expiresAt;
  if(expired){
    const expiryStr = new Date(session.expiresAt).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
    document.getElementById('signinTitle').textContent = 'Paketmu Udah Habis';
    document.getElementById('signinSubtitle').textContent = `Halo ${session.nama || session.username}! Langgananmu berakhir ${expiryStr} — perpanjang buat lanjut belajar ${s.name}.`;
    // They're already identified; skip the login form and go straight to renewal.
    loginBlock.style.display = 'none';
    packagesPanel.style.display = '';
    toggleBtn.style.display = 'none';
  } else {
    document.getElementById('signinTitle').textContent = 'Siap lanjut belajar?';
    document.getElementById('signinSubtitle').textContent = `Masuk buat buka materi ${s.name} dan mata pelajaran lainnya.`;
    loginBlock.style.display = '';
    packagesPanel.style.display = 'none';
    toggleBtn.style.display = '';
    toggleBtn.textContent = 'Belum punya akses? Lihat paket →';
  }

  document.getElementById('signinError').classList.remove('show');
  document.getElementById('signinUsername').value = session ? (session.username || '') : '';
  document.getElementById('signinPassword').value = '';

  resetOrderPanel();
  if(session){
    document.getElementById('orderNama').value = session.nama || '';
    document.getElementById('orderUsername').value = session.username || '';
  }

  hideAllViews();
  viewSignin.style.display = '';
  document.querySelectorAll('.subject-link').forEach(l=>l.classList.toggle('active', l.dataset.subject===subjectKey));
  window.scrollTo({top:0,behavior:'instant'});
}

function goToBabs(subjectKey){
  activeSubjectKey = subjectKey;
  const s = subjectsData[subjectKey];
  document.getElementById('babsTitle').textContent = s.name;
  document.getElementById('babsSubtitle').textContent = s.desc;

  const babGrid = document.getElementById('babGrid');
  const progressEl = document.getElementById('babsProgress');
  const readyBabs = s.babs.filter(b=>b.ready);

  if(readyBabs.length === 0){
    progressEl.style.display = 'none';
    babGrid.innerHTML = `<p style="color:var(--slate);">Materi ${s.name} sedang disiapkan — segera hadir di sini.</p>`;
  } else {
    const doneCount = readyBabs.filter(b=>progressCache[b.id] === 'completed').length;
    if(doneCount > 0){
      const pct = Math.round(doneCount / readyBabs.length * 100);
      progressEl.style.display = '';
      progressEl.innerHTML = `
        <div class="subject-progress">
          <div class="subject-progress-track"><div class="subject-progress-fill" style="width:${pct}%;"></div></div>
          <span class="mono">${pct}% selesai</span>
        </div>`;
    } else {
      progressEl.style.display = 'none';
    }

    babGrid.innerHTML = s.babs.map(b=>{
      const prog = progressCache[b.id];
      const progBadge = prog === 'completed' ? '<span class="bab-progress done">Selesai</span>'
        : prog === 'started' ? '<span class="bab-progress ongoing">Lagi Dipelajari</span>' : '';
      return `
      <div class="bab-row ${b.ready?'':'soon'}" data-bab="${b.id}">
        <span class="bab-num mono">${b.num.replace(/\D/g,'').padStart(2,'0')}</span>
        <div class="bab-body">
          <h4>${b.title}</h4>
          <p>${b.desc}</p>
        </div>
        ${b.ready ? progBadge : '<span class="soon-tag">Segera Hadir</span>'}
      </div>`;
    }).join('');
    babGrid.querySelectorAll('.bab-row:not(.soon)').forEach(row=>{
      row.addEventListener('click',()=>goToLesson(row.dataset.bab));
    });
  }

  hideAllViews();
  viewBabs.style.display = '';
  document.querySelectorAll('.subject-link').forEach(l=>l.classList.toggle('active', l.dataset.subject===subjectKey));
  window.scrollTo({top:0,behavior:'instant'});
}

function findBab(babId){
  const subj = subjectsData[activeSubjectKey];
  return subj ? subj.babs.find(b=>b.id===babId) : null;
}

async function goToLesson(babId){
  activeBabId = babId;
  const bab = findBab(babId);
  hideAllViews();
  viewLesson.style.display = '';
  window.scrollTo({top:0,behavior:'instant'});

  document.getElementById('backToBabsBtn').textContent = '← ' + subjectsData[activeSubjectKey].name;
  const lessonContent = document.getElementById('lessonContent');
  const lessonLinks = document.getElementById('lessonLinks');
  lessonLinks.innerHTML = '';
  lessonContent.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center;color:var(--slate);">Memuat materi…</div>`;

  if(!bab || !bab.ready){
    lessonContent.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center;color:var(--slate);">Waduh, materi ini belum ada.</div>`;
    return;
  }

  const session = getSession();
  if(!session || !session.token){
    goToSignIn(activeSubjectKey);
    return;
  }

  try{
    const res = await fetch(`/api/content?subject=${encodeURIComponent(activeSubjectKey)}&bab=${encodeURIComponent(babId)}`, {
      headers: { 'Authorization': 'Bearer ' + session.token }
    });
    if(res.status === 401){
      // Token expired/invalid server-side (e.g. paket habis) — bounce to the paywall
      // even if the client's own clock/cache thought access was still fine.
      goToSignIn(activeSubjectKey);
      return;
    }
    if(!res.ok) throw new Error('fetch failed');
    const html = await res.text();
    lessonContent.innerHTML = html;
  }catch(err){
    lessonContent.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center;color:var(--slate);">
      ${icon('alert-triangle')} Gagal memuat materi. Coba refresh halaman, atau pastikan paketmu masih aktif.
    </div>`;
    return;
  }

  // Prefill quiz gate name from session, for any quiz on this page
  if(session){
    lessonContent.querySelectorAll('[data-gate-name]').forEach(input=>{
      if(!input.value) input.value = session.nama || '';
    });
  }

  buildLessonSubnav(lessonContent);
  initAllComponents(lessonContent);
  observeReveal(lessonContent.querySelectorAll('section'));
  markProgress(babId, 'started');
}

function buildLessonSubnav(root){
  const lessonLinks = document.getElementById('lessonLinks');
  const sections = root.querySelectorAll('section[id][data-nav]');
  lessonLinks.innerHTML = Array.from(sections).map(sec=>{
    const label = sec.dataset.nav;
    const isCta = sec.hasAttribute('data-nav-cta');
    return `<a href="#${sec.id}"${isCta ? ' class="cta"' : ''}>${label}${isCta ? ' →' : ''}</a>`;
  }).join('');
}

document.getElementById('logoHome').addEventListener('click',e=>{e.preventDefault(); goToHome();});
document.getElementById('navHomeLink').addEventListener('click',e=>{e.preventDefault(); goToHome();});
document.getElementById('backToHomeBtn').addEventListener('click',goToHome);
document.getElementById('backToHomeFromSignin').addEventListener('click',goToHome);
document.getElementById('backToBabsBtn').addEventListener('click',()=>goToBabs(activeSubjectKey));
document.querySelectorAll('.subject-link').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    enterSubject(link.dataset.subject);
  });
});

/* ===== Sign-in submit ===== */
document.getElementById('signinSubmitBtn').addEventListener('click', attemptSignIn);
document.getElementById('signinPassword').addEventListener('keydown', e=>{ if(e.key==='Enter') attemptSignIn(); });
document.getElementById('signinUsername').addEventListener('keydown', e=>{ if(e.key==='Enter') attemptSignIn(); });

document.getElementById('togglePackagesBtn').addEventListener('click', ()=>{
  const packagesPanel = document.getElementById('packagesPanel');
  const opening = packagesPanel.style.display === 'none';
  packagesPanel.style.display = opening ? '' : 'none';
  document.getElementById('togglePackagesBtn').textContent = opening
    ? '← Kembali ke login'
    : 'Belum punya akses? Lihat paket →';
  if(opening) packagesPanel.scrollIntoView({behavior:'smooth', block:'nearest'});
});

function showSigninError(msg){
  const el = document.getElementById('signinError');
  el.textContent = msg;
  el.classList.add('show');
}

async function attemptSignIn(){
  const username = document.getElementById('signinUsername').value.trim();
  const password = document.getElementById('signinPassword').value;
  const btn = document.getElementById('signinSubmitBtn');
  document.getElementById('signinError').classList.remove('show');

  if(!username || !password){
    showSigninError('Username & password-nya jangan lupa diisi ya.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Memeriksa…';
  try{
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if(data.success){
      saveSession({username, nama:data.nama || username, expiresAt: data.expiresAt || null, token: data.token || null});
      await fetchProgress();
      if(hasAccess()){
        goToBabs(activeSubjectKey);
      } else {
        showSigninError('Login berhasil! Tapi paketmu belum aktif/udah habis — beli paket di panel sebelah kanan ya.');
      }
    } else {
      showSigninError(data.message || 'Hmm, username atau password-nya salah nih. Coba cek lagi ya.');
    }
  }catch(err){
    showSigninError('Gagal konek ke server nih. Cek koneksi internet kamu, terus coba lagi.');
  }finally{
    btn.disabled = false;
    btn.textContent = 'Masuk';
  }
}

/* =====================================================================
   GENERIC COMPONENT ENGINES
   These work on ANY chapter's content, as long as the content HTML
   uses the right data-attributes. No per-chapter JavaScript needed.
   ===================================================================== */

/** Accordion: [data-accordion] wrapper > .acc-item > .acc-q + .acc-a */
function initAccordions(root){
  root.querySelectorAll('[data-accordion]').forEach(group=>{
    group.addEventListener('click', e=>{
      const q = e.target.closest('.acc-q');
      if(!q || !group.contains(q)) return;
      const item = q.parentElement;
      const a = item.querySelector('.acc-a');
      const isOpen = item.classList.contains('open');
      group.querySelectorAll('.acc-item.open').forEach(el=>{
        el.classList.remove('open');
        el.querySelector('.acc-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
}

/** Tab-switch: [data-tabswitch][data-tabswitch-group] wrapper with buttons
 *  [data-tab], showing/hiding panels marked [data-tabpanel][data-tabswitch-group].
 *  Used for BUMN/BUMD toggle AND the Bentuk Badan Usaha tabs — same behavior,
 *  different visual skin (.toggle-opt vs .form-tab). */
function initTabSwitches(root){
  root.querySelectorAll('[data-tabswitch]').forEach(switcher=>{
    const group = switcher.dataset.tabswitchGroup;
    switcher.addEventListener('click', e=>{
      const btn = e.target.closest('[data-tab]');
      if(!btn || !switcher.contains(btn)) return;
      switcher.querySelectorAll('[data-tab]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      root.querySelectorAll(`[data-tabpanel][data-tabswitch-group="${group}"]`).forEach(panel=>{
        panel.style.display = panel.dataset.tabpanel === btn.dataset.tab ? '' : 'none';
      });
    });
  });
}

/** Filter toggle: [data-filter][data-filter-target][data-filter-attr] wrapper
 *  with buttons [data-filter-value], hiding/showing cards inside the target
 *  grid that carry a matching [data-<attr>] value. Used for the organel
 *  Bermembran / Tidak Bermembran filter. */
function initFilterToggles(root){
  root.querySelectorAll('[data-filter]').forEach(toggle=>{
    const grid = root.querySelector('#' + toggle.dataset.filterTarget) || document.getElementById(toggle.dataset.filterTarget);
    const attr = toggle.dataset.filterAttr || 'filter';
    if(!grid) return;
    toggle.addEventListener('click', e=>{
      const btn = e.target.closest('[data-filter-value]');
      if(!btn || !toggle.contains(btn)) return;
      toggle.querySelectorAll('[data-filter-value]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.filterValue;
      grid.querySelectorAll(`[data-${attr}]`).forEach(card=>{
        card.classList.toggle('hide', val !== 'semua' && card.dataset[attr] !== val);
      });
    });
  });
}

/** Click-detail group: [data-clickgroup][data-clickgroup-target] wrapper with
 *  buttons carrying [data-title]/[data-body], writing into a target element.
 *  Used for the management pyramid, koperasi org chart, and mitosis stepper —
 *  same behavior, different visual skin. First item auto-selected. */
function initClickGroups(root){
  root.querySelectorAll('[data-clickgroup]').forEach(group=>{
    const targetId = group.dataset.clickgroupTarget;
    const target = root.querySelector('#' + targetId) || document.getElementById(targetId);
    function select(btn){
      group.querySelectorAll('[data-title]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(target) target.innerHTML = `<b>${btn.dataset.title}</b><br>${btn.dataset.body}`;
    }
    group.addEventListener('click', e=>{
      const btn = e.target.closest('[data-title]');
      if(!btn || !group.contains(btn)) return;
      select(btn);
    });
    const first = group.querySelector('[data-title]');
    if(first) select(first);
  });
}

/** SHU-style live calculators: any [data-calc] block with numeric inputs
 *  and a small formula in a data attribute. For now this covers the one
 *  koperasi SHU calculator; kept as a dedicated (but self-contained,
 *  feature-detected) initializer rather than forcing it into a generic
 *  shape that would be harder to read than it's worth. */
function initShuCalculator(root){
  const shuTotalEl = root.querySelector('#shuTotal');
  if(!shuTotalEl) return;
  function fmtRp(n){
    if(isNaN(n)) n = 0;
    return 'Rp ' + Math.round(n).toLocaleString('id-ID');
  }
  function calc(){
    const total = parseFloat(root.querySelector('#shuTotal').value)||0;
    const pctModal = parseFloat(root.querySelector('#pctModal').value)||0;
    const pctUsaha = 100-pctModal;
    const totalSimpanan = parseFloat(root.querySelector('#totalSimpanan').value)||0;
    const totalBelanja = parseFloat(root.querySelector('#totalBelanja').value)||0;
    const mySimpanan = parseFloat(root.querySelector('#myAnggotaSimpanan').value)||0;
    const myBelanja = parseFloat(root.querySelector('#myAnggotaBelanja').value)||0;

    const shuModal = totalSimpanan>0 ? (mySimpanan/totalSimpanan) * (pctModal/100) * total : 0;
    const shuUsaha = totalBelanja>0 ? (myBelanja/totalBelanja) * (pctUsaha/100) * total : 0;

    root.querySelector('#pctModalLabel').textContent = pctModal + '%';
    root.querySelector('#outModal').textContent = fmtRp(shuModal);
    root.querySelector('#outUsaha').textContent = fmtRp(shuUsaha);
    root.querySelector('#outTotal').textContent = fmtRp(shuModal+shuUsaha);
  }
  ['shuTotal','pctModal','totalSimpanan','totalBelanja','myAnggotaSimpanan','myAnggotaBelanja'].forEach(id=>{
    root.querySelector('#'+id).addEventListener('input', calc);
  });
  calc();
}

/* =====================================================================
   GENERIC QUIZ ENGINE
   Any chapter just needs: <div class="quiz-root" data-quiz-subject="…"
   data-quiz-bab="…"></div>
   Everything else (gate, questions, scoring, auth-gated fetch via
   /api/quiz, result submission via /api/quiz-result) is built here —
   zero per-chapter quiz JavaScript.
   ===================================================================== */
function initQuizzes(root){
  root.querySelectorAll('.quiz-root').forEach(async (mount)=>{
    const subject = mount.dataset.quizSubject;
    const bab = mount.dataset.quizBab;
    if(!subject || !bab) return;

    mount.innerHTML = `<p style="color:#c3ccd9;">Memuat kuis…</p>`;
    const session = getSession();
    if(!session || !session.token){
      mount.innerHTML = `<p style="color:#f0a597;">${icon('alert-triangle')} Sesi kamu habis — refresh halaman & login ulang ya.</p>`;
      return;
    }
    let quiz;
    try{
      const res = await fetch(`/api/quiz?subject=${encodeURIComponent(subject)}&bab=${encodeURIComponent(bab)}`, {
        headers: { 'Authorization': 'Bearer ' + session.token }
      });
      if(!res.ok) throw new Error('fetch failed');
      quiz = await res.json();
    }catch(err){
      mount.innerHTML = `<p style="color:#f0a597;">${icon('alert-triangle')} Gagal memuat soal kuis. Coba refresh halaman ya.</p>`;
      return;
    }

    mount.innerHTML = `
      <div class="quiz-gate">
        <div class="gate-row">
          <div class="input-row">
            <label>Nama Lengkap</label>
            <input type="text" data-gate-name placeholder="Contoh: Budi Santoso" class="mono">
          </div>
          <div class="input-row">
            <label>Kelas</label>
            <input type="text" data-gate-class placeholder="Contoh: XI-2" class="mono">
          </div>
        </div>
        <p class="gate-hint" data-gate-hint>Isi nama & kelas kamu dulu ya, biar hasil kuismu kesimpen.</p>
        <button class="btn btn-primary" data-gate-start>Mulai Kuis →</button>
      </div>

      <div class="quiz-box" data-quiz-box style="display:none;">
        <div class="quiz-top">
          <div class="quiz-progress-track"><div class="quiz-progress-fill" data-quiz-progress></div></div>
          <div class="quiz-meta">
            <span data-quiz-counter class="mono">Soal 1 / ${quiz.length}</span>
            <span data-quiz-score class="mono">Skor: 0</span>
          </div>
        </div>
        <div data-quiz-question-area></div>
      </div>

      <div class="quiz-result" data-quiz-result style="display:none;">
        <div class="result-ring"><span data-quiz-pct>0%</span></div>
        <h3 style="color:#fff;">Selesai!</h3>
        <p data-quiz-resultmsg style="color:#c3ccd9;"></p>
        <p class="submit-status" data-quiz-submitstatus></p>
        <button class="btn btn-primary" data-quiz-restart>Ulangi Kuis</button>
      </div>
    `;

    const gate = mount.querySelector('.quiz-gate');
    const box = mount.querySelector('[data-quiz-box]');
    const resultEl = mount.querySelector('[data-quiz-result]');
    const nameInput = mount.querySelector('[data-gate-name]');
    const classInput = mount.querySelector('[data-gate-class]');
    const hint = mount.querySelector('[data-gate-hint]');
    const questionArea = mount.querySelector('[data-quiz-question-area]');
    const progressFill = mount.querySelector('[data-quiz-progress]');
    const counterEl = mount.querySelector('[data-quiz-counter]');
    const scoreEl = mount.querySelector('[data-quiz-score]');

    let currentQ = 0, score = 0, answered = false, studentName = '', studentClass = '';

    // prefill from session if available (router also does this post-load, but
    // handle it here too in case this quiz mounts after that pass)
    if(session.nama) nameInput.value = session.nama;

    mount.querySelector('[data-gate-start]').addEventListener('click', ()=>{
      const nameVal = nameInput.value.trim();
      const classVal = classInput.value.trim();
      if(!nameVal || !classVal){
        hint.textContent = 'Isi nama & kelas kamu dulu ya, biar hasil kuismu kesimpen.';
        hint.classList.add('warn');
        return;
      }
      studentName = nameVal;
      studentClass = classVal;
      gate.style.display = 'none';
      box.style.display = '';
      renderQuestion();
    });

    function renderQuestion(){
      answered = false;
      const item = quiz[currentQ];
      counterEl.textContent = `Soal ${currentQ+1} / ${quiz.length}`;
      scoreEl.textContent = `Skor: ${score}`;
      progressFill.style.width = (currentQ/quiz.length*100)+'%';

      const letters = ['A','B','C','D'];
      questionArea.innerHTML = `
        <div class="q-title">${item.q}</div>
        <div class="q-options">
          ${item.opts.map((o,i)=>`<div class="q-opt" data-i="${i}"><span class="opt-letter">${letters[i]}</span>${o}</div>`).join('')}
        </div>
        <div class="q-explain" data-explain><b>Penjelasan:</b> ${item.explain}</div>
        <button class="btn btn-primary q-nextbtn" data-next>${currentQ===quiz.length-1?'Lihat Hasil':'Soal Berikutnya →'}</button>
      `;
      initMath(questionArea);

      questionArea.querySelectorAll('.q-opt').forEach(opt=>{
        opt.addEventListener('click', ()=>{
          if(answered) return;
          answered = true;
          const chosen = parseInt(opt.dataset.i);
          questionArea.querySelectorAll('.q-opt').forEach(o=>{
            o.classList.add('disabled');
            const idx = parseInt(o.dataset.i);
            if(idx===item.correct) o.classList.add('correct');
            else if(idx===chosen) o.classList.add('wrong');
          });
          if(chosen===item.correct) score++;
          scoreEl.textContent = `Skor: ${score}`;
          questionArea.querySelector('[data-explain]').style.display = 'block';
          const nextBtn = questionArea.querySelector('[data-next]');
          nextBtn.style.display = 'inline-flex';
          nextBtn.addEventListener('click', ()=>{
            currentQ++;
            if(currentQ >= quiz.length){ showResult(); }
            else { renderQuestion(); }
          });
        });
      });
    }

    function showResult(){
      box.style.display = 'none';
      resultEl.style.display = 'block';
      const pct = Math.round(score/quiz.length*100);
      resultEl.querySelector('[data-quiz-pct]').textContent = pct+'%';
      progressFill.style.width = '100%';
      let msg = '';
      if(pct>=85) msg = 'Mantap banget! Kayaknya kamu udah jago materi ini.';
      else if(pct>=60) msg = 'Lumayan nih! Sebagian besar udah nyantol, tinggal cek lagi yang masih meleset.';
      else msg = 'Santai aja, coba baca-baca lagi materinya di atas terus tes ulang — kamu pasti bisa lebih jago!';
      resultEl.querySelector('[data-quiz-resultmsg]').textContent = `Kamu menjawab benar ${score} dari ${quiz.length} soal. ${msg}`;

      markProgress(activeBabId, 'completed');

      submitQuizResult({
        subject, babId: bab,
        nama: studentName,
        kelas: studentClass,
        skor: score,
        total: quiz.length,
        persentase: pct
      }, resultEl.querySelector('[data-quiz-submitstatus]'), session ? session.token : null);
    }

    resultEl.querySelector('[data-quiz-restart]').addEventListener('click', ()=>{
      currentQ = 0; score = 0;
      resultEl.style.display = 'none';
      nameInput.value = '';
      classInput.value = '';
      hint.textContent = 'Isi nama & kelas kamu dulu ya, biar hasil kuismu kesimpen.';
      hint.classList.remove('warn');
      gate.style.display = '';
    });
  });
}

/* =====================================================================
   GENERIC 3-LEVEL EXERCISE ENGINE ("Latihan Bertingkat")
   Any topic within a chapter just needs:
   <div class="exercise-root" data-exercise-subject="…" data-exercise-bab="…"
        data-exercise-topic="…"></div>
   (topic is the filename segment: {bab}.{topic}.exercise.json)

   The JSON shape is: { "topic": "Nama Topik", "basic":[...], "intermediate":[...], "advanced":[...] }
   — each level array uses the exact same question shape as quiz JSON
   ({ q, opts, correct, explain }).

   Students fill the gate (name/class) ONCE, then can freely switch between
   Dasar / Menengah / Lanjutan. Every submission is tagged with topik+level
   (in addition to skor/total/persentase) so a future performance dashboard
   can tell, per student per topic, which level they've cleared — this is
   the data plumbing the "automatic performance analysis" concept depends on.
   Reuses the same .quiz-box/.quiz-gate/.q-* visual language as the chapter
   quiz so it needs no new CSS beyond the level-tab pills.
   ===================================================================== */
const EXERCISE_LEVELS = {
  basic:        { label: 'Dasar',     hint: 'Pemanasan — konsep inti, langsung kepake.' },
  intermediate: { label: 'Menengah',  hint: 'Butuh 2 langkah atau gabungan beberapa konsep.' },
  advanced:     { label: 'Lanjutan',  hint: 'Soal non-rutin / cerita, mirip level olimpiade ringan.' }
};

function initExercises(root){
  root.querySelectorAll('.exercise-root').forEach(async (mount)=>{
    const subject = mount.dataset.exerciseSubject;
    const bab = mount.dataset.exerciseBab;
    const topic = mount.dataset.exerciseTopic;
    if(!subject || !bab || !topic) return;

    mount.innerHTML = `<p style="color:#c3ccd9;text-align:center;">Memuat latihan…</p>`;
    const session = getSession();
    if(!session || !session.token){
      mount.innerHTML = `<p style="color:#f0a597;text-align:center;">${icon('alert-triangle')} Sesi kamu habis — refresh halaman & login ulang ya.</p>`;
      return;
    }
    let data;
    try{
      const res = await fetch(`/api/exercise?subject=${encodeURIComponent(subject)}&bab=${encodeURIComponent(bab)}&topic=${encodeURIComponent(topic)}`, {
        headers: { 'Authorization': 'Bearer ' + session.token }
      });
      if(!res.ok) throw new Error('fetch failed');
      data = await res.json();
    }catch(err){
      mount.innerHTML = `<p style="color:#f0a597;text-align:center;">${icon('alert-triangle')} Gagal memuat latihan. Coba refresh halaman ya.</p>`;
      return;
    }

    const levelKeys = Object.keys(EXERCISE_LEVELS).filter(lv=>Array.isArray(data[lv]) && data[lv].length);
    if(!levelKeys.length){
      mount.innerHTML = `<p style="color:#c3ccd9;text-align:center;">Latihan untuk topik ini belum tersedia.</p>`;
      return;
    }

    mount.innerHTML = `
      <div class="quiz-gate" data-ex-gate>
        <div class="gate-row">
          <div class="input-row">
            <label>Nama Lengkap</label>
            <input type="text" data-gate-name placeholder="Contoh: Budi Santoso" class="mono">
          </div>
          <div class="input-row">
            <label>Kelas</label>
            <input type="text" data-gate-class placeholder="Contoh: XI-2" class="mono">
          </div>
        </div>
        <p class="gate-hint" data-gate-hint>Isi nama &amp; kelas kamu, terus pilih mau mulai dari level mana.</p>
        <div class="level-tabs" data-level-tabs>
          ${levelKeys.map((lv,i)=>`<button type="button" class="level-tab${i===0?' active':''}" data-level="${lv}">${EXERCISE_LEVELS[lv].label}<span class="level-badge">${data[lv].length} soal</span></button>`).join('')}
        </div>
        <p class="gate-hint level-hint" data-level-hint>${EXERCISE_LEVELS[levelKeys[0]].hint}</p>
        <button class="btn btn-primary" data-ex-start>Mulai Latihan →</button>
      </div>
      <div data-ex-session></div>
    `;

    const gate = mount.querySelector('[data-ex-gate]');
    const sessionMount = mount.querySelector('[data-ex-session]');
    const nameInput = mount.querySelector('[data-gate-name]');
    const classInput = mount.querySelector('[data-gate-class]');
    const hint = mount.querySelector('[data-gate-hint]');
    const levelHint = mount.querySelector('[data-level-hint]');
    let activeLevel = levelKeys[0];

    if(session.nama) nameInput.value = session.nama;

    mount.querySelectorAll('[data-level-tabs] [data-level]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        mount.querySelectorAll('[data-level-tabs] [data-level]').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        activeLevel = btn.dataset.level;
        levelHint.textContent = EXERCISE_LEVELS[activeLevel].hint;
      });
    });

    mount.querySelector('[data-ex-start]').addEventListener('click', ()=>{
      const nameVal = nameInput.value.trim();
      const classVal = classInput.value.trim();
      if(!nameVal || !classVal){
        hint.textContent = 'Isi nama & kelas kamu dulu ya, biar hasil latihanmu kesimpen.';
        hint.classList.add('warn');
        return;
      }
      gate.style.display = 'none';
      runExerciseLevel(sessionMount, data[activeLevel], {
        subject, babId: bab,
        token: session.token,
        studentName: nameVal,
        studentClass: classVal,
        topik: data.topic || '',
        levelLabel: EXERCISE_LEVELS[activeLevel].label,
        onBack: ()=>{ sessionMount.innerHTML = ''; gate.style.display = ''; }
      });
    });
  });
}

/** Runs one level's question set inside `mount` (a fresh scratch container),
 *  then reports back to `onBack` so the student can pick another level.
 *  Mirrors the chapter-quiz question/scoring flow in initQuizzes(), but
 *  tags its /api/quiz-result submission with topik + level for per-topic
 *  tracking. */
function runExerciseLevel(mount, questions, meta){
  mount.innerHTML = `
    <div class="quiz-box" data-quiz-box>
      <div class="quiz-top">
        <div class="quiz-progress-track"><div class="quiz-progress-fill" data-quiz-progress></div></div>
        <div class="quiz-meta">
          <span data-quiz-counter class="mono">Soal 1 / ${questions.length}</span>
          <span data-quiz-score class="mono">Skor: 0</span>
        </div>
      </div>
      <div data-quiz-question-area></div>
    </div>
    <div class="quiz-result" data-quiz-result style="display:none;">
      <div class="result-ring"><span data-quiz-pct>0%</span></div>
      <h3 style="color:#fff;">Level ${meta.levelLabel} Selesai!</h3>
      <p data-quiz-resultmsg style="color:#c3ccd9;"></p>
      <p class="submit-status" data-quiz-submitstatus></p>
      <div class="ex-result-actions">
        <button class="btn btn-primary" data-quiz-restart>Ulangi Level Ini</button>
        <button class="btn btn-outline-light" data-ex-backbtn>← Pilih Level Lain</button>
      </div>
    </div>
  `;

  const box = mount.querySelector('[data-quiz-box]');
  const resultEl = mount.querySelector('[data-quiz-result]');
  const questionArea = mount.querySelector('[data-quiz-question-area]');
  const progressFill = mount.querySelector('[data-quiz-progress]');
  const counterEl = mount.querySelector('[data-quiz-counter]');
  const scoreEl = mount.querySelector('[data-quiz-score]');
  let currentQ = 0, score = 0, answered = false;

  function renderQuestion(){
    answered = false;
    const item = questions[currentQ];
    counterEl.textContent = `Soal ${currentQ+1} / ${questions.length}`;
    scoreEl.textContent = `Skor: ${score}`;
    progressFill.style.width = (currentQ/questions.length*100)+'%';

    const letters = ['A','B','C','D'];
    questionArea.innerHTML = `
      <div class="q-title">${item.q}</div>
      <div class="q-options">
        ${item.opts.map((o,i)=>`<div class="q-opt" data-i="${i}"><span class="opt-letter">${letters[i]}</span>${o}</div>`).join('')}
      </div>
      <div class="q-explain" data-explain><b>Penjelasan:</b> ${item.explain}</div>
      <button class="btn btn-primary q-nextbtn" data-next>${currentQ===questions.length-1?'Lihat Hasil':'Soal Berikutnya →'}</button>
    `;
    initMath(questionArea);

    questionArea.querySelectorAll('.q-opt').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        if(answered) return;
        answered = true;
        const chosen = parseInt(opt.dataset.i);
        questionArea.querySelectorAll('.q-opt').forEach(o=>{
          o.classList.add('disabled');
          const idx = parseInt(o.dataset.i);
          if(idx===item.correct) o.classList.add('correct');
          else if(idx===chosen) o.classList.add('wrong');
        });
        if(chosen===item.correct) score++;
        scoreEl.textContent = `Skor: ${score}`;
        questionArea.querySelector('[data-explain]').style.display = 'block';
        const nextBtn = questionArea.querySelector('[data-next]');
        nextBtn.style.display = 'inline-flex';
        nextBtn.addEventListener('click', ()=>{
          currentQ++;
          if(currentQ >= questions.length){ showResult(); }
          else { renderQuestion(); }
        });
      });
    });
  }

  function showResult(){
    box.style.display = 'none';
    resultEl.style.display = 'block';
    const pct = Math.round(score/questions.length*100);
    resultEl.querySelector('[data-quiz-pct]').textContent = pct+'%';
    progressFill.style.width = '100%';
    let msg = '';
    if(pct>=85) msg = `Mantap! Level ${meta.levelLabel} udah kamu kuasin.`;
    else if(pct>=60) msg = 'Lumayan — sebagian besar udah nyantol, cek lagi yang masih meleset.';
    else msg = 'Santai, coba baca ulang materinya terus balik lagi ke level ini — atau mulai dari level yang lebih ringan dulu.';
    resultEl.querySelector('[data-quiz-resultmsg]').textContent = `Kamu menjawab benar ${score} dari ${questions.length} soal. ${msg}`;

    markProgress(meta.babId, 'started');

    submitQuizResult({
      subject: meta.subject, babId: meta.babId,
      nama: meta.studentName,
      kelas: meta.studentClass,
      skor: score,
      total: questions.length,
      persentase: pct,
      topik: meta.topik,
      level: meta.levelLabel
    }, resultEl.querySelector('[data-quiz-submitstatus]'), meta.token);
  }

  resultEl.querySelector('[data-quiz-restart]').addEventListener('click', ()=>{
    currentQ = 0; score = 0;
    resultEl.style.display = 'none';
    box.style.display = '';
    renderQuestion();
  });
  resultEl.querySelector('[data-ex-backbtn]').addEventListener('click', ()=>{
    if(meta.onBack) meta.onBack();
  });

  renderQuestion();
}

function submitQuizResult(payload, statusEl, token){
  if(!statusEl) return;
  if(!token){
    statusEl.innerHTML = `${icon('alert-triangle')} Sesi kamu habis, hasil ini gak kesimpen — refresh & login ulang ya.`;
    statusEl.className = 'submit-status err';
    return;
  }
  statusEl.textContent = 'Menyimpan hasil…';
  statusEl.className = 'submit-status pending';
  fetch('/api/quiz-result', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    body: JSON.stringify(payload)
  }).then(r=>r.json()).then(data=>{
    if(data && data.success){
      statusEl.innerHTML = `${icon('check')} Hasil kamu udah kesimpen.`;
      statusEl.className = 'submit-status ok';
    } else {
      statusEl.innerHTML = `${icon('alert-triangle')} Gagal nyimpen hasil ke server nih.`;
      statusEl.className = 'submit-status err';
    }
  }).catch(()=>{
    statusEl.innerHTML = `${icon('alert-triangle')} Gagal nyimpen hasil — cek koneksi internet kamu ya.`;
    statusEl.className = 'submit-status err';
  });
}

/* ===== LaTeX rendering (KaTeX) =====
   Convention for chapter-content authors:
     - Inline math:   \( ... \)
     - Display math:  $$ ... $$   or   \[ ... \]
     - Chemistry (mhchem): \(\ce{...}\) or inside any of the above, e.g. \(\ce{H2O + CO2 -> H2CO3}\)
   Deliberately NOT using single-$ delimiters — this site prints a lot of
   "Rp 32.000.000"-style currency (Ekonomi) that would otherwise get eaten
   by a naive $...$ matcher. */
function initMath(root){
  if(typeof window.renderMathInElement !== 'function') return;
  window.renderMathInElement(root, {
    delimiters: [
      {left:'$$', right:'$$', display:true},
      {left:'\\[', right:'\\]', display:true},
      {left:'\\(', right:'\\)', display:false}
    ],
    throwOnError:false
  });
}

/* ===== Wire everything up for a freshly-loaded chapter ===== */
function initAllComponents(root){
  initAccordions(root);
  initTabSwitches(root);
  initFilterToggles(root);
  initClickGroups(root);
  initShuCalculator(root);
  initQuizzes(root);
  initExercises(root);
  initMath(root);
}

/* ===== Scroll reveal (lightweight) ===== */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.style.opacity='1';
  });
},{threshold:0.05});
function observeReveal(sections){
  sections.forEach(el=>revealObserver.observe(el));
}
observeReveal(document.querySelectorAll('body > section, #view-home section, #view-babs section, #view-signin section'));
