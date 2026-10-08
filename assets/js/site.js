(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var hoverable=window.matchMedia("(hover:hover)").matches;

/* ---------- Image fallback — a broken photo becomes a branded interior sketch ---------- */
var IMG_FALLBACK=(function(){
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">'
   +'<defs>'
   +'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8efe4"/><stop offset="1" stop-color="#e7d6bf"/></linearGradient>'
   +'<linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf4e6"/><stop offset="1" stop-color="#f0dcc0"/></linearGradient>'
   +'</defs>'
   +'<rect width="900" height="700" fill="url(#bg)"/>'
   +'<rect x="150" y="120" width="172" height="152" rx="8" fill="url(#win)" stroke="#c99a6a" stroke-width="4"/>'
   +'<line x1="236" y1="120" x2="236" y2="272" stroke="#c99a6a" stroke-width="4"/><line x1="150" y1="196" x2="322" y2="196" stroke="#c99a6a" stroke-width="4"/>'
   +'<ellipse cx="460" cy="582" rx="330" ry="52" fill="#e9d3b2" stroke="#c3673f" stroke-width="3" opacity="0.85"/>'
   +'<g stroke="#a24e2b" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">'
   +'<path d="M300 502 v-122 q0 -34 34 -34 h252 q34 0 34 34 v122 z" fill="#dcb489"/>'
   +'<path d="M282 502 v-76 q0 -24 24 -24 h308 q24 0 24 24 v76 z" fill="#e8caa2"/>'
   +'<path d="M340 404 q120 -26 240 0" fill="none"/>'
   +'<line x1="330" y1="502" x2="330" y2="550"/><line x1="590" y1="502" x2="590" y2="550"/>'
   +'</g>'
   +'<g stroke="#a24e2b" stroke-width="4" stroke-linecap="round"><path d="M706 502 v-160" fill="none"/><path d="M669 342 h74 l-17 -58 h-40 z" fill="#dcb489"/></g>'
   +'<g stroke="#6f8f6a" stroke-width="4" fill="none" stroke-linecap="round"><path d="M182 488 q-12 -86 12 -148 M194 488 q34 30 26 98 M198 400 q42 8 62 -18"/></g>'
   +'<rect x="160" y="486" width="52" height="24" rx="5" fill="#c3673f"/>'
   +'<text x="48" y="70" font-family="Georgia,serif" font-size="32" fill="#a24e2b">Art<tspan fill="#7a5a3f">Evos</tspan></text>'
   +'<text x="49" y="96" font-family="sans-serif" font-size="14" letter-spacing="3" fill="#a3907a">INTERIORS</text>'
   +'</svg>';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
})();
(function bindImgFallback(){
  $$("img").forEach(function(img){
    if(img.__fb)return; img.__fb=1;
    function fb(){ if(img.dataset.fb)return; img.dataset.fb="1"; img.src=IMG_FALLBACK; }
    if(img.complete && img.naturalWidth===0) fb();
    img.addEventListener("error",fb);
  });
})();

/* ---------- CONFIG ---------- */
/* ---------------------------------------------------------------
   THE ONLY TWO VALUES YOU NORMALLY NEED TO EDIT
     whatsapp : country code first, digits only, no + or spaces
     endpoint : your deployed Google Apps Script /exec URL
   --------------------------------------------------------------- */
var CONFIG={
  whatsapp:"917656850169",
  endpoint:""
};
window.AE_CONFIG=CONFIG;
window.AE_WA=CONFIG.whatsapp;

/* ---------- Preloader ---------- */
window.addEventListener("load",function(){
  setTimeout(function(){var p=$("#preload");if(p)p.classList.add("done");},550);
});

/* ---------- Scroll progress + nav + back-to-top ---------- */
var nav=$("#nav"),progress=$("#progress"),toTop=$("#toTop");
function onScroll(){
  var h=document.documentElement,st=h.scrollTop||document.body.scrollTop;
  var sh=h.scrollHeight-h.clientHeight;
  progress.style.width=(sh>0?(st/sh)*100:0)+"%";
  nav.classList.toggle("scrolled",st>40);
  toTop.classList.toggle("show",st>600);
}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
toTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});

/* ---------- Custom cursor ---------- */
if(hoverable){
  var cur=$("#cursor"),dot=$("#cursorDot"),cx=0,cy=0,tx=0,ty=0;
  window.addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;dot.style.left=tx+"px";dot.style.top=ty+"px";});
  (function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.left=cx+"px";cur.style.top=cy+"px";requestAnimationFrame(loop);})();
  document.addEventListener("mouseover",function(e){
    if(e.target.closest("a,button,[data-cursor],.chip,.opt-pill,.home-card,.tilt")) cur.classList.add("grow");
  });
  document.addEventListener("mouseout",function(e){
    if(e.target.closest("a,button,[data-cursor],.chip,.opt-pill,.home-card,.tilt")) cur.classList.remove("grow");
  });
}

/* ---------- Mobile menu ---------- */
var burger=$("#burger"),mm=$("#mobileMenu");
burger.addEventListener("click",function(){
  var open=burger.classList.toggle("open");mm.classList.toggle("open",open);
  burger.setAttribute("aria-expanded",open?"true":"false");
  burger.setAttribute("aria-label",open?"Close menu":"Open menu");
  mm.setAttribute("aria-hidden",open?"false":"true");
  document.body.classList.toggle("menu-open",open);
});
$$("#mobileMenu a").forEach(function(a){a.addEventListener("click",function(){
  burger.classList.remove("open");mm.classList.remove("open");document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded","false");burger.setAttribute("aria-label","Open menu");mm.setAttribute("aria-hidden","true");
});});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"&&mm.classList.contains("open")){burger.click();burger.focus();}
});
window.addEventListener("resize",function(){
  if(window.innerWidth>900&&mm.classList.contains("open")){burger.click();}
},{passive:true});

/* ---------- Reveal on scroll ---------- */
var io=new IntersectionObserver(function(en){
  en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
},{threshold:.14,rootMargin:"0px 0px -8% 0px"});
$$(".reveal").forEach(function(el){io.observe(el);});

/* ---------- Counters ---------- */
function animateCount(el){
  var target=parseFloat(el.getAttribute("data-count"))||0;
  var suffix=el.getAttribute("data-suffix")||"";
  var start=null,dur=1600;
  function step(ts){
    if(!start)start=ts;var p=Math.min((ts-start)/dur,1);
    var eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*eased)+suffix;
    if(p<1)requestAnimationFrame(step);else el.textContent=target+suffix;
  }
  requestAnimationFrame(step);
}
var co=new IntersectionObserver(function(en){
  en.forEach(function(e){if(e.isIntersecting){animateCount(e.target);co.unobserve(e.target);}});
},{threshold:.5});
$$("[data-count]").forEach(function(el){co.observe(el);});

/* ---------- Spatial 3D tilt (depth + lift toward viewer) ---------- */
if(hoverable&&!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
  $$(".tilt, .home-card, .pf-item").forEach(function(card){
    var max=card.classList.contains("pf-item")?6:(card.classList.contains("home-card")?7:9);
    var lift=card.classList.contains("home-card")?12:18;
    card.addEventListener("mousemove",function(e){
      var r=card.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      var rx=(py-.5)*-2*max, ry=(px-.5)*2*max;
      card.style.transform="perspective(950px) rotateX("+rx.toFixed(2)+"deg) rotateY("+ry.toFixed(2)+"deg) translateZ("+lift+"px)";
      card.style.setProperty("--mx",(px*100).toFixed(1)+"%");
      card.style.setProperty("--my",(py*100).toFixed(1)+"%");
    });
    card.addEventListener("mouseleave",function(){card.style.transform="";});
  });
}

/* ---------- Hero pointer parallax ---------- */
var hv=$("#heroVisual");
if(hv&&hoverable){
  var layers=$$("[data-depth]",hv);
  hv.addEventListener("mousemove",function(e){
    var r=hv.getBoundingClientRect();
    var dx=(e.clientX-r.left)/r.width-.5, dy=(e.clientY-r.top)/r.height-.5;
    layers.forEach(function(l){
      var d=parseFloat(l.getAttribute("data-depth"))||1;
      l.style.transform="translate("+(dx*d*10)+"px,"+(dy*d*10)+"px)";
    });
  });
  hv.addEventListener("mouseleave",function(){layers.forEach(function(l){l.style.transform="";});});
}

})();


/* ============================================================
   BOOKING ENGINE — only runs where the Design Brief exists
   ============================================================ */
