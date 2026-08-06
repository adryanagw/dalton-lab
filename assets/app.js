/* =====================================================================
   DALTON LAB — app.js
   Shared shell logic: theme, auth, routing, WhatsApp links, and a small
   set of GENERIC interactive engines (accordion, tab-switch, filter,
   click-detail, quiz) that any chapter content file can plug into just
   by using the right data-attributes. No chapter-specific JS needed.
   ===================================================================== */

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
    name:'Ekonomi', icon:'📊', ready:true,
    desc:'Badan usaha, koperasi, manajemen, dan seluk-beluk ekonomi lainnya.',
    babs:[
      {id:'bab1-badan-usaha', num:'Bab 1', title:'Badan Usaha, Koperasi & Manajemen', desc:'Bentuk-bentuk badan usaha, BUMN/BUMD, koperasi & kalkulator SHU, dasar manajemen.', ready:true, contentUrl:'content/ekonomi/bab1-badan-usaha.html'},
    ]
  },
  biologi: {
    name:'Biologi', icon:'🧬', ready:true,
    desc:'Sel, jaringan, sistem organ tubuh, dan makhluk hidup lainnya.',
    babs:[
      {id:'bab1-sel', num:'Bab 1', title:'Sel: Unit Dasar Kehidupan', desc:'Sejarah penemuan sel, komponen kimiawi & struktural, organel, transpor membran, hingga reproduksi sel.', ready:true, contentUrl:'content/biologi/bab1-sel.html'},
    ]
  },
  matematika: {
    name:'Matematika', icon:'📐', ready:false,
    desc:'Aljabar, geometri, kalkulus, statistika, dan lainnya.',
    babs:[]
  },
  kimia: {
    name:'Kimia', icon:'🧪', ready:false,
    desc:'Struktur atom, ikatan kimia, stoikiometri, dan lainnya.',
    babs:[]
  },
  fisika: {
    name:'Fisika', icon:'⚛️', ready:false,
    desc:'Mekanika, listrik-magnet, gelombang, dan lainnya.',
    babs:[]
  },
};

/* ===== WhatsApp marketing links ===== */
const WHATSAPP_NUMBER = '6282136673896'; // 082136673896 in international format

/* ===== Google Sheets / Apps Script backend =====
   Used for BOTH login checks and quiz result logging (see Code.gs). */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHBK1OXZjz59KjTjRkcTEut8I007AGblM2px7PAxg1qUYYJzLHtfIQtHkGtQNjasasYw/exec";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
