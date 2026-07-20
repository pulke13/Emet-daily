/* Emet Daily - mobile PWA
   Mirrors the Windows dashboard's Eisenhower matrix, touch-first.
   All data stays on the device in localStorage.
   Bilingual: English (LTR) + Hebrew (RTL). */

const STORE_KEY = 'emet_daily_tasks_v1';
const LANG_KEY  = 'emet_daily_lang';
const APIKEY_KEY = 'emet_daily_api_key';
const MODEL_KEY  = 'emet_daily_model';
const DEFAULT_MODEL = 'gemini-3.5-flash';

/* ---------- translations ---------- */
const I18N = {
  en: {
    langLabel:'עב',            // shows Hebrew abbrev = tap to switch to Hebrew
    appTitle:'The Emet Daily',
    tabMatrix:'Priority Matrix', tabToday:'Today',
    q_backlog_title:'Backlog',   q_backlog_sub:'Unassigned tasks',
    q_do_title:'Do First',       q_do_sub:'Urgent & Important',
    q_sched_title:'Schedule',    q_sched_sub:'Not Urgent, Important',
    q_deleg_title:'Delegate',    q_deleg_sub:'Urgent, Not Important',
    q_elim_title:'Eliminate',    q_elim_sub:'Neither',
    today_sched_title:'Scheduled Today', today_sched_sub:'By reminder time',
    today_none_title:'No Time Set',      today_none_sub:'Anytime tasks',
    empty:'Nothing here yet', notes:'notes',
    new_task:'New Task', edit_task:'Edit Task',
    f_title:'Title', ph_title:'What needs doing?',
    f_quad:'Priority box',
    f_details:'Details & notes', ph_details:'Optional notes...',
    f_time:'Reminder time', clear_time:'Clear time',
    f_color:'Card color',
    save_task:'Save Task', toggle_done:'Toggle Done', delete:'Delete',
    opt_none:'Backlog (unassigned)',
    opt_do:'Do First — Urgent & Important',
    opt_sched:'Schedule — Not Urgent, Important',
    opt_deleg:'Delegate — Urgent, Not Important',
    opt_elim:'Eliminate — Neither',
    backup_title:'Backup & Restore',
    backup_desc:'Your tasks live only on this device. Export a backup file to keep them safe or move them to another phone.',
    export:'Export backup file', import:'Restore from file', clear_all:'Clear all tasks',
    toast_added:'Task added', toast_updated:'Task updated', toast_deleted:'Task deleted',
    toast_empty:'Title cannot be empty', toast_moved:'Moved to ',
    toast_backup:'Backup exported', toast_restored:'Backup restored', toast_cleared:'All tasks cleared',
    toast_badfile:'Not a valid backup file',
    rem_on:'Reminders enabled', rem_block:'Reminders blocked in settings', rem_unsup:'Reminders not supported here',
    confirm_restore:'This will REPLACE your current tasks with the backup. Continue?',
    confirm_clear:'Delete ALL tasks? This cannot be undone.',
    confirm_del:'Delete this task?',
    notif_title:'Emet Daily - Reminder', reminder_prefix:'Reminder: ',
    settings_title:'Settings',
    settings_desc:'The API key is stored only on this device and is used by AI Prioritize.',
    f_apikey:'Gemini API key', ph_apikey:'Paste your Gemini API key...',
    f_model:'AI model',
    show_key:'Show', hide_key:'Hide',
    save_settings:'Save Settings', toast_settings:'Settings saved',
    ai_nokey:'Set your Gemini API key in Settings first',
    ai_none:'No backlog tasks to prioritize',
    ai_thinking:'AI is prioritizing...',
    ai_done:'AI sorted {n} task(s) into the matrix',
    ai_err:'AI request failed - check key & internet',
    f_date:'Reminder date (optional)', clear_date:'Clear date',
    hint_matrix:'Tap a task to edit it. Drag the ⋮⋮ handle to move it between priority boxes. Use 🧠 to let AI sort the backlog.',
    hint_today:'Tasks with a reminder for today (or with no date) appear here, sorted by time.',
    f_repeat:'Repeat', rep_none:'None', rep_daily:'Daily', rep_weekly:'Weekly',
    stats_fmt:'Done today: {t}  ·  Total done: {n}  ·  Streak: {s}d'
  },
  he: {
    langLabel:'EN',
    appTitle:'אמת יומי',
    tabMatrix:'מטריצת עדיפויות', tabToday:'היום',
    q_backlog_title:'מאגר',              q_backlog_sub:'משימות ללא שיוך',
    q_do_title:'לעשות קודם',  q_do_sub:'דחוף וחשוב',
    q_sched_title:'לתזמן',          q_sched_sub:'לא דחוף, חשוב',
    q_deleg_title:'להאציל',    q_deleg_sub:'דחוף, לא חשוב',
    q_elim_title:'לבטל',                 q_elim_sub:'לא דחוף ולא חשוב',
    today_sched_title:'מתוזמן להיום', today_sched_sub:'לפי שעת תזכורת',
    today_none_title:'ללא שעה',  today_none_sub:'משימות לכל שעה',
    empty:'אין כאן כלום עדיין', notes:'הערות',
    new_task:'משימה חדשה', edit_task:'עריכת משימה',
    f_title:'כותרת', ph_title:'מה צריך לעשות?',
    f_quad:'תיבת עדיפות',
    f_details:'פרטים והערות', ph_details:'הערות (לא חובה)...',
    f_time:'שעת תזכורת', clear_time:'נקה שעה',
    f_color:'צבע כרטיס',
    save_task:'שמור משימה', toggle_done:'סמן בוצע / בטל', delete:'מחק',
    opt_none:'מאגר (ללא שיוך)',
    opt_do:'לעשות קודם — דחוף וחשוב',
    opt_sched:'לתזמן — לא דחוף, חשוב',
    opt_deleg:'להאציל — דחוף, לא חשוב',
    opt_elim:'לבטל — לא דחוף ולא חשוב',
    backup_title:'גיבוי ושחזור',
    backup_desc:'המשימות נשמרות רק במכשיר הזה. ייצא קובץ גיבוי כדי לשמור עליהן או להעביר אותן לטלפון אחר.',
    export:'ייצא קובץ גיבוי', import:'שחזר מקובץ', clear_all:'מחק את כל המשימות',
    toast_added:'משימה נוספה', toast_updated:'משימה עודכנה', toast_deleted:'משימה נמחקה',
    toast_empty:'הכותרת אינה יכולה להיות ריקה', toast_moved:'הועבר אל ',
    toast_backup:'הגיבוי יוצא', toast_restored:'הגיבוי שוחזר', toast_cleared:'כל המשימות נמחקו',
    toast_badfile:'קובץ גיבוי לא תקין',
    rem_on:'התזכורות הופעלו', rem_block:'התזכורות חסומות בהגדרות', rem_unsup:'תזכורות אינן נתמכות כאן',
    confirm_restore:'פעולה זו תחליף את המשימות הנוכחיות בגיבוי. להמשיך?',
    confirm_clear:'למחוק את כל המשימות? לא ניתן לבטל.',
    confirm_del:'למחוק את המשימה הזו?',
    notif_title:'אמת יומי - תזכורת', reminder_prefix:'תזכורת: ',
    settings_title:'הגדרות',
    settings_desc:'מפתח ה-API נשמר רק במכשיר הזה ומשמש את תיעדוף ה-AI.',
    f_apikey:'מפתח API של Gemini', ph_apikey:'הדבק כאן את מפתח ה-API...',
    f_model:'מודל AI',
    show_key:'הצג', hide_key:'הסתר',
    save_settings:'שמור הגדרות', toast_settings:'ההגדרות נשמרו',
    ai_nokey:'קודם הגדר את מפתח ה-API של Gemini בהגדרות',
    ai_none:'אין משימות במאגר לתעדוף',
    ai_thinking:'ה-AI מתעדף...',
    ai_done:'ה-AI סידר {n} משימות במטריצה',
    ai_err:'בקשת ה-AI נכשלה - בדוק מפתח וחיבור לאינטרנט',
    f_date:'תאריך תזכורת (לא חובה)', clear_date:'נקה תאריך',
    hint_matrix:'הקש על משימה לעריכה. גרור בידית ⋮⋮ להעברה בין תיבות עדיפות. לחץ 🧠 כדי שה-AI יסדר את המאגר.',
    hint_today:'משימות עם תזכורת להיום (או ללא תאריך) מופיעות כאן, לפי שעה.',
    f_repeat:'חזרה', rep_none:'ללא', rep_daily:'יומי', rep_weekly:'שבועי',
    stats_fmt:'הושלמו היום: {t}  ·  סה"כ: {n}  ·  רצף: {s} ימים'
  }
};

