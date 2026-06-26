// ЯНС-Аудит — декоративные элементы (мягкие круги + точечная сетка) + анимации

function buildDecor(id, cfg){
  const g = document.getElementById(id);
  if(!g) return;
  let out = '';
  (cfg.rings||[]).forEach(r=>{
    out += `<circle cx="0" cy="0" r="${r.r}" fill="none" stroke="${r.c}" stroke-width="${r.w||1.4}" opacity="${r.o!=null?r.o:.5}"/>`;
  });
  if(cfg.dots){
    const d = cfg.dots;
    for(let i=0;i<d.cols;i++){
      for(let j=0;j<d.rows;j++){
        out += `<circle cx="${d.x0+i*d.gap}" cy="${d.y0+j*d.gap}" r="${d.r}" fill="${d.c}" opacity="${d.o}"/>`;
      }
    }
  }
  g.innerHTML = out;
}

// hero: концентрические кольца + точечная сетка (центр группы 210,210)
buildDecor('ringg', {
  rings:[
    {r:158, c:'#63B1F7', o:.55},
    {r:116, c:'#6DC67A', o:.5},
    {r:74,  c:'#163A8C', o:.4, w:2}
  ],
  dots:{cols:6, rows:6, gap:14, r:2.2, x0:-188, y0:58, c:'#63B1F7', o:.5}
});

// CTA-баннер: тонкие светлые кольца (центр группы 100,100)
buildDecor('patg', {
  rings:[
    {r:84, c:'#ffffff', o:.16},
    {r:58, c:'#9fd3ff', o:.20},
    {r:34, c:'#ffffff', o:.14, w:2}
  ]
});

// появление при прокрутке
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.style.transitionDelay=(i%4*60)+'ms'; io.observe(el); });

// закрытие мобильного меню по клику на ссылку
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('menu').classList.remove('open')));
