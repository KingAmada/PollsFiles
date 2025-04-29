  // --- Simple i18n ---

  const L10N = {

    en: { vote:'Vote', voteEnds:'Poll Ends', selectPres:'Select who should be the president', selectVP:'Select who should be the VP', success:'Vote submitted!' },

    ha: { vote:'Kaɗa ƙuriʼa', voteEnds:'Ƙuriʼa ta ƙare', selectPres:'Zaɓi shugaban ƙasa', selectVP:'Zaɓi mataimaki', success:'An aika ƙuriʼar!' },

    yo: { vote:'Díbò', voteEnds:'Ìdìbò parí', selectPres:'Yan orúkọ Ààrẹ', selectVP:'Yan orúkọ Ìgbákejì', success:'Ìbò ránṣé!' },

    ig: { vote:'Tùọ̀ụ̀tọ̀', voteEnds:'Nsọ Ụkpọ̀ Gwụ̀ọ', selectPres:'Họrọ Onyenwe anyị', selectVP:'Họrọ Onye ñkpọ̀', success:'Ịtụ̀pọ̀zị́la!' }

  };

  let currentLang = 'en';

  const t = key => L10N[currentLang][key] || key;

  document.getElementById('langPicker').addEventListener('change', e => {

    currentLang = e.target.value;

    document.querySelectorAll('.vote-text').forEach(el=>el.textContent=t('vote'));

    document.getElementById('countdownTimer').dataset.label = t('voteEnds');

    document.querySelector('#presidentBox .section-subtitle').textContent = t('selectPres');

    document.querySelector('#vicePresidentBox .section-subtitle').textContent = t('selectVP');

  });

  // --- SHA-256 helper ---

  async function sha256hex(str) {

    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));

    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');

  }

  // --- Countdown Timer ---

  const countdownEl = document.getElementById('countdownTimer');

  const endMs = Date.now() + ((3*24+2)*3600 + 3*60 + 45)*1000; // example end time

  function updateCountdown() {

    const diff = endMs - Date.now();

    if (diff <= 0) { countdownEl.textContent='Poll Ended!'; clearInterval(interval); return; }

    let s = Math.floor(diff/1000), d=Math.floor(s/86400); s%=86400;

    let h=Math.floor(s/3600); s%=3600; let m=Math.floor(s/60);

    countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;

  }

  const interval = setInterval(updateCountdown,1000);

  updateCountdown();

  // --- Global state & DOM refs ---

  let candidates=[], candidateImages={}, candidateDetails={}, candidateLikes={}, votesData={}, comboComments={}, loyalists={}, mapStatesData=[];

  let selectedPresident=null, selectedVP=null, currentCombo=null;

  const presidentListEl = document.getElementById('presidentList'),

        vicePresidentListEl = document.getElementById('vicePresidentList'),

        voteBtn = document.getElementById('voteBtn'),

        buttonFillEl = document.getElementById('buttonFill'),

        chartBarsEl = document.getElementById('chartBars'),

        comboGridEl = document.getElementById('comboGrid'),

        loyalistCombosEl = document.getElementById('loyalistCombosContainer'),

        comboCommentSection = document.getElementById('commentsSection'),

        comboCommentTitle   = document.getElementById('comboCommentTitle'),

        comboCommentName    = document.getElementById('comboCommentName'),

        comboCommentText    = document.getElementById('comboCommentText'),

        comboCommentPostBtn = document.getElementById('comboCommentPostBtn');

  const voterNameEl     = document.getElementById('voterName'),

        voterPhoneEl    = document.getElementById('voterPhone'),

        voterStateEl    = document.getElementById('voterState'),

        voterCityEl     = document.getElementById('voterCity'),

        voterGenderEl   = document.getElementById('voterGender'),

        voterAgeEl      = document.getElementById('voterAge'),

        voterReferralEl = document.getElementById('voterReferral');

  const contactUsBtn    = document.getElementById('contactUsBtn'),

        lightboxOverlay = document.getElementById('lightboxOverlay'),

        lightboxClose   = document.getElementById('lightboxClose'),

        lightboxForm    = document.getElementById('lightboxForm'),

        contactFullNameEl = document.getElementById('contactFullName'),

        contactPhoneEl    = document.getElementById('contactPhone'),

        contactEmailEl    = document.getElementById('contactEmail'),

        contactMessageEl  = document.getElementById('contactMessage'),

        lightboxSubmitMsg = document.getElementById('lightboxSubmitMsg');

  const getReferralCodeBtn = document.getElementById('getReferralCodeBtn'),

        referralLightbox   = document.getElementById('referralLightbox'),

        referralLightboxClose = document.getElementById('referralLightboxClose'),

        referralRequestForm   = document.getElementById('referralRequestForm'),

        referralNameEl        = document.getElementById('referralName'),

        referralContactEl     = document.getElementById('referralContact'),

        referralSubmitMsg     = document.getElementById('referralSubmitMsg');

  const wikiLightbox = document.getElementById('wikiLightbox'),

        wikiIframe    = document.getElementById('wikiIframe'),

        wikiCloseBtn  = document.getElementById('wikiLightboxClose');

  // --- Wikipedia links ---

  const wikiLinks = {

    "Sanusi Lamido":"https://en.wikipedia.org/wiki/Sanusi_Lamido_Sanusi",

    "Goodluck Jonathan":"https://en.wikipedia.org/wiki/Goodluck_Jonathan",

    "Aminu Tambuwal":"https://en.wikipedia.org/wiki/Aminu_Tambuwal",

    "Rotimi Amaechi":"https://en.wikipedia.org/wiki/Rotimi_Amaechi",

    "Bukola Saraki":"https://en.wikipedia.org/wiki/Bukola_Saraki",

    "Godswill Akpabio":"https://en.wikipedia.org/wiki/Godswill_Akpabio",

    "Nyesom Wike":"https://en.wikipedia.org/wiki/Nyesom_Wike",

    "Yemi Osinbajo":"https://en.wikipedia.org/wiki/Yemi_Osinbajo",

    "Yakubu Dogara":"https://en.wikipedia.org/wiki/Yakubu_Dogara",

    "Atiku Abubakar":"https://en.wikipedia.org/wiki/Atiku_Abubakar",

    "Rabiu Kwankwaso":"https://en.wikipedia.org/wiki/Rabiu_Kwankwaso",

    "Peter Obi":"https://en.wikipedia.org/wiki/Peter_Obi",

    "Nasir El-Rufai":"https://en.wikipedia.org/wiki/Nasir_El-Rufai",

    "Kashim Shettima":"https://en.wikipedia.org/wiki/Kashim_Shettima",

    "Bola Tinubu":"https://en.wikipedia.org/wiki/Bola_Tinubu"

  };

  function showWikiLightbox(name){

    wikiIframe.src = wikiLinks[name]||"about:blank";

    wikiLightbox.style.display='flex';

  }

  function closeWikiLightbox(){

    wikiLightbox.style.display='none'; wikiIframe.src="about:blank";

  }

  wikiCloseBtn.addEventListener('click',closeWikiLightbox);

  wikiLightbox.addEventListener('click',e=>{ if(e.target===wikiLightbox) closeWikiLightbox(); });

  // --- Utility functions ---

  function formatNumber(n){

    if(n>=1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'')+'M';

    if(n>=1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'')+'K';

    return ''+n;

  }

  function imageError(img){ img.onerror=null; img.src='https://placehold.co/80x80/cccccc/ffffff?text=N/A'; }

  function generateReferralCode(){ return 'REF'+Math.floor(Math.random()*90000+10000); }

  function showHeartBlast(evt){

    for(let i=0;i<8;i++){

      const heart=document.createElement('span');

      heart.className='heart-particle'; heart.textContent='♥';

      const x=evt.clientX, y=evt.clientY;

      heart.style.left=`${x}px`; heart.style.top=`${y}px`;

      const tx=(Math.random()-0.5)*100, ty=-(60+Math.random()*50);

      heart.style.setProperty('--tx',`${tx}px`); heart.style.setProperty('--ty',`${ty}px`);

      document.body.appendChild(heart);

      setTimeout(()=>heart.remove(),1200);

    }

  }

  // --- Progress & form validation ---

  function updateProgress(){

    const steps=8;

    let done=0;

    if(selectedPresident) done++;

    if(selectedVP) done++;

    if(voterNameEl.value.trim()) done++;

    if(/^[0]\d{10}$/.test(voterPhoneEl.value)) done++;

    if(voterStateEl.value) done++;

    if(voterCityEl.value) done++;

    if(voterGenderEl.value) done++;

    if(voterAgeEl.value.trim()) done++;

    const pct = steps? (done/steps)*100 : 0;

    buttonFillEl.style.width = pct + '%';

    if(done===steps){

      voteBtn.disabled=false; voteBtn.classList.add('bounce');

    } else {

      voteBtn.disabled=true; voteBtn.classList.remove('bounce');

    }

  }

  [voterNameEl,voterPhoneEl,voterStateEl,voterCityEl,voterGenderEl,voterAgeEl].forEach(el=>{

    el&&el.addEventListener('input',updateProgress);

    el&&el.addEventListener('change',updateProgress);

  });

  // --- Read hidden tables (optional) ---

  function readCandidateTable(){

    const tbl=document.getElementById('candidateDataTable');

    if(!tbl) return;

    candidates=[]; candidateImages={}; candidateDetails={}; candidateLikes={};

    tbl.querySelectorAll('tbody tr').forEach(r=>{

      const c=r.querySelectorAll('td');

      if(c.length>=6){

        const name=c[0].textContent.trim();

        const img=c[1].textContent.trim();

        const age=c[3].textContent.trim();

        const zone=c[4].textContent.trim();

        const likes=parseInt(c[5].textContent.trim())||0;

        if(name){

          candidates.push(name);

          candidateImages[name]=img||'https://placehold.co/80x80/cccccc/ffffff?text=N/A';

          candidateDetails[name]={age,zone};

          candidateLikes[name]=likes;

        }

      }

    });

  }

  function readComboTable(){

    const tbl=document.getElementById('comboDataTable');

    if(!tbl) return;

    votesData={};

    tbl.querySelectorAll('tbody tr').forEach(r=>{

      const c=r.querySelectorAll('td');

      if(c.length>=3){

        const pres=c[0].textContent.trim(), vp=c[1].textContent.trim();

        const vt=parseInt(c[2].textContent.trim())||0;

        if(pres&&vp) votesData[`${pres} & ${vp}`]=vt;

      }

    });

  }

  function readUserDataTable(){

    const tbl=document.getElementById('userDataTable');

    if(!tbl) return;

    const all=[];

    comboComments={};

    tbl.querySelectorAll('tbody tr').forEach(r=>{

      const c=r.querySelectorAll('td');

      if(c.length>=5){

        const id=parseInt(c[0].textContent.trim())||0;

        const combo=c[1].textContent.trim();

        const pid=parseInt(c[2].textContent.trim())||0;

        const nm=c[3].textContent.trim()||'Anonymous';

        const tx=c[4].textContent.trim()||'(No comment)';

        if(id&&combo){

          all.push({id,comboKey:combo,parentID:pid,name:nm,text:tx,replies:[]});

        }

      }

    });

    const byId={}; all.forEach(cm=>byId[cm.id]=cm);

    all.forEach(cm=>{

      if(cm.parentID&&byId[cm.parentID]) byId[cm.parentID].replies.push(cm);

    });

    all.forEach(cm=>{

      if(cm.parentID===0){

        (comboComments[cm.comboKey]||(comboComments[cm.comboKey]=[])).push(cm);

      }

    });

  }

  function readLoyalistDataTable(){

    const tbl=document.getElementById('loyalistDataTable');

    if(!tbl) return;

    loyalists={};

    tbl.querySelectorAll('tbody tr').forEach(r=>{

      const c=r.querySelectorAll('td');

      if(c.length>=8){

        const code=c[0].textContent.trim().toUpperCase();

        const name=c[1].textContent.trim()||'Anonymous';

        const city=c[2].textContent.trim()||'Unknown';

        const combo=c[3].textContent.trim();

        const sup=parseInt(c[4].textContent.trim())||0;

        const don=parseFloat(c[5].textContent.trim())||0;

        const img1=c[6].textContent.trim();

        const img2=c[7].textContent.trim();

        if(code){

          loyalists[code]={loyalistName:name,city,combo,supporters:sup,donation:don,

                           comboImg1:img1||'https://placehold.co/50x50','comboImg2':img2||'https://placehold.co/50x50'};

        }

      }

    });

  }

  // --- Populate candidate lists ---

  function populateCandidateList(listEl, arr, isPresident){

    listEl.innerHTML='';

    arr.forEach(name=>{

      const li=document.createElement('li');

      li.className='candidate-item';

      li.dataset.candidateName=name;

      const img=document.createElement('img');

      img.className='candidate-photo'; img.src=candidateImages[name]||'https://placehold.co/80x80/cccccc/ffffff?text=N/A';

      img.alt=name; img.onerror=()=>imageError(img);

      const nmDiv=document.createElement('div');

      nmDiv.className='candidate-name'; nmDiv.textContent=name;

      const det=candidateDetails[name]||{age:'?',zone:'?'};

      const infoDiv=document.createElement('div');

      infoDiv.className='candidate-details'; infoDiv.textContent=`${det.age} - ${det.zone}`;

      const likeDiv=document.createElement('div'); likeDiv.className='like-container';

      const likeBtn=document.createElement('button'); likeBtn.className='like-btn'; likeBtn.innerHTML='♥';

      const likeCount=document.createElement('span'); likeCount.className='like-count';

      likeCount.textContent=formatNumber(candidateLikes[name]||0);

      likeBtn.addEventListener('click',e=>{

        e.stopPropagation();

        candidateLikes[name] = (candidateLikes[name]||0)+1;

        updateCandidateLikesUI(name);

        showHeartBlast(e);

        likeBtn.disabled=true;

        window.parent.postMessage({type:'recordLike',payload:{candidateName:name}},'*');

        setTimeout(()=>likeBtn.disabled=false,1000);

      });

      likeDiv.append(likeBtn,likeCount);

      li.append(img,nmDiv,infoDiv,likeDiv);

      li.addEventListener('click',()=>{

        if(isPresident){

          if(selectedPresident!==name){

            selectedPresident=name;

            highlightSelected(presidentListEl,name);

            showWikiLightbox(name);

          }

        } else {

          if(selectedVP!==name){

            selectedVP=name;

            highlightSelected(vicePresidentListEl,name);

            showWikiLightbox(name);

          }

        }

        updateProgress();

      });

      listEl.appendChild(li);

    });

  }

  function highlightSelected(listEl,name){

    listEl.querySelectorAll('.candidate-item').forEach(it=>{

      it.dataset.candidateName===name?it.classList.add('selected'):it.classList.remove('selected');

    });

  }

  function updateCandidateLikesUI(name){

    document.querySelectorAll(`.candidate-item[data-candidate-name="${name}"] .like-count`)

      .forEach(span=>span.textContent=formatNumber(candidateLikes[name]||0));

  }

  // --- Render Bar Chart ---

  function renderChart(){

    if(!chartBarsEl) return;

    chartBarsEl.innerHTML='';

    const arr=Object.entries(votesData).sort((a,b)=>b[1]-a[1]);

    if(!arr.length){ chartBarsEl.textContent='No votes recorded yet.'; return; }

    const max=arr[0][1];

    arr.forEach(([combo,count])=>{

      const row=document.createElement('div'); row.className='chart-bar';

      const lbl=document.createElement('div'); lbl.className='bar-label'; lbl.textContent=combo;

      const cnt=document.createElement('span'); cnt.className='bar-count-label'; cnt.textContent=` (${formatNumber(count)})`;

      lbl.appendChild(cnt);

      const barCont=document.createElement('div'); barCont.className='bar-container';

      const fill=document.createElement('div'); fill.className='bar-fill';

      fill.style.width = (max? (count/max*100):0)+'%';

      barCont.appendChild(fill);

      row.append(lbl,barCont);

      chartBarsEl.appendChild(row);

    });

  }

  // --- Render Combo Grid ---

  function renderComboGrid(){

    if(!comboGridEl) return;

    comboGridEl.innerHTML='';

    const arr=Object.entries(votesData).sort((a,b)=>b[1]-a[1]);

    if(!arr.length){ comboGridEl.textContent='No combinations voted yet.'; return; }

    arr.forEach(([combo,count])=>{

      const card=document.createElement('div'); card.className='combo-card';

      card.dataset.comboKey=combo;

      const share=document.createElement('button'); share.className='share-btn'; share.textContent='🔗';

      share.title=`Share ${combo}`;

      share.addEventListener('click',e=>{

        e.stopPropagation();

        const txt=`Check out ${combo} in the 2027 Nigeria Election Poll! Vote here: ${location.href}`;

        if(navigator.share){

          navigator.share({title:'Nigeria Poll',text:txt}).catch(()=>{});

        } else {

          navigator.clipboard.writeText(txt).then(()=>alert(`Sharing info for ${combo} copied!`));

        }

      });

      const topDiv=document.createElement('div'); topDiv.className='combo-top';

      const [p,vp]=combo.split(' & ');

      const imgP=document.createElement('img'); imgP.className='combo-img'; imgP.src=candidateImages[p]||'https://placehold.co/55x55'; imgP.onerror=()=>imageError(imgP);

      const imgVP=document.createElement('img'); imgVP.className='combo-img'; imgVP.src=candidateImages[vp]||'https://placehold.co/55x55'; imgVP.onerror=()=>imageError(imgVP);

      topDiv.append(imgP,imgVP);

      const title=document.createElement('div'); title.className='combo-title'; title.textContent=combo;

      const stats=document.createElement('div'); stats.className='combo-stats';

      const vh=document.createElement('span'); vh.className='vote-heart'; vh.innerHTML=`♥ ${formatNumber(count)}`;

      stats.appendChild(vh);

      // count comments

      let total=0;

      (function cnt(arr){

        arr.forEach(c=>{

          total++; if(c.replies) cnt(c.replies);

        });

      })(comboComments[combo]||[]);

      const ch=document.createElement('span'); ch.className='comment-icon'; ch.innerHTML=`💬 ${formatNumber(total)}`;

      stats.appendChild(ch);

      card.append(share,topDiv,title,stats);

      card.addEventListener('click',()=>openComboComments(combo));

      comboGridEl.appendChild(card);

    });

  }

  // --- Render Loyalists ---

  function renderComboLoyalists(){

    if(!loyalistCombosEl) return;

    loyalistCombosEl.innerHTML='';

    const mapCombo={};

    Object.entries(loyalists).forEach(([code,ld])=>{

      if(!ld.combo) return;

      (mapCombo[ld.combo]||(mapCombo[ld.combo]=[])).push({code,name:ld.loyalistName,city:ld.city,supporters:ld.supporters,comboImg1:ld.comboImg1,comboImg2:ld.comboImg2});

    });

    const medals=['🥇','🥈','🥉'];

    let any=false;

    Object.entries(mapCombo).forEach(([combo,arr])=>{

      if(!arr.length) return;

      any=true; arr.sort((a,b)=>b.supporters-a.supporters);

      const wrap=document.createElement('div'); wrap.className='loyalist-combo-wrap';

      const h4=document.createElement('h4'); h4.className='loyalist-combo-title'; h4.textContent=combo;

      const flex=document.createElement('div'); flex.className='loyalist-flex';

      const imgCol=document.createElement('div'); imgCol.className='loyalist-images-col';

      const i1=document.createElement('img'); i1.className='loyalist-square-img'; i1.src=arr[0].comboImg1; i1.onerror=()=>{i1.src='https://placehold.co/50x50'};

      const i2=document.createElement('img'); i2.className='loyalist-square-img'; i2.src=arr[0].comboImg2; i2.onerror=()=>{i2.src='https://placehold.co/50x50'};

      imgCol.append(i1,i2);

      const infCol=document.createElement('div'); infCol.className='loyalist-influencers-col';

      arr.forEach((ld,i)=>{

        const row=document.createElement('div'); row.className='loyalist-row';

        const info=document.createElement('div'); info.className='loyalist-info';

        info.innerHTML=`${medals[i]||'⭐'} ${ld.name} from ${ld.city} influenced ${ld.supporters.toLocaleString()} supporters to vote ${combo}.`;

        row.appendChild(info); infCol.appendChild(row);

      });

      flex.append(imgCol,infCol); wrap.append(h4,flex);

      loyalistCombosEl.appendChild(wrap);

    });

    if(!any) loyalistCombosEl.textContent='No loyalist data yet.';

  }

  // --- Comments ---

  function openComboComments(combo){

    currentCombo=combo;

    comboCommentSection.classList.add('active');

    comboCommentTitle.textContent=`Comments for: ${combo}`;

    renderComboComments();

    comboCommentSection.scrollIntoView({behavior:'smooth',block:'start'});

  }

  function renderComboComments(){

    const listEl=document.getElementById('comboCommentList');

    listEl.innerHTML='';

    const arr=comboComments[currentCombo]||[];

    if(!arr.length){

      listEl.textContent='Be the first to comment on this combo!'; return;

    }

    arr.forEach(c=>listEl.appendChild(createCommentElement(c)));

  }

  function createCommentElement(cm){

    const wrap=document.createElement('div'); wrap.className='combo-comment-item'; wrap.dataset.commentId=cm.id;

    const au=document.createElement('div'); au.className='comment-author'; au.textContent=cm.name;

    const tx=document.createElement('div'); tx.className='comment-text'; tx.textContent=cm.text;

    const act=document.createElement('div'); act.className='comment-actions'; act.textContent='Reply';

    const rf=document.createElement('div'); rf.className='reply-form'; rf.style.display='none';

    const rn=document.createElement('input'); rn.className='reply-input'; rn.placeholder='Your Name';

    const rt=document.createElement('textarea'); rt.className='reply-textarea'; rt.rows=2; rt.placeholder='Your reply...';

    const rb=document.createElement('button'); rb.className='reply-btn'; rb.textContent='Post Reply';

    act.addEventListener('click',()=>{ rf.style.display = rf.style.display==='flex'?'none':'flex'; });

    rb.addEventListener('click',()=>{

      const name=rn.value.trim(), text=rt.value.trim();

      if(!name||!text){ alert('Enter name and reply.'); return; }

      rb.disabled=true; rb.textContent='Posting...';

      const payload={parentID:cm.id,name,text,comboKey:currentCombo};

      window.parent.postMessage({type:'addComment',payload},'*');

      const temp={...payload,id:`temp-${Date.now()}`,replies:[]};

      cm.replies.push(temp);

      rn.value=''; rt.value=''; rf.style.display='none';

      renderComboComments(); renderComboGrid();

      setTimeout(()=>{ rb.disabled=false; rb.textContent='Post Reply'; },1500);

    });

    rf.append(rn,rt,rb);

    wrap.append(au,tx,act,rf);

    if(cm.replies) {

      const rc=document.createElement('div'); rc.className='comment-replies';

      cm.replies.forEach(rep=>rc.appendChild(createCommentElement(rep)));

      wrap.appendChild(rc);

    }

    return wrap;

  }

  comboCommentPostBtn.addEventListener('click',()=>{

    if(!currentCombo){ alert('Select a combo first.'); return; }

    const name=comboCommentName.value.trim(), text=comboCommentText.value.trim();

    if(!name||!text){ alert('Enter name and comment.'); return; }

    comboCommentPostBtn.disabled=true; comboCommentPostBtn.textContent='Posting...';

    const payload={parentID:0,name,text,comboKey:currentCombo};

    window.parent.postMessage({type:'addComment',payload},'*');

    const temp={...payload,id:`temp-${Date.now()}`,replies:[]};

    (comboComments[currentCombo]||(comboComments[currentCombo]=[])).push(temp);

    comboCommentName.value=''; comboCommentText.value='';

    renderComboComments(); renderComboGrid();

    setTimeout(()=>{

      comboCommentPostBtn.disabled=false;

      comboCommentPostBtn.textContent='Post Comment';

    },1500);

  });

  // --- Vote Logic with SHA-256 proof ---

  voteBtn.addEventListener('click', async ()=>{

    if(voteBtn.disabled) return;

    if(!selectedPresident||!selectedVP){ alert('Select both President & VP.'); return; }

    if(selectedPresident===selectedVP){ alert('President and VP cannot be the same.'); return; }

    const name=voterNameEl.value.trim(), phone=voterPhoneEl.value.trim(),

          state=voterStateEl.value, city=voterCityEl.value,

          gender=voterGenderEl.value, age=voterAgeEl.value.trim();

    if(!name||!/^0\d{10}$/.test(phone)||!state||!city||!gender||!age){

      alert('Ensure all voter fields are correct.'); return;

    }

    voteBtn.disabled=true;

    const origText=voteBtn.querySelector('.vote-text').textContent;

    voteBtn.querySelector('.vote-text').textContent='Voting…';

    voteBtn.classList.remove('bounce');

    const comboKey=`${selectedPresident} & ${selectedVP}`;

    const typedReferral=voterReferralEl.value.trim().toUpperCase()||null;

    const votePayload={name,phone,state,city,gender,age:parseInt(age)||0,combo:comboKey,referralCodeUsed:typedReferral};

    // compute and display hash

    const proof=await sha256hex(JSON.stringify(votePayload));

    const badge=document.getElementById('hashBadge');

    badge.style.display='block';

    badge.textContent=`🔒 Proof-of-submission hash: ${proof}`;

    // send and optimistic UI

    window.parent.postMessage({type:'recordVote',payload:votePayload},'*');

    votesData[comboKey]=(votesData[comboKey]||0)+1;

    if(typedReferral&&loyalists[typedReferral]) loyalists[typedReferral].supporters++;

    renderChart(); renderComboGrid(); renderComboLoyalists(); renderPieChart();

    alert(`${t('success')} (${comboKey})`);

    voterReferralEl.value='';

    setTimeout(()=>{

      voteBtn.disabled=false;

      voteBtn.querySelector('.vote-text').textContent=origText;

      updateProgress();

    },2000);

  });

  // --- Contact Us Lightbox ---

  contactUsBtn.addEventListener('click',()=>{ lightboxOverlay.style.display='flex'; });

  lightboxClose.addEventListener('click',()=>{ lightboxOverlay.style.display='none'; });

  lightboxOverlay.addEventListener('click',e=>{ if(e.target===lightboxOverlay) lightboxOverlay.style.display='none'; });

  lightboxForm.addEventListener('submit',e=>{

    e.preventDefault();

    const fn=contactFullNameEl.value.trim(), ph=contactPhoneEl.value.trim(), em=contactEmailEl.value.trim();

    if(!fn||ph.length!==11||!ph.startsWith('0')||!em.includes('@')||!em.includes('.')){

      alert('Please fill out contact fields correctly!'); return;

    }

    lightboxSubmitMsg.style.display='block';

    lightboxForm.style.display='none';

    setTimeout(()=>{

      lightboxOverlay.style.display='none';

      lightboxSubmitMsg.style.display='none';

      lightboxForm.style.display='flex';

      contactFullNameEl.value=''; contactPhoneEl.value=''; contactEmailEl.value=''; contactMessageEl.value='';

    },2500);

  });

  // --- Mobile Nav ---

  document.querySelector('.menu-close-btn').addEventListener('click',()=>document.getElementById('mobileNavPanel').classList.remove('active'));

  document.getElementById('mobileMenuBtn').addEventListener('click',()=>document.getElementById('mobileNavPanel').classList.add('active'));

  document.querySelectorAll('#mobileNavPanel nav a').forEach(link=>{

    link.addEventListener('click',e=>{

      e.preventDefault();

      const tgt=document.querySelector(link.getAttribute('href'));

      if(tgt) tgt.scrollIntoView({behavior:'smooth',block:'start'});

      document.getElementById('mobileNavPanel').classList.remove('active');

    });

  });

  // --- Referral Request Lightbox ---

  getReferralCodeBtn.addEventListener('click',()=>referralLightbox.style.display='flex');

  referralLightboxClose.addEventListener('click',()=>{

    referralLightbox.style.display='none';

    referralSubmitMsg.style.display='none';

    referralRequestForm.style.display='flex';

  });

  referralLightbox.addEventListener('click',e=>{

    if(e.target===referralLightbox){

      referralLightbox.style.display='none';

      referralSubmitMsg.style.display='none';

      referralRequestForm.style.display='flex';

    }

  });

  referralRequestForm.addEventListener('submit',e=>{

    e.preventDefault();

    const name=referralNameEl.value.trim(), contact=referralContactEl.value.trim();

    if(!name||!contact){ alert('Enter name and phone/email.'); return; }

    const btn=referralRequestForm.querySelector('button[type="submit"]');

    btn.disabled=true; btn.textContent='Submitting…';

    window.parent.postMessage({type:'requestReferralCode',payload:{name,contact}},'*');

    referralSubmitMsg.style.display='block';

    referralRequestForm.style.display='none';

    setTimeout(()=>{

      btn.disabled=false; btn.textContent='Request Code';

    },3000);

  });

  // --- amCharts Map & Pie Chart placeholders ---

  let mapChart, polygonSeries, pieRoot;

  function initMap(){

    am5.ready(()=>{ try{

      const root=am5.Root.new("nigeriaMap");

      root.setThemes([am5themes_Animated.new(root)]);

      mapChart=root.container.children.push(am5map.MapChart.new(root,{

        panX:"rotateX", panY:"none", wheelX:"zoom", wheelY:"none",

        projection:am5map.geoMercator(), maxZoomLevel:4, minZoomLevel:0.8

      }));

      polygonSeries=mapChart.series.push(am5map.MapPolygonSeries.new(root,{

        geoJSON:am5geodata_nigeriaLow, valueField:"value", calculateAggregates:true

      }));

      polygonSeries.set("heatRules",[{

        target:polygonSeries.mapPolygons.template,

        min:am5.color(0xccffcc), max:am5.color(0x006400),

        dataField:"value", key:"fill", logarithmic:true

      }]);

      polygonSeries.mapPolygons.template.setAll({

        interactive:true,

        tooltipHTML:`<div style="min-width:150px;font-family:'Montserrat',sans-serif;">{tooltipHTML}</div>`,

      });

      polygonSeries.mapPolygons.template.states.create("hover",{fill:am5.color(0xffa500)});

      mapChart.set("zoomControl",am5map.ZoomControl.new(root,{}));

      renderMap();

    }catch(e){ console.error(e); document.getElementById("nigeriaMap").textContent="Error loading map."; } });

  }

  const stateIdMap = {

    "Abia":"NG-AB","Adamawa":"NG-AD","Akwa Ibom":"NG-AK","Anambra":"NG-AN","Bauchi":"NG-BA","Bayelsa":"NG-BY",

    "Benue":"NG-BE","Borno":"NG-BO","Cross River":"NG-CR","Delta":"NG-DE","Ebonyi":"NG-EB","Edo":"NG-ED",

    "Ekiti":"NG-EK","Enugu":"NG-EN","FCT Abuja":"NG-FC","Gombe":"NG-GO","Imo":"NG-IM","Jigawa":"NG-JI",

    "Kaduna":"NG-KD","Kano":"NG-KN","Katsina":"NG-KT","Kebbi":"NG-KE","Kogi":"NG-KO","Kwara":"NG-KW",

    "Lagos":"NG-LA","Nasarawa":"NG-NA","Niger":"NG-NI","Ogun":"NG-OG","Ondo":"NG-ON","Osun":"NG-OS",

    "Oyo":"NG-OY","Plateau":"NG-PL","Rivers":"NG-RI","Sokoto":"NG-SO","Taraba":"NG-TA","Yobe":"NG-YO","Zamfara":"NG-ZA"

  };

  function computeStateTopCombos(){

    const keyToCombo = {}; // your mapping if needed

    const res={};

    (mapStatesData||[]).forEach(item=>{

      if(!item.state||item.state==="TOTAL") return;

      let max=-1, top="N/A";

      for(const k in item){

        if(k==="state"||k==="zone"||k.startsWith("_")) continue;

        const v=item[k];

        if(typeof v==="number"&&v>max){

          const std = keyToCombo[k]||k;

          max=v; top=std;

        }

      }

      res[item.state]={combo:top,count:max};

    });

    return res;

  }

  function renderMap(){

    if(!polygonSeries) return;

    const data=[];

    const topByState=computeStateTopCombos();

    for(const [st,geo] of Object.entries(stateIdMap)){

      let tooltip=`<strong>${st}</strong><br>No data`;

      let val=0;

      if(topByState[st]&&topByState[st].combo!=="N/A"){

        val=topByState[st].count;

        tooltip=`<strong>${st}</strong><br>Top: ${topByState[st].combo}<br>Votes: ${formatNumber(val)}`;

      }

      data.push({id:geo,name:st,value:val,tooltipHTML:tooltip});

    }

    polygonSeries.data.setAll(data);

  }

  function renderPieChart(){

    const pieDiv=document.getElementById("popularityPie");

    const data=Object.entries(votesData).map(([combo,v])=>({combo,votes:v})).filter(x=>x.votes>0);

    if(!data.length){ pieDiv.textContent="No votes yet."; return; }

    pieDiv.innerHTML="";

    am5.ready(()=>{

      try{

        pieRoot=am5.Root.new("popularityPie");

        pieRoot.setThemes([am5themes_Animated.new(pieRoot)]);

        const container=pieRoot.container.children.push(am5.Container.new(pieRoot,{

          width:am5.percent(100),height:am5.percent(100),layout:pieRoot.verticalLayout

        }));

        const chart=container.children.push(am5percent.PieChart.new(pieRoot,{layout:pieRoot.verticalLayout}));

        const series=chart.series.push(am5percent.PieSeries.new(pieRoot,{

          valueField:"votes",categoryField:"combo",radius:am5.percent(85),alignLabels:true

        }));

        series.data.setAll(data);

        series.labels.template.setAll({

          radius:10,text:"{category}: {valuePercentTotal.formatNumber('0.0')}%",

          fontSize:"0.75em",fill:am5.color(0x333333),oversizedBehavior:"truncate",maxWidth:110

        });

        series.labels.template.adapters.add("hidden",(h,t)=>t.dataItem.get("valuePercentTotal")<3);

        series.ticks.template.setAll({strokeOpacity:0.4,stroke:am5.color(0x666666),location:0.5,length:10});

        series.ticks.template.adapters.add("hidden",(h,t)=>t.dataItem.get("valuePercentTotal")<3);

        series.slices.template.setAll({tooltipText:"{category}: {value} votes ({valuePercentTotal.formatNumber('0.0')}%)",stroke:am5.color(0xffffff),strokeWidth:1});

        series.slices.template.states.create("hover",{scale:1.03});

        const legend=container.children.push(am5.Legend.new(pieRoot,{

          centerX:am5.percent(50),x:am5.percent(50),marginTop:15,marginBottom:15,layout:pieRoot.horizontalLayout,wrap:true

        }));

        legend.labels.template.setAll({fontSize:"0.8em",fontWeight:"500",fill:am5.color(0x333333)});

        legend.itemContainers.template.setAll({paddingTop:2,paddingBottom:2});

        legend.data.setAll(series.dataItems);

        series.appear(1000,100);

      }catch(e){ console.error(e); pieDiv.textContent="Error loading chart."; }

    });

  }

  // --- Initialization ---

  function init(){

    readCandidateTable(); readComboTable(); readUserDataTable(); readLoyalistDataTable();

    populateCandidateList(presidentListEl,candidates,true);

    populateCandidateList(vicePresidentListEl,candidates,false);

    renderChart(); renderComboGrid(); renderComboLoyalists(); initMap(); renderPieChart(); updateProgress();

  }

  document.addEventListener('DOMContentLoaded',init);

  // --- Message Listener for Wix integration ---

  window.addEventListener('message',e=>{

    const msg=e.data;

    if(!msg||typeof msg!=='object') return;

    switch(msg.type){

      case 'electionData':

        populateDataFromWix(msg); break;

      case 'voteRecorded':

        if(msg.payload?.newReferralCode) console.log('Referral code:',msg.payload.newReferralCode);

        break;

      case 'referralCodeRequested':

        console.log('Referral request confirmed:',msg.payload);

        break;

      case 'commentAdded':

        if(msg.payload?._id&&msg.payload.comboKey){

          const {comboKey,parentId,_id,comment} = msg.payload;

          // update temp ID to real ID

          function upd(arr){

            for(const c of arr){

              if(c.id.startsWith('temp-')&&c.text===comment){ c.id=_id; return true; }

              if(c.replies&&upd(c.replies)) return true;

            }

            return false;

          }

          upd(comboComments[comboKey]||[]);

        }

        break;

      case 'operationFailed':

        alert(`Operation failed: ${msg.payload?.message||'Unknown error'}`);

        break;

    }

  });

  function populateDataFromWix(data){

    let ui=false;

    if(Array.isArray(data.candidates)){

      ui=true; candidates=[]; candidateImages={}; candidateDetails={}; candidateLikes={};

      data.candidates.forEach(c=>{

        if(c.name){

          candidates.push(c.name);

          candidateImages[c.name]=c.imageUrl||'https://placehold.co/80x80/cccccc/ffffff?text=N/A';

          candidateDetails[c.name]={age:c.age||'?',zone:c.zone||'?'};

          candidateLikes[c.name]=c.likes||0;

        }

      });

      populateCandidateList(presidentListEl,candidates,true);

      populateCandidateList(vicePresidentListEl,candidates,false);

    }

    if(Array.isArray(data.combos)){

      ui=true; votesData={};

      data.combos.forEach(c=>{

        if(c.president&&c.vicePresident){

          const key=`${c.president} & ${c.vicePresident}`;

          votesData[key]=c.totalVotes||0;

          if(c.presidentImageUrl) candidateImages[c.president]=c.presidentImageUrl;

          if(c.vicePresidentImageUrl) candidateImages[c.vicePresident]=c.vicePresidentImageUrl;

        }

      });

    }

    if(Array.isArray(data.users)){

      ui=true; comboComments={};

      const all=[];

      data.users.forEach(u=>{

        if(u._id&&u.combo){

          all.push({id:u._id,comboKey:u.combo,parentID:u.parentId||0,name:u.name||'Anonymous',text:u.comment||'',replies:[]});

        }

      });

      const byId={}; all.forEach(c=>byId[c.id]=c);

      all.forEach(c=>{ if(c.parentID&&byId[c.parentID]) byId[c.parentID].replies.push(c); });

      all.forEach(c=>{ if(c.parentID===0) (comboComments[c.comboKey]||(comboComments[c.comboKey]=[])).push(c); });

    }

    if(Array.isArray(data.mapStates)){

      ui=true; mapStatesData=data.mapStates;

    }

    if(Array.isArray(data.loyalists)){

      ui=true; loyalists={};

      data.loyalists.forEach(l=>{

        if(l.referralCode){

          loyalists[l.referralCode.toUpperCase()]={loyalistName:l.loyalistName||'Anonymous',city:l.city||'',combo:l.combo||'',supporters:l.supporters||0,donation:l.donation||0,comboImg1:l.comboImg1||'https://placehold.co/50x50',comboImg2:l.comboImg2||'https://placehold.co/50x50'};

        }

      });

    }

    if(ui){

      renderChart(); renderComboGrid(); renderComboLoyalists(); renderMap(); renderPieChart();

      if(currentCombo&&comboCommentSection.classList.contains('active')) renderComboComments();

    }

  }

