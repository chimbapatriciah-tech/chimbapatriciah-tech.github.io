(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});}const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();const enquiryForm=document.querySelector('#enquiry-form');if(enquiryForm){const params=new URLSearchParams(location.search);const requested=params.get('package');if(requested){const select=enquiryForm.querySelector('[name="service"]');if(select){const match=[...select.options].find(o=>o.textContent.toLowerCase().includes(requested.toLowerCase()));if(match)select.value=match.value;}}enquiryForm.addEventListener('submit',e=>{e.preventDefault();const status=document.querySelector('#form-status');if(!enquiryForm.reportValidity()){status.textContent='Please complete the required fields and accept the consent statement.';return;}const d=new FormData(enquiryForm);const subject=encodeURIComponent('Website enquiry — '+d.get('service'));const body=encodeURIComponent('Name: '+d.get('name')+'\nCompany: '+(d.get('company')||'Not provided')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'Not provided')+'\nService: '+d.get('service')+'\nPreferred start: '+(d.get('timing')||'Not specified')+'\n\nHow we can help:\n'+d.get('message'));const mailto='mailto:pcgreensolutionsdiversity@gmail.com?subject='+subject+'&body='+body;status.replaceChildren();const message=document.createElement('span');message.textContent='Your enquiry is ready. Your email app should open now; review the message and press Send to complete your enquiry. ';const fallback=document.createElement('a');fallback.href=mailto;fallback.textContent='If it does not open, click here to open your email app.';fallback.style.textDecoration='underline';fallback.style.display='inline-block';fallback.style.marginTop='6px';status.append(message,fallback);window.location.href=mailto;});}/* Language helper: open Google's page translation in a separate tab.
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