(function(){
"use strict";
if(!document.getElementById("bookForm"))return;
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var CONFIG=window.AE_CONFIG||{whatsapp:"",endpoint:""};

var REQS={
  living:["TV / media unit","False ceiling","Accent wall","Ambient & mood lighting","Sofa & seating","Pooja niche","Swing / jhula","Wall paint / texture","Wallpaper","Curtains & drapes","Flooring upgrade","Display & decor units","Home theatre","Smart automation"],
  kitchen:["Modular cabinets","Countertop / granite","Chimney & hob","Tall / pantry unit","Backsplash tiles","Breakfast counter","Sink & fixtures","Under-cabinet lighting","Crockery unit","Water purifier nook"],
  bedroom:["Wardrobe","Bed with storage","False ceiling","Study / work desk","TV unit","Dressing unit","Wall paint / texture","Wallpaper","Bedside & lighting","Curtains","Loft storage"],
  master:["Walk-in wardrobe","Bed with storage","False ceiling","Dressing area","TV / feature wall","Lounge seating","Wall paint / texture","Wallpaper","Ambient lighting","Curtains","Ensuite styling"],
  bathroom:["Sanitaryware","Vanity unit","Tiles & flooring","Shower partition","Mirror & lighting","Storage niche","Geyser concealment","Fittings & fixtures"],
  dining:["Dining table & chairs","Crockery unit","Bar / mini-bar","Accent lighting","Wall decor / mirror","Wall paint / texture","Flooring"],
  pooja:["Pooja unit / mandir","Storage drawers","Accent lighting","Marble / wood finish","Jaali / carving"],
  balcony:["Deck flooring","Planters & greenery","Cosy seating","Railing & grille","Weatherproof lighting","Swing / hammock"],
  study:["Study desk","Bookshelves","Storage cabinets","Task lighting","Pin-up / soft board"],
  home_office:["Work desk","Storage & shelves","Video-call backdrop","Task lighting","Acoustic panels"],
  foyer:["Shoe rack / storage","Console & mirror","Statement wall","Accent lighting","Seating bench"],
  utility:["Washing machine nook","Storage racks","Utility sink","Drying area","Ironing counter"],
  stairs:["Railing design","Under-stair storage","Feature lighting","Wall gallery","Cladding / finish"],
  garden:["Landscaping","Outdoor seating","Pathway lighting","Water feature","Pergola / gazebo"],
  terrace:["Deck flooring","Pergola / gazebo","Outdoor lounge","Planters","Party lighting","BBQ counter"]
};
var CATLABEL={living:"Living & lounge",kitchen:"Cooking & storage",bedroom:"Bedroom",master:"Master suite",bathroom:"Bath & fittings",dining:"Dining",pooja:"Pooja / mandir",balcony:"Balcony",study:"Study",home_office:"Home office",foyer:"Entrance / foyer",utility:"Utility",stairs:"Staircase",garden:"Garden",terrace:"Terrace"};
function icon(cat){
  var p={
    living:'<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v6H3zM6 17v2M18 17v2"/>',
    kitchen:'<path d="M6 3v7M9 3v7a3 3 0 0 1-6 0M6 10v11M15 3c-1.5 2-1.5 5 0 7v11"/>',
    bedroom:'<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 14h18M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>',
    master:'<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 14h18M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>',
    bathroom:'<path d="M4 12V6a2 2 0 0 1 4 0M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM7 19l-1 2M18 19l1 2"/>',
    dining:'<path d="M3 3v18M3 8h4M5 3v5M17 3c-1 0-2 1-2 4s1 4 2 4 2-1 2-4-1-4-2-4zM17 11v10"/>',
    pooja:'<path d="M12 3s3 3 3 6a3 3 0 0 1-6 0c0-3 3-6 3-6zM6 21h12M8 21v-3h8v3"/>',
    balcony:'<path d="M3 21h18M5 21v-8h14v8M12 13V7M9 7h6M10 3h4v4h-4z"/>',
    study:'<path d="M4 19V5a1 1 0 0 1 1-1h13v16H5a1 1 0 0 1-1-1zM8 4v14"/>',
    home_office:'<path d="M3 21h18M4 21V10h16v11M8 10V6h8v4M11 14h2"/>',
    foyer:'<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M6 21h12M14 12h.5"/>',
    utility:'<path d="M4 3h16v18H4zM7 3v18M12 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>',
    stairs:'<path d="M3 20h4v-4h4v-4h4V8h4V4"/>',
    garden:'<path d="M12 22c0-6 3-9 6-10-3-1-6 0-6 4 0-4-3-5-6-4 3 1 6 4 6 10zM12 22v-4"/>',
    terrace:'<path d="M3 21h18M5 21v-7h14v7M4 14l8-5 8 5M9 21v-4h6v4"/>'
  }[cat]||'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">'+p+'</svg>';
}
var HOMES={
  "1bhk":[["Living Room","living",1],["Kitchen","kitchen",1],["Bedroom","bedroom",1],["Bathroom","bathroom",1],["Balcony","balcony",0],["Foyer","foyer",0]],
  "2bhk":[["Living Room","living",1],["Kitchen","kitchen",1],["Master Bedroom","master",1],["Second Bedroom","bedroom",1],["Bathrooms","bathroom",1],["Dining","dining",0],["Balcony","balcony",0],["Pooja Room","pooja",0]],
  "3bhk":[["Living Room","living",1],["Kitchen","kitchen",1],["Master Bedroom","master",1],["Bedroom 2","bedroom",1],["Bedroom 3","bedroom",1],["Bathrooms","bathroom",1],["Dining","dining",1],["Pooja Room","pooja",0],["Balcony","balcony",0],["Study","study",0]],
  "4bhk":[["Living Room","living",1],["Kitchen","kitchen",1],["Master Bedroom","master",1],["Bedroom 2","bedroom",1],["Bedroom 3","bedroom",1],["Bedroom 4 / Guest","bedroom",1],["Bathrooms","bathroom",1],["Dining","dining",1],["Pooja Room","pooja",0],["Study","study",0],["Balcony","balcony",0],["Utility","utility",0]],
  "duplex":[["Living (double-height)","living",1],["Kitchen","kitchen",1],["Dining","dining",1],["Master Bedroom","master",1],["Bedroom 2","bedroom",1],["Bedroom 3","bedroom",0],["Bathrooms","bathroom",1],["Staircase","stairs",1],["Upper Family Lounge","living",0],["Pooja Room","pooja",0],["Home Office","home_office",0],["Balcony","balcony",0]],
  "villa":[["Living Room","living",1],["Kitchen","kitchen",1],["Dining","dining",1],["Master Suite","master",1],["Bedroom 2","bedroom",1],["Bedroom 3","bedroom",1],["Bathrooms","bathroom",1],["Foyer / Entrance","foyer",1],["Staircase","stairs",0],["Pooja Room","pooja",0],["Study / Library","study",0],["Home Theatre","living",0],["Garden / Landscape","garden",0],["Terrace","terrace",0],["Utility","utility",0]],
  "penthouse":[["Living & Lounge","living",1],["Modular Kitchen","kitchen",1],["Dining","dining",1],["Master Suite","master",1],["Bedroom 2","bedroom",1],["Bathrooms","bathroom",1],["Private Terrace","terrace",1],["Bar / Entertainment","dining",0],["Home Office","home_office",0],["Pooja Room","pooja",0],["Powder Room","bathroom",0]],
  "studio":[["Studio Living + Sleeping","living",1],["Kitchenette","kitchen",1],["Bathroom","bathroom",1],["Storage & Wardrobe","bedroom",1],["Work Nook","home_office",0],["Balcony","balcony",0]],
  "custom":[["Living Room","living",1],["Kitchen","kitchen",1],["Master Bedroom","master",1],["Bedroom 2","bedroom",0],["Bedroom 3","bedroom",0],["Bathrooms","bathroom",1],["Dining","dining",0],["Pooja Room","pooja",0],["Study / Office","study",0],["Balcony","balcony",0],["Utility","utility",0],["Foyer / Entrance","foyer",0]]
};

var state={step:1,type:"",typeKey:"",styles:[],budget:"",scope:"",timeline:"",completeHome:false};
var formStartedAt=Date.now(),lastSubmissionAt=0;
var totalSteps=5;
var TITLES={1:"Choose your home",2:"Select your spaces",3:"Style & scope",4:"Your details",5:"Review & submit"};
var NEXTMSG={1:"Continue → choose your rooms",2:"Continue → style & budget",3:"Continue → your details",4:"Continue → review your brief",5:"Submit your brief ✦"};

var panels=$$(".step-panel"),dots=$$(".step-dot"),stepCounter=$("#stepCounter"),
    btnBack=$("#btnBack"),btnNext=$("#btnNext"),bookHint=$("#bookHint"),bookNav=$("#bookNav"),
    roomsStack=$("#roomsStack"),summaryEl=$("#summary"),form=$("#bookForm"),bookSuccess=$("#bookSuccess");
var bookAlert=$("#bookAlert");
var bookShell=document.querySelector(".book-shell");
var btnNextTop=$("#btnNextTop"),btnBackTop=$("#btnBackTop"),bookTopNav=$("#bookTopNav");

/* Home type selection */
$$("#homeGrid .home-card").forEach(function(card){
  card.addEventListener("click",function(){
    $$("#homeGrid .home-card").forEach(function(c){c.classList.remove("sel");});
    card.classList.add("sel");
    state.type=card.getAttribute("data-type");
    state.typeKey=card.getAttribute("data-key");
    $("#roomsForType").textContent=(state.typeKey==="custom")?"your custom home — toggle the spaces you have":"a "+state.type;
    buildRooms(state.typeKey);
    setHint("ok","Great choice — "+state.type+" selected.");
    hideAlert();btnNext.classList.add("ready");
  });
});

/* Build rooms */
function buildRooms(key){
  var rooms=HOMES[key]||[];
  roomsStack.innerHTML=rooms.map(function(r){
    var name=r[0],cat=r[1],on=r[2];
    var chips=(REQS[cat]||[]).map(function(q){return '<span class="chip" data-q="'+q+'">'+q+'</span>';}).join("");
    return '<div class="room-block'+(on?" on":"")+'" data-room="'+name+'" data-cat="'+cat+'">'+
      '<div class="room-top"><div class="rt-ico">'+icon(cat)+'</div>'+
      '<div><div class="rt-name">'+name+'</div><div class="rt-sub">'+CATLABEL[cat]+'</div></div>'+
      '<div class="room-toggle" role="switch"></div></div>'+
      '<div class="room-reqs"><div class="room-reqs-inner">'+chips+'</div></div></div>';
  }).join("");
  $$(".room-block",roomsStack).forEach(function(block){
    block.querySelector(".room-top").addEventListener("click",function(){
      block.classList.toggle("on");updateRoomSub(block);syncCompleteHome();
      if(state.step===2)validateStep(2,true);
    });
    $$(".chip",block).forEach(function(chip){
      chip.addEventListener("click",function(e){
        e.stopPropagation();chip.classList.toggle("on");
        if(!block.classList.contains("on")){block.classList.add("on");}
        updateRoomSub(block);syncCompleteHome();
      });
    });
  });
  syncCompleteHome();
}
function updateRoomSub(block){
  var sel=$$(".chip.on",block).length;var sub=block.querySelector(".rt-sub");
  var cat=block.getAttribute("data-cat");
  sub.textContent = sel>0 ? (sel+" selected") : (block.classList.contains("on")?"Tap what you'd like done":CATLABEL[cat]);
  sub.style.color = sel>0 ? "var(--gold)" : "var(--muted)";
}

/* Complete-home master toggle — selects every room at once */
var completeHome=$("#completeHome");
if(completeHome){
  completeHome.querySelector(".room-top").addEventListener("click",function(){
    var on=!completeHome.classList.contains("on");
    $$(".room-block",roomsStack).forEach(function(b){b.classList.toggle("on",on);updateRoomSub(b);});
    if(on)selectScopeFullHome();
    syncCompleteHome();
    if(state.step===2)validateStep(2,true);
  });
}
function syncCompleteHome(){
  if(!completeHome)return;
  var blocks=$$(".room-block",roomsStack);
  var allOn=blocks.length>0&&blocks.every(function(b){return b.classList.contains("on");});
  completeHome.classList.toggle("on",allOn);state.completeHome=allOn;
  var sub=completeHome.querySelector(".rt-sub");
  if(sub)sub.textContent=allOn?"All rooms selected — turnkey":"Turnkey — select every room in one tap";
}
function selectScopeFullHome(){
  var grid=$("#scopeGrid");if(!grid)return;
  $$(".opt-pill",grid).forEach(function(p){p.classList.toggle("sel",p.getAttribute("data-val")==="Full home");});
  state.scope="Full home";
}

/* Option pill groups */
function pillGroup(id,single,onchange){
  var grid=$("#"+id);if(!grid)return;
  $$(".opt-pill",grid).forEach(function(p){
    p.addEventListener("click",function(){
      if(single){$$(".opt-pill",grid).forEach(function(x){x.classList.remove("sel");});p.classList.add("sel");}
      else{p.classList.toggle("sel");}
      onchange();
    });
  });
}
pillGroup("styleGrid",false,function(){state.styles=$$("#styleGrid .opt-pill.sel").map(function(p){return p.getAttribute("data-val");});});
pillGroup("budgetGrid",true,function(){var s=$("#budgetGrid .opt-pill.sel");state.budget=s?s.getAttribute("data-val"):"";validateStep(3,true);});
pillGroup("scopeGrid",true,function(){var s=$("#scopeGrid .opt-pill.sel");state.scope=s?s.getAttribute("data-val"):"";validateStep(3,true);});
pillGroup("timeGrid",true,function(){var s=$("#timeGrid .opt-pill.sel");state.timeline=s?s.getAttribute("data-val"):"";validateStep(3,true);});

/* Hint helper */
function setHint(kind,msg){
  var color=kind==="ok"?"var(--sage)":kind==="err"?"var(--clay)":"var(--muted)";
  bookHint.style.color=color;
  bookHint.querySelector("span").textContent=msg;
}

/* Collect selected rooms */
function collectRooms(){
  return $$(".room-block.on",roomsStack).map(function(b){
    return {name:b.getAttribute("data-room"),reqs:$$(".chip.on",b).map(function(c){return c.getAttribute("data-q");})};
  });
}

/* Validation per step (soft=just refresh hint, no scroll) */
function validateStep(step,soft){
  var ok=true,err="";
  if(step===1){ ok=!!state.type; err="Please pick your home type to continue — tap one of the cards above."; }
  else if(step===2){ var on=$$(".room-block.on",roomsStack).length; ok=on>0; err="Turn on at least one room you'd like us to design."; }
  else if(step===3){
    /* Step 3 is optional on purpose — it never blocks the visitor. */
    var missing=[];
    if(!state.budget)missing.push("budget");
    if(!state.scope)missing.push("project scope");
    if(!state.timeline)missing.push("timeline");
    setHint("muted", missing.length
      ? "All optional — skip "+missing.join(", ")+" if you're not sure, and continue."
      : NEXTMSG[3]);
    btnNext.classList.add("ready");
    if(btnNextTop)btnNextTop.classList.add("ready");
    hideAlert();
    return true;
  }
  else if(step===4){
    var f=requiredFields(),bad=f.filter(function(x){return !x.valid;});
    ok=bad.length===0;
    if(!soft){f.forEach(function(x){x.el.style.borderColor=x.valid?"":"var(--clay)";});}
    err="Please add your "+bad.map(function(x){return x.label;}).join(" & ")+".";
  }
  else if(step===5){
    ok=$("#privacyAccepted").checked&&$("#contactConsent").checked;
    err="Please accept the privacy policy and contact permission to submit.";
  }
  setHint(ok?"ok":"muted", ok?NEXTMSG[step]:err);
  btnNext.classList.toggle("ready",ok);
  if(btnNextTop)btnNextTop.classList.toggle("ready",ok);
  if(ok)hideAlert();
  return ok;
}
/* Name, phone, city and property address are required. Email is optional. */
function requiredFields(){
  var name=$("#name"),phone=$("#phone"),email=$("#email"),city=$("#city"),address=$("#address");
  var ev=email.value.trim();
  var em=ev===""||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ev);
  var ph=/^[6-9][0-9]{9}$/.test(phone.value.trim());
  phone.setCustomValidity(ph?"":"Enter exactly 10 digits.");
  email.setCustomValidity(em?"":"Enter a valid email address, or leave it blank.");
  return [
    {el:name,valid:name.value.trim().length>1,label:"name"},
    {el:phone,valid:ph,label:"a valid Indian mobile number"},
    /* City and address are asked for, but never block the enquiry. */
    {el:city,valid:true,label:"city"},
    {el:address,valid:true,label:"property address"},
    {el:email,valid:em,label:"a valid email address, or leave it blank"}
  ];
}
/* prominent, scroll-into-view alert when a step is blocked */
function showBlocked(step){
  var msg;
  if(step===1)msg="Please pick your home type — tap one of the cards above to continue.";
  else if(step===2)msg="Turn on at least one room you'd like us to design.";
  else if(step===4){
    var bad=requiredFields().filter(function(x){return !x.valid;});
    msg="Please add your "+bad.map(function(x){return x.label;}).join(" & ")+" so we can send your design plan.";
  } else { msg="Please complete this step to continue."; }
  bookAlert.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg><span>'+msg+'</span>';
  bookAlert.classList.add("show");
  if(step===4){
    var first=requiredFields().filter(function(x){return !x.valid;})[0];
    if(first){first.el.scrollIntoView({behavior:"smooth",block:"center"});try{first.el.focus({preventScroll:true});}catch(e){}return;}
  }
  bookAlert.scrollIntoView({behavior:"smooth",block:"center"});
}
function hideAlert(){bookAlert.classList.remove("show");}
["#name","#phone","#email","#city","#address"].forEach(function(sel){
  var el=$(sel);el.addEventListener("input",function(){
    if(el.id==="phone")el.value=el.value.replace(/[^0-9]/g,"").slice(0,10);
    el.style.borderColor="";
    if(el.id==="phone"||el.id==="email"){
      var result=requiredFields().filter(function(x){return x.el===el;})[0];
      if(el.value.trim()&&!result.valid)el.style.borderColor="var(--clay)";
    }
    if(state.step===4)validateStep(4,true);
  });
});
["#privacyAccepted","#contactConsent"].forEach(function(sel){
  $(sel).addEventListener("change",function(){if(state.step===5)validateStep(5,true);});
});

/* Render step */
function render(){
  hideAlert();
  if(bookShell){bookShell.scrollLeft=0;}
  panels.forEach(function(p){p.classList.toggle("active",+p.getAttribute("data-panel")===state.step);});
  dots.forEach(function(d){var s=+d.getAttribute("data-s");d.classList.toggle("active",s===state.step);d.classList.toggle("done",s<state.step);});
  stepCounter.textContent="Step "+state.step+" of "+totalSteps+" · "+TITLES[state.step];
  btnBack.style.visibility=state.step>1?"visible":"hidden";
  btnNext.innerHTML=state.step===totalSteps
    ? 'Submit Request <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="width:16px;height:16px"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>'
    : 'Continue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="width:16px;height:16px"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
  if(btnNextTop)btnNextTop.innerHTML=btnNext.innerHTML;
  if(btnBackTop)btnBackTop.style.visibility=state.step>1?"visible":"hidden";
  if(state.step===5)buildSummary();
  validateStep(state.step,true);
}

/* Summary */
function escapeHTML(value){
  var chars={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
  return String(value).replace(/[&<>"']/g,function(ch){return chars[ch];});
}
function buildSummary(){
  var rooms=collectRooms();
  var roomHtml=rooms.length?rooms.map(function(r){
    return '<div class="sum-room"><b>'+escapeHTML(r.name)+'</b><span>'+escapeHTML(r.reqs.length?r.reqs.join(" · "):"Full design")+'</span></div>';
  }).join(""):'<span style="color:var(--muted)">No rooms selected</span>';
  var g=[
    ["Home type",state.type||"—"],
    ["Carpet area",$("#carpetArea").value||"Not specified"],
    ["Budget",state.budget||"To discuss"],
    ["Scope",state.scope||"To discuss"],
    ["Timeline",state.timeline||"To discuss"],
    ["Style",state.styles.length?state.styles.join(", "):"Designer to advise"]
  ];
  var extra=$("#extra").value.trim();
  var html=g.map(function(x){return '<div class="sum-item"><div class="k">'+escapeHTML(x[0])+'</div><div class="v">'+escapeHTML(x[1])+'</div></div>';}).join("");
  html+='<div class="sum-item wide"><div class="k">Spaces & requirements</div><div class="sum-rooms">'+roomHtml+'</div></div>';
  if(extra)html+='<div class="sum-item wide"><div class="k">Special requests</div><div class="v">'+escapeHTML(extra)+'</div></div>';
  html+='<div class="sum-item"><div class="k">Name</div><div class="v">'+escapeHTML($("#name").value||"—")+'</div></div>';
  html+='<div class="sum-item"><div class="k">Contact</div><div class="v">'+escapeHTML($("#phone").value?"+91 "+$("#phone").value:"—")+' · '+escapeHTML($("#email").value||"—")+'</div></div>';
  summaryEl.innerHTML=html;
}

/* Build WhatsApp / payload */
function buildBrief(){
  var rooms=collectRooms();
  var lines=["*New ArtEvos Design Brief*","","🏠 Home: "+state.type,"📐 Area: "+($("#carpetArea").value||"—"),
    "💰 Budget: "+state.budget,"🛠 Scope: "+state.scope,"⏱ Timeline: "+state.timeline,
    "🎨 Style: "+(state.styles.join(", ")||"Designer to advise"),"","*Spaces & requirements:*"];
  rooms.forEach(function(r){lines.push("• "+r.name+": "+(r.reqs.join(", ")||"Full design"));});
  var extra=$("#extra").value.trim();if(extra)lines.push("","📝 Notes: "+extra);
  lines.push("","👤 "+$("#name").value,"📞 +91 "+$("#phone").value,"✉️ "+$("#email").value,
    "📍 "+$("#city").value+($("#address").value?", "+$("#address").value:""),
    "🗓 Preferred: "+($("#date").value||"any")+" "+($("#time").value||""));
  return lines.join("\n");
}

/* Navigation */
btnNext.addEventListener("click",function(){
  if(!validateStep(state.step,false)){showBlocked(state.step);shake(bookNav);return;}
  hideAlert();
  if(state.step===totalSteps){submitBrief();return;}
  state.step++;render();scrollBook();
});
btnBack.addEventListener("click",function(){if(state.step>1){state.step--;render();scrollBook();}});
if(btnNextTop)btnNextTop.addEventListener("click",function(){btnNext.click();});
if(btnBackTop)btnBackTop.addEventListener("click",function(){btnBack.click();});
dots.forEach(function(d){d.addEventListener("click",function(){
  var s=+d.getAttribute("data-s");
  if(s<state.step){state.step=s;render();scrollBook();}
});});
window.__aeSetBookingStep=function(step){state.step=Math.max(1,Math.min(totalSteps,Number(step)||1));render();};
window.__aeGetBookingStep=function(){return state.step;};
function scrollBook(){var y=$("#booking").getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:y,behavior:"smooth"});}
function shake(el){el.animate([{transform:"translateX(0)"},{transform:"translateX(-7px)"},{transform:"translateX(7px)"},{transform:"translateX(0)"}],{duration:300});}

/* Submit */
var submissionInProgress=false;
function blockSpam(message){
  bookAlert.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg><span>'+escapeHTML(message)+'</span>';
  bookAlert.classList.add("show");
  bookAlert.scrollIntoView({behavior:"smooth",block:"center"});
}
function clientSubmissionId(){
  try{return crypto.randomUUID();}catch(e){return "web-"+Date.now()+"-"+Math.random().toString(36).slice(2);}
}
var formSubmissionId=clientSubmissionId();
function campaignData(){
  var query=new URLSearchParams(location.search);
  return {source:(query.get("utm_source")||"").slice(0,100),medium:(query.get("utm_medium")||"").slice(0,100),campaign:(query.get("utm_campaign")||"").slice(0,150)};
}
function showSubmissionSuccess(leadId){
  if(leadId){$("#leadReference").textContent="Reference: "+leadId;$("#leadReference").classList.add("show");}
  panels.forEach(function(p){p.classList.remove("active");});
  bookNav.style.display="none";
  if(bookTopNav)bookTopNav.style.display="none";
  $(".stepper").style.opacity=".4";
  stepCounter.textContent="Brief submitted · Thank you";
  dots.forEach(function(d){d.classList.add("done");d.classList.remove("active");});
  bookSuccess.classList.add("show");
  scrollBook();
}
async function submitBrief(){
  if(submissionInProgress)return;
  var now=Date.now();
  if($("#companyWebsite").value.trim())return;
  if(now-formStartedAt<3000){blockSpam("Please take a moment to review your details before submitting.");return;}
  var storedLast=0;
  try{storedLast=parseInt(localStorage.getItem("artevos_last_submission")||"0",10)||0;}catch(e){}
  var mostRecent=Math.max(lastSubmissionAt,storedLast);
  if(now-mostRecent<120000){blockSpam("Your request was already received. Please wait two minutes before trying again.");return;}
  var safeEndpoint="";
  if(CONFIG.endpoint){
    try{var endpointUrl=new URL(CONFIG.endpoint,location.href);if(endpointUrl.protocol==="https:")safeEndpoint=endpointUrl.href;}catch(e){}
  }
  if(!safeEndpoint){
    blockSpam("Online submission is being configured. Please send your brief through WhatsApp for now.");
    $("#waLink").setAttribute("href","https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(buildBrief()));
    return;
  }
  submissionInProgress=true;
  btnNext.disabled=true;
  if(btnNextTop)btnNextTop.disabled=true;
  var originalButton=btnNext.innerHTML;
  btnNext.textContent="Sending securely…";
  if(btnNextTop)btnNextTop.textContent="Sending securely…";
  var brief=buildBrief();
  var wa="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(brief);
  $("#waLink").setAttribute("href",wa);
  $("#successName").textContent=$("#name").value||"friend";
  var payload={homeType:state.type,area:$("#carpetArea").value,budget:state.budget,scope:state.scope,
    timeline:state.timeline,styles:state.styles,rooms:collectRooms(),notes:$("#extra").value,
    name:$("#name").value,phone:"+91"+$("#phone").value,email:$("#email").value,city:$("#city").value,
    address:$("#address").value,preferredDate:$("#date").value,preferredTime:$("#time").value,
    privacyAccepted:$("#privacyAccepted").checked,contactConsent:$("#contactConsent").checked,
    website:$("#companyWebsite").value,startedAt:formStartedAt,clientSubmissionId:formSubmissionId,
    source:"Website",utm:campaignData()};
  try{
    var controller=typeof AbortController!=="undefined"?new AbortController():null;
    var requestTimeout=controller?setTimeout(function(){controller.abort();},20000):null;
    var response=await fetch(safeEndpoint,{method:"POST",credentials:"omit",referrerPolicy:"strict-origin-when-cross-origin",
      headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload),signal:controller?controller.signal:undefined});
    if(requestTimeout)clearTimeout(requestTimeout);
    if(!response.ok)throw new Error("HTTP "+response.status);
    var result=await response.json();
    if(!result||result.ok!==true)throw new Error(result&&result.message?result.message:"Submission rejected");
    lastSubmissionAt=now;
    try{localStorage.setItem("artevos_last_submission",String(now));localStorage.setItem("artevos_last_lead_id",result.leadId||"");}catch(e){}
    showSubmissionSuccess(result.leadId||"");
  }catch(error){
    if(typeof requestTimeout!=="undefined"&&requestTimeout)clearTimeout(requestTimeout);
    submissionInProgress=false;
    btnNext.disabled=false;
    if(btnNextTop)btnNextTop.disabled=false;
    btnNext.innerHTML=originalButton;
    if(btnNextTop)btnNextTop.innerHTML=originalButton;
    blockSpam("We couldn't save your brief right now. Please retry, or use WhatsApp for an immediate response.");
  }
}

/* expose a Back handler for the mobile back-button guard */
window.__aeBookingBack=function(){
  try{
    if(bookSuccess.classList.contains("show"))return false;
    var r=document.getElementById("booking").getBoundingClientRect();
    var mid=window.innerHeight*0.5;
    if(r.top<mid&&r.bottom>mid&&state.step>1){state.step--;render();scrollBook();return true;}
  }catch(e){}
  return false;
};
render();

})();


