/* Site Builder: pick an industry, drag features and a style into a laptop, get a named result + email signup.
   Content comes from three blogs (one post per option). Put a <div class="site-builder"> in a Code Block. */
(()=>{
  const dec=s=>{const t=document.createElement('textarea');t.innerHTML=s||'';return t.value.trim()};
  const firstP=h=>{const d=document.createElement('div');d.innerHTML=h||'';const p=[...d.querySelectorAll('p,h1,h2,h3,h4')].map(x=>x.textContent.trim()).find(Boolean);return p||''};
  const real=u=>!!u&&!/\/$/.test(u.split('?')[0]);
  const fmt=u=>/\.(gif|webp)(\?|$)/i.test(u)?u.split('?')[0]:u.split('?')[0]+'?format=1500w';
  /* images inside a post: one per style, matched by file name, alt text or caption */
  const bodyImgs=h=>bodyImgs0(h).filter(x=>real(x.src));
  const bodyImgs0=h=>{const d=document.createElement('div');d.innerHTML=h||'';return [...d.querySelectorAll('img')].map(i=>{const src=i.getAttribute('data-src')||i.getAttribute('data-image')||i.getAttribute('src')||'';const f=i.closest('figure');
    return {src:fmt(src),key:((i.alt||'')+' '+decodeURIComponent(src.split('?')[0].split('/').pop())+' '+(f&&f.querySelector('figcaption')?f.querySelector('figcaption').textContent:'')).toLowerCase()}}).filter(x=>x.src&&!/^data:/.test(x.src))};
  /* default title words if a post has no text */
  const IND=[[/photo/,'Lens'],[/creative/,'Creative'],[/agency|marketing/,'Agency'],[/product|brand/,'Brand'],[/salon|stylist|beauty|hair/,'Salon'],[/interior|architect/,'Interior'],[/coach|educat|course/,'Mentor'],[/event|hospitality|venue/,'Host']];
  const STY=[[/lux/,'lux','Gilded'],[/minimal/,'min','Quiet'],[/editorial/,'edi','Headline'],[/quirk/,'qui','Offbeat'],[/maximal/,'max','Showstopping'],[/colour|color|bold/,'col','Technicolour']];
  const HEAD=[[/photo/,'Stories, beautifully captured'],[/creative/,'Ideas with a point of view'],[/agency|marketing/,'Brands people remember'],[/product|brand/,'Made to be noticed'],[/salon|stylist|beauty/,'Your best look, booked'],[/interior|architect/,'Spaces with character'],[/coach|educat/,'Learn it, live it'],[/event|hospitality/,'Pull up a chair']];
  /* the tailored write-up: industry line + style line + features. Override with each post's excerpt. */
  /* recap copy: where they're at (industry), what I'd focus on (features + style). Override with each post's excerpt. */
  const WHO=[[/photo/,"You're a photographer, so your work has to do the selling. The usual sticking points: galleries that load slowly and bury your best shots, enquiries that arrive without dates or budgets, and a site that looks like every other photography template."],
    [/creative/,"You sell taste and ideas, which makes your own site the hardest brief of all. The usual sticking points: a portfolio that shows what you've made but not how you think, services that are hard to compare, and work that's outgrown the site it sits on."],
    [/agency|marketing/,"You make other brands look good, so your own site gets judged twice as hard. The usual sticking points: case studies buried three clicks deep, services described in jargon, and a site nobody's had time to touch since you last rebranded a client."],
    [/product|brand/,"You're selling something people can't hold until it arrives. The usual sticking points: product pages that don't do the product justice, a checkout that loses people halfway, and a brand story that never makes it past the About page."],
    [/salon|stylist|beauty|hair/,"Your clients book you because they trust your eye. The usual sticking points: booking that relies on DMs, a price list that's always out of date, and a site that feels nothing like walking into your space."],
    [/interior|architect/,"You think in space, light and detail. The usual sticking points: projects squeezed into small galleries, no clear sense of how you work or where to start, and a site that feels flatter than the rooms you design."],
    [/coach|educat|course/,"People buy into you before they buy your programme. The usual sticking points: a site that doesn't sound like you, offers that blur together, and no clear next step from \u201cI like her\u201d to \u201cI'm booked in\u201d."],
    [/event|hospitality|venue/,"You're selling a feeling before anyone walks through the door. The usual sticking points: menus and info stuck in PDFs, enquiries that arrive without the details you need, and photos that don't capture the atmosphere."]];
  const HELP=[[/photo/,"A custom site gives your images the space they deserve and turns browsing into booking, with an enquiry flow that asks the right questions before you reply."],
    [/creative/,"A custom site shows your thinking as well as your work, so the right clients see themselves in it before they've even got in touch."],
    [/agency|marketing/,"A custom site becomes your best case study: sharp, fast and impossible to mistake for anyone else."],
    [/product|brand/,"A custom site is built around your products, with photography, story and checkout working together so browsing turns into buying."],
    [/salon|stylist|beauty|hair/,"A custom site captures the feel of your space and puts booking one tap away, so your chair stays full without you living in your DMs."],
    [/interior|architect/,"A custom site gives each project room to breathe and walks people through how you work, so enquiries arrive ready to start."],
    [/coach|educat|course/,"A custom site sounds like you on a good day and lays out a clear path from first visit to booked call."],
    [/event|hospitality|venue/,"A custom site sets the mood the moment it loads and gathers the details you need, so enquiries turn into bookings faster."]];
  const NEED=[[/portfolio|gallery|work/,"a portfolio that opens big and loads fast, with projects grouped so people find the work most like theirs"],
    [/shop|store|product/,"a shop that keeps the falling-in-love moment and the buy button on the same page, with a checkout that stays out of the way"],
    [/service|booking|appoint/,"services laid out so people can see what fits them, with booking built in so nobody has to DM you"],
    [/blog|journal|news/,"a blog that's easy to keep up, with posts that link through to your services so reading turns into enquiring"],
    [/podcast|audio|episode/,"a podcast home where every episode has its own page, so people can listen, subscribe and find you through search"],
    [/course|member|class|learn/,"course and membership pages that sell the transformation, with sign-ups and logins that just work"]];
  const VIBE=[[/lux/,"For a luxury feel: generous space, refined type and fewer, bigger images. Nothing shouting."],
    [/minimal/,"For a minimal feel: a pared-back layout where every word and every image earns its place."],
    [/editorial/,"For an editorial feel: big headlines, strong crops and layouts that read like a magazine spread."],
    [/quirk/,"For a quirky feel: unexpected details and interactions that make people remember you, and screenshot you."],
    [/maximal/,"For a maximalist feel: colour, pattern and personality turned all the way up."],
    [/colour|color|bold/,"For a colourful, bold feel: confident colour and type you can see from across the room."]];
  const andList=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
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

  const loadFx=u=>fetch(u.replace(/\/$/,'')+'?format=json').then(r=>r.json()).then(j=>(j.items||[]).filter(x=>real(x.assetUrl)).map(x=>({t:dec(x.title),img:fmt(x.assetUrl),url:x.fullUrl,tags:(x.tags||[]).concat(x.categories||[]).map(t=>t.toLowerCase())}))).catch(()=>[]);
  const load=(u,order)=>fetch(u.replace(/\/$/,'')+'?format=json').then(r=>r.json()).then(j=>{const it=(j.items||[]).map(x=>({t:dec(x.title),w:firstP(x.body),img:real(x.assetUrl)?fmt(x.assetUrl):'',ex:firstP(x.excerpt),imgs:bodyImgs(x.body)}));return order==='newest'?it:it.reverse()}).catch(()=>[]);

  const init=async el=>{
    if(el.dataset.sbOn)return;el.dataset.sbOn=1;
    const ds=el.dataset,order=ds.order||'oldest';
    const css=(k,v)=>v&&el.style.setProperty(k,v);css('--sb-ink',ds.color);css('--sb-paper',ds.background);css('--sb-accent',ds.accent);css('--sb-font',ds.font);css('--sb-hover',ds.hoverColor);css('--sb-glow',ds.glowColor);if(ds.glow!=='off')el.classList.add('sb-glow');css('--sb-size',ds.optionSize);css('--sb-size-m',ds.optionSizeMobile||ds.optionSize);
    if(ds.fonts!=='off')fonts();if(ds.uppercase!=='off')el.classList.add('sb-caps');
    el.innerHTML='<p class="sb-loading">Loading…</p>';
    const [I,F,S,FX]=await Promise.all([load(ds.industries||'/site-builder-industries',order),load(ds.features||'/site-builder-features',order),load(ds.styles||'/site-builder-styles',order),ds.effects==='off'?[]:loadFx(ds.effects||'/effects')]);
    if(!I.length||!F.length||!S.length){el.innerHTML='<p class="sb-loading">Site Builder: couldn\'t find the Industries, Features or Styles blog.</p>';return}
    const Q=[ds.question1||'What do you do?',ds.question2||'What does your site need?',ds.question3||'Pick your vibe'];
    const touch=matchMedia('(pointer:coarse)').matches;
    const H=[ds.hint1||(touch?'Tap one to add it':'Drag one into the laptop, or click it'),ds.hint2||'Add as many as you like',ds.hint3||'Pick the one that feels most like you'];
    const sc=(ds.screen||'6 12 14 12').split(/[ ,]+/).map(parseFloat);
    const N=[ds.step1||'Industry',ds.step2||'Features',ds.step3||'Style'];
    el.innerHTML='<div class="sb-head"><div><h3 class="sb-q"></h3><p class="sb-hint"></p></div><div class="sb-steps">'+N.map((n,i)=>'<span>'+(i+1)+' '+n+'</span>').join('')+'</div></div>'+
      '<div class="sb-stage"><div class="sb-side"><div class="sb-tray"></div><div class="sb-ctrl"><button class="sb-back" type="button">Back</button><button class="sb-next" type="button" disabled>Next</button></div></div><div class="sb-result"><small>'+(ds.resultIntro||'Your recap')+'</small><h3 class="sb-title"></h3><p class="sb-sum"></p><div class="sb-blurb"></div><p class="sb-fx"></p>'+
      '<div class="sb-ctas"><a class="sb-cta" href="'+(ds.ctaUrl||'/contact')+'">'+(ds.ctaText||'Get your starting-point quote')+'</a>'+(ds.opinion==='off'?'':'<a class="sb-cta sb-cta2" href="'+(ds.opinionUrl||'/contact')+'">'+(ds.opinionText||'Want an opinion on your current site?')+'</a>')+'</div>'+
      '<div class="sb-form"></div>'+
      ((ds.pinterest||ds.instagram)?'<div class="sb-social"><span>'+(ds.socialText||'Follow for new releases and offers')+'</span>'+(ds.pinterest?'<a href="'+ds.pinterest+'" target="_blank" rel="noopener">Pinterest</a>':'')+(ds.instagram?'<a href="'+ds.instagram+'" target="_blank" rel="noopener">Instagram</a>':'')+'</div>':'')+
      '<button class="sb-again" type="button">Start again</button></div>'+
      (ds.laptopImage?'<div class="sb-laptop sb-photo-mode"><img class="sb-photo" alt="" src="'+ds.laptopImage+'"><div class="sb-view" style="top:'+sc[0]+'%;right:'+sc[1]+'%;bottom:'+sc[2]+'%;left:'+sc[3]+'%">':'<div class="sb-laptop"><div class="sb-screen"><div class="sb-view">')+'<div class="sb-site"><div class="sb-nav"><b class="sb-logo">'+(ds.logo||'Your Name')+'</b><i></i><i></i><i></i></div><div class="sb-hero"><small class="sb-kicker">Your website</small><h4 class="sb-h">'+(ds.placeholder||'Starts here')+'</h4><span class="sb-btn">'+(ds.heroButton||'Enquire')+'</span></div><div class="sb-secs"></div><div class="sb-foot-site">© '+(ds.logo||'Your Name')+'</div></div><div class="sb-drop">Drop it in</div></div>'+(ds.laptopImage?'</div>':'</div><div class="sb-base"></div></div>')+'</div>';
    el.insertAdjacentHTML('beforeend','<div class="sb-profile" hidden></div>');
    const $=s=>el.querySelector(s),tray=$('.sb-tray'),site=$('.sb-site'),secs=$('.sb-secs'),lap=$('.sb-laptop'),next=$('.sb-next'),back=$('.sb-back');
    if(ds.laptop!=='build')site.classList.add('sb-show','sb-has-hero');
    const st={step:0,ind:null,feats:[],sty:null};
    const lists=[I,F,S];
    const render=()=>{
      $('.sb-q').textContent=Q[st.step];$('.sb-hint').textContent=H[st.step];
      el.querySelectorAll('.sb-steps span').forEach((s,i)=>{s.classList.toggle('on',i===st.step);s.classList.toggle('done',i<st.step)});
      tray.innerHTML='';
      lists[st.step].forEach(o=>{const b=document.createElement('button');b.type='button';b.className='sb-chip';b.textContent=o.t;b.o=o;
        if(o===st.ind||st.feats.includes(o)||o===st.sty)b.classList.add('sel');tray.append(b)});
      next.disabled=!(st.step===0?st.ind:st.step===1?st.feats.length:st.sty);
      next.textContent=st.step===2?(ds.finishText||'See my profile'):'Next';
      back.hidden=st.step===0;
    };
    const styKey=()=>st.sty?(st.sty.t.toLowerCase().match(/[a-z]+/)||[''])[0]:'';
    const imgFor=o=>{const k=styKey();const m=k&&o.imgs.find(x=>x.key.includes(k));return m?m.src:(o.img||(o.imgs[0]&&!k?o.imgs[0].src:''))};
    const swapImgs=()=>st.feats.forEach(o=>{const s=secs.querySelector('[data-f="'+CSS.escape(o.t)+'"] img');const u=imgFor(o);if(s&&u&&s.getAttribute('src')!==u)s.src=u});
    /* a style post's thumbnail = the top of a real homepage in that style */
    let heroT=null;
    const heroImg=srcs=>{srcs=[].concat(srcs||[]).filter(Boolean);clearInterval(heroT);let h=site.querySelector('.sb-real-hero');
      if(!srcs.length){h&&h.remove();site.classList.remove('sb-has-hero');return}
      if(!h){h=document.createElement('div');h.className='sb-real-hero';site.prepend(h)}
      h.innerHTML=srcs.map((u,i)=>'<img src="'+u+'" alt=""'+(i?'':' class="on"')+'>').join('');
      if(srcs.length>1){let i=0;heroT=setInterval(()=>{const im=h.querySelectorAll('img');if(!im.length)return clearInterval(heroT);im[i].classList.remove('on');i=(i+1)%im.length;im[i].classList.add('on')},+(ds.effectSpeed||3200))}};
    /* your effects tagged with the picked style */
    const fxFor=o=>{const k=(o.t.toLowerCase().match(/[a-z]+/)||[''])[0];return k?FX.filter(e=>e.tags.some(t=>t.includes(k))):[]};
    /* showcase (default): the laptop just rotates your effects + optional extra images; picks don't change it */
    const show=ds.laptop!=='build';
    const bump=()=>{lap.classList.remove('sb-pulse');void lap.offsetWidth;lap.classList.add('sb-pulse')};
    const choose=o=>{
      if(show){if(st.step===0)st.ind=o;else if(st.step===1){const i=st.feats.indexOf(o);i>-1?st.feats.splice(i,1):st.feats.push(o)}else st.sty=o}
      else if(st.step===0){st.ind=o;$('.sb-kicker').textContent=o.t;$('.sb-h').textContent=pick(o.t,HEAD)||o.t}
      else if(st.step===1){const i=st.feats.indexOf(o);
        if(i>-1){st.feats.splice(i,1);const s=secs.querySelector('[data-f="'+CSS.escape(o.t)+'"]');s&&s.remove()}
        else{st.feats.push(o);const s=document.createElement('div');const u=imgFor(o);s.className='sb-sec'+(u?' sb-real':'');s.dataset.f=o.t;s.innerHTML=u?'<img src="'+u+'" alt="">':'<h5>'+o.t+'</h5>'+mock(o.t);secs.append(s);site.scrollTop=s.offsetTop-site.clientHeight*.25}}
      else{st.sty=o;const fx=fxFor(o),hs=o.img?[o.img]:fx.map(e=>e.img);heroImg(hs);swapImgs();site.className='sb-site'+(hs.length?' sb-has-hero':'')+(pick(o.t,STY)?' th-'+pick(o.t,STY):' th-'+['lux','min','edi','qui','max','col'][S.indexOf(o)%6]);site.scrollTop=0}
      bump();render();const c=[...tray.children].find(b=>b.o===o);c&&c.classList.contains('sel')&&c.classList.add('sb-flash');
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
    let form=$('.sb-form');
    /* signup: one Newsletter/Form Block per industry in the same section, titled with the industry name.
       On the live page they're all hidden; the visitor's industry block moves into the result. */
    const live=!document.body.classList.contains('sqs-edit-mode-active');
    const sigs=live?[...(el.closest('section')||document).querySelectorAll('.sqs-block-newsletter,.sqs-block-form')].filter(b=>!el.contains(b)):[];
    const home=new Map(sigs.map(b=>[b,b.parentNode]));
    sigs.forEach(b=>{const fe=b.closest('.fe-block');if(fe)fe.style.display='none';else b.style.display='none'});
    const titleOf=b=>((b.querySelector('.newsletter-form-header-title,h1,h2,h3,h4,legend')||{}).textContent||'').trim();
    const norm=t=>t.toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z]+/g,' ').trim();
    const grabForm=ind=>{if(!sigs.length)return null;
      const k=norm(ind.t),k1=k.split(' ')[0];
      const blk=sigs.find(b=>norm(titleOf(b))===k)||sigs.find(b=>norm(titleOf(b)).includes(k1))||sigs.find(b=>!I.some(i=>norm(titleOf(b)).includes(norm(i.t).split(' ')[0])))||sigs[0];
      [...form.children].forEach(c=>{const h=home.get(c);h&&h.append(c)});blk.style.display='';form.append(blk);
      blk.querySelectorAll('.newsletter-form-header-title,.newsletter-form-header-description').forEach(h=>h.style.display='none');
      
      return blk};
    let fb=null;
    const summary=()=>{const t='The '+(st.sty.w||pick(st.sty.t,STY,2)||st.sty.t)+' '+(st.ind.w||pick(st.ind.t,IND)||st.ind.t.split(/[ &]/)[0]);
      return {t,s:st.ind.t+' · '+st.feats.map(f=>f.t).join(', ')+' · '+st.sty.t}};
    const fill=(blk,txt)=>{blk.querySelectorAll('input,textarea').forEach(i=>{const w=i.closest('.form-item,.field,fieldset,div');const lab=((w&&w.textContent)||'')+' '+(i.name||'')+' '+(i.placeholder||'');
      if(/result|blueprint|your site|site builder|profile|industry/i.test(lab)&&!/mail/i.test(i.type)){const set=Object.getOwnPropertyDescriptor(i.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set;set.call(i,txt);i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));if(ds.showResultField!=='on'&&w)w.style.display='none'}})};
    /* slowly scroll the laptop through the finished site */
    let tourT=null;const tour=()=>{clearTimeout(tourT);site.style.scrollBehavior='auto';let y=0,dir=1;
      const step=()=>{if(!el.classList.contains('sb-done'))return;const max=site.scrollHeight-site.clientHeight;if(max<=0)return;y+=dir*.6;if(y>=max){y=max;dir=-1;tourT=setTimeout(()=>requestAnimationFrame(step),1500);site.scrollTop=y;return}if(y<=0){y=0;dir=1;tourT=setTimeout(()=>requestAnimationFrame(step),1500);site.scrollTop=y;return}site.scrollTop=y;requestAnimationFrame(step)};
      tourT=setTimeout(()=>requestAnimationFrame(step),800)};
    const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const finish=()=>{const r=summary(),P=$('.sb-profile');
      const who=st.ind.ex||((pick(st.ind.t,WHO)||'')+' '+(pick(st.ind.t,HELP)||'')).trim();
      const vibe=st.sty.ex||pick(st.sty.t,VIBE)||'';
      const fx=fxFor(st.sty).slice(0,+(ds.effectsMax||4));
      const sec=(h,t)=>t?'<div class="sbp-sec"><h5>'+esc(h)+'</h5><p>'+t+'</p></div>':'';
      P.innerHTML='<div class="sbp-head"><small>'+(ds.profileKicker||'Your profile')+'</small><h3>'+(ds.profileHeading||'Your profile is ready')+'</h3><p>'+(ds.profileIntro||'Here\'s where I\'d start.')+'</p>'+
        '<div class="sbp-pills"><span>'+N[0]+'</span><span>'+N[1]+'</span><span>'+N[2]+'</span><span class="on">'+(ds.profilePill||'Your profile')+'</span></div></div>'+
        '<div class="sbp-grid"><div class="sbp-card sbp-main"><small>'+(ds.profileCardKicker||'Your business profile')+'</small><h3 class="sb-title">'+esc(r.t)+'</h3>'+
        '<div class="sbp-chips">'+[st.ind,...st.feats,st.sty].map(o=>'<span>'+esc(o.t)+'</span>').join('')+'</div>'+
        sec(st.ind.t,who)+st.feats.map(f=>sec(f.t,f.ex||((pick(f.t,NEED)?'I\'d build '+pick(f.t,NEED)+'.':'')))).join('')+sec(st.sty.t,vibe)+
        (fx.length?'<div class="sbp-sec"><h5>'+(ds.effectsText||'Effects that would suit you')+'</h5><div class="sbp-fx">'+fx.map(e=>'<a href="'+e.url+'"><img src="'+e.img+'" alt="" loading="lazy"><span>'+esc(e.t)+'</span></a>').join('')+'</div></div>':'')+
        '</div><div class="sbp-side"><div class="sbp-card"><h4>'+(ds.brainstormTitle||'Book a design brainstorm')+'</h4><p>'+(ds.brainstormText||'Every site I design is completely bespoke. No templates, no copy and paste. I use custom effects to showcase your work and help you stand out in a crowded feed, all built around how your clients actually find and book you. This profile is just the starting point.')+'</p>'+
        '<a class="sbp-btn" href="'+(ds.ctaUrl||'/contact')+'">'+(ds.ctaText||'Book a design brainstorm')+'</a></div>'+
        '<div class="sbp-card sbp-email" hidden><h4>'+(ds.ideasTitle||'Email me some design ideas')+'</h4><p>'+(ds.ideasText||'Not ready yet? Get design ideas and effects matched to your profile, straight to your inbox.')+'</p><div class="sb-form"></div></div>'+
        '<div class="sbp-more">'+(ds.opinion==='off'?'':'<a class="sbp-link" href="'+(ds.opinionUrl||'/contact')+'">'+(ds.opinionText||'Want an opinion on your current site?')+'</a>')+
        ((ds.pinterest||ds.instagram)?'<div class="sb-social"><span>'+(ds.socialText||'Follow for new releases and offers')+'</span>'+(ds.pinterest?'<a href="'+ds.pinterest+'" target="_blank" rel="noopener">Pinterest</a>':'')+(ds.instagram?'<a href="'+ds.instagram+'" target="_blank" rel="noopener">Instagram</a>':'')+'</div>':'')+
        '<button class="sb-again" type="button">Start again</button></div></div></div>';
      form=P.querySelector('.sb-form');fb=grabForm(st.ind);if(fb){fill(fb,r.t+' | '+r.s);P.querySelector('.sbp-email').hidden=false}
      P.querySelector('.sb-again').addEventListener('click',again);
      try{sessionStorage.setItem('site-builder',JSON.stringify(r))}catch(x){}
      el.querySelectorAll('.sb-steps span').forEach(s=>{s.classList.remove('on');s.classList.add('done')});
      P.hidden=false;el.classList.add('sb-profiled');requestAnimationFrame(()=>P.scrollIntoView({behavior:'smooth',block:'start'}));
      el.dispatchEvent(new CustomEvent('sitebuilder:done',{bubbles:true,detail:r}))};
    next.addEventListener('click',()=>{if(st.step<2){st.step++;render()}else finish()});
    back.addEventListener('click',()=>{if(st.step>0){st.step--;render()}});
    const again=()=>{const P=$('.sb-profile');if(fb){const h=home.get(fb);h&&h.append(fb);fb=null}P.hidden=true;P.innerHTML='';el.classList.remove('sb-profiled','sb-done');st.step=0;st.ind=st.sty=null;st.feats=[];render();el.scrollIntoView({behavior:'smooth',block:'start'})};
    if(show)Promise.all((ds.showcase||'').split(',').map(u=>u.trim()).filter(Boolean).map(loadFx)).then(x=>{
      const imgs=(ds.effects==='off'?[]:FX.map(e=>e.img)).concat(...x.map(a=>a.map(e=>e.img)));
      if(ds.shuffle==='on')imgs.sort(()=>Math.random()-.5);
      site.classList.add('sb-show','sb-has-hero');heroImg(imgs)});
    render();
  };
  const run=()=>document.querySelectorAll('.site-builder').forEach(init);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
  new MutationObserver(()=>document.querySelectorAll('.site-builder:not([data-sb-on])').length&&run()).observe(document.documentElement,{childList:true,subtree:true});
})();
