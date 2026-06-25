// ЯНС-Аудит — фирменный круговой паттерн из человечков (мотив из брошюры) + анимации

function personPath(cx, cy, r, color){
  // simple "person" = head circle + rounded body, scaled by r
  const head = `<circle cx="${cx}" cy="${cy - r*1.1}" r="${r*0.62}" fill="${color}"/>`;
  const bodyW = r*1.2, bodyH = r*2.1;
  const body = `<rect x="${cx-bodyW/2}" y="${cy-r*0.4}" width="${bodyW}" height="${bodyH}" rx="${bodyW/2}" fill="${color}"/>`;
  return head + body;
}

function buildRing(groupId, rings){
  const g = document.getElementById(groupId);
  if(!g) return;
  const palette = ['#003680','#00A0C8','#7AB648','#F53628','#0a2d63'];
  let out = '';
  rings.forEach((ring, ri)=>{
    const {radius, count, size} = ring;
    for(let i=0;i<count;i++){
      const ang = (i/count)*Math.PI*2 - Math.PI/2;
      const x = Math.cos(ang)*radius;
      const y = Math.sin(ang)*radius;
      // colour rhythm: mostly navy/cyan with green & red accents
      let color;
      const m = i % 7;
      if(m===0) color = palette[2];        // green
      else if(m===3) color = palette[1];   // cyan
      else if(m===5 && ri%2===0) color = palette[3]; // red accent, sparse
      else color = (i%2? palette[0]:palette[4]);
      out += `<g transform="rotate(${ang*180/Math.PI+90} ${x} ${y})">${personPath(x,y,size,color)}</g>`;
    }
  });
  g.innerHTML = out;
}

// hero big ring
buildRing('ringg', [
  {radius:175, count:46, size:7.5},
  {radius:128, count:34, size:6.5},
  {radius:82,  count:22, size:5.5},
]);
// footer/cta small pattern
buildRing('patg', [
  {radius:88, count:30, size:5},
  {radius:58, count:20, size:4},
]);

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.style.transitionDelay=(i%4*60)+'ms'; io.observe(el); });

// close mobile menu on link click
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('menu').classList.remove('open')));
