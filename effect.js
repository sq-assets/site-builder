/* Site Builder: pick an industry, drag features and a style into a laptop, get a named result + email signup.
   Content comes from three blogs (one post per option). Put a <div class="site-builder"> in a Code Block. */
(()=>{
  const dec=s=>{const t=document.createElement('textarea');t.innerHTML=s||'';return t.value.trim()};
  const firstP=h=>{const d=document.createElement('div');d.innerHTML=h||'';const p=[...d.querySelectorAll('p,h1,h2,h3,h4')].map(x=>x.textContent.trim()).find(Boolean);return p||''};
  const has=(t,re)=>re.test(t.toLowerCase());
  /* default title words if a post has no text */
  const IND=[[/photo/,'Lens'],[/creative/,'Creative'],[/agency|marketing/,'Agency'],[/product|brand/,'Brand'],[/salon|stylist|beauty|hair/,'Salon'],[/interior|architect/,'Interior'],[/coach|educat|course/,'Mentor'],[/event|hospitality|venue/,'Host']];
  const STY=[[/lux/,'lux','Gilded'],[/minimal/,'min','Quiet'],[/editorial/,'edi','Headline'],[/quirk/,'qui','Offbeat'],[/maximal/,'max','Showstopping'],[/colour|color|bold/,'col','Technicolour']];
  const HEAD=[[/photo/,'Stories, beautifully captured'],[/creative/,'Ideas with a point of view'],[/agency|marketing/,'Brands people remember'],[/product|brand/,'Made to be noticed'],[/salon|stylist|beauty/,'Your best look, booked'],[/interior|architect/,'Spaces with character'],[/coach|educat/,'Learn it, live it'],[/event|hospitality/,'Pull up a chair']];
  const pick=(t,map,i=1)=>{const m=map.find(r=>r[0].test(t.toLowerCase()));return m?m[i]:''};

  /* little mock sections for each feature */
  const L=(c='')=>'<div class="sb-ln '+c+'"></div>';
  const MOCK=[
    [/portfolio|gallery|work/,()=>'<div class="sb-g sb-g3">'+[1.2,.8,1,1,1.3,.9].map(r=>'<div class="sb-box" style="aspect-ratio:1/'+r+'"></div>').join('')+'</div>'],
    [/shop|store|product/,()=>'<div class="sb-g sb-g3">'+[0,1,2].map(()=>'<div><div class="sb-box" style="aspect-ratio:4/5"></div>'+L('s')+L('xs')+'</div>').join('')+'</div>'],
    [/service|booking|appoint/,()=>'<div class="sb-g sb-g2"><div>'+[0,1,2].map(()=>'<div class="sb-row">'+L()+'<span class="sb-pill">Book</span></div>').join('')+'</div><div class="sb-cal">'+Array.from({length:21},(_,i)=>'<span'+([4,9,10,16].includes(i)?' class="on"':'')+'></span>').join('')+'</div></div>'],
    [/blog|journal|news/,()=>[0,1].map(()=>'<div class="sb-row"><div class="sb-box" style="width:22%;aspect-ratio:4/3;flex:none"></div><div style="flex:1">'+L()+L('s')+'</div></div>').join('')],
    [/podcast|audio|episode/,()=>'<div class="sb-row" style="border:0"><span class="sb-play"></span><div class="sb-wave">'+Array.from({length:34},()=>'<span style="height:'+(20+Math.random()*80|0)+'%"></span>').join('')+'</div></div>'+L('s')],
    [/course|member|class|learn/,()=>'<div class="sb-g sb-g3">'+[80,45,15].map(p=>'<div class="sb-card">'+L('s')+L()+'<div class="sb-bar"><i style="width:'+p+'%"></i></div></div>').join('')+'</div>']
  ];
  const mock=t=>{const m=MOCK.find(r=>r[0].test(t.toLowerCase()));return m?m[1]():'<div class="sb-g sb-g2"><div class="sb-box" style="aspect-ratio:16/9"></div><div>'+L()+L()+L('s')+'</div></div>'};

  const fonts=()=>{if(document.getElementById('sb-fonts'))return;const l=document.createElement('link');l.id='sb-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;800&family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Shrikhand&family=Space+Mono:wght@400;700&display=swap';document.head.append(l)};

  const load=(u,order)=>fetch(u.replace(/\/$/,'')+'?format=json').then(r=>r.json()).then(j=>{const it=(j.items||[]).map(x=>({t:dec(x.title),w:firstP(x.body)}));return order==='newest'?it:it.reverse()}).catch(()=>[]);

  const init=async el=>{
    if(el.dataset.sbOn)return;el.dataset.sbOn=1;
    const ds=el.dataset,order=ds.order||'oldest';
    const css=(k,v)=>v&&el.style.setProperty(k,v);css('--sb-ink',ds.color);css('--sb-paper',ds.background);css('--sb-accent',ds.accent);
    if(ds.fonts!=='off')fonts();
    el.innerHTML='<p class="sb-loading">Loading…</p>';
    const [I,F,S]=await Promise.all([load(ds.industries||'/site-builder-industries',order),load(ds.features||'/site-builder-features',order),load(ds.styles||'/site-builder-styles',order)]);
    if(!I.length||!F.length||!S.length){el.innerHTML='<p class="sb-loading">Site Builder: couldn\'t find the Industries, Features or Styles blog.</p>';return}
    const Q=[ds.question1||'What do you do?',ds.question2||'What does your site need?',ds.question3||'Pick your vibe'];
    const H=[ds.hint1||'Drag one into the laptop, or tap it',ds.hint2||'Add as many as you like',ds.hint3||'Watch your site change'];
    const N=[ds.step1||'Industry',ds.step2||'Features',ds.step3||'Style'];
    el.innerHTML='<div class="sb-head"><div><h3 class="sb-q"></h3><p class="sb-hint"></p></div><div class="sb-steps">'+N.map((n,i)=>'<span>'+(i+1)+' '+n+'</span>').join('')+'</div></div>'+
      '<div class="sb-stage"><div class="sb-tray"></div><div class="sb-result"><small>'+(ds.resultIntro||'Your website is')+'</small><h3 class="sb-title"></h3><p class="sb-sum"></p><div class="sb-form"></div><a class="sb-cta" href="'+(ds.ctaUrl||'/contact')+'">'+(ds.ctaText||'Let\'s build it')+'</a><br><button class="sb-again" type="button">Start again</button></div>'+
      '<div class="sb-laptop"><div class="sb-screen"><div class="sb-view"><div class="sb-site"><div class="sb-nav"><b class="sb-logo">'+(ds.logo||'Your Name')+'</b><i></i><i></i><i></i></div><div class="sb-hero"><small class="sb-kicker">Your website</small><h4 class="sb-h">'+(ds.placeholder||'Starts here')+'</h4><span class="sb-btn">'+(ds.heroButton||'Enquire')+'</span></div><div class="sb-secs"></div><div class="sb-foot-site">© '+(ds.logo||'Your Name')+'</div></div><div class="sb-drop">Drop it in</div></div></div><div class="sb-base"></div></div></div>'+
      '<div class="sb-ctrl"><button class="sb-back" type="button">Back</button><button class="sb-next" type="button" disabled>Next</button></div>';
    const $=s=>el.querySelector(s),tray=$('.sb-tray'),site=$('.sb-site'),secs=$('.sb-secs'),lap=$('.sb-laptop'),next=$('.sb-next'),back=$('.sb-back');
    const st={step:0,ind:null,feats:[],sty:null};
    const lists=[I,F,S];
    const render=()=>{
      $('.sb-q').textContent=Q[st.step];$('.sb-hint').textContent=H[st.step];
      el.querySelectorAll('.sb-steps span').forEach((s,i)=>{s.classList.toggle('on',i===st.step);s.classList.toggle('done',i<st.step)});
      tray.innerHTML='';
      lists[st.step].forEach(o=>{const b=document.createElement('button');b.type='button';b.className='sb-chip';b.textContent=o.t;b.o=o;
        if(o===st.ind||st.feats.includes(o)||o===st.sty)b.classList.add('sel');tray.append(b)});
      next.disabled=!(st.step===0?st.ind:st.step===1?st.feats.length:st.sty);
      next.textContent=st.step===2?(ds.finishText||'See my site'):'Next';
      back.hidden=st.step===0;
    };
    const bump=()=>{lap.classList.remove('sb-pulse');void lap.offsetWidth;lap.classList.add('sb-pulse')};
    const choose=o=>{
      if(st.step===0){st.ind=o;$('.sb-kicker').textContent=o.t;$('.sb-h').textContent=pick(o.t,HEAD)||o.t}
      else if(st.step===1){const i=st.feats.indexOf(o);
        if(i>-1){st.feats.splice(i,1);const s=secs.querySelector('[data-f="'+CSS.escape(o.t)+'"]');s&&s.remove()}
        else{st.feats.push(o);const s=document.createElement('div');s.className='sb-sec';s.dataset.f=o.t;s.innerHTML='<h5>'+o.t+'</h5>'+mock(o.t);secs.append(s);site.scrollTop=s.offsetTop-site.clientHeight*.25}}
      else{st.sty=o;site.className='sb-site'+(pick(o.t,STY)?' th-'+pick(o.t,STY):' th-'+['lux','min','edi','qui','max','col'][S.indexOf(o)%6]);site.scrollTop=0}
      bump();render();
    };
    /* drag (mouse/pen) or tap */
    let drag=null;
    tray.addEventListener('pointerdown',e=>{const b=e.target.closest('.sb-chip');if(!b)return;drag={b,x:e.clientX,y:e.clientY,g:null,touch:e.pointerType==='touch'}});
    addEventListener('pointermove',e=>{if(!drag||drag.touch)return;
      if(!drag.g&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6){const r=drag.b.getBoundingClientRect();drag.g=drag.b.cloneNode(true);drag.g.classList.add('sb-ghost');drag.dx=drag.x-r.left;drag.dy=drag.y-r.top;document.body.append(drag.g);drag.b.style.opacity=.3}
      if(drag.g){drag.g.style.left=e.clientX-drag.dx+'px';drag.g.style.top=e.clientY-drag.dy+'px';const r=lap.getBoundingClientRect();lap.classList.toggle('sb-over',e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom)}});
    addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;
      if(d.g){d.g.remove();d.b.style.opacity='';const over=lap.classList.contains('sb-over');lap.classList.remove('sb-over');if(over)choose(d.b.o);return}
      if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>10)return;
      /* tap: fly the chip into the laptop */
      const r=d.b.getBoundingClientRect(),l=lap.getBoundingClientRect(),f=d.b.cloneNode(true);f.classList.add('sb-fly');f.style.left=r.left+'px';f.style.top=r.top+'px';document.body.append(f);
      const already=d.b.classList.contains('sel')&&st.step===1;
      requestAnimationFrame(()=>{f.style.transform='translate('+(l.left+l.width/2-r.left-r.width/2)+'px,'+(l.top+l.height*.4-r.top-r.height/2)+'px) scale(.4)';f.style.opacity=0});
      setTimeout(()=>f.remove(),600);setTimeout(()=>choose(d.b.o),already?0:380)});
    addEventListener('pointercancel',()=>{if(drag&&drag.g){drag.g.remove();drag.b.style.opacity=''}drag=null;lap.classList.remove('sb-over')});

    /* result */
    const form=$('.sb-form');
    const grabForm=()=>{if(document.body.classList.contains('sqs-edit-mode-active'))return null;
      const sec=el.closest('section')||document;const blk=[...sec.querySelectorAll('.sqs-block-newsletter,.sqs-block-form')].find(b=>!el.contains(b));
      if(!blk)return null;const fe=blk.closest('.fe-block')||blk;form.append(blk);fe!==blk&&(fe.style.display='none');return blk};
    let fb=null;
    const summary=()=>{const t='The '+(st.sty.w||pick(st.sty.t,STY,2)||st.sty.t)+' '+(st.ind.w||pick(st.ind.t,IND)||st.ind.t.split(/[ &]/)[0]);
      return {t,s:st.ind.t+' · '+st.feats.map(f=>f.t).join(', ')+' · '+st.sty.t}};
    const fill=(blk,txt)=>{blk.querySelectorAll('input,textarea').forEach(i=>{const w=i.closest('.form-item,.field,fieldset,div');const lab=((w&&w.textContent)||'')+' '+(i.name||'')+' '+(i.placeholder||'');
      if(/result|blueprint|your site|site builder/i.test(lab)&&!/mail/i.test(i.type)){const set=Object.getOwnPropertyDescriptor(i.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set;set.call(i,txt);i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));if(ds.showResultField!=='on'&&w)w.style.display='none'}})};
    const finish=()=>{const r=summary();$('.sb-title').textContent=r.t;$('.sb-sum').textContent=r.s;
      if(!fb)fb=grabForm();if(fb)fill(fb,r.t+' | '+r.s);
      try{sessionStorage.setItem('site-builder',JSON.stringify(r))}catch(x){}
      el.classList.add('sb-done');el.dispatchEvent(new CustomEvent('sitebuilder:done',{bubbles:true,detail:r}))};
    next.addEventListener('click',()=>{if(st.step<2){st.step++;render()}else finish()});
    back.addEventListener('click',()=>{if(st.step>0){st.step--;render()}});
    $('.sb-again').addEventListener('click',()=>{st.step=0;st.ind=st.sty=null;st.feats=[];secs.innerHTML='';site.className='sb-site';$('.sb-kicker').textContent='Your website';$('.sb-h').textContent=ds.placeholder||'Starts here';el.classList.remove('sb-done');render()});
    render();
  };
  const run=()=>document.querySelectorAll('.site-builder').forEach(init);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
  new MutationObserver(()=>document.querySelectorAll('.site-builder:not([data-sb-on])').length&&run()).observe(document.documentElement,{childList:true,subtree:true});
})();
