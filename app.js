// Telegram Web App shell aligned with features in the existing Flemingo bot.
const tg=window.Telegram?.WebApp;
tg?.ready(); tg?.expand();
const user=tg?.initDataUnsafe?.user;
document.querySelector('#welcome').textContent=user?.first_name?`Welcome, ${user.first_name}`:'Welcome back';
const featureMessages={
 report:'Your bot report flow currently collects duty date, shift, start/end time, service checks, work location, activities/status, problems, pending tasks and comments. The Mini App needs a secure API before it can save reports.',
 reports:'Your bot has My Reports and report detail functions. The Mini App needs authenticated Supabase API access to list only your reports.',
 guidelines:'Your bot stores IT Guidelines in the it_guidelines table. Published guideline retrieval needs the backend API.',
 profile:'Your bot profile supports full name, job title, work location, office, arrival time and departure time. Profile updates need secure API endpoints.',
 approval:'Your bot supports employee approval/rejection. Admin identity must be verified server-side.',
 search:'Your bot supports admin report search and report review. Connect this screen to a protected admin API.',
 settings:'Your bot has branding, welcome messages, shifts and report checklist settings. These must be managed through protected API endpoints.',
 analytics:'Your bot includes reports analytics. This Mini App screen is not yet connected to the analytics query.',
 shifts:'Your bot supports shift management. Admin-only API integration is required to create/edit shifts.',
 checklist:'Your bot supports service checklist configuration. Admin-only API integration is required to edit checklist items.',
 guideline_admin:'Your bot supports adding, editing, publishing and disabling IT Guidelines. Admin-only API integration is required.',
 announcement:'Your bot supports admin announcements. Sending announcements must be handled by the trusted bot backend.'
};
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{
 const text=featureMessages[button.dataset.action]||'Backend connection required.';
 if(tg?.showAlert) tg.showAlert(text); else {const toast=document.querySelector('#toast');toast.textContent=text;toast.style.display='block';}
}));
