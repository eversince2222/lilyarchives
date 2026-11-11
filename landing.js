(function(){
 const c=document.getElementById('mold'),S=640,x=c.getContext('2d'),img=new Image();
 c.width=c.height=S;img.src='assets/img/mold_cover.jpg';
 const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 let base,clear,mask,mx,px=.5,py=.5,on=false,t=0;
 function soft(n,dark){ /* tiny bilinear thumbnail stretched back = heavy blur, then darkened */
  const a=document.createElement('canvas');a.width=a.height=n;a.getContext('2d').drawImage(img,0,0,n,n);
  const b=document.createElement('canvas');b.width=b.height=S;const q=b.getContext('2d');q.imageSmoothingQuality='high';q.drawImage(a,0,0,S,S);
  q.fillStyle='rgba(4,10,6,'+dark+')';q.fillRect(0,0,S,S);return b}
 img.onload=()=>{base=soft(9,.5);clear=soft(15,.3);
  mask=document.createElement('canvas');mask.width=mask.height=S;mx=mask.getContext('2d');requestAnimationFrame(loop)};
 function loop(){
  if(!on&&!still){t+=.005;px=.5+.3*Math.sin(t*1.3);py=.5+.3*Math.sin(t*.9+1)}
  x.drawImage(base,0,0);
  mx.globalCompositeOperation='source-over';mx.clearRect(0,0,S,S);mx.drawImage(clear,0,0);
  const g=mx.createRadialGradient(px*S,py*S,0,px*S,py*S,S*.22);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');
  mx.globalCompositeOperation='destination-in';mx.fillStyle=g;mx.fillRect(0,0,S,S);
  x.drawImage(mask,0,0);requestAnimationFrame(loop)}
 function mv(e){const r=c.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;on=true}
 c.addEventListener('pointerdown',mv);c.addEventListener('pointermove',mv);
 c.addEventListener('pointerleave',()=>on=false);c.addEventListener('pointerup',e=>{if(e.pointerType==='touch')setTimeout(()=>on=false,900)});
})();
/* Landing: WebGL beige room (butterfly + fawn), jewelry box (lid loop + glitter), 3 tarot cards (flip / yoyo like the supplied code) */
(function(){
 const root=document.getElementById('landing');
 if(!root)return;
 if(document.documentElement.classList.contains('no-landing')){root.remove();return}
 const $=s=>root.querySelector(s);
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 let alive=true;
 const T=[226/255,214/255,193/255];
 const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
 /* ---------- BACKGROUND (2D canvas: works from file:// too) ---------- */
 const bg=$('#lg'),bc=bg.getContext('2d');
 const load=s=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s});
 function sizes(){const vw=root.clientWidth,vh=root.clientHeight,m=Math.max(vw,vh);
  const sb=Math.min(m*.5,vw*1.05),dw=Math.min(m*.58,vw*1.05,vh*.95);return{vw,vh,sb,dw,dh:dw*741/736}}
 Promise.all([load('assets/img/lg_butterfly.webp'),load('assets/img/lg_deer.webp')]).then(([ib,id])=>{
  if(!ib||!id)return;
  const offA=document.createElement('canvas'),offB=document.createElement('canvas'),ca=offA.getContext('2d'),cb=offB.getContext('2d');
  let D=1,lastKey='';
  function mask(c,w,h,inv){c.globalCompositeOperation='destination-in';const g=c.createLinearGradient(0,h*.56,0,h*.8);g.addColorStop(0,inv?'rgba(0,0,0,0)':'#000');g.addColorStop(1,inv?'#000':'rgba(0,0,0,0)');c.fillStyle=g;
   if(inv)c.fillRect(0,0,w,h);else c.fillRect(0,0,w,h);c.globalCompositeOperation='source-over'}
  function frame(ms){
   if(!alive||!root.isConnected)return;const t=ms/1000,S=sizes();D=Math.min(devicePixelRatio||1,1.5);
   const W=Math.round(S.vw*D),H=Math.round(S.vh*D);if(bg.width!==W||bg.height!==H){bg.width=W;bg.height=H}
   const bw=Math.round(S.sb),ow=Math.round(bw*D);
   if(offA.width!==ow){offA.width=offA.height=offB.width=offB.height=ow;
    cb.setTransform(D,0,0,D,0,0);cb.clearRect(0,0,bw,bw);cb.drawImage(ib,0,0,bw,bw);cb.setTransform(1,0,0,1,0,0);mask(cb,ow,ow,true)}
   let flap=1,sway=0,nod=0,bx=0,by=0,brot=0;
   if(!reduce){const c=t%7.5,k=c<2.4?Math.sin(c/2.4*Math.PI):0;
    flap=1;
    bx=Math.sin(t*.38)*8;by=Math.cos(t*.51)*6-k*5;brot=Math.sin(t*.45)*.025;
    const q=(t%11)/11;sway=.55*Math.sin(t*.55)+.35*Math.sin(t*.23+1.7);nod=Math.exp(-Math.pow((q-.45)/.07,2))+.25*Math.sin(t*.7)}
   bc.setTransform(D,0,0,D,0,0);bc.clearRect(0,0,S.vw,S.vh);
   /* butterfly: wings squeeze toward the body axis (flap), shadow follows, lower part stays */
   ca.setTransform(D,0,0,D,0,0);ca.clearRect(0,0,bw,bw);ca.save();ca.translate(.487*bw,0);ca.scale(flap,1);ca.translate(-.487*bw,0);ca.drawImage(ib,0,0,bw,bw);ca.restore();ca.setTransform(1,0,0,1,0,0);mask(ca,ow,ow,false);
   bc.save();bc.translate(-.1*S.sb+bx+bw/2,-.05*S.sb+by+bw/2);bc.rotate(brot);
   bc.drawImage(offB,-bw/2,-bw/2,bw,bw);bc.drawImage(offA,-bw/2,-bw/2,bw,bw);bc.restore();
   /* fawn: head + neck lean and nod, body, legs and lace stay put */
   const dw=S.dw,dh=S.dh,x0=S.vw-dw,y0=S.vh-dh,iw=id.width,ih=id.height,k=dw/iw,cut=.765,he=.64;
   bc.drawImage(id,iw*cut,0,iw*(1-cut),ih,x0+dw*cut,y0,dw*(1-cut),dh);
   bc.drawImage(id,0,ih*he,iw*cut,ih*(1-he),x0,y0+dh*he,dw*cut,dh*(1-he));
   const step=3,lim=dh*he;
   for(let yy=0;yy<lim;yy+=step){const h=sm(he,.12,yy/dh),kk=h*h;
    bc.drawImage(id,0,yy/k,iw*cut,(step+1)/k,x0+sway*.013*dw*kk,y0+yy-nod*.007*dw*kk,dw*cut,step+1)}
   if(!reduce)requestAnimationFrame(frame)}
  requestAnimationFrame(frame);addEventListener('resize',()=>{if(reduce)requestAnimationFrame(frame)});
 });
 /* ---------- JEWELRY BOX (3D layers + glitter, transparent canvas over satin) ---------- */
 const lid=$('#boxLid'),glow=$('#glow'),sc=$('#sp'),sx=sc.getContext('2d'),stage=$('#stage'),fan=$('.fan');
 let SW=0,SH=0,SD=1;const parts=[],motes=[];
 function sizeS(){SD=Math.min(devicePixelRatio||1,1.5);SW=root.clientWidth;SH=root.clientHeight;sc.width=SW*SD;sc.height=SH*SD;sx.setTransform(SD,0,0,SD,0,0)}
 sizeS();addEventListener('resize',sizeS);
 for(let i=0;i<(innerWidth<700?16:30);i++)motes.push({x:Math.random(),y:Math.random(),r:.8+Math.random()*1.8,sp:.008+Math.random()*.018,ph:Math.random()*6.28,dr:Math.random()*6.28});
 const GL=[[.18,.34],[.32,.3],[.5,.27],[.68,.3],[.82,.34],[.26,.52],[.74,.52],[.4,.62],[.6,.62],[.5,.42]].map((p,i)=>({x:p[0],y:p[1],f:.55+Math.random()*.6,ph:i*1.7,lid:i<5}));
 function star(x,y,r,a){sx.save();sx.translate(x,y);sx.globalAlpha=a;sx.shadowColor='rgba(230,200,130,.95)';sx.shadowBlur=r*1.5;sx.fillStyle='#fff8e6';sx.beginPath();
  const k=.15;sx.moveTo(0,-r);sx.lineTo(r*k,-r*k);sx.lineTo(r,0);sx.lineTo(r*k,r*k);sx.lineTo(0,r);sx.lineTo(-r*k,r*k);sx.lineTo(-r,0);sx.lineTo(-r*k,-r*k);sx.closePath();sx.fill();
  sx.shadowBlur=0;sx.fillStyle='rgba(230,200,130,.55)';sx.beginPath();sx.arc(0,0,r*.16,0,6.3);sx.fill();sx.restore()}
 let last=performance.now(),acc=0;
 function loop(ms){
  if(!alive||!root.isConnected)return;requestAnimationFrame(loop);
  const t=ms/1000,dt=Math.min((ms-last)/1000,.05);last=ms;
  const u=(t%7)/7;let lift=sm(.45,.6,u)-sm(.8,.95,u);if(reduce)lift=.3;
  glow.style.opacity=(.12+.88*lift).toFixed(3);
  root.style.setProperty('--rise',(lift*24).toFixed(1));
  if(reduce){sx.clearRect(0,0,SW,SH);return}
  const r=stage.getBoundingClientRect(),bw=r.width,bh=r.height*.82,bx0=r.left,by0=r.bottom-bh;
  sx.clearRect(0,0,SW,SH);
  for(const m of motes){m.y-=m.sp*dt;m.x+=Math.sin(t*.3+m.dr)*.004*dt;if(m.y<-.02){m.y=1.02;m.x=Math.random()}
   const a=.15+.25*(.5+.5*Math.sin(t*1.4+m.ph));sx.globalAlpha=a;sx.fillStyle='#d9b877';sx.beginPath();sx.arc(m.x*SW,m.y*SH,m.r,0,6.3);sx.fill()}
  for(const g of GL){const f=Math.pow(Math.max(0,Math.sin(t*g.f+g.ph)),22);if(f>.04){const x=bx0+g.x*bw,y=by0+g.y*bh-(g.lid?lift*14:0);star(x,y,(6+8*f),Math.min(1,f*1.3))}}
  acc+=dt*(lift>.25?40*lift:0);
  while(acc>1){acc--;parts.push({x:bx0+bw*(.3+Math.random()*.4),y:by0+bh*.3,vx:(Math.random()-.5)*16,vy:-(22+Math.random()*46),l:0,m:1.4+Math.random()*1.2,s:3+Math.random()*6,ph:Math.random()*6})}
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.l+=dt;if(p.l>p.m){parts.splice(i,1);continue}
   p.x+=p.vx*dt+Math.sin(t*3+p.ph)*.25;p.y+=p.vy*dt;p.vy*=.992;
   const a=Math.sin(p.l/p.m*Math.PI)*(.6+.4*Math.sin(t*14+p.ph));star(p.x,p.y,p.s,Math.max(0,a))}
 }
 requestAnimationFrame(loop);
  /* ---------- CARDS ---------- */
 const cards=[...root.querySelectorAll('.card-container')];let openC=null,ptype='mouse',leaveT=0;
 function setOpen(c){cards.forEach(x=>x.classList.toggle('open',x===c));fan.classList.toggle('has-open',!!c);openC=c}
 function dismissNow(){alive=false;document.documentElement.classList.remove('has-landing');document.documentElement.classList.add('no-landing');root.style.display='none';try{root.remove()}catch(e){}window.scrollTo(0,0)}
 window.addEventListener('hashchange',()=>{if(location.hash==='#enter')dismissNow()});
/* the landing always opens on the homepage; #enter (enter button / cards) closes it */
if(location.hash==='#enter'){dismissNow()}
 function go(dest){if(!dest||/^index\.html/.test(dest)){dismissNow();return}
  root.classList.add('out');document.documentElement.classList.remove('has-landing');
  const page=dest&&dest!=='index.html';setTimeout(()=>{alive=false;if(page)location.href=dest;else{document.documentElement.classList.add('no-landing');root.remove()}},page?650:780)}
 root.addEventListener('pointerdown',e=>{ptype=e.pointerType||'mouse'},true);
 root.addEventListener('keydown',()=>{ptype='key'},true);
 cards.forEach(c=>{
  c.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){clearTimeout(leaveT);setOpen(c)}});
  c.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){clearTimeout(leaveT);leaveT=setTimeout(()=>{if(openC===c)setOpen(null)},110)}});
  c.addEventListener('focus',()=>{if(ptype==='key')setOpen(c)});
  c.addEventListener('click',e=>{if(ptype!=='mouse'&&openC!==c){e.preventDefault();setOpen(c)}});
 });
 root.addEventListener('click',e=>{if(!e.target.closest('.card-container,.l-enter'))setOpen(null)});
 })();