/* ============================================================
   SERVICE MODAL + INSTANT ESTIMATOR — home page only
   ============================================================ */
(function(){
  var $=function(s,c){return (c||document).querySelector(s);};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
  var WA=window.AE_WA||"";
  if(!document.getElementById("serviceModal")&&!document.getElementById("estFigure"))return;

  /* ---- Design service detail modal ---- */
  var SERVICE_DATA={
    residential:{title:"Residential Interiors",kicker:"Complete home design",image:"/assets/img/living-room-modern-indian-apartment-768.webp",alt:"Warm contemporary Indian living room",description:"A cohesive interior planned around how your family cooks, hosts, works, prays and rests. We design every room as part of one connected home while giving each space its own character.",items:["Space planning & furniture layouts","Living, dining and bedroom design","Material, colour and finish selection","Custom furniture and feature walls","Vastu-conscious planning where requested","Execution-ready drawings"],meta:["Best for: Apartments, duplexes & villas","Typical design: 3–6 weeks"]},
    kitchens:{title:"Modular Kitchens",kicker:"Designed around your cooking",image:"/assets/img/modular-kitchen-olive-green-l-shaped-768.webp",alt:"Realistic olive and wood modular kitchen",description:"A practical kitchen engineered for Indian cooking, daily cleaning and long-term durability. Every cabinet, appliance and work zone is positioned to reduce effort and maximise useful storage.",items:["Workflow and ergonomic planning","Base, wall and tall-unit storage","Hardware and shutter selection","Countertop and backsplash guidance","Appliance integration","Lighting and electrical plan"],meta:["Best for: New & remodelled kitchens","Typical execution: 4–7 weeks"]},
    storage:{title:"Wardrobes & Storage",kicker:"Make every inch work",image:"/assets/img/bedroom-teak-cane-indian-apartment-768.webp",alt:"Bedroom with full-height built-in wardrobe",description:"Tailored wardrobes and built-ins that organise real belongings without making rooms feel heavy. Internal layouts are customised for your clothes, accessories, luggage and everyday routines.",items:["Floor-to-ceiling wardrobes","Lofts, dressers and bedside storage","Walk-in wardrobe planning","Internal drawers and accessories","Study, TV and display units","Space-saving storage solutions"],meta:["Best for: Bedrooms & compact homes","Typical execution: 3–6 weeks"]},
    lighting:{title:"False Ceiling & Lighting",kicker:"Atmosphere with purpose",image:"/assets/img/contemporary-luxe-living-room-marble-tv-unit-768.webp",alt:"Contemporary living room with layered lighting",description:"A balanced lighting scheme that makes rooms comfortable, functional and visually richer after sunset—without overcomplicated ceilings or unnecessary fixtures.",items:["Ambient, task and accent layers","False-ceiling concept and detailing","Fixture and colour-temperature plan","Cove, profile and decorative lighting","Switching and electrical coordination","Room-wise lighting schedule"],meta:["Best for: Full homes & key rooms","Planning: 1–3 weeks"]},
    turnkey:{title:"Turnkey Projects",kicker:"One team, move-in ready",image:"/assets/img/dining-room-teak-with-pooja-niche-768.webp",alt:"Completed warm Indian dining interior",description:"We manage the complete journey from approved design to final styling. One accountable team coordinates civil work, carpentry, vendors, installation and quality checks until your home is ready.",items:["Design and detailed budgeting","Civil, electrical and plumbing work","Factory and on-site carpentry","Painting, finishes and installation","Vendor and timeline coordination","Final styling and handover"],meta:["Best for: Complete renovations","Typical project: 8–16 weeks"]},
    visualisation:{title:"3D Visualisation",kicker:"See it before we build it",image:"/assets/img/minimal-living-room-warm-neutrals-768.webp",alt:"Photoreal visual reference for a modern interior",description:"Explore a photoreal version of your proposed home before execution begins. This lets you compare layouts, materials and colours early—when changes are easier and less expensive.",items:["Room-wise 3D views","Material and colour previews","Furniture scale and placement","Lighting mood visualisation","Two guided revision rounds","Approved visual design package"],meta:["Best for: Confident design decisions","Typical delivery: 7–14 days"]}
  };
  var serviceModal=$("#serviceModal"),serviceDialog=serviceModal?$(".service-dialog",serviceModal):null,lastServiceTrigger=null;
  function openService(key,trigger){
    var d=SERVICE_DATA[key];if(!d||!serviceModal)return;
    serviceModal.dataset.service=key;
    lastServiceTrigger=trigger||null;
    $("#serviceTitle").textContent=d.title;$("#serviceKicker").textContent=d.kicker;$("#serviceDescription").textContent=d.description;
    var img=$("#serviceImage");img.src=d.image;img.alt=d.alt;
    $("#serviceList").innerHTML=d.items.map(function(x){return "<li>"+x+"</li>";}).join("");
    $("#serviceMeta").innerHTML=d.meta.map(function(x){return "<span>"+x+"</span>";}).join("");
    serviceModal.classList.add("open");serviceModal.setAttribute("aria-hidden","false");document.body.classList.add("service-open");
    setTimeout(function(){serviceDialog.focus();},30);
  }
  function closeService(){
    if(!serviceModal)return;serviceModal.classList.remove("open");serviceModal.setAttribute("aria-hidden","true");document.body.classList.remove("service-open");
    if(lastServiceTrigger){lastServiceTrigger.focus();lastServiceTrigger=null;}
  }
  window.__aeRestoreService=function(key){if(key)openService(key);else closeService();};
  $$(".svc-link").forEach(function(btn){btn.addEventListener("click",function(){openService(btn.getAttribute("data-service"),btn);});});
  $$('[data-service-close]').forEach(function(el){el.addEventListener("click",closeService);});
  var serviceBook=$("#serviceBook");if(serviceBook)serviceBook.addEventListener("click",closeService);
  document.addEventListener("keydown",function(e){
    if(!serviceModal||!serviceModal.classList.contains("open"))return;
    if(e.key==="Escape"){e.preventDefault();closeService();return;}
    if(e.key==="Tab"){
      var focusable=$$('a[href],button:not([disabled])',serviceDialog).filter(function(el){return el.offsetParent!==null;});
      if(!focusable.length)return;var first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });

  if(document.getElementById("estFigure")){

  /* ---- Instant budget estimator (indicative ₹ Lakh, turnkey) ---- */
  var EST={
    "1bhk":{label:"1 BHK",area:"~450–650 sq.ft",essential:[2.5,4],premium:[4,7],luxury:[7,11]},
    "2bhk":{label:"2 BHK",area:"~750–1,050 sq.ft",essential:[4,7],premium:[7,12],luxury:[12,19]},
    "3bhk":{label:"3 BHK",area:"~1,150–1,500 sq.ft",essential:[7,11],premium:[11,19],luxury:[19,31]},
    "4bhk":{label:"4 BHK",area:"~1,600–2,100 sq.ft",essential:[11,17],premium:[17,27],luxury:[27,44]},
    "duplex":{label:"Duplex",area:"~1,800–2,600 sq.ft",essential:[14,21],premium:[21,34],luxury:[34,54]},
    "villa":{label:"Villa",area:"~2,500–4,000 sq.ft",essential:[19,29],premium:[29,49],luxury:[49,84]}
  };
  var TIER_LABEL={essential:"Premium",premium:"Ultra Premium",luxury:"Luxury"};
  var estType="2bhk",estTier="premium";
  var figure=$("#estFigure"),estSub=$("#estSub"),estWa=$("#estWa");
  function num(n){return (Math.round(n*10)/10).toString().replace(/\.0$/,"");}
  function renderEst(){
    var d=EST[estType]; if(!d)return;
    var r=d[estTier];
    if(figure)figure.textContent="₹"+num(r[0])+" – "+num(r[1])+" Lakh";
    if(estSub)estSub.textContent=d.label+" · "+d.area+" · turnkey (design + execution)";
    if(estWa){
      var msg="Hi ArtEvos! I used your estimator — a "+d.label+" ("+TIER_LABEL[estTier]+") comes to about ₹"+num(r[0])+"–"+num(r[1])+" Lakh. I'd like an exact quote for my home.";
      estWa.setAttribute("href","https://wa.me/"+WA+"?text="+encodeURIComponent(msg));
    }
    $$(".est-type").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-et")===estType);b.setAttribute("aria-pressed",String(b.getAttribute("data-et")===estType));});
    $$(".est-tier").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-tier")===estTier);b.setAttribute("aria-pressed",String(b.getAttribute("data-tier")===estTier));});
  }
  $$(".est-type").forEach(function(b){b.addEventListener("click",function(){estType=b.getAttribute("data-et");renderEst();});});
  $$(".est-tier").forEach(function(b){b.addEventListener("click",function(){estTier=b.getAttribute("data-tier");renderEst();});});
  var estBook=$("#estToBooking");
  if(estBook)estBook.addEventListener("click",function(){
    var card=document.querySelector('.home-card[data-key="'+estType+'"]');
    if(card)card.click();               // pre-select the matching home type in the booking form
    var bk=$("#booking"); if(!bk)return;
    var y=bk.getBoundingClientRect().top+window.pageYOffset-70;
    window.scrollTo({top:y,behavior:"smooth"});
  });
  renderEst();

  }
})();


/* ============================================================
   FAQ ACCORDION + FLOATING WHATSAPP — every page
   ============================================================ */
(function(){
  var $=function(s,c){return (c||document).querySelector(s);};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
  var WA=window.AE_WA||"";

  /* ---- FAQ accordion (single-open, animated) ---- */
  var faqItems=$$(".faq-item");
  faqItems.forEach(function(item){
    var q=item.querySelector(".faq-q"),a=item.querySelector(".faq-a");
    if(!q||!a)return;
    q.addEventListener("click",function(){
      var isOpen=item.classList.contains("open");
      faqItems.forEach(function(it){
        it.classList.remove("open");
        var aa=it.querySelector(".faq-a"); if(aa)aa.style.maxHeight="0px";
        var qq=it.querySelector(".faq-q"); if(qq)qq.setAttribute("aria-expanded","false");
      });
      if(!isOpen){
        item.classList.add("open");
        a.style.maxHeight=a.scrollHeight+"px";
        q.setAttribute("aria-expanded","true");
      }
    });
  });
  window.addEventListener("resize",function(){
    var open=$(".faq-item.open .faq-a");
    if(open)open.style.maxHeight=open.scrollHeight+"px";
  });


  /* ---- Floating WhatsApp button ---- */
  var fab=$("#waFab");
  if(fab){
    fab.setAttribute("href","https://wa.me/"+WA+"?text="+encodeURIComponent("Hi ArtEvos! I'd like to know more about designing my home."));
    setTimeout(function(){fab.classList.add("show");},1400);
  }
})();


/* ============================================================
   3D ARCHITECTURAL LINE-ART BACKGROUND
   Fine flowing contour lines in warm tones, 3 depth layers,
   slow drift + mouse parallax. Pure canvas (no libs).
   ============================================================ */
(function(){
  var canvas=document.getElementById("bgfx");
  if(!canvas||!canvas.getContext)return;
  var conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  if(conn&&(conn.saveData||/^(2g|slow-2g)$/.test(conn.effectiveType||""))){canvas.style.display="none";return;}
  var ctx=canvas.getContext("2d");
  var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,step=8,LAYERS=[],GLYPHS=[];
  function conf(){
    var mobile=W<760;
    step=mobile?13:8;
    // col=stroke rgb, a=alpha, w=width, gap=line spacing, amp=wave amplitude, par=parallax, spd=flow speed, f1/f2=frequencies
    LAYERS=[
      {col:"176,145,95",a:mobile?.10:.12,w:0.75,gap:mobile?94:80,amp:16,par:16,spd:0.50,f1:1.15,f2:2.4},
      {col:"195,103,63",a:mobile?.12:.15,w:1.0, gap:mobile?124:108,amp:24,par:32,spd:0.64,f1:0.85,f2:1.85},
      {col:"162,78,43", a:mobile?.13:.17, w:1.2, gap:mobile?158:136,amp:34,par:56,spd:0.80,f1:0.60,f2:1.35}
    ];
  }
  function resize(){
    W=window.innerWidth;H=window.innerHeight;
    canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);
    canvas.style.width=W+"px";canvas.style.height=H+"px";
    ctx.setTransform(DPR,0,0,DPR,0,0);
    conf();
    buildGlyphs();
  }
  var mx=0,my=0,tmx=0,tmy=0,sc=0,t=0,run=true;
  window.addEventListener("mousemove",function(e){tmx=e.clientX/W-.5;tmy=e.clientY/H-.5;},{passive:true});
  window.addEventListener("scroll",function(){sc=window.pageYOffset||0;},{passive:true});
  document.addEventListener("visibilitychange",function(){run=!document.hidden;if(run&&!reduce)requestAnimationFrame(frame);});
  var TAU=Math.PI*2;
  /* floating architectural line-glyphs (real draughting motifs) at depth */
  function buildGlyphs(){
    var m=W<760;
    var defs=[
      {t:"arch",   x:.88,y:.14,s:128,d:.90,c:"162,78,43", a:.15},
      {t:"persp",  x:.15,y:.28,s:120,d:.80,c:"195,103,63",a:.13},
      {t:"iso",    x:.93,y:.60,s:74, d:.72,c:"195,103,63",a:.14},
      {t:"compass",x:.10,y:.82,s:60, d:.55,c:"176,145,95",a:.14},
      {t:"column", x:.73,y:.85,s:128,d:.60,c:"176,145,95",a:.12},
      {t:"dim",    x:.50,y:.94,s:150,d:.50,c:"176,145,95",a:.12},
      {t:"window", x:.05,y:.55,s:62, d:.80,c:"195,103,63",a:.13},
      {t:"ruler",  x:.40,y:.07,s:150,d:.45,c:"176,145,95",a:.12},
      {t:"arc",    x:.84,y:.34,s:78, d:.50,c:"195,103,63",a:.12},
      {t:"stairs", x:.25,y:.90,s:82, d:.40,c:"162,78,43", a:.12},
      {t:"iso",    x:.60,y:.18,s:50, d:.32,c:"176,145,95",a:.10}
    ];
    if(m){defs=[defs[0],defs[1],defs[2],defs[3],defs[6]];}
    GLYPHS=defs.map(function(g,i){g.ph=i*1.3;g.tw=(i%2?1:-1);if(m)g.s=Math.round(g.s*.7);return g;});
  }
  function gArch(w){var h=w*1.4,r=w/2,by=h/2,sy=-h/2+r;
    ctx.beginPath();ctx.moveTo(-r,by);ctx.lineTo(-r,sy);ctx.arc(0,sy,r,Math.PI,0,false);ctx.lineTo(r,by);ctx.stroke();
    var ir=r*.62;ctx.beginPath();ctx.moveTo(-ir,by);ctx.lineTo(-ir,sy+(r-ir));ctx.arc(0,sy+(r-ir),ir,Math.PI,0,false);ctx.lineTo(ir,by);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-r*1.25,by);ctx.lineTo(r*1.25,by);ctx.stroke();}
  function gIso(a){var hx=a*.5,hy=a*.29,ty=-a*.5,vh=a*.72,rr=[hx,ty+hy],b=[0,ty+2*hy],l=[-hx,ty+hy];
    ctx.beginPath();ctx.moveTo(0,ty);ctx.lineTo(rr[0],rr[1]);ctx.lineTo(b[0],b[1]);ctx.lineTo(l[0],l[1]);ctx.closePath();ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(l[0],l[1]);ctx.lineTo(l[0],l[1]+vh);
    ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0],b[1]+vh);
    ctx.moveTo(rr[0],rr[1]);ctx.lineTo(rr[0],rr[1]+vh);
    ctx.moveTo(l[0],l[1]+vh);ctx.lineTo(b[0],b[1]+vh);ctx.lineTo(rr[0],rr[1]+vh);
    ctx.stroke();}
  function gCompass(r){ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,r*.6,0,TAU);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-r*1.2,0);ctx.lineTo(r*1.2,0);ctx.moveTo(0,-r*1.2);ctx.lineTo(0,r*1.2);ctx.stroke();}
  function gDim(len){var h=len/2;ctx.beginPath();ctx.moveTo(-h,0);ctx.lineTo(h,0);
    ctx.moveTo(-h+9,-4);ctx.lineTo(-h,0);ctx.lineTo(-h+9,4);
    ctx.moveTo(h-9,-4);ctx.lineTo(h,0);ctx.lineTo(h-9,4);
    ctx.moveTo(-h,-8);ctx.lineTo(-h,8);ctx.moveTo(h,-8);ctx.lineTo(h,8);ctx.stroke();}
  function gWindow(s){var h=s/2;ctx.strokeRect(-h,-h,s,s);
    ctx.beginPath();ctx.moveTo(0,-h);ctx.lineTo(0,h);ctx.moveTo(-h,0);ctx.lineTo(h,0);ctx.stroke();}
  function gPersp(s){var h=s/2,cx=s*.2,cy=-s*.12,iw=s*.4,ih=s*.4;
    ctx.strokeRect(-h,-h,s,s);ctx.strokeRect(cx-iw/2,cy-ih/2,iw,ih);
    ctx.beginPath();
    ctx.moveTo(-h,-h);ctx.lineTo(cx-iw/2,cy-ih/2);
    ctx.moveTo(h,-h);ctx.lineTo(cx+iw/2,cy-ih/2);
    ctx.moveTo(-h,h);ctx.lineTo(cx-iw/2,cy+ih/2);
    ctx.moveTo(h,h);ctx.lineTo(cx+iw/2,cy+ih/2);ctx.stroke();}
  function gColumn(hh){var half=hh/2,w=hh*.13,cap=w*1.8;
    ctx.beginPath();
    ctx.moveTo(-w,-half+cap*.5);ctx.lineTo(-w,half-cap*.5);
    ctx.moveTo(w,-half+cap*.5);ctx.lineTo(w,half-cap*.5);
    ctx.moveTo(-cap,-half);ctx.lineTo(cap,-half);
    ctx.moveTo(-cap,-half+cap*.5);ctx.lineTo(cap,-half+cap*.5);
    ctx.moveTo(-cap,half);ctx.lineTo(cap,half);
    ctx.moveTo(-cap,half-cap*.5);ctx.lineTo(cap,half-cap*.5);
    ctx.moveTo(-w*.4,-half+cap*.6);ctx.lineTo(-w*.4,half-cap*.6);
    ctx.moveTo(w*.4,-half+cap*.6);ctx.lineTo(w*.4,half-cap*.6);ctx.stroke();}
  function gRuler(len){var h=len/2,th=len*.14;ctx.strokeRect(-h,-th/2,len,th);
    ctx.beginPath();for(var i=1;i<10;i++){var x=-h+len*i/10,tall=(i===5)?th:th*.5;ctx.moveTo(x,-th/2);ctx.lineTo(x,-th/2+tall);}ctx.stroke();}
  function gArc(r){var a0=Math.PI*.86,a1=Math.PI*2.14;
    ctx.beginPath();ctx.arc(0,0,r,a0,a1,false);ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,r*.7,a0,a1,false);ctx.stroke();
    ctx.beginPath();for(var a=a0;a<=a1+.001;a+=(a1-a0)/8){ctx.moveTo(Math.cos(a)*r*.7,Math.sin(a)*r*.7);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.stroke();}
  function gStairs(s){var n=4,st=s/n,x=-s/2,y=s/2;ctx.beginPath();ctx.moveTo(x,y);
    for(var i=0;i<n;i++){y-=st;ctx.lineTo(x,y);x+=st;ctx.lineTo(x,y);}ctx.lineTo(x,s/2);ctx.closePath();ctx.stroke();}
  function drawGlyphs(){
    for(var i=0;i<GLYPHS.length;i++){var g=GLYPHS[i];
      var ds=.7+g.d*.6, par=24+g.d*72;
      var gx=g.x*W+mx*par, gy=g.y*H+my*par - sc*(.012+g.d*.02) + Math.sin(t*.5+g.ph)*6*g.d;
      ctx.save();ctx.translate(gx,gy);ctx.rotate(Math.sin(t*.3+g.ph)*.04*g.tw);
      ctx.strokeStyle="rgba("+g.c+","+g.a+")";ctx.lineWidth=.9*ds;
      var s=g.s*ds;
      if(g.t==="arch")gArch(s);else if(g.t==="iso")gIso(s);else if(g.t==="compass")gCompass(s*.5);
      else if(g.t==="dim")gDim(s);else if(g.t==="window")gWindow(s);
      else if(g.t==="persp")gPersp(s);else if(g.t==="column")gColumn(s);else if(g.t==="ruler")gRuler(s);
      else if(g.t==="arc")gArc(s*.5);else if(g.t==="stairs")gStairs(s);
      ctx.restore();
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.lineJoin="round";ctx.lineCap="round";
    for(var L=0;L<LAYERS.length;L++){
      var ly=LAYERS[L];
      var ox=mx*ly.par, oy=my*ly.par - sc*(0.02+L*0.015);
      var bend=Math.sin(t*ly.spd*0.4)*ly.amp*0.5;   // shared slow bend so lines flow together
      ctx.strokeStyle="rgba("+ly.col+","+ly.a+")";
      ctx.lineWidth=ly.w;
      var idx=0;
      for(var baseY=-ly.gap*2; baseY<H+ly.gap*2; baseY+=ly.gap, idx++){
        ctx.beginPath();
        var first=true;
        for(var px=-42; px<=W+42; px+=step){
          var xn=px/W;
          var y=baseY+oy
            + Math.sin(xn*TAU*ly.f1 + t*ly.spd + idx*0.45 + L)*ly.amp*0.62
            + Math.sin(xn*TAU*ly.f2 - t*ly.spd*0.7 + idx*0.9)*ly.amp*0.38
            + Math.sin(xn*TAU*0.35 + t*ly.spd*0.4)*bend;
          var X=px+ox;
          if(first){ctx.moveTo(X,y);first=false;}else ctx.lineTo(X,y);
        }
        ctx.stroke();
      }
    }
    drawGlyphs();
  }
  function frame(){
    if(!run)return;
    t+=0.006; mx+=(tmx-mx)*.045; my+=(tmy-my)*.045;
    draw(); requestAnimationFrame(frame);
  }
  function boot(){ resize(); if(reduce)draw(); else requestAnimationFrame(frame); }
  if("requestIdleCallback" in window){ requestIdleCallback(boot,{timeout:2200}); } else { setTimeout(boot,900); }
  var rt;
  window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){resize();if(reduce)draw();},200);});
})();



