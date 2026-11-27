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
  const PAIN=[[/photo/,"Your work is your calling card, and the right website lets it speak before you ever say a word. When someone is choosing a photographer, they're choosing a feeling. A beautiful, easy-to-explore site lets your images do exactly that, shows people what it's like to work with you, and turns admiration into bookings. It's where your style gets seen properly, at full size, the way it deserves."],
    [/creative/,"Creative businesses live and die by how they're perceived, and your website is often the very first impression. A site with real personality tells people instantly who you are, what you stand for and why you're different. It gives your work room to breathe, helps the right clients recognise themselves in what you do, and makes you look as considered and original as you are."],
    [/agency|marketing/,"Clients hire agencies they trust to make them look good, and your own website is the proof. A sharp, confident site shows your thinking, your results and your process at a glance. It positions you alongside the brands you want to work with, makes you memorable in a crowded field, and gives every pitch a head start before the first call."],
    [/product|brand|shop/,"People fall for brands before they fall for products. A website that captures your story, your values and the care behind what you make turns casual browsers into loyal customers. It's your shop window, your brand world and your best salesperson all in one, open around the clock and showing the world exactly why your products are worth having."],
    [/salon|stylist|beauty|hair/,"In beauty, people book with their eyes. A website that shows off your work, your space and your personality makes new clients feel like they already know you. Add easy booking and clear services, and you're not just getting seen, you're getting chosen. It's the place your talent gets the spotlight it deserves, beyond the chair."],
    [/interior|architect/,"Your projects are all about atmosphere, detail and craft, and your website should feel the same. A beautifully paced site lets each space unfold, shows your process with confidence and helps the right clients picture their own home or project in your hands. It's how your vision gets seen, trusted and remembered."],
    [/coach|educat|course/,"People choose a coach or teacher they feel connected to. Your website is where that connection starts: your story, your approach and the transformation you offer, all in one place. Done right, it builds trust before the first conversation, makes your offers clear and exciting, and puts your expertise exactly where the people who need you can find it."],
    [/event|hospitality|venue|wedding/,"Events and hospitality are about how something feels, and your website is the first taste of that. A site full of atmosphere lets people imagine themselves there, shows off the experience you create and makes enquiring feel easy and exciting. It's how your magic gets seen long before anyone walks through the door."]];
  const PLAN=[[/photo/,"I'd give your images the stage they deserve: big, bold galleries that load fast, a story that shows the person behind the camera, and an enquiry journey that feels as considered as your work. Everything designed so the right clients find you, fall for your style and can't wait to book. I want you to shine, stand out and get recognised for exactly what makes your work yours."],
    [/creative/,"I'd build you a site with as much personality as your work, with bold layouts, custom touches and a clear path from first impression to first enquiry. Every page would be designed to show off your point of view and make the right clients feel instantly at home. I've got your corner: this is about you standing out, getting recognised and being the obvious choice."],
    [/agency|marketing/,"I'd create a site that feels like a showcase: confident case studies, a process that's easy to buy into and a voice that sounds unmistakably like you. It would position you right alongside the brands you want to win, and make every visitor want to see more. You deserve a site that works as hard as you do for your clients."],
    [/product|brand|shop/,"I'd build a shop that feels like stepping into your brand world, with beautiful product stories, effortless browsing and a checkout that feels exciting rather than a chore. Every detail would be designed to make people fall for what you make and come back for more. This is your moment to shine, and I want your products seen and loved."],
    [/salon|stylist|beauty|hair/,"I'd create a site that shows off your talent from the first scroll: gorgeous galleries, clear services and booking built right in. It would feel like your salon, welcoming and full of personality, so new clients feel at home before they arrive. I want your work in the spotlight, getting the recognition and the bookings it deserves."],
    [/interior|architect/,"I'd design a site with room to breathe: full-bleed imagery, projects that unfold beautifully and a process told with calm confidence. Every page would reflect the care you put into every space, so the right clients see themselves in your work. I want your vision recognised and your projects given the stage they deserve."],
    [/coach|educat|course/,"I'd build a site that feels like a warm, confident introduction to you: your story, your approach and offers that are clear and exciting to say yes to. It would guide people naturally from curious to committed. I've got your corner here, so your expertise gets seen, trusted and recognised by the people who need it most."],
    [/event|hospitality|venue|wedding/,"I'd create a site that lets people feel the experience before they arrive: atmospheric imagery, inviting details and an enquiry journey that's easy and exciting. Everything would be designed to make you unforgettable and make booking feel like the obvious next step. I want your magic seen, shared and remembered."]];
  const NEED=[[/portfolio|gallery|work/,"a portfolio that opens big and loads fast, with projects grouped so people find the work most like theirs"],
    [/shop|store|product/,"a shop that keeps the falling-in-love moment and the buy button on the same page, with a checkout that stays out of the way"],
    [/service|booking|appoint/,"services laid out so people can see what fits them, with booking built in so nobody has to DM you"],
    [/blog|journal|news/,"a blog that's easy to keep up, with posts that link through to your services so reading turns into enquiring"],
    [/podcast|audio|episode/,"a podcast home where every episode has its own page, so people can listen, subscribe and find you through search"],
    [/course|member|class|learn/,"course and membership pages that sell the transformation, with sign-ups and logins that just work"],
    [/about|bio|story/,"an about page that tells your story in your voice, so people feel like they know you before they get in touch"],
    [/team|staff|people/,"team profiles that show the faces behind the work, so clients know exactly who they'll be dealing with"],
    [/enquir|contact|form/,"an enquiry form that asks the right questions up front, so every message lands with dates, budgets and the details you need"],
    [/email|newsletter|sign.?up|mailing/,"an email sign-up with a reason to join, so visitors who aren't ready yet stay in your world until they are"],
    [/testimonial|review|kind words/,"testimonials placed right where people hesitate, so your past clients do the convincing for you"],
    [/faq|question/,"an FAQ that answers the same five questions before anyone has to ask them"]];
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
    const ds=el.dataset,_pc=(ds.pillColors||'').split(',').map(x=>x.trim()).filter(Boolean);_pc.forEach((c,i)=>el.style.setProperty('--sb-pill'+(i+1),c));const _ds0=0,order=ds.order||'oldest';const board=ds.stage!=='laptop';
    const css=(k,v)=>v&&el.style.setProperty(k,v);css('--sb-ink',ds.color);css('--sb-paper',ds.background);css('--sb-accent',ds.accent);css('--sb-font',ds.font);css('--sb-hover',ds.hoverColor);css('--sb-glow',ds.glowColor);if(ds.glow!=='off')el.classList.add('sb-glow');css('--sb-size',ds.optionSize);css('--sb-size-m',ds.optionSizeMobile||ds.optionSize);
    if(ds.fonts!=='off')fonts();if(ds.uppercase!=='off')el.classList.add('sb-caps');
    el.innerHTML='<p class="sb-loading">Loading…</p>';
    const [I,F,S,FX]=await Promise.all([load(ds.industries||'/site-builder-industries',order),load(ds.features||'/site-builder-features',order),load(ds.styles||'/site-builder-styles',order),ds.effects==='off'?[]:loadFx(ds.effects||'/effects')]);
    const kw=t=>(t.toLowerCase().match(/[a-z]+/)||[''])[0];
    const MB=ds.stage!=='laptop'&&ds.pinboard==='on'?await loadFx(ds.moodboard||'/site-builder-moodboard'):[];
    const seen=new Set(),PICS=(MB.length?MB:FX.concat(S.flatMap(o=>[o.img].concat(o.imgs.map(x=>x.src)).filter(Boolean).map(u=>({t:'',img:u,tags:[kw(o.t)]})))))
      .filter(x=>x.img&&!seen.has(x.img)&&seen.add(x.img)).sort(()=>Math.random()-.5).slice(0,+(ds.pinboardMax||18)).map(x=>Object.assign({pic:1},x));
    const pics=ds.stage!=='laptop'&&ds.pinboard==='on'&&PICS.length>=4;
    /* features in a sensible order: the basics first (data-feature-order="about,services,..." to change) */
    if(ds.featureOrder!=='off'){const ord=(ds.featureOrder||'about|bio,service|booking,portfolio|gallery,enquir|contact|form,testimonial|review,shop|store|product,blog|journal,email|newsletter|sign,team|staff,faq,course|member,podcast').split(',').map(k=>new RegExp(k.trim(),'i'));
      const rank=o=>{const i=ord.findIndex(r=>r.test(o.t));return i<0?ord.length:i};F.sort((a,b)=>rank(a)-rank(b))}
    if(!I.length||!F.length||!S.length){el.innerHTML='<p class="sb-loading">Site Builder: couldn\'t find the Industries, Features or Styles blog.</p>';return}
    const Q=[ds.question1||(board?'Pick your industry':'What do you do?'),ds.question2||(board?'What does your website need?':'What does your site need?'),ds.question3||(board?'What\'s your style?':'Pick your vibe')];
    const touch=matchMedia('(pointer:coarse)').matches;
    const H=[ds.hint1||(board?'':'Drag one into the laptop, or click it'),ds.hint2||(board?'Pick as many as you need. Each one is added to your must haves.':'Add as many as you like'),ds.hint3||(board?'Pick the style that feels most like you, and I\'ll pin some of my work in that style.':'Pick the one that feels most like you')];
    const sc=(ds.screen||'6 12 14 12').split(/[ ,]+/).map(parseFloat);
    const N=[ds.step1||'Industry',ds.step2||'Features',ds.step3||'Style'];
    if(pics){Q[2]=ds.question3||'What catches your eye?';H[2]=ds.hint3||'Save the images that speak to you';N[2]=ds.step3||'Inspiration'}
    el.innerHTML='<div class="sb-head"><div>'+(ds.title?'<h2 class="sb-title-main">'+ds.title+'</h2>':'')+(ds.intro?'<p class="sb-intro">'+ds.intro+'</p>':'')+'<small class="sb-stepno"></small><h3 class="sb-q"></h3><p class="sb-hint"></p></div><div class="sb-steps">'+N.map((n,i)=>'<span>'+(i+1)+' '+n+'</span>').join('')+'</div></div>'+
      '<div class="sb-stage"><div class="sb-side"><div class="sb-tray"></div><div class="sb-ctrl"><button class="sb-back" type="button">Back</button><button class="sb-unlock" type="button" hidden>'+(ds.unlockText||'Unlock ideas')+'</button><button class="sb-next" type="button" disabled>Next</button></div></div><div class="sb-result"><small>'+(ds.resultIntro||'Your recap')+'</small><h3 class="sb-title"></h3><p class="sb-sum"></p><div class="sb-blurb"></div><p class="sb-fx"></p>'+
      '<div class="sb-ctas"><a class="sb-cta" href="'+(ds.ctaUrl||'/contact')+'">'+(ds.ctaText||'Get your starting-point quote')+'</a>'+(ds.opinion==='off'?'':'<a class="sb-cta sb-cta2" href="'+(ds.opinionUrl||'/contact')+'">'+(ds.opinionText||'Want an opinion on your current site?')+'</a>')+'</div>'+
      '<div class="sb-form"></div>'+
      ((ds.pinterest||ds.instagram)?'<div class="sb-social"><span>'+(ds.socialText||'Follow for new releases and offers')+'</span>'+(ds.pinterest?'<a href="'+ds.pinterest+'" target="_blank" rel="noopener">Pinterest</a>':'')+(ds.instagram?'<a href="'+ds.instagram+'" target="_blank" rel="noopener">Instagram</a>':'')+'</div>':'')+
      '<button class="sb-again" type="button">Start again</button></div>'+
      (board?'<div class="sb-laptop sb-board"><div class="sb-board-in"><small class="sb-board-t">'+(ds.boardTitle||'')+'</small><p class="sb-board-hint">'+(innerWidth<768?(ds.boardHintMobile||'Drag and drop to reposition elements on your moodboard'):(ds.boardHint||'Drag and drop to reposition elements on your moodboard'))+'</p></div><div class="sb-site" hidden><div class="sb-secs"></div></div></div>':
      (ds.laptopImage?'<div class="sb-laptop sb-photo-mode"><img class="sb-photo" alt="" src="'+ds.laptopImage+'"><div class="sb-view" style="top:'+sc[0]+'%;right:'+sc[1]+'%;bottom:'+sc[2]+'%;left:'+sc[3]+'%">':'<div class="sb-laptop"><div class="sb-screen"><div class="sb-view">')+'<div class="sb-site"><div class="sb-nav"><b class="sb-logo">'+(ds.logo||'Your Name')+'</b><i></i><i></i><i></i></div><div class="sb-hero"><small class="sb-kicker">Your website</small><h4 class="sb-h">'+(ds.placeholder||'Starts here')+'</h4><span class="sb-btn">'+(ds.heroButton||'Enquire')+'</span></div><div class="sb-secs"></div><div class="sb-foot-site">© '+(ds.logo||'Your Name')+'</div></div><div class="sb-drop">Drop it in</div></div>'+(ds.laptopImage?'</div>':'</div><div class="sb-base"></div></div>')+'</div>');
    if(board&&ds.quote==='on')el.insertAdjacentHTML('beforeend','<div class="sb-quote" hidden><div class="sbq-in sqs-html-content"><h2>'+(ds.quoteTitle||'Get a <em>hassle-free</em> quote')+'</h2><p>'+(ds.quoteText||"Pop your email in and I'll send you a quote and ideas based on your moodboard. No calls, no pressure.")+'</p><form class="sbq-mail" novalidate><input type="email" required placeholder="you@yourbusiness.com" aria-label="Email address"><button type="submit">'+(ds.quoteButton||'Get my quote')+' <b>→</b></button></form><p class="sbq-ok" hidden>'+(ds.quoteThanks||"Lovely, your quote is on its way. Here are some ideas to get you started.")+'</p><button class="sbq-unlock" type="button">'+(ds.unlockText||'Or unlock your ideas now')+' <b>↓</b></button><div class="sb-form" hidden></div></div></div>');
    if(board&&ds.teaser!=='off')el.insertAdjacentHTML('beforeend','<div class="sb-teaser" hidden><h2>'+(ds.teaserTitle||'Want some ideas <em>straight away?</em>')+'</h2><p>'+(ds.teaserText||'Keep scrolling')+' <b>↓</b></p></div>');
    el.insertAdjacentHTML('beforeend','<div class="sb-profile" hidden></div>');
    const qb=el.querySelector('.sb-quote'),tz=el.querySelector('.sb-teaser');let sent=false;const mailOn=board&&!pics&&ds.mailNote!=='off';let mailT=0;if(qb&&ds.paper)qb.style.setProperty('--sb-qbg',ds.paper);
    const $=s=>el.querySelector(s),tray=$('.sb-tray'),site=$('.sb-site'),secs=$('.sb-secs'),lap=$('.sb-laptop'),next=$('.sb-next'),back=$('.sb-back'),unl=$('.sb-unlock');
    if(ds.laptop!=='build')site.classList.add('sb-show','sb-has-hero');
    if(board&&ds.boardImage){lap.classList.add('sb-folder');const set=(k,u)=>{lap.style.setProperty('--sb-bimg'+k,'url("'+u+'")');const i=new Image();i.onload=()=>lap.style.setProperty('--sb-bar'+k,i.naturalWidth+'/'+i.naturalHeight);i.src=u};
      set('',ds.boardImage);set('-m',ds.boardImageMobile||ds.boardImage);
      const ar=v=>v.split(/[ ,]+/).map(x=>parseFloat(x)+'%').join(' ');lap.style.setProperty('--sb-ba',ar(ds.boardArea||'8 6 8 10'));lap.style.setProperty('--sb-ba-m',ar(ds.boardAreaMobile||ds.boardArea||'10 8 6 8'))}
    /* binder background: questions on the left page, moodboard on the right; on mobile it turns so the rings run across the top */
    let refit=()=>{};
    if(board&&ds.boardBackground){const wr=document.createElement('div');wr.className='sb-binder';el.prepend(wr);wr.append(el.querySelector('.sb-head'),el.querySelector('.sb-stage'));
      const sec=el.closest('section'),host=(sec&&sec.querySelector('.section-background'))||null,bg=document.createElement('div');bg.className='sb-binder-bg';
      if(host)host.append(bg);else{wr.classList.add('sb-own');wr.prepend(bg)}
      const box=host?sec:wr,sp=+(ds.spine||35)/100,r0=+(ds.ringStart||30.5)/100,r1=+(ds.ringEnd||39.2)/100,ratio=+(ds.boardBackgroundRatio||.5625);
      bg.style.setProperty('--sb-bbg','url("'+ds.boardBackground+'")');bg.style.setProperty('--sb-spine',sp*100+'%');if(ds.paper)bg.style.setProperty('--sb-paperc',ds.paper);
      const book=ds.bookImage,bk=(ds.bookPages||'46.8 52.8').split(/[ ,]+/).map(x=>+x/100);if(book)wr.style.setProperty('--sb-book','url("'+book+'")');
      const fit=()=>{if(book&&innerWidth>=768){wr.classList.add('sb-book');bg.style.display='none';const W=wr.getBoundingClientRect().width,v=(k,x)=>wr.style.setProperty(k,x+'px');v('--sb-col',W*(bk[0]-.085));v('--sb-gap',W*(bk[1]-bk[0]+.085+.03));v('--sb-bpl',W*.055);v('--sb-bpr',W*.045);v('--sb-bpt',W*.05);return}
        wr.classList.remove('sb-book');bg.style.display='';const B=box.getBoundingClientRect(),R=wr.getBoundingClientRect(),W=B.width,bgw=Math.max(1.8*W,W/ratio*1.02),v=(e,k,x)=>e.style.setProperty(k,x+'px'),dw=Math.max(W,B.height/ratio),gap=(r1-r0)*dw+Math.max(36,W*.04);
        v(bg,'--sb-bgw',bgw);const lead=+(ds.ringLead||2.5)/100;v(bg,'--sb-bgx',-(r0-lead)*bgw);v(bg,'--sb-bgh',W);v(bg,'--sb-plen',(1-r0+lead)*bgw);bg.style.setProperty('--sb-fade',(lead*.9/(1-r0+lead)*100)+'%');
        v(wr,'--sb-col',Math.max(200,B.left+W*sp-R.left-gap/2));v(wr,'--sb-gap',gap);
        const band=(r1-r0+.02)*bgw,mob=innerWidth<768;v(wr,'--sb-band',band);v(bg,'--sb-rtop',0);wr.style.paddingTop='';
        bg.style.top='';if(mob){const L=lap.getBoundingClientRect(),rt=Math.max(0,L.top-B.top-band-8);v(bg,'--sb-rtop',rt-lead*bgw);v(bg,'--sb-toph',rt+2);v(bg,'--sb-topw',Math.max(W/(1-r1-.015)*1.03,(rt+2)/ratio*1.02))}};
      refit=()=>requestAnimationFrame(fit);
      fit();addEventListener('resize',fit);setTimeout(fit,600)}
    if(board){const sv=(k,u)=>u&&el.style.setProperty(k,'url("'+u+'")');sv('--sb-notepin',ds.notePin);sv('--sb-indpin',ds.industryPin);if(ds.notePin)el.classList.add('sb-has-notepin');if(ds.industryPin)el.classList.add('sb-has-indpin')}
    if(board&&ds.pinImage){el.classList.add('sb-has-pinimg');el.style.setProperty('--sb-pinimg','url("'+ds.pinImage+'")')}
    if(board&&ds.boardFont){const f=document.createElement('style');f.textContent='@font-face{font-family:"SB Board";src:url("'+ds.boardFont+'");font-display:swap}';document.head.append(f);el.classList.add('sb-has-bfont')}
    const st={step:0,ind:null,feats:[],sty:null,saved:[]};
    const lists=[I,F,pics?PICS:S];
    const render=()=>{
      $('.sb-q').textContent=(board?(st.step+1)+'. ':'')+Q[st.step];$('.sb-stepno').textContent=(ds.stepText||'Step {n} of 3').replace('{n}',st.step+1);$('.sb-hint').textContent=H[st.step];$('.sb-hint').hidden=!H[st.step];
      el.querySelectorAll('.sb-steps span').forEach((s,i)=>{s.classList.toggle('on',i===st.step);s.classList.toggle('done',i<st.step)});
      tray.innerHTML='';tray.dataset.step=st.step;
      tray.classList.toggle('sb-tray-img',!!lists[st.step][0].pic);
      lists[st.step].forEach(o=>{const b=document.createElement('button');b.type='button';b.o=o;
        if(o.pic){const on=st.saved.includes(o);b.className='sb-chip sb-tile'+(on?' sel':'');b.innerHTML='<img src="'+o.img+'" alt="" loading="lazy" draggable="false"><span>'+(on?'Saved':'Save')+'</span>';tray.append(b);return}
        b.className='sb-chip';b.textContent=o.t;
        if(o===st.ind||st.feats.includes(o)||o===st.sty){b.classList.add('sel');if(o===jigO)b.classList.add('sb-jig')}tray.append(b)});jigO=null;
      next.disabled=!(st.step===0?st.ind:st.step===1?st.feats.length:(pics?st.saved.length:st.sty));
      next.textContent=st.step===2?(ds.finishText||'See my profile'):'Next';
      back.hidden=st.step===0;refit();
      if(board){next.hidden=st.step===0||(st.step===2&&next.disabled);next.textContent=st.step===1?(ds.nextText||'Next: pick your style →'):(ds.finishText||'Get a quote →');unl.hidden=true;if(tz){const on=board&&st.step===2&&!!st.sty;tz.hidden=!on}if(qb||mailOn){next.hidden=st.step!==1;const on=qb&&st.step===2&&!!st.sty;if(!qb);else if(on&&qb.hidden){qb.hidden=false;qb.classList.remove('in');setTimeout(()=>qb.classList.add('in'),900)}else if(!on)qb.hidden=true}else unl.hidden=next.hidden||st.step!==2;next.classList.toggle('sb-ready',!next.disabled)}
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
    /* moodboard: picks pin onto a board with your effects; everything can be dragged around */
    const bd=board?$('.sb-board-in'):null;let zTop=20,lastInd=null,lastSty=null;
    const SL={img:[[3,7,-6],[59,5,5],[6,55,4],[61,53,-5]],ft:[[6,38,-5],[64,33,6],[36,76,-3],[5,84,4],[68,82,-6],[40,10,4]]};
    const pin=(key,cls,html,at,dl,host)=>{host=host||bd;const o=host.querySelector('[data-k="'+CSS.escape(key)+'"]');o&&o.remove();const p=document.createElement('div');p.className='sb-pin '+cls;p.dataset.k=key;
      p.style.cssText='left:'+at[0]+'%;top:'+at[1]+'%;--r:'+at[2]+'deg;z-index:'+(++zTop)+';animation-delay:'+(dl||0)+'ms';p.innerHTML=html;host.append(p);return p};
    const unpin=p=>{if(!p||p.classList.contains('sb-out'))return;p.classList.add('sb-out');setTimeout(()=>p.remove(),450)};
    const pinImgs=list=>{bd.querySelectorAll('.sb-pimg').forEach(unpin);list.slice(0,4).forEach((u,i)=>pin('i'+Math.random(),'sb-pimg','<img src="'+u+'" alt="" draggable="false">',SL.img[i],120+i*130).style.zIndex=1+i)};
    const styleFrom=()=>{if(!st.saved.length)return null;let best=null,n=0;S.forEach(o=>{const k=kw(o.t),w=kw(o.w||'');const c=st.saved.filter(p=>p.tags.some(t=>(k&&t.includes(k))||(w&&t.includes(w)))).length;if(c>n){n=c;best=o}});return best||st.sty||S[0]};
    const SV=[[4,8,-6],[58,6,5],[33,38,-3],[6,56,4],[62,52,-5],[30,3,3],[38,68,-4],[70,26,6]];
    const fxb=bd?document.createElement('div'):null;if(fxb){fxb.className='sb-fxboard';$('.sb-side').append(fxb)}
    const fxHost=()=>fxb&&innerWidth>=768&&el.querySelector('.sb-book')?fxb:bd;const jit=(a)=>a.map(([x,y,r])=>[x+Math.random()*6-3,y+Math.random()*4-2,r+Math.random()*3-1.5]),SLF2=[[0,10,-3],[40,34,4],[4,62,-2]];
    const SLI=[[44,9,5],[71,12,-4],[46,32,3],[72,35,-5]],SLF=[[3,70,-3],[35,74,4],[67,68,-2]];
    const indImgs=()=>{const o=st.ind;if(!o)return[];let a=o.imgs.length?o.imgs:(o.img?[{src:o.img,key:''}]:[]);
      if(st.sty){const k=kw(st.sty.t),w=kw(st.sty.w||''),m=a.filter(x=>(k&&x.key.includes(k))||(w&&x.key.includes(w)));if(m.length)a=m.concat(a.filter(x=>!m.includes(x)))}
      return a.slice(0,+(ds.industryImages||4))};
    const typeOut=(li,t)=>{let i=0;li.classList.add('sb-typing');const tick=()=>{if(!li.isConnected)return;li.textContent=t.slice(0,++i);if(i<t.length)setTimeout(tick,40+Math.random()*60);else li.classList.remove('sb-typing')};tick()};
    let lastII='';
    const boardSync=()=>{if(!bd)return;const E=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),img=u=>'<img src="'+u+'" alt="" draggable="false">';
      if(st.ind!==lastInd){lastInd=st.ind;st.ind?pin('ind','sb-pind','<span>'+E(st.ind.t)+'</span>',innerWidth>=768&&el.querySelector('.sb-book')?[2,-17,-4]:[3,8,-5]):unpin(bd.querySelector('[data-k="ind"]'))}
      if(st.sty!==lastSty){lastSty=st.sty;lastII='';el.querySelectorAll('.sb-pfx').forEach(unpin);
        if(st.sty){const w=(st.sty.w||'').trim();if(pics||ds.styleSticker==='on')pin('sty','sb-psty',pics?'<span>'+(ds.vibeLabel||'Your vibe')+'</span><em>'+E(w&&w.length<22?w:st.sty.t)+'</em>':'<span>'+E(st.sty.t)+'</span>'+(w&&w.length<22?'<em>'+E(w)+'</em>':''),[5,68,-6]);
          if(!pics){const fx=fxFor(st.sty).slice(0,+(ds.styleEffects||3)),fh=fxHost(),mm=mailOn&&fh===bd&&innerWidth<768,sl=fh===bd?(mm?[[3,56,-3],[36,61,4],[64,55,-2]]:SLF):jit(SLF2);fx.forEach((e,i)=>pin('x'+i+Math.random(),'sb-pimg sb-pfx',img(e.img),sl[i],250+i*160,fh).style.zIndex=10+i);
            if(fx.length&&ds.fxNote!=='off'){const tn=pin('fxnote','sb-pfx sb-ptext','<span></span>',fh===bd?(mm?[5,51,-3]:[36,60,-3]):[3,1,-2],0,fh);setTimeout(()=>typeOut(tn.querySelector('span'),ds.fxNote||'maybe something like this?'),250+fx.length*160+500)}}}
        else unpin(bd.querySelector('[data-k="sty"]'))}
      const ii=indImgs(),ik=ii.map(x=>x.src).join('|');if(ik!==lastII){lastII=ik;el.querySelectorAll('.sb-pii').forEach(unpin);const bkk=innerWidth>=768&&el.querySelector('.sb-book');ii.forEach((x,i)=>{const lh=bkk&&fxb&&i>=2&&!st.sty;const obj=/\.png(\?|$)|^data:image\/(png|webp)/i.test(x.src)||/cutout|polaroid|print/.test(x.key),pr=/polaroid|print/.test(x.key);pin('n'+i+Math.random(),'sb-pimg sb-pii'+(obj?' sb-obj':'')+(pr?' sb-print':''),img(x.src),lh?[[8,12,-5],[52,30,5]][i-2]:(bkk?[[58,3,6],[84,30,-6],[78,49,5],[58,47,-4]]:innerWidth<768?(st.sty&&mailOn?[[60,6,5],[72,19,-4],[58,32,3],[70,41,-5]]:[[58,12,5],[66,30,-4],[56,47,3],[68,62,-5]]):SLI)[i],180+i*130,lh?fxb:bd).style.zIndex=2+i})}
      let note=bd.querySelector('.sb-pnote:not(.sb-out)');
      if(st.feats.length){if(!note)note=pin('note','sb-pnote'+(ds.noteImage?' sb-paper':''),'<div class="sb-lines"><b>'+(ds.mustTitle||'Must haves')+'</b><ul></ul></div>',innerWidth>=768&&el.querySelector('.sb-book')?[-6,12,-3]:[5,22,-3]);if(ds.noteImage)note.style.backgroundImage='url("'+ds.noteImage+'")';const ul=note.querySelector('ul'),have=[...ul.children].map(li=>li.dataset.t);
        [...ul.children].forEach(li=>st.feats.some(f=>f.t===li.dataset.t)||li.remove());st.feats.forEach(f=>{if(!have.includes(f.t)){const li=document.createElement('li');li.dataset.t=f.t;ul.append(li);typeOut(li,f.t)}})}
      else if(note)unpin(note);
      if(mailOn){bd.classList.toggle('sb-tall',!!st.sty&&innerWidth<768);let mp=bd.querySelector('.sb-pmail:not(.sb-out)');
        if(st.sty&&!mp&&!sent&&!mailT){mailT=setTimeout(()=>{mailT=0;if(!st.sty||sent||bd.querySelector('.sb-pmail:not(.sb-out)'))return;const bk=innerWidth>=768&&el.querySelector('.sb-book');mp=pin('mail','sb-pmail'+(ds.mailImage?' sb-mimg':''),(ds.mailImage?'<img class="sb-mbg" alt="" draggable="false" src="'+E(ds.mailImage)+'">':'')+'<div class="sb-mail-in"><b></b><p>'+E(ds.mailText||'and get a tailored quote based on your answers')+'</p><form class="sb-mail-f" novalidate><input type="email" required placeholder="'+E(ds.mailPlaceholder||'your email')+'" aria-label="Email address"><button type="submit">'+E(ds.mailButton||'send')+' →</button></form>'+(ds.mailExtras==='off'?'':'<div class="sb-mail-x"><button type="button" data-x="pinterest" data-ph="'+E(ds.pinterestPlaceholder||'pinterest board link')+'">'+E(ds.pinterestText||'send me your pinterest')+'</button><button type="button" data-x="website" data-ph="'+E(ds.websitePlaceholder||'your website')+'">'+E(ds.websiteText||'got an existing site?')+'</button></div>')+(ds.mailSkip==='on'?'<button type="button" class="sb-mail-skip">'+E(ds.unlockText||'or just show me ideas')+' ↓</button>':'')+'</div>',ds.mailImage?(bk?[-25,60,-2]:[-15,71,2]):(bk?[44,56,3]:[47,27,4]),0);const mp2=mp;if(window.ResizeObserver)new ResizeObserver(()=>mp2.style.setProperty('--u',mp2.offsetWidth/100+'px')).observe(mp2);mp2.style.setProperty('--u',mp2.offsetWidth/100+'px');setTimeout(()=>typeOut(mp2.querySelector('b'),ds.mailTitle||'Drop in your email'),500)},+(ds.mailDelay||4200))}
        else if(!st.sty){mailT&&clearTimeout(mailT);mailT=0;mp&&unpin(mp)}}
      if(pics){const keep=st.saved.map(p=>'m:'+p.img);bd.querySelectorAll('.sb-psave').forEach(p=>keep.includes(p.dataset.k)||unpin(p));
        st.saved.forEach((p,i)=>{if(!bd.querySelector('[data-k="'+CSS.escape('m:'+p.img)+'"]:not(.sb-out)'))pin('m:'+p.img,'sb-pimg sb-psave',img(p.img),SV[i%8]).style.zIndex=2+i})}
      const has=!!(st.ind||st.feats.length||st.sty);bd.classList.toggle('sb-has',has);const h=bd.querySelector('.sb-board-hint');if(h)h.textContent=innerWidth<768?(ds.boardHintMobile||'Drag and drop to reposition elements on your moodboard'):(ds.boardHint||'Drag and drop to reposition elements on your moodboard')};
    const dragOn=bd=>{let pd=null;
      bd.addEventListener('pointerdown',e=>{if(e.target.closest('input,button,a,form'))return;const p=e.target.closest('.sb-pin');if(!p||p.classList.contains('sb-out'))return;e.preventDefault();const pr=p.getBoundingClientRect();pd={p,dx:e.clientX-pr.left,dy:e.clientY-pr.top,r:bd.getBoundingClientRect()};p.style.zIndex=++zTop;p.style.animation='none';p.classList.add('sb-held');try{p.setPointerCapture(e.pointerId)}catch(x){}});
      bd.addEventListener('pointermove',e=>{if(!pd)return;const {p,r}=pd;p.style.left=(e.clientX-pd.dx-r.left)/r.width*100+'%';p.style.top=(e.clientY-pd.dy-r.top)/r.height*100+'%'});
      const up=()=>{if(pd){pd.p.classList.remove('sb-held');pd=null}};bd.addEventListener('pointerup',up);bd.addEventListener('pointercancel',up)};if(bd){dragOn(bd);dragOn(fxb)}

    let jigO=null;
    const choose=o=>{jigO=o;
      if(show){if(st.step===0)st.ind=o;else if(st.step===1){const i=st.feats.indexOf(o);i>-1?st.feats.splice(i,1):st.feats.push(o)}else if(o.pic){const i=st.saved.indexOf(o);i>-1?st.saved.splice(i,1):st.saved.push(o);st.sty=styleFrom()}else st.sty=o}
      else if(st.step===0){st.ind=o;$('.sb-kicker').textContent=o.t;$('.sb-h').textContent=pick(o.t,HEAD)||o.t}
      else if(st.step===1){const i=st.feats.indexOf(o);
        if(i>-1){st.feats.splice(i,1);const s=secs.querySelector('[data-f="'+CSS.escape(o.t)+'"]');s&&s.remove()}
        else{st.feats.push(o);const s=document.createElement('div');const u=imgFor(o);s.className='sb-sec'+(u?' sb-real':'');s.dataset.f=o.t;s.innerHTML=u?'<img src="'+u+'" alt="">':'<h5>'+o.t+'</h5>'+mock(o.t);secs.append(s);site.scrollTop=s.offsetTop-site.clientHeight*.25}}
      else{st.sty=o;const fx=fxFor(o),hs=o.img?[o.img]:fx.map(e=>e.img);heroImg(hs);swapImgs();site.className='sb-site'+(hs.length?' sb-has-hero':'')+(pick(o.t,STY)?' th-'+pick(o.t,STY):' th-'+['lux','min','edi','qui','max','col'][S.indexOf(o)%6]);site.scrollTop=0}
      boardSync();bump();render();if(board&&st.step===0)setTimeout(()=>{if(st.step===0&&st.ind===o){st.step=1;render()}},1100);const c=[...tray.children].find(b=>b.o===o);c&&c.classList.contains('sel')&&c.classList.add('sb-flash');
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
    /* signup blocks: in the builder's section, or in the section straight after it (a "signups" section that stays hidden) */
    const mySec=el.closest('section'),nextSec=mySec&&mySec.nextElementSibling;
    const sigIn=sec=>sec?[...sec.querySelectorAll('.sqs-block-newsletter,.sqs-block-form')].filter(b=>!el.contains(b)):[];
    const nextSigs=sigIn(nextSec),nextOnly=nextSec&&nextSigs.length&&[...nextSec.querySelectorAll('.fe-block')].every(f=>f.querySelector('.sqs-block-newsletter,.sqs-block-form'));
    const sigs=live?sigIn(mySec||document).concat(nextOnly?nextSigs:[]):[];
    if(live&&nextOnly)nextSec.style.display='none';
    const home=new Map(sigs.map(b=>[b,b.parentNode]));
    sigs.forEach(b=>{const fe=b.closest('.fe-block');if(fe)fe.style.display='none';else b.style.display='none'});
    /* hidden form blocks sitting lower in the grid leave empty rows (a gap under the result): trim the grid to the builder's own rows */
    const feB=el.closest('.fe-block'),grid=feB&&feB.parentElement;
    const trim=()=>{if(!grid||!sigs.length)return;grid.style.gridTemplateRows='';const n=parseInt(getComputedStyle(feB).gridRowEnd,10)-1,t=getComputedStyle(grid).gridTemplateRows.split(' ').length;
      if(n>0&&t>n&&[...grid.children].every(c=>c===feB||getComputedStyle(c).display==='none'||parseInt(getComputedStyle(c).gridRowEnd,10)<=n+1))grid.style.gridTemplateRows='repeat('+n+',minmax(0,auto))'};
    if(live){trim();addEventListener('resize',trim)}
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
    const finish=(quiet)=>{const r=summary(),P=$('.sb-profile');
      const who=st.ind.ex||((pick(st.ind.t,WHO)||'')+' '+(pick(st.ind.t,HELP)||'')).trim();
      const vibe=st.sty.ex||pick(st.sty.t,VIBE)||'';
      const fx=fxFor(st.sty).slice(0,+(ds.effectsMax||4));
      let n=0;const row=(h,t)=>t?'<li class="sbx-row sbx-r"><span class="sbx-n">0'+(++n)+'</span><h5>'+esc(h)+'</h5><p>'+t+'</p></li>':'';
      const chars=w=>[...w].map(c=>'<span class="sbx-c" style="--i:'+(k++)+'">'+esc(c)+'</span>').join('');let k=0;
      const ttl=(ds.profileTitle||'Your brief, *considered.*'),title=ttl.split(' ').map(w=>{const it=/^\*.*\*$/.test(w)||/^\*/.test(w)&&ttl.includes('*');return w}).join(' ').replace(/\*([^*]+)\*/g,(m,x)=>'\u0001'+x+'\u0002').split(' ').map(w=>{const em=w.includes('\u0001');w=w.replace(/[\u0001\u0002]/g,'');return '<span class="sbx-w">'+(em?'<em>'+chars(w)+'</em>':chars(w))+'</span>'}).join(' ');
      const no=String([...r.s].reduce((h,c)=>(h*31+c.charCodeAt(0))%997,7)).padStart(3,'0');
      const picks=[st.ind,...st.feats,st.sty].map(o=>esc(o.t)).join(' <i>✦</i> ')+' <i>✦</i> ';
      const cta=ds.ctaText||'Get a quote';
      const story=()=>{const h=+no,needs=st.feats.map(f=>f.ex||pick(f.t,NEED)).filter(Boolean),v=(vibe.split(': ')[1]||vibe).replace(/\.$/,'');
        const lead=['So here\'s where I\'d start: ','For you, I\'d bring together ','What I\'d build around that: '][h%3];
        const lv=v.charAt(0).toLowerCase()+v.slice(1),wrap=['All of it wrapped in '+lv,'And because you\'re drawn to <em>'+esc(st.sty.t.toLowerCase())+'</em>, I\'d style it with '+lv][h%2],list=needs.length>1?needs.slice(0,-1).join('; ')+'; and '+needs[needs.length-1]:needs[0];
        return esc(who)+' '+(needs.length?lead+list+'. '+wrap+'.':'');};
      const acc=()=>{const pain=st.ind.ex||pick(st.ind.t,PAIN)||"Your website is where people decide whether you're for them. A site that captures your personality, shows off your work and makes the next step feel easy helps the right people find you, remember you and choose you. It's where your business gets seen, properly.";
        const plan=pick(st.ind.t,PLAN)||"I'd build you a site that feels unmistakably yours: bold design, custom touches and a clear path from first impression to first enquiry. I've got your corner, so you shine, stand out and get recognised for exactly what makes you different.";
        const items=st.feats.map(f=>{const t=f.ex||pick(f.t,NEED);return t?'<li><h4>'+esc(f.t)+'</h4><p>'+esc(t.charAt(0).toUpperCase()+t.slice(1))+'.</p></li>':''}).join('');
        const v=(vibe.split(': ')[1]||vibe).replace(/\.$/,'');
        const sec=(h,b,open)=>'<details class="sbx-acc-i sbx-r"'+(open?' open':'')+'><summary><span class="sbx-n">0'+(++n)+'</span><h3>'+h+'</h3><i aria-hidden="true"></i></summary><div class="sbx-acc-b">'+b+'</div></details>';
        return '<div class="sbx-acc">'+sec(ds.businessTitle||'Where you are now','<p>'+esc(pain)+'</p>',true)+
          sec(ds.strategyTitle||'What I\'d suggest','<p>'+esc(plan)+'</p>',true)+'</div>'+(items?'<ul class="sbx-plan sbx-r" style="--n:'+Math.min(st.feats.length,4)+';--n2:'+Math.min(st.feats.length,2)+'">'+items+'</ul>':'')};
      P.innerHTML='<div class="sbx"><div class="sbx-glow"></div><div class="sbx-tick"><div>'+picks.repeat(6)+'</div></div><div class="sbx-in sqs-html-content">'+
        '<div class="sbx-top sbx-r"><small>'+(ds.profileCardKicker||'Website direction')+' · No. '+no+'</small><small>'+(ds.profileKicker||'Prepared by Kill Vanilla Studio')+'</small></div>'+
        '<h1 class="sbx-title">'+title+'</h1>'+
        '<p class="sbx-lede sbx-r">'+(ds.profileIntro||'Based on what you\'ve shared, here\'s how I\'d approach your website.')+'</p>'+
        acc()+
        (fx.length?'<div class="sbx-fxh sbx-r"><span class="sbx-n">0'+(++n)+'</span><h3>'+(ds.effectsText||'Design ideas')+'</h3><p>'+(ds.effectsIntro||'I design custom-coded special effects made exactly for your offering, so your site moves, surprises and feels like nothing else out there. Here are a few examples to spark some inspiration, but your site will always be completely unique to you.')+'</p></div><div class="sbx-fx">'+fx.map((e,i)=>'<a class="sbx-r" style="--d:'+i+'" href="'+e.url+'"><img src="'+e.img+'" alt="" loading="lazy"><span>'+esc(e.t)+' <b>→</b></span></a>').join('')+'</div>':'')+
        '<div class="sbx-cta sbx-r"><div><h2>'+(ds.brainstormTitle||'Every site I design is <em>completely bespoke.</em>')+'</h2><p>'+(ds.brainstormText||'No templates, no copy and paste. I use custom effects to showcase your work and help you stand out in a crowded feed, all built around how your clients actually find and book you. This profile is just the starting point.')+'</p>'+
        '</div>'+
        '<span class="sbx-badge" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="sbxc" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs><text><textPath href="#sbxc" textLength="496">'+(esc(cta).toUpperCase()+' ✦ ').repeat(cta.length<16?3:2)+'</textPath></text></svg><span>→</span></span></div>'+
        (ds.quoteForm==='off'?'':'<div class="sbx-quote sbx-r" hidden><h3>'+(ds.quoteTitle||'Get a quote <span>and/or</span> a free review of your current website')+'</h3><p>'+(ds.quoteText||'Pop your details in and I\'ll come back to you within 24 hours with a tailored quote, or honest, friendly feedback on the site you have now.')+'</p><div class="sb-form"></div></div>')+
        (ds.ideas!=='on'?'':'<div class="sbx-mailbox sbx-r"><h3>'+(ds.ideasTitle||'Not ready yet? <em>Get design ideas</em> in your inbox.')+'</h3><form class="sbp-mail" novalidate><label><input type="email" required placeholder="you@yourbusiness.com" aria-label="Email address"></label><button type="submit" aria-label="'+(ds.ideasButton||'Send me ideas')+'">'+(ds.ideasButton||'Send me ideas')+' <b>→</b></button><p class="sbp-ok" hidden>'+(ds.ideasThanks||'Lovely, ideas are on their way.')+'</p></form><div class="sb-form" hidden></div></div>')+
        (ds.foot!=='on'?'':'<div class="sbx-foot sbx-r">'+(ds.opinion==='off'?'':'<a href="'+(ds.opinionUrl||'/contact')+'">'+(ds.opinionText||'Want an opinion on your current site?')+'</a>')+
        (ds.pinterest?'<a href="'+ds.pinterest+'" target="_blank" rel="noopener">Pinterest</a>':'')+(ds.instagram?'<a href="'+ds.instagram+'" target="_blank" rel="noopener">Instagram</a>':'')+
        '<button class="sb-again" type="button">Start again ↺</button></div>')+'</div></div>';
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
      P.querySelectorAll('.sbx-r').forEach(x=>io.observe(x));setTimeout(()=>P.querySelector('.sbx').classList.add('go'),350);
      if(sent){const mb=P.querySelector('.sbx-mailbox');mb&&mb.remove()}form=P.querySelector('.sb-form');fb=form?grabForm(st.ind):null;if(fb){fill(fb,r.t+' | '+r.s);const qp=form.closest('.sbx-quote');qp&&(qp.hidden=false)}
      if(!sent&&(qb||mailOn))P.querySelectorAll('.sbx-btn').forEach(a=>a.addEventListener('click',e=>{const t=qb||bd.querySelector('.sb-pmail:not(.sb-out)');if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>{const i=t.querySelector('input');i&&i.focus({preventScroll:true})},600)}));
      const mf=P.querySelector('.sbp-mail');if(mf)mf.addEventListener('submit',e=>{e.preventDefault();const em=mf.querySelector('input');if(!em.checkValidity()){em.reportValidity();return}
        if(fb){const i=fb.querySelector('input[type=email],input[name=email]');if(i){const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,em.value);i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}
          const b=fb.querySelector('button[type=submit],input[type=submit],button');b&&b.click()}
        el.dispatchEvent(new CustomEvent('sitebuilder:email',{bubbles:true,detail:{email:em.value,profile:r}}));
        mf.querySelector('label').hidden=true;mf.querySelector('button').hidden=true;mf.querySelector('.sbp-ok').hidden=false});
      P.querySelector('.sb-again')?.addEventListener('click',again);
      try{sessionStorage.setItem('site-builder',JSON.stringify(r))}catch(x){}
      el.querySelectorAll('.sb-steps span').forEach(s=>{s.classList.remove('on');s.classList.add('done')});
      P.hidden=false;el.classList.add('sb-profiled');const cwp=el.closest('.content-wrapper');if(cwp&&ds.profileBleed!=='off')P.style.marginBottom='-'+getComputedStyle(cwp).paddingBottom;if(quiet!==true)requestAnimationFrame(()=>P.scrollIntoView({behavior:'smooth',block:'start'}));
      el.dispatchEvent(new CustomEvent('sitebuilder:done',{bubbles:true,detail:r}))};
    next.addEventListener('click',()=>{if(st.step<2){st.step++;render()}else if(board)location.href=ds.quoteUrl||ds.ctaUrl||'/contact';else finish()});unl.addEventListener('click',finish);
    back.addEventListener('click',()=>{if(st.step>0){st.step--;render()}});
    const sendQuote=(email,x)=>{x=x||{};const r=summary();if(x.pinterest)r.s+=' · Pinterest: '+x.pinterest;if(x.website)r.s+=' · Website: '+x.website;form=(qb&&qb.querySelector('.sb-form'))||$('.sb-mailform')||(()=>{const h=document.createElement('div');h.className='sb-mailform';h.hidden=true;el.append(h);return h})();fb=grabForm(st.ind);
      if(fb){fill(fb,r.t+' | '+r.s);fb.querySelectorAll('input,textarea').forEach(i=>{if(i.type==='email')return;const w=i.closest('.form-item,.field,fieldset,div'),lab=((w&&w.textContent)||'')+' '+(i.name||'')+' '+(i.placeholder||'');const v=/pinterest/i.test(lab)?x.pinterest:(/website|web site|url|current site/i.test(lab)&&!/builder|result/i.test(lab))?x.website:null;if(v){const set=Object.getOwnPropertyDescriptor(i.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set;set.call(i,v);i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}});const i=fb.querySelector('input[type=email],input[name=email]');if(i){const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,email);i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}const b=fb.querySelector('button[type=submit],input[type=submit],button');b&&b.click()}
      el.dispatchEvent(new CustomEvent('sitebuilder:email',{bubbles:true,detail:{email,profile:r,quote:true,pinterest:x.pinterest||'',website:x.website||''}}));sent=true};
    if(mailOn)bd.addEventListener('submit',e=>{const f=e.target.closest('.sb-mail-f');if(!f)return;e.preventDefault();const em=f.querySelector('input');if(!em.checkValidity()){em.reportValidity();return}
      const box=f.closest('.sb-mail-in'),xv={};box.querySelectorAll('.sb-mail-x input').forEach(i=>{if(i.value.trim())xv[i.dataset.x]=i.value.trim()});sendQuote(em.value,xv);box.innerHTML='<b></b><p>'+(ds.mailThanks||'opening your ideas…')+'</p>';typeOut(box.querySelector('b'),ds.mailDone||'On its way ✓');setTimeout(finish,1600)});
    if(mailOn)bd.addEventListener('click',e=>{if(e.target.closest('.sb-mail-skip'))return finish();const b=e.target.closest('.sb-mail-x button');if(b){const i=document.createElement('input');i.type=b.dataset.x==='website'?'url':'text';i.dataset.x=b.dataset.x;i.placeholder=b.dataset.ph;i.setAttribute('aria-label',b.textContent);b.replaceWith(i);i.focus()}});
    if(qb){const qf=qb.querySelector('.sbq-mail');qb.querySelector('.sbq-unlock').addEventListener('click',()=>finish());
      qf.addEventListener('submit',e=>{e.preventDefault();const em=qf.querySelector('input');if(!em.checkValidity()){em.reportValidity();return}
        sendQuote(em.value);qf.hidden=true;qb.querySelector('.sbq-unlock').hidden=true;qb.querySelector('.sbq-ok').hidden=false;setTimeout(finish,1400)})}
    if(tz&&window.IntersectionObserver)new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!tz.hidden&&st.sty&&$('.sb-profile').hidden)finish(true)}),{threshold:.6}).observe(tz);
    const again=()=>{const P=$('.sb-profile');P.style.marginBottom='';if(qb)qb.hidden=true;if(fb){const h=home.get(fb);h&&h.append(fb);fb=null}P.hidden=true;P.innerHTML='';el.classList.remove('sb-profiled','sb-done');st.step=0;st.ind=st.sty=null;st.feats=[];st.saved=[];render();if(bd){boardSync();ds.starters==='on'&&!bd.querySelector('.sb-pimg:not(.sb-out)')&&starters()}el.scrollIntoView({behavior:'smooth',block:'start'})};
    let starterImgs=[];const starters=()=>pinImgs(starterImgs);
    if(show)Promise.all((ds.showcase||'').split(',').map(u=>u.trim()).filter(Boolean).map(loadFx)).then(x=>{
      const imgs=(ds.effects==='off'?[]:FX.map(e=>e.img)).concat(...x.map(a=>a.map(e=>e.img)));
      if(ds.shuffle==='on')imgs.sort(()=>Math.random()-.5);
      if(bd){starterImgs=imgs.slice().sort(()=>Math.random()-.5);ds.starters==='on'&&starters()}else{site.classList.add('sb-show','sb-has-hero');heroImg(imgs)}});
    render();
  };
  const run=()=>document.querySelectorAll('.site-builder').forEach(init);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
  new MutationObserver(()=>document.querySelectorAll('.site-builder:not([data-sb-on])').length&&run()).observe(document.documentElement,{childList:true,subtree:true});
})();
