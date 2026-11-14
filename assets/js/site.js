(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.primary-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});}const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();const enquiryForm=document.querySelector('#enquiry-form');if(enquiryForm){const params=new URLSearchParams(location.search);const requested=params.get('package');if(requested){const select=enquiryForm.querySelector('[name="service"]');if(select){const match=[...select.options].find(o=>o.textContent.toLowerCase().includes(requested.toLowerCase()));if(match)select.value=match.value;}}enquiryForm.addEventListener('submit',e=>{e.preventDefault();if(!enquiryForm.reportValidity())return;const d=new FormData(enquiryForm);const subject=encodeURIComponent('Website enquiry — '+d.get('service'));const body=encodeURIComponent('Name: '+d.get('name')+'\nCompany: '+(d.get('company')||'Not provided')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'Not provided')+'\nService: '+d.get('service')+'\nPreferred start: '+(d.get('timing')||'Not specified')+'\n\nHow we can help:\n'+d.get('message'));const status=document.querySelector('#form-status');status.textContent='Your email app should open with the enquiry prepared. Please review and send it to complete your enquiry.';location.href='mailto:pcgreensolutionsdiversity@gmail.com?subject='+subject+'&body='+body;});}/* Whole-page English/German translation using Google's website translation widget.
   The visible DE/EN control remains the site's own branded language button. */
const languageButton=document.querySelector('#language-toggle');
if(languageButton){
  const getSavedLanguage=()=>{
    const match=document.cookie.match(/(?:^|;\\s*)googtrans=\\/en\\/(de|en)(?:;|$)/);
    return match?match[1]:'en';
  };
  let activeLanguage=getSavedLanguage();
  let requestedLanguage=null;
  const updateLanguageButton=()=>{
    languageButton.textContent=activeLanguage==='de'?'EN':'DE';
    languageButton.setAttribute('aria-label',activeLanguage==='de'?'Switch to English':'Auf Deutsch umschalten');
    languageButton.setAttribute('aria-pressed',String(activeLanguage==='de'));
    document.documentElement.lang=activeLanguage;
  };
  const applyLanguage=(nextLanguage)=>{
    requestedLanguage=nextLanguage;
    const selector=document.querySelector('.goog-te-combo');
    if(!selector)return false;
    selector.value=nextLanguage;
    selector.dispatchEvent(new Event('change'));
    activeLanguage=nextLanguage;
    updateLanguageButton();
    return true;
  };
  window.googleTranslateElementInit=()=>{
    new google.translate.TranslateElement({
      pageLanguage:'en',
      includedLanguages:'en,de',
      autoDisplay:false,
      layout:google.translate.TranslateElement.InlineLayout.SIMPLE
    },'google_translate_element');
    const desired=requestedLanguage||activeLanguage;
    let attempts=0;
    const waitForSelector=()=>{
      const selector=document.querySelector('.goog-te-combo');
      if(selector){
        if(desired!=='en')applyLanguage(desired);
        else {selector.value='en';selector.dispatchEvent(new Event('change'));}
        return;
      }
      if(attempts++<80)window.setTimeout(waitForSelector,100);
    };
    waitForSelector();
  };
  const translateContainer=document.createElement('div');
  translateContainer.id='google_translate_element';
  translateContainer.setAttribute('aria-hidden','true');
  translateContainer.style.cssText='position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;';
  document.body.appendChild(translateContainer);
  const translateScript=document.createElement('script');
  translateScript.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  translateScript.async=true;
  document.head.appendChild(translateScript);
  languageButton.addEventListener('click',()=>{
    const nextLanguage=activeLanguage==='en'?'de':'en';
    if(!applyLanguage(nextLanguage)){
      requestedLanguage=nextLanguage;
      activeLanguage=nextLanguage;
      updateLanguageButton();
    }
  });
  updateLanguageButton();
}})();