let lang = localStorage.getItem(LANG_KEY) || 'en';
function t(key){ return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

/* ---------- data ---------- */
const QUADS = [
  { id:'Urgent_Important',       tk:'do',    color:'#FF4C4C' },
  { id:'NotUrgent_Important',    tk:'sched', color:'#007BFF' },
  { id:'Urgent_NotImportant',    tk:'deleg', color:'#FFBF00' },
  { id:'NotUrgent_NotImportant', tk:'elim',  color:'#777777' },
];
const BACKLOG = { id:'None', tk:'backlog', color:'#8a8f9e' };
const SWATCHES = ['', '#FF4C4C', '#007BFF', '#FFBF00', '#28a745', '#a855f7', '#777777'];

// Options for the custom priority dropdown
const QUAD_OPTIONS = [
  { value:'None',                 tk:'opt_none'  },
  { value:'Urgent_Important',     tk:'opt_do'    },
  { value:'NotUrgent_Important',  tk:'opt_sched' },
  { value:'Urgent_NotImportant',  tk:'opt_deleg' },
  { value:'NotUrgent_NotImportant',tk:'opt_elim' },
];
let quadValue = 'None';

// Repeat options for the segmented control in the editor
const REPEAT_OPTIONS = [
  { value:'',       tk:'rep_none'   },
  { value:'daily',  tk:'rep_daily'  },
  { value:'weekly', tk:'rep_weekly' },
];
let repeatValue = '';

let tasks = load();
let editingId = null;
let currentView = 'matrix';

function load(){
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch(e){ return []; }
}
function save(){
  localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
  scheduleAlarms();
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function getTask(id){ return tasks.find(t => t.id === id); }

/* ---------- language ---------- */
function applyLang(){
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
  // static text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  document.getElementById('btnLang').textContent = t('langLabel');
  buildQuadDropdown();   // re-label the custom dropdown in the new language
  buildRepeat();         // re-label the repeat control too
  render();
}
function toggleLang(){
  lang = (lang === 'en') ? 'he' : 'en';
  localStorage.setItem(LANG_KEY, lang);
  applyLang();
}

/* ---------- rendering ---------- */
const app = document.getElementById('app');

function render(){
  const hint = document.getElementById('hint');
  if (hint) hint.textContent = t(currentView === 'matrix' ? 'hint_matrix' : 'hint_today');
  renderStats();
  if (currentView === 'matrix') renderMatrix();
  else renderToday();
}

/* ---------- progress stats (done today / total / streak) ---------- */
function computeStats(){
  const today = todayStr();
  const done = tasks.filter(x => x.done);
  const doneToday = done.filter(x => (x.doneAt||'') === today).length;
  const days = new Set(done.map(x => x.doneAt).filter(Boolean));
  const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  let streak = 0, d = new Date();
  if(!days.has(iso(d))) d.setDate(d.getDate()-1);   // today not done yet? count back from yesterday
  while(days.has(iso(d))){ streak++; d.setDate(d.getDate()-1); }
  return { today: doneToday, total: done.length, streak };
}
function renderStats(){
  const el = document.getElementById('stats');
  if(!el) return;
  const s = computeStats();
  el.textContent = t('stats_fmt').replace('{t}', s.today).replace('{n}', s.total).replace('{s}', s.streak);
}

function todayStr(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isForToday(x){ return !x.date || x.date === todayStr(); }

function renderMatrix(){
  const groups = [BACKLOG, ...QUADS];
  app.innerHTML = groups.map(g =>
    zoneHTML(g.id, t('q_'+g.tk+'_title'), t('q_'+g.tk+'_sub'), g.color,
             tasks.filter(x => (x.quadrant||'None') === g.id), false)
  ).join('');
  wireZones();
}

function renderToday(){
  const withTime = tasks.filter(x => x.time && isForToday(x)).sort((a,b) => a.time.localeCompare(b.time));
  const noTime   = tasks.filter(x => !x.time && !x.done);
  let html  = zoneHTML('__timed',  t('today_sched_title'), t('today_sched_sub'), '#007BFF', withTime, true);
      html += zoneHTML('__untimed',t('today_none_title'),  t('today_none_sub'),  '#8a8f9e', noTime,  true);
  app.innerHTML = html;
  wireZones();
}

function zoneHTML(quadId, title, sub, color, list, noDrop){
  const body = list.length
    ? list.map(taskHTML).join('')
    : `<div class="empty">${esc(t('empty'))}</div>`;
  return `
    <section class="zone" data-quad="${quadId}" ${noDrop?'data-nodrop="1"':''}>
      <div class="zone-head">
        <span class="dot" style="background:${color}"></span>
        <div>
          <div class="zone-title" style="color:${color}">${esc(title)}</div>
          <div class="zone-sub">${esc(sub)}</div>
        </div>
        <span class="count">${list.length}</span>
      </div>
      <div class="zone-body">${body}</div>
    </section>`;
}

function taskHTML(x){
  const bg = x.color ? `style="background:${hexToSoft(x.color)};border-color:${x.color}55"` : '';
  let badges = '';
  if (x.date && x.date !== todayStr()){
    badges += `<span class="badge" dir="ltr">&#128197; ${esc(x.date)}</span>`;
  }
  if (x.time){
    const soon = isForToday(x) && isDueSoon(x.time);
    badges += `<span class="badge alarm ${soon?'due-soon':''}" dir="ltr">&#128276; ${esc(x.time)}</span>`;
  }
  if (x.repeat){
    const rl = x.repeat === 'daily' ? t('rep_daily') : t('rep_weekly');
    badges += `<span class="badge">&#128260; ${esc(rl)}</span>`;
  }
  if (x.details) badges += `<span class="badge">&#128221; ${esc(t('notes'))}</span>`;
  return `
    <div class="task ${x.done?'done':''}" data-id="${x.id}" ${bg}>
      <div class="check" data-check="${x.id}">${x.done?'&#10003;':''}</div>
      <div class="body" data-edit="${x.id}">
        <div class="ttl">${esc(x.text)}</div>
        ${badges?`<div class="meta">${badges}</div>`:''}
      </div>
      <div class="trash" data-trash="${x.id}" title="${esc(t('delete'))}">&#128465;</div>
      <div class="grip" data-grip="${x.id}">&#8942;&#8942;</div>
    </div>`;
}

function wireZones(){
  app.querySelectorAll('[data-check]').forEach(el =>
    el.addEventListener('click', e => { e.stopPropagation(); toggleDone(el.dataset.check); }));
  app.querySelectorAll('[data-edit]').forEach(el =>
    el.addEventListener('click', () => openEditor(el.dataset.edit)));
  app.querySelectorAll('[data-trash]').forEach(el =>
    el.addEventListener('click', e => { e.stopPropagation(); quickDelete(el.dataset.trash); }));
  app.querySelectorAll('[data-grip]').forEach(el => attachDrag(el));
}

/* ---------- actions ---------- */
function toggleDone(id){
  const x = getTask(id); if(!x) return;
  x.done = !x.done;
  x.doneAt = x.done ? todayStr() : '';   // timestamp powers the stats bar
  save(); render();
}

function quickDelete(id){
  const x = getTask(id); if(!x) return;
  if(!confirm(t('confirm_del'))) return;
  tasks = tasks.filter(y => y.id !== id);
  save(); render();
  toast(t('toast_deleted'));
}

function openEditor(id){
  editingId = id;
  const x = id ? getTask(id) : null;
  document.getElementById('editTitle').textContent = x ? t('edit_task') : t('new_task');
  document.getElementById('fTitle').value   = x ? x.text : '';
  document.getElementById('fDetails').value = x ? (x.details||'') : '';
  quadValue = x ? (x.quadrant||'None') : 'None';
  document.getElementById('fQuad').classList.remove('open');
  buildQuadDropdown();
  document.getElementById('fTime').value    = x ? (x.time||'') : '';
  document.getElementById('fDate').value    = x ? (x.date||'') : '';
  repeatValue = x ? (x.repeat||'') : '';
  buildRepeat();
  buildSwatches(x ? (x.color||'') : '');
  document.getElementById('doneTask').classList.toggle('hidden', !x);
  document.getElementById('delTask').classList.toggle('hidden', !x);
  openSheet('editWrap');
  if(!x) setTimeout(()=>document.getElementById('fTitle').focus(), 250);
}

function saveFromEditor(){
  const text = document.getElementById('fTitle').value.trim();
  if(!text){ toast(t('toast_empty')); return; }
  const data = {
    text,
    details:  document.getElementById('fDetails').value,
    quadrant: quadValue,
    time:     document.getElementById('fTime').value,
    date:     document.getElementById('fDate').value,
    repeat:   repeatValue,
    color:    selectedColor,
  };
  if(editingId){
    Object.assign(getTask(editingId), data);
  } else {
    tasks.push({ id:uid(), done:false, ...data });
  }
  save(); render(); closeSheet('editWrap');
  toast(editingId ? t('toast_updated') : t('toast_added'));
}

function deleteTask(){
  if(!editingId) return;
  tasks = tasks.filter(x => x.id !== editingId);
  save(); render(); closeSheet('editWrap');
  toast(t('toast_deleted'));
}

function toggleDoneFromEditor(){
  if(!editingId) return;
  toggleDone(editingId);
  closeSheet('editWrap');
}

/* ---------- color swatches ---------- */
let selectedColor = '';
function buildSwatches(current){
  selectedColor = current || '';
  const box = document.getElementById('swatches');
  box.innerHTML = SWATCHES.map(c => {
    const bg = c ? c : 'rgba(255,255,255,0.08)';
    const label = c ? '' : '&#8709;';
    return `<div class="swatch ${c===selectedColor?'sel':''}" data-color="${c}"
              style="background:${bg};display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;">${label}</div>`;
  }).join('');
  box.querySelectorAll('[data-color]').forEach(el =>
    el.addEventListener('click', () => {
      selectedColor = el.dataset.color;
      box.querySelectorAll('.swatch').forEach(s => s.classList.remove('sel'));
      el.classList.add('sel');
    }));
}

/* ---------- custom priority dropdown ---------- */
function buildQuadDropdown(){
  const dd = document.getElementById('fQuad');
  if(!dd) return;
  const cur = QUAD_OPTIONS.find(o => o.value === quadValue) || QUAD_OPTIONS[0];
  dd.querySelector('.dd-text').textContent = t(cur.tk);
  const list = document.getElementById('fQuadList');
  list.innerHTML = QUAD_OPTIONS.map(o =>
    `<div class="dd-item ${o.value===quadValue?'sel':''}" data-val="${o.value}">${esc(t(o.tk))}</div>`
  ).join('');
  list.querySelectorAll('[data-val]').forEach(el =>
    el.addEventListener('click', () => setQuad(el.dataset.val)));
}
function setQuad(v){
  quadValue = v;
  document.getElementById('fQuad').classList.remove('open');
  buildQuadDropdown();
}

/* ---------- repeat segmented control ---------- */
function buildRepeat(){
  const box = document.getElementById('fRepeat');
  if(!box) return;
  box.innerHTML = REPEAT_OPTIONS.map(o =>
    `<div class="seg ${o.value===repeatValue?'sel':''}" data-rep="${o.value}">${esc(t(o.tk))}</div>`
  ).join('');
  box.querySelectorAll('[data-rep]').forEach(el =>
    el.addEventListener('click', () => { repeatValue = el.dataset.rep; buildRepeat(); }));
}

/* ---------- touch drag between quadrants ---------- */
function attachDrag(handle){
  let ghost=null, srcTask=null, id=null, hotZone=null;
  handle.addEventListener('pointerdown', e => {
    e.preventDefault();
    id = handle.dataset.grip;
    srcTask = handle.closest('.task');
    if(!srcTask) return;
    handle.setPointerCapture(e.pointerId);
    ghost = srcTask.cloneNode(true);
    ghost.id = 'ghost';
    ghost.style.width = srcTask.offsetWidth + 'px';
    document.body.appendChild(ghost);
    moveGhost(e.clientX, e.clientY);
    srcTask.classList.add('dragging');
    const onMove = ev => {
      moveGhost(ev.clientX, ev.clientY);
      const zone = zoneUnder(ev.clientX, ev.clientY);
      if(zone !== hotZone){
        if(hotZone) hotZone.classList.remove('drop-hot');
        hotZone = zone;
        if(hotZone) hotZone.classList.add('drop-hot');
      }
    };
    const onUp = () => {
      handle.releasePointerCapture(e.pointerId);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if(ghost){ ghost.remove(); ghost=null; }
      srcTask.classList.remove('dragging');
      if(hotZone){
        const q = hotZone.dataset.quad;
        hotZone.classList.remove('drop-hot');
        const x = getTask(id);
        if(x && (x.quadrant||'None') !== q){
          x.quadrant = q;
          save(); render();
          toast(t('toast_moved') + quadName(q));
        }
      }
      hotZone=null;
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}
function moveGhost(x,y){
  const g = document.getElementById('ghost');
  if(g){ g.style.left = (x - 30) + 'px'; g.style.top = (y - 20) + 'px'; }
}
function zoneUnder(x,y){
  const g = document.getElementById('ghost');
  if(g) g.style.display='none';
  const el = document.elementFromPoint(x,y);
  if(g) g.style.display='';
  if(!el) return null;
  const zone = el.closest('.zone');
  if(!zone || zone.dataset.nodrop) return null;
  return zone;
}
function quadName(q){
  if(q==='None') return t('q_backlog_title');
  const found = QUADS.find(z=>z.id===q);
  return found ? t('q_'+found.tk+'_title') : q;
}

/* ---------- reminders ---------- */
let alarmTimers = [];
function scheduleAlarms(){
  alarmTimers.forEach(clearTimeout);
  alarmTimers = [];
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  const now = new Date();
  tasks.forEach(x => {
    if(x.done || !x.time) return;
    if(x.date && x.date !== todayStr()) return;   // reminder is for another day
    const [h,m] = x.time.split(':').map(Number);
    const when = new Date();
    when.setHours(h, m, 0, 0);
    const diff = when - now;
    if(diff > 0 && diff < 24*3600*1000){
      alarmTimers.push(setTimeout(() => fireAlarm(x), diff));
    }
  });
}
function fireAlarm(x){
  try { new Notification(t('notif_title'), { body: x.text, icon:'icon.svg' }); } catch(e){}
  try { navigator.vibrate && navigator.vibrate([300,150,300]); } catch(e){}
  toast(t('reminder_prefix') + x.text);
  // Repeating task: roll its reminder forward to the next occurrence so it re-arms
  if(x.repeat === 'daily' || x.repeat === 'weekly'){
    const step = x.repeat === 'daily' ? 1 : 7;
    const today = new Date(); today.setHours(0,0,0,0);
    let d = x.date ? new Date(x.date+'T00:00:00') : new Date(today);
    do { d.setDate(d.getDate() + step); } while (d <= today);
    x.date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    save();
  }
}
function isDueSoon(time){
  const [h,m] = time.split(':').map(Number);
  const when = new Date(); when.setHours(h,m,0,0);
  const diff = when - new Date();
  return diff > 0 && diff < 3600*1000;
}

/* ---------- backup / restore ---------- */
function exportBackup(){
  const blob = new Blob([JSON.stringify(tasks,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  a.href = url;
  a.download = `Emet_Daily_Backup_${d.getFullYear()}_${String(d.getMonth()+1).padStart(2,'0')}_${String(d.getDate()).padStart(2,'0')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast(t('toast_backup'));
  closeSheet('backupWrap');
}
function importBackup(file){
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if(!Array.isArray(data)) throw new Error('bad');
      if(!confirm(t('confirm_restore'))) return;
      tasks = data.map(x => ({ id:x.id||uid(), text:x.text||'', details:x.details||'',
        quadrant:x.quadrant||'None', time:x.time||'', date:x.date||'', color:x.color||'',
        repeat:x.repeat||'', slot:x.slot||0, doneAt:x.doneAt||'', done:!!x.done }));
      save(); render(); closeSheet('backupWrap');
      toast(t('toast_restored'));
    } catch(e){ toast(t('toast_badfile')); }
  };
  reader.readAsText(file);
}
function clearAll(){
  if(!confirm(t('confirm_clear'))) return;
  tasks = []; save(); render(); closeSheet('backupWrap');
  toast(t('toast_cleared'));
}

/* ---------- settings (API key stays on this device only) ---------- */
function openSettings(){
  const inp = document.getElementById('fApiKey');
  inp.type = 'password';
  inp.value = localStorage.getItem(APIKEY_KEY) || '';
  document.getElementById('fModel').value = localStorage.getItem(MODEL_KEY) || DEFAULT_MODEL;
  document.getElementById('toggleKey').textContent = t('show_key');
  openSheet('settingsWrap');
}
function toggleKeyVisibility(){
  const inp = document.getElementById('fApiKey');
  const btn = document.getElementById('toggleKey');
  const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  btn.textContent = t(show ? 'hide_key' : 'show_key');
}
function saveSettings(){
  localStorage.setItem(APIKEY_KEY, document.getElementById('fApiKey').value.trim());
  localStorage.setItem(MODEL_KEY, document.getElementById('fModel').value.trim() || DEFAULT_MODEL);
  closeSheet('settingsWrap');
  toast(t('toast_settings'));
}

/* ---------- AI prioritize (Gemini) ---------- */
let aiBusy = false;
async function aiPrioritize(){
  if(aiBusy) return;
  const key = localStorage.getItem(APIKEY_KEY) || '';
  if(!key){ toast(t('ai_nokey')); openSettings(); return; }
  const list = tasks.filter(x => (!x.quadrant || x.quadrant === 'None') && !x.done);
  if(!list.length){ toast(t('ai_none')); return; }

  aiBusy = true;
  const btn = document.getElementById('btnAI');
  btn.style.opacity = '0.4';
  toast(t('ai_thinking'));

  let prompt = 'You are an Eisenhower Matrix categorizer. Output JSON allocating these tasks into ' +
    '\'Do\', \'Schedule\', \'Delegate\', or \'Eliminate\'. Format strictly as {"id": "Category"}.\nTasks:\n';
  list.forEach(x => { prompt += `- ID: ${x.id} Text: ${x.text}\n`; });

  const model = localStorage.getItem(MODEL_KEY) || DEFAULT_MODEL;
  try{
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }] })
    });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const j = await res.json();
    let text = '';
    try { text = j.candidates[0].content.parts[0].text || ''; } catch(e){ text = ''; }
    if(text.includes('```json')) text = text.split('```json')[1].split('```')[0];
    else if(text.includes('```')) text = text.split('```')[1].split('```')[0];
    const mapped = JSON.parse(text.trim());
    const translation = {
      'Do':'Urgent_Important', 'Schedule':'NotUrgent_Important',
      'Delegate':'Urgent_NotImportant', 'Eliminate':'NotUrgent_NotImportant'
    };
    let n = 0;
    for(const [id, cat] of Object.entries(mapped)){
      const x = getTask(id);
      if(x && translation[cat]){ x.quadrant = translation[cat]; n++; }
    }
    if(n){
      save();
      currentView = 'matrix';
      document.querySelectorAll('.tab').forEach(t2 =>
        t2.classList.toggle('active', t2.dataset.view === 'matrix'));
      render();
    }
    toast(t('ai_done').replace('{n}', n));
  } catch(e){
    toast(t('ai_err'));
  } finally {
    aiBusy = false;
    btn.style.opacity = '';
  }
}

/* ---------- sheets / toast / helpers ---------- */
function openSheet(id){ document.getElementById(id).classList.add('open'); }
function closeSheet(id){ document.getElementById(id).classList.remove('open'); }

let toastTimer;
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2200);
}
function esc(s){ return (s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function hexToSoft(hex){
  const h = hex.replace('#','');
  const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},0.16)`;
}

/* ---------- wiring ---------- */
document.getElementById('fab').addEventListener('click', () => openEditor(null));
document.getElementById('saveTask').addEventListener('click', saveFromEditor);
document.getElementById('delTask').addEventListener('click', deleteTask);
document.getElementById('doneTask').addEventListener('click', toggleDoneFromEditor);
document.getElementById('clearTime').addEventListener('click', () => document.getElementById('fTime').value='');
document.getElementById('clearDate').addEventListener('click', () => document.getElementById('fDate').value='');
document.getElementById('btnAI').addEventListener('click', aiPrioritize);
document.getElementById('btnSettings').addEventListener('click', openSettings);
document.getElementById('toggleKey').addEventListener('click', toggleKeyVisibility);
document.getElementById('saveSettings').addEventListener('click', saveSettings);
document.getElementById('fQuadSelected').addEventListener('click', () =>
  document.getElementById('fQuad').classList.toggle('open'));
document.getElementById('btnBackup').addEventListener('click', () => openSheet('backupWrap'));
document.getElementById('btnLang').addEventListener('click', toggleLang);
document.getElementById('doExport').addEventListener('click', exportBackup);
document.getElementById('doImport').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', e => { if(e.target.files[0]) importBackup(e.target.files[0]); });
document.getElementById('doClear').addEventListener('click', clearAll);

document.querySelectorAll('[data-close]').forEach(el =>
  el.addEventListener('click', () => { closeSheet('editWrap'); closeSheet('backupWrap'); closeSheet('settingsWrap'); }));

document.querySelectorAll('.tab').forEach(tab =>
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t2=>t2.classList.remove('active'));
    tab.classList.add('active');
    currentView = tab.dataset.view;
    render();
  }));

document.getElementById('btnBell').addEventListener('click', async () => {
  if(!('Notification' in window)){ toast(t('rem_unsup')); return; }
  const p = await Notification.requestPermission();
  if(p === 'granted'){ toast(t('rem_on')); scheduleAlarms(); }
  else toast(t('rem_block'));
});

/* Scrolling over a date/time field must scroll the PAGE, not change the value.
   Browsers only alter a focused field on wheel, so blurring it prevents the change.
   (Same idea as the desktop fix that stops the calendar flipping months on scroll.) */
const WHEEL_SAFE_TYPES = ['date','time','number','datetime-local','month','week'];
document.addEventListener('wheel', e => {
  const el = e.target;
  if (el && el.tagName === 'INPUT' && WHEEL_SAFE_TYPES.includes(el.type) && el === document.activeElement){
    el.blur();
  }
}, { passive: true });

setInterval(scheduleAlarms, 60000);

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}

applyLang();          // sets language + direction + first render
scheduleAlarms();
