const jobs = [
  {id:1,title:'Frontend Internship (React)',company:'DataLabs',location:'Remote',type:'Internship',desc:'Internship for students focusing on React and accessibility. 3-6 months.'},
  {id:2,title:'Junior Data Analyst',company:'FinTech Hub',location:'On-site - Lima',type:'Part-time',desc:'Support in data cleaning and visualization. Friendly team.'},
  {id:3,title:'UX Research Intern',company:'Creative Agency',location:'Remote',type:'Internship',desc:'Assist with usability testing and prototype creation.'}
];

function createJobCard(job){
  const el = document.createElement('article');
  el.className = 'job-card card';
  el.innerHTML = `
    <div class="job-left">
      <h3 class="job-title">${job.title}</h3>
      <div class="job-meta">${job.company} • ${job.location} • ${job.type}</div>
      <p class="small">${job.desc}</p>
    </div>
    <div class="apply-row">
      <button class="btn ghost" data-id="${job.id}">Save</button>
      <button class="btn primary" data-id="${job.id}">View</button>
    </div>
  `;
  return el;
}

function renderJobs(list){
  const container = document.getElementById('jobsList');
  if(!container) return;
  container.innerHTML = '';
  if(list.length===0){container.innerHTML = '<div class="card">No jobs found.</div>';return;}
  list.forEach(j=>container.appendChild(createJobCard(j)));
}

function openModal(html){const modal = document.getElementById('modal');const body = document.getElementById('modalBody');if(!modal||!body) return;body.innerHTML = html;modal.classList.remove('hidden');}
function closeModal(){const m = document.getElementById('modal'); if(m) m.classList.add('hidden');}

document.addEventListener('DOMContentLoaded',()=>{
  renderJobs(jobs);

  // --- Logic to show student profile if logged in ---
  try {
    const studentData = localStorage.getItem('primerpaso_student');
    const profileCard = document.getElementById('studentProfileCard');

    if (studentData && profileCard) {
      const student = JSON.parse(studentData);
      const name = (student.firstName || '') + (student.lastName ? ' ' + student.lastName : '');
      const initials = (student.firstName?.charAt(0) || '') + (student.lastName?.charAt(0) || '');

  document.getElementById('profileName').textContent = name.trim() || 'Student';
  document.getElementById('profileAvatar').textContent = initials.toUpperCase();
  document.getElementById('profileUni').textContent = student.university || student.email || 'Profile incomplete';

      profileCard.classList.remove('hidden');
    }
  } catch (e) {
  console.warn('Could not load student profile data.', e);
  }
  // --- Fin de la lógica del perfil ---

  const searchBtn = document.getElementById('searchBtn');
  searchBtn?.addEventListener('click',()=>{
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const loc = (document.getElementById('filterLocation')?.value || '').toLowerCase();
    const filtered = jobs.filter(j=>{
      const matchesQ = q === '' || `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(q);
      const matchesLoc = loc === '' || j.location.toLowerCase().includes(loc);
      return matchesQ && matchesLoc;
    });
    renderJobs(filtered);
  });

  document.getElementById('jobsList')?.addEventListener('click',e=>{
    const target = e.target;
    const id = target.dataset && target.dataset.id;
    if(!id) return;
    const job = jobs.find(x=>x.id==id);
    if(!job) return;
    if(target.classList.contains('primary')){
  openModal(`<div class="modal-content"><button id="closeModal" class="modal-close">✕</button><h2>${job.title}</h2><p class="muted">${job.company} • ${job.location}</p><p>${job.desc}</p><div style="margin-top:12px"><button class='btn primary' data-action='apply'>Apply</button> <button class='btn ghost' id='closeModalInner'>Close</button></div></div>`);
      document.getElementById('modal').addEventListener('click', e => { if(e.target.id === 'closeModalInner' || e.target.id === 'closeModal') closeModal(); }, { once: true });
  } else if(target.classList.contains('ghost')){target.textContent = 'Saved';target.disabled = true;}
  });

  // login remember
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const remember = document.getElementById('remember');
  try{
    const saved = localStorage.getItem('primerpaso_remember');
    if(saved){const obj = JSON.parse(saved); if(obj.email && email) { email.value = obj.email; if(remember) remember.checked = true; }}
  }catch(e){}
  if(form){
    form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      if(remember?.checked && email?.value){ localStorage.setItem('primerpaso_remember', JSON.stringify({email: email.value})); }
      // Simulate successful login by navigating to the integradora/dashboard page
      window.location.href = '/integradora';
    });
  }

  // Delegate click for apply button inside modal
  document.addEventListener('click', (e)=>{
    const btn = e.target;
    if(!btn || !btn.dataset) return;
    if(btn.dataset.action === 'apply'){
      try{
        const student = localStorage.getItem('primerpaso_student');
        if(student) window.location.href = '/integradora';
        else window.location.href = '/loginuser';
      }catch(_){ window.location.href = '/loginuser'; }
    }
  });
});
