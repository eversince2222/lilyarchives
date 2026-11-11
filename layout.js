/* shared taskbar + footer + heart trail. edit SITE / NAV once, all pages update. */
const SITE={name:"lily archives",tagline:"french ambient artist",footer:"all rights reserved"};
const NAV=[
 {id:"home",label:"Home",href:"index.html"},
 {id:"about",label:"About",href:"about.html"},
 {id:"links",label:"Links",href:"links.html"},
 {id:"contact",label:"Contact",href:"contact.html"},
];
document.body.insertAdjacentHTML("afterbegin",'<div id="bgfix" aria-hidden="true"></div>');
const page=document.body.dataset.page||"home";
document.body.insertAdjacentHTML("afterbegin",`
<div class="taskbar"><div class="wrap">
 <a class="tb-start" href="index.html"><img src="assets/img/logo.png" alt="${SITE.name}"></a>
 <nav class="tb-nav">${NAV.map(n=>`<a href="${n.href}" class="${n.id===page?"on":""}">${n.label}</a>`).join("")}</nav>
 <div class="tb-clock"><span>♪</span><span id="tb-time">--:--</span></div>
</div></div>`);
document.body.insertAdjacentHTML("beforeend",`<footer class="foot"><div class="wrap"><div class="lace bows"></div>Lily Archives ⋆𝜗𝜚 — ${SITE.footer}<p class="foot-credits">fonts : SickCapital · Apostrophic Labs · Maelle.k<br>images : unknown authors</p></div></footer>`);
function tick(){const e=document.getElementById("tb-time");if(e)e.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
tick();setInterval(tick,15000);
/* window × buttons close the window */
document.addEventListener("click",e=>{const x=e.target.closest(".win-tb .btns b");if(!x||x.textContent.trim()!=="×")return;
 const w=x.closest(".win");w.style.transition="opacity .25s, transform .25s";w.style.opacity=0;w.style.transform="scale(.94)";setTimeout(()=>{w.style.display="none"},250)});
/* animated rain over the forest wallpaper: far + near drops, ground splashes */
(function(){
 if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 const c=document.createElement("canvas");c.id="rain";c.setAttribute("aria-hidden","true");document.body.prepend(c);
 const x=c.getContext("2d"),dpr=Math.min(devicePixelRatio||1,2);
 let W,H,far=[],near=[],rings=[],run=true,last=performance.now(),dt=1;
 const mk=(r,near_)=>({x:Math.random()*(innerWidth+200)-100,y:r?Math.random()*innerHeight:-40,
  l:near_?18+Math.random()*16:8+Math.random()*8,v:near_?16+Math.random()*7:9+Math.random()*4,
  w:near_?1.4:.8,a:near_?.32+Math.random()*.2:.14+Math.random()*.12,n:near_});
 function size(){W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  const k=W*H,nf=Math.min(240,Math.round(k/6500)),nn=Math.min(100,Math.round(k/17000));
  while(far.length<nf)far.push(mk(true,false));far.length=nf;
  while(near.length<nn)near.push(mk(true,true));near.length=nn}
 function step(set,col){
  for(const p of set){
   x.strokeStyle=col(p.a);x.lineWidth=p.w;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x-p.l*.22,p.y+p.l);x.stroke();
   p.y+=p.v*dt;p.x-=p.v*.22*dt;
   if(p.n&&p.y>H*.78&&!p.hit){p.hit=1;rings.push({x:p.x,y:H*.78+Math.random()*H*.2,r:1,a:.5})}
   if(p.y>H+30||p.x<-80)Object.assign(p,mk(false,p.n))}}
 function f(t){if(!run)return;dt=Math.max(0,Math.min((t-last)/16.7,3));last=t;x.clearRect(0,0,W,H);x.lineCap="round";
  step(far,a=>"rgba(158,136,158,"+a+")");
  step(near,a=>"rgba(237,226,205,"+a+")");
  for(let i=rings.length-1;i>=0;i--){const g=rings[i];g.r+=.9*dt;g.a-=.012*dt;
   if(g.a<=0){rings.splice(i,1);continue}
   x.strokeStyle="rgba(237,226,205,"+g.a+")";x.lineWidth=1;x.beginPath();x.ellipse(g.x,g.y,Math.max(.1,g.r*2.2),Math.max(.1,g.r*.55),0,0,6.283);x.stroke()}
  requestAnimationFrame(f)}
 addEventListener("resize",size);size();
 document.addEventListener("visibilitychange",()=>{run=!document.hidden;if(run){last=performance.now();requestAnimationFrame(f)}});
 requestAnimationFrame(f);
})();
/* moths: tiny trail behind the pointer (mouse) + a few fly off on every click / tap (works on mobile) */
(function(){
 if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
 const fine=matchMedia("(pointer:fine)").matches;let alive=0;
 const st=document.createElement("style");
 st.textContent=".moth{position:fixed;left:0;top:0;z-index:9999;pointer-events:none;will-change:transform,opacity}.moth img{display:block;width:100%;height:auto;transform-origin:50% 40%}";
 document.head.appendChild(st);
 const pre=new Image();pre.src="assets/img/moth.png";
 function fly(x,y,size,dist,dur){
  if(alive>16)return;alive++;
  const w=document.createElement("div");w.className="moth";w.style.width=size+"px";
  const im=new Image();im.src="assets/img/moth.png";im.alt="";im.draggable=false;w.appendChild(im);document.body.appendChild(w);
  const ang=(-90+(Math.random()*100-50))*Math.PI/180,ph=Math.random()*6,N=8,kf=[];
  for(let k=0;k<=N;k++){const t=k/N,wob=Math.sin(t*Math.PI*3+ph)*size*.7*t;
   const dx=Math.cos(ang)*dist*t-Math.sin(ang)*wob,dy=Math.sin(ang)*dist*t+Math.cos(ang)*wob;
   const rot=ang*180/Math.PI+90+Math.cos(t*Math.PI*3+ph)*18;
   kf.push({transform:`translate(${(x-size/2+dx).toFixed(1)}px,${(y+dy).toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`,opacity:t<.12?t/.12:t>.65?Math.max(0,(1-t)/.35):1});}
  im.animate([{transform:"scaleX(1)"},{transform:"scaleX(.42)"}],{duration:100+Math.random()*40,iterations:Infinity,direction:"alternate",easing:"ease-in-out"});
  w.animate(kf,{duration:dur,easing:"ease-out",fill:"forwards"}).onfinish=()=>{w.remove();alive--};
 }
 addEventListener("pointerdown",e=>{
  if(e.target.closest&&e.target.closest("iframe,input,textarea,select"))return;
  const n=2+(Math.random()*2|0);
  for(let k=0;k<n;k++)setTimeout(()=>fly(e.clientX+(Math.random()*20-10),e.clientY+(Math.random()*20-10),30+Math.random()*16,120+Math.random()*100,1700+Math.random()*900),k*70);
 },{passive:true});
 if(fine){let last=0;
  addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const t=performance.now();if(t-last<170)return;last=t;
   fly(e.clientX,e.clientY,16+Math.random()*8,40+Math.random()*30,1100);},{passive:true});}
})();