document.getElementById('waFloat').href = waLink('Halo Dalton Lab! Aku pengen tau lebih lanjut soal akses materi & bimbingan tutor di sini 🙌');
document.getElementById('homeWaBtn').href = waLink('Halo Dalton Lab! Aku mau nanya-nanya soal kelas bimbingan (privat/grup) via Zoom 🙌');

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
function hasAccess(subjectKey){
  const s = getSession();
  if(!s || !s.akses) return false;
  return s.akses.includes('all') || s.akses.includes(subjectKey);
}
function renderSessionBadge(){
  const badge = document.getElementById('sessionBadge');
  const s = getSession();
  if(s){
    badge.style.display = 'flex';
    badge.innerHTML = `👋 ${s.nama || s.username} <button id="logoutBtn">Keluar</button>`;
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
    <div class="subject-card ${s.ready?'ready':'soon'}" data-subject="${key}">
      <span class="subj-icon">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <span class="subj-status">${s.ready ? 'Tersedia' : 'Segera Hadir'}</span>
    </div>`).join('');
  grid.querySelectorAll('.subject-card').forEach(card=>{
    card.addEventListener('click',()=>enterSubject(card.dataset.subject));
  });
}
renderSubjectGrid();

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
  window.scrollTo({top:0,behavior:'instant'});
}

function enterSubject(subjectKey){
  activeSubjectKey = subjectKey;
  if(hasAccess(subjectKey)){
    goToBabs(subjectKey);
  } else {
    goToSignIn(subjectKey);
  }
}

function goToSignIn(subjectKey){
  activeSubjectKey = subjectKey;
  const s = subjectsData[subjectKey];
  document.getElementById('signinTitle').textContent = 'Yuk Masuk Dulu buat Buka ' + s.name;
  document.getElementById('signinSubtitle').textContent = `Materi ${s.name} cuma bisa dibuka kalau kamu udah terdaftar di Dalton Lab.`;
  document.getElementById('signinError').classList.remove('show');
  document.getElementById('signinUsername').value = '';
  document.getElementById('signinPassword').value = '';
  document.getElementById('signinWaBtn').href = waLink(`Halo Dalton Lab, aku belum punya akun buat buka materi ${s.name}. Boleh dibantu daftarin? 🙏`);

  hideAllViews();
  viewSignin.style.display = '';
  document.querySelectorAll('.subject-link').forEach(l=>l.classList.toggle('active', l.dataset.subject===subjectKey));
  window.scrollTo({top:0,behavior:'instant'});
}

function goToBabs(subjectKey){
  activeSubjectKey = subjectKey;
  const s = subjectsData[subjectKey];
  document.getElementById('babsEyebrow').textContent = 'Mata Pelajaran';
  document.getElementById('babsTitle').textContent = s.name + ' — Pilih Bab';
  document.getElementById('babsSubtitle').textContent = s.desc;

  const babGrid = document.getElementById('babGrid');
  if(s.babs.length === 0){
    babGrid.innerHTML = `<p style="color:var(--slate);grid-column:1/-1;">Materi ${s.name} sedang disiapkan — segera hadir di sini. 🚧</p>`;
  } else {
    babGrid.innerHTML = s.babs.map(b=>`
      <div class="bab-card ${b.ready?'':'soon'}" data-bab="${b.id}">
        ${b.ready?'':'<span class="soon-tag">Segera Hadir</span>'}
        <div class="bab-num">${b.num}</div>
        <h4>${b.title}</h4>
        <p>${b.desc}</p>
      </div>`).join('');
    babGrid.querySelectorAll('.bab-card:not(.soon)').forEach(card=>{
      card.addEventListener('click',()=>goToLesson(card.dataset.bab));
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

  if(!bab || !bab.contentUrl){
    lessonContent.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center;color:var(--slate);">Materi ini belum tersedia.</div>`;
    return;
  }

  try{
    const res = await fetch(bab.contentUrl);
    if(!res.ok) throw new Error('fetch failed');
    const html = await res.text();
    lessonContent.innerHTML = html;
  }catch(err){
    lessonContent.innerHTML = `<div class="wrap" style="padding:80px 0;text-align:center;color:var(--slate);">
      ⚠️ Gagal memuat materi. Kalau kamu membuka file ini langsung (file://), coba jalankan lewat web server lokal atau buka versi yang sudah di-hosting.
    </div>`;
    return;
  }

  // Prefill quiz gate name from session, for any quiz on this page
  const session = getSession();
  if(session){
    lessonContent.querySelectorAll('[data-gate-name]').forEach(input=>{
      if(!input.value) input.value = session.nama || '';
    });
  }

  buildLessonSubnav(lessonContent);
  initAllComponents(lessonContent);
  observeReveal(lessonContent.querySelectorAll('section'));
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
  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.indexOf('PASTE_YOUR') === 0){
    showSigninError('Waduh, sistem loginnya belum aktif nih. Coba chat kita dulu lewat WhatsApp di sebelah ya.');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Memeriksa…';
  try{
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method:'POST',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify({type:'login', username, password})
    });
    const data = await res.json();
    if(data.success){
      saveSession({username, nama:data.nama || username, akses: data.akses || []});
      if(hasAccess(activeSubjectKey)){
        goToBabs(activeSubjectKey);
      } else {
        showSigninError(`Login berhasil! Tapi akunmu belum punya akses ke ${subjectsData[activeSubjectKey].name} nih — chat admin lewat WhatsApp buat upgrade akses ya.`);
      }
    } else {
      showSigninError(data.message || 'Hmm, username atau password-nya salah nih. Coba cek lagi ya.');
    }
  }catch(err){
    showSigninError('Gagal terhubung ke server. Periksa koneksi internet kamu.');
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
   Any chapter just needs: <div class="quiz-root" data-quiz-src="…json"
   data-quiz-sheet="Kuis - Subject - babId"></div>
   Everything else (gate, questions, scoring, Sheets submission) is built
   here from the fetched JSON — zero per-chapter quiz JavaScript.
   ===================================================================== */
function initQuizzes(root){
  root.querySelectorAll('.quiz-root').forEach(async (mount)=>{
    const src = mount.dataset.quizSrc;
    const sheetName = mount.dataset.quizSheet || 'Kuis - Umum';
    if(!src) return;

    mount.innerHTML = `<p style="color:#c3ccd9;">Memuat kuis…</p>`;
    let quiz;
    try{
      const res = await fetch(src);
      quiz = await res.json();
    }catch(err){
      mount.innerHTML = `<p style="color:#f0a597;">⚠️ Gagal memuat soal kuis. Coba refresh halaman ya.</p>`;
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
    try{
      const raw = localStorage.getItem('daltonlab_session');
      const session = raw ? JSON.parse(raw) : null;
      if(session && session.nama) nameInput.value = session.nama;
    }catch(e){}

    mount.querySelector('[data-gate-start]').addEventListener('click', ()=>{
      const nameVal = nameInput.value.trim();
      const classVal = classInput.value.trim();
      if(!nameVal || !classVal){
        hint.textContent = 'Nama dan kelas wajib diisi sebelum memulai kuis.';
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

      let session = null;
      try{ session = JSON.parse(localStorage.getItem('daltonlab_session')); }catch(e){}
      submitToSheet({
        type: 'quiz',
        sheetName,
        username: session ? session.username : '',
        nama: studentName,
        kelas: studentClass,
        skor: score,
        total: quiz.length,
        persentase: pct,
        waktu: new Date().toLocaleString('id-ID', {timeZone:'Asia/Jakarta'})
      }, resultEl.querySelector('[data-quiz-submitstatus]'));
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

function submitToSheet(payload, statusEl){
  if(!statusEl) return;
  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.indexOf('PASTE_YOUR') === 0){
    statusEl.textContent = '⚠ Belum terhubung ke Google Sheets (lihat catatan setup guru).';
    statusEl.className = 'submit-status err';
    return;
  }
  statusEl.textContent = 'Menyimpan hasil…';
  statusEl.className = 'submit-status pending';
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {'Content-Type': 'text/plain;charset=utf-8'},
    body: JSON.stringify(payload)
  }).then(r=>r.json()).then(data=>{
    if(data && data.success){
      statusEl.textContent = '✓ Hasil kamu sudah tercatat.';
      statusEl.className = 'submit-status ok';
    } else {
      statusEl.textContent = '⚠ Gagal menyimpan hasil ke server.';
      statusEl.className = 'submit-status err';
    }
  }).catch(()=>{
    statusEl.textContent = '⚠ Gagal menyimpan hasil — periksa koneksi internet.';
    statusEl.className = 'submit-status err';
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
