(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});}const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();const enquiryForm=document.querySelector('#enquiry-form');if(enquiryForm){const params=new URLSearchParams(location.search);const requested=params.get('package');if(requested){const select=enquiryForm.querySelector('[name="service"]');if(select){const match=[...select.options].find(o=>o.textContent.toLowerCase().includes(requested.toLowerCase()));if(match)select.value=match.value;}}enquiryForm.addEventListener('submit',e=>{e.preventDefault();if(!enquiryForm.reportValidity())return;const d=new FormData(enquiryForm);const subject=encodeURIComponent('Website enquiry — '+d.get('service'));const body=encodeURIComponent('Name: '+d.get('name')+'\nCompany: '+(d.get('company')||'Not provided')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'Not provided')+'\nService: '+d.get('service')+'\nPreferred start: '+(d.get('timing')||'Not specified')+'\n\nHow we can help:\n'+d.get('message'));const status=document.querySelector('#form-status');status.textContent='Your email app should open with the enquiry prepared. Please review and send it to complete your enquiry.';location.href='mailto:pcgreensolutionsdiversity@gmail.com?subject='+subject+'&body='+body;});}/* English/German translation powered by the GTranslate website widget.
   Keep the site's own compact DE/EN button and use the widget's language switcher. */
const languageButton=document.querySelector('#language-toggle');
if(languageButton){
  let activeLanguage=(document.cookie.match(/(?:^|;\\s*)googtrans=\\/en\\/(de|en)(?:;|$)/)||[])[1]||'en';
  let pendingLanguage=null;
  const updateLanguageButton=()=>{
    languageButton.textContent=activeLanguage==='de'?'EN':'DE';
    languageButton.setAttribute('aria-label',activeLanguage==='de'?'Switch to English':'Auf Deutsch umschalten');
    languageButton.setAttribute('aria-pressed',String(activeLanguage==='de'));
    document.documentElement.lang=activeLanguage;
  };
  const switchLanguage=(language)=>{
    activeLanguage=language;
    updateLanguageButton();
    if(typeof window.doGTranslate==='function'){
      window.doGTranslate('en|'+language);
      pendingLanguage=null;
    }else{
      pendingLanguage=language;
    }
  };
  window.gtranslateSettings={
    default_language:'en',
    languages:['en','de'],
    wrapper_selector:'#gtranslate_widget',
    flag_style:'2d',
    alt_flags:{en:'usa'}
  };
  const widget=document.createElement('div');
  widget.id='gtranslate_widget';
  widget.setAttribute('aria-hidden','true');
  widget.style.cssText='position:absolute;left:-10000px;top:0;width:1px;height:1px;overflow:hidden;';
  document.body.appendChild(widget);
  const script=document.createElement('script');
  script.src='https://cdn.gtranslate.net/widgets/latest/flags.js';
  script.defer=true;
  script.onload=()=>{
    if(pendingLanguage)switchLanguage(pendingLanguage);
  };
  document.head.appendChild(script);
  languageButton.addEventListener('click',()=>{
    switchLanguage(activeLanguage==='en'?'de':'en');
  });
  updateLanguageButton();
}