/* ============================================================
   ARTEVOS — 2026 UX LAYER
   Sticky mobile action bar · Android back-button guard ·
   iOS viewport height · active navigation · safety nets.
   Runs on every page. Purely additive.
   ============================================================ */
(function(){
  "use strict";
  var $=function(s,c){return (c||document).querySelector(s);};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
  var CFG=window.AE_CONFIG||{};
  var WA=CFG.whatsapp||window.AE_WA||"";

  /* ---- 1. Real viewport height for older mobile browsers ---- */
  function vh(){ document.documentElement.style.setProperty('--vh',(window.innerHeight*0.01)+'px'); }
  vh(); window.addEventListener('resize',vh,{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(vh,220);});

  /* ---- 2. Preloader safety net (never trap a visitor) ---- */
  setTimeout(function(){var p=$("#preload"); if(p)p.classList.add("done");},3200);

  /* ---- 3. Sticky mobile action bar ---- */
  var bar=$("#mobileActions");
  if(bar){
    var wa=$(".ma-wa",bar);
    if(wa&&WA){
      wa.setAttribute("href","https://wa.me/"+WA+"?text="+encodeURIComponent("Hi ArtEvos! I'd like to design my home. Please share the details."));
    }
    var reveal=function(){
      var y=window.pageYOffset||document.documentElement.scrollTop;
      bar.classList.toggle("show", y>150);
    };
    window.addEventListener("scroll",reveal,{passive:true});
    setTimeout(reveal,600);
    /* Never cover the success screen or an open menu */
    document.addEventListener("click",function(e){
      if(e.target.closest&&e.target.closest("#burger")) setTimeout(function(){
        bar.style.display=document.getElementById("mobileMenu").classList.contains("open")?"none":"";
      },10);
    });
  }

  // Preserve native browser Back navigation on Android and iOS.

  /* ---- 5. Highlight the current page / section in the nav ---- */
  var path=location.pathname.replace(/index\.html$/,"");
  $$(".nav-links a,.mobile-menu a").forEach(function(a){
    var href=a.getAttribute("href")||"";
    if(href.charAt(0)==="/" && href.indexOf("#")===-1){
      var hp=href.replace(/index\.html$/,"");
      if(hp!=="/" && path.indexOf(hp)===0) a.classList.add("active");
    }
  });

  /* ---- 6. Outbound links are always safe ---- */
  $$('a[target="_blank"]').forEach(function(a){
    var rel=(a.getAttribute("rel")||"");
    if(rel.indexOf("noopener")===-1) a.setAttribute("rel",(rel+" noopener noreferrer").trim());
  });

  /* ---- 7. Smooth in-page scrolling that respects the sticky header ---- */
  document.addEventListener("click",function(e){
    var a=e.target.closest?e.target.closest('a[href*="#"]'):null;
    if(!a)return;
    var href=a.getAttribute("href")||"";
    var hash=href.indexOf("#")>-1?href.slice(href.indexOf("#")):"";
    if(!hash||hash==="#")return;
    var base=href.slice(0,href.indexOf("#"));
    if(base && base!=="/" && base!==location.pathname && base!=="./")return;
    var t=document.getElementById(hash.slice(1));
    if(!t)return;
    e.preventDefault();
    t.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
    // Navigation history is recorded by the shared navigation controller.
    if(history.replaceState) history.replaceState(history.state,"",hash);
  });
})();


