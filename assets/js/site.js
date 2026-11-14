(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});}const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();/* The enquiry form posts directly to FormSubmit; do not intercept its native POST. *//* Language helper: open Google's page translation in a separate tab.
   The original site remains available in English in the current tab. */
const languageButton=document.querySelector('#language-toggle');
if(languageButton){
  let translatedTab=null;
  let activeLanguage='en';
  const updateLanguageButton=()=>{
    languageButton.textContent=activeLanguage==='de'?'EN':'DE';
    languageButton.setAttribute('aria-label',activeLanguage==='de'?'Return to English':'Auf Deutsch übersetzen');
    languageButton.setAttribute('aria-pressed',String(activeLanguage==='de'));
  };
  languageButton.addEventListener('click',()=>{
    if(activeLanguage==='en'){
      const target='https://translate.google.com/translate?sl=en&tl=de&u='+encodeURIComponent(window.location.href);
      translatedTab=window.open(target,'_blank');
      if(translatedTab){
        translatedTab.opener=null;
        activeLanguage='de';
        updateLanguageButton();
      }else{
        window.location.href=target;
      }
    }else{
      if(translatedTab&&!translatedTab.closed)translatedTab.close();
      activeLanguage='en';
      updateLanguageButton();
    }
  });
  updateLanguageButton();
}