/* Keyboard access and announced selection states for custom brief controls. */
(function(){
 function sync(){
  document.querySelectorAll('.opt-pill,.chip,.room-top').forEach(function(el){
   el.setAttribute('role','button');el.setAttribute('tabindex','0');
   el.setAttribute('aria-pressed',String(el.matches('.room-top')?el.parentElement.classList.contains('on'):el.classList.contains('sel')||el.classList.contains('on')));
  });
  document.querySelectorAll('.room-toggle').forEach(function(el){el.setAttribute('aria-hidden','true');el.removeAttribute('role');});
 }
 document.addEventListener('keydown',function(e){if(e.target.matches('.opt-pill,.chip,.room-top')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.target.click();}});
 document.addEventListener('click',sync);sync();
})();

/* Record actual UI destinations so browser Back/Forward restores navigation. */
(function(){
  function boot(){
    var restoring=false;
    function snapshot(){
      var menu=document.getElementById('mobileMenu'),modal=document.getElementById('serviceModal');
      var route=document.querySelector('main.rt:not([hidden])');
      return {aeNav:true,route:route?route.getAttribute('data-route'):null,
        step:window.__aeGetBookingStep?window.__aeGetBookingStep():1,
        menu:!!(menu&&menu.classList.contains('open')),
        service:modal&&modal.classList.contains('open')?modal.dataset.service:null,
        hash:location.hash};
    }
    var current=snapshot();
    try{history.replaceState(current,'',location.href);}catch(e){return;}
    document.addEventListener('click',function(){
      if(restoring)return;
      // Run after form, menu, modal and offline-route click handlers.
      setTimeout(function(){
        if(restoring)return;
        var next=snapshot();
        if(JSON.stringify(next)===JSON.stringify(current))return;
        var url=location.href;
        // Some anchor handlers update the URL in place: restore the old entry first.
        history.replaceState(current,'',location.pathname+location.search+current.hash);
        history.pushState(next,'',url);current=next;
      },0);
    });
    window.addEventListener('popstate',function(e){
      var dest=e.state;if(!dest||!dest.aeNav)return;
      restoring=true;
      if(window.__aePreviewRoute&&dest.route)window.__aePreviewRoute(dest.route,false);
      if(window.__aeSetBookingStep)window.__aeSetBookingStep(dest.step);
      if(window.__aeRestoreService)window.__aeRestoreService(dest.service);
      var menu=document.getElementById('mobileMenu'),burger=document.getElementById('burger');
      if(menu&&burger){
        menu.classList.toggle('open',dest.menu);burger.classList.toggle('open',dest.menu);
        menu.setAttribute('aria-hidden',String(!dest.menu));
        burger.setAttribute('aria-expanded',String(dest.menu));
        burger.setAttribute('aria-label',dest.menu?'Close menu':'Open menu');
        document.body.classList.toggle('menu-open',dest.menu);
      }
      var bar=document.getElementById('mobileActions');if(bar)bar.style.display=dest.menu?'none':'';
      var anchor=document.getElementById((dest.hash||'').slice(1));
      if(anchor)anchor.scrollIntoView({block:'start',behavior:'instant'});
      current=dest;restoring=false;
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* Three-field callback request. Never claim success until storage confirms it. */
(function(){
 var form=document.getElementById('quickBookForm');if(!form)return;
 var phone=document.getElementById('quickPhone'),status=document.getElementById('quickBookStatus'),wa=document.getElementById('quickBookWhatsApp');
 var thanks=document.getElementById('quickThanks'),lastQuickFocus=null;
 function closeThanks(){if(thanks.open)thanks.close();}
 function openThanks(message){
  document.getElementById('quickThanksMessage').textContent=message;
  inviteToBrief();wa.hidden=false;
  if(!thanks.open){lastQuickFocus=document.activeElement;thanks.showModal();document.body.classList.add('quick-thanks-open');}
 }
 document.getElementById('quickThanksClose').addEventListener('click',closeThanks);
 thanks.addEventListener('click',function(e){if(e.target===thanks){var r=thanks.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeThanks();}});
 thanks.addEventListener('close',function(){document.body.classList.remove('quick-thanks-open');if(lastQuickFocus)lastQuickFocus.focus({preventScroll:true});});
 document.getElementById('quickToBrief').addEventListener('click',function(){inviteToBrief();closeThanks();});
 form.noValidate=true;
 function showQuickStatus(message){status.textContent=message;status.setAttribute('tabindex','-1');status.focus({preventScroll:true});status.scrollIntoView({behavior:'smooth',block:'center'});}
 var started=Date.now(),busy=false,id='quick-'+Date.now()+'-'+Math.random().toString(36).slice(2);
 function inviteToBrief(){
  var values={name:document.getElementById('quickName').value.trim(),phone:phone.value.replace(/\D/g,'').slice(-10),city:document.getElementById('quickLocation').value.trim()};
  Object.keys(values).forEach(function(key){var field=document.getElementById(key);if(field){field.value=values[key];field.dispatchEvent(new Event('input',{bubbles:true}));}});
  document.getElementById('quickBriefInvite').hidden=false;
 }
 // Opening WhatsApp is not confirmation that a message was sent.
 wa.addEventListener('click',inviteToBrief);
 phone.addEventListener('input',function(){phone.setCustomValidity('');});
 form.addEventListener('submit',async function(e){
  e.preventDefault();if(busy)return;
  var name=document.getElementById('quickName').value.trim(),location=document.getElementById('quickLocation').value.trim();
  var digits=/^[6-9][0-9]{9}$/.test(phone.value)?'91'+phone.value:'';
  phone.setCustomValidity(/^91[6-9][0-9]{9}$/.test(digits)?'':'Enter a valid 10-digit Indian mobile number.');
  if(name.length<2){showQuickStatus('Please enter your full name (at least two characters).');document.getElementById('quickName').focus();return;}
  if(!/^91[6-9][0-9]{9}$/.test(digits)){showQuickStatus('Please enter a valid 10-digit Indian mobile number, starting with 6, 7, 8 or 9.');phone.focus();return;}
  if(location.length<2){showQuickStatus('Please enter your city or area.');document.getElementById('quickLocation').focus();return;}
  var cfg=window.AE_CONFIG||{};
  wa.href='https://wa.me/'+cfg.whatsapp+'?text='+encodeURIComponent('Hi ArtEvos, I would like to book a consultation.\nName: '+name+'\nPhone: +'+digits+'\nLocation: '+location);
  if(!cfg.endpoint){status.textContent='';openThanks('Thank you for taking the first step. Please send your booking details on WhatsApp to complete your enquiry.');return;}
  var button=form.querySelector('button[type="submit"]'),controller=typeof AbortController!=='undefined'?new AbortController():null,timer;
  busy=true;button.disabled=true;status.textContent='Sending your request…';
  try{
   timer=controller?setTimeout(function(){controller.abort();},20000):null;
   var response=await fetch(cfg.endpoint,{method:'POST',credentials:'omit',headers:{'Content-Type':'text/plain;charset=utf-8'},signal:controller?controller.signal:undefined,
    body:JSON.stringify({kind:'quick-booking',name:name,phone:digits,city:location,startedAt:started,clientSubmissionId:id,contactConsent:true,privacyAccepted:true,source:'Homepage Book Now'})});
   var result=await response.json();if(!response.ok||!result.ok)throw new Error('Not saved');
   status.textContent='Thank you! Your booking request has been received. Reference: '+result.leadId+'. Please also send your booking details on WhatsApp using the button below. Tap Send in WhatsApp to share the message.';
   button.textContent='Request received';openThanks('Your booking request has been received. Please also share your details on WhatsApp so we can continue the conversation.');
  }catch(error){status.textContent='We could not confirm your booking. Please retry or send your details on WhatsApp.';busy=false;button.disabled=false;openThanks('Thank you for your interest. We could not confirm your online booking. Please send your details on WhatsApp to reach our team.');}
  finally{clearTimeout(timer);}
 });
})();

/* Exactly ten digits in both enquiry phone fields. */
(function(){
 ['quickPhone','phone'].forEach(function(id){
  var field=document.getElementById(id);if(!field)return;
  var hint=document.createElement('span');hint.id=id+'Validation';hint.setAttribute('aria-live','polite');hint.style.cssText='display:block;color:#a24e2b;font-size:14px;margin-top:6px';
  (field.closest('.phone-input')||field).insertAdjacentElement('afterend',hint);
  field.setAttribute('aria-describedby',hint.id);
  function error(message){hint.textContent=message;field.setAttribute('aria-invalid',String(!!message));field.setCustomValidity(message);}
  function validate(){error(/^[6-9][0-9]{9}$/.test(field.value)?'':'Invalid phone number. Enter exactly 10 digits, starting with 6, 7, 8 or 9.');}
  function reject(text){
   var next=field.value.slice(0,field.selectionStart)+text+field.value.slice(field.selectionEnd);
   if(/[^0-9]/.test(text)||next.length>10){error('Invalid entry. Use digits only, with a maximum of 10 digits.');return true;}return false;
  }
  field.addEventListener('beforeinput',function(e){if(e.data&&reject(e.data))e.preventDefault();});
  field.addEventListener('paste',function(e){if(reject(e.clipboardData.getData('text')))e.preventDefault();});
  field.addEventListener('input',function(){
   var raw=field.value;field.value=raw.replace(/[^0-9]/g,'').slice(0,10);
   if(raw!==field.value)error('Invalid entry. Use digits only, with a maximum of 10 digits.');else validate();
  });
  field.addEventListener('blur',validate);
 });
})();
