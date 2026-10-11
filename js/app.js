(() => {
  const nameIntro=document.getElementById("nameIntro"), welcomeIntro=document.getElementById("welcomeIntro"), universe=document.getElementById("universe"), skipIntro=document.getElementById("skipIntro"), panelField=document.getElementById("panelField"), panels=[...document.querySelectorAll(".glass-panel")], toast=document.getElementById("projectToast"), toastTitle=document.getElementById("toastTitle");
  const finePointer=window.matchMedia("(hover:hover) and (pointer:fine)").matches, reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let introFinished=false;
  const starField=document.getElementById("stars");
  for(let i=0;i<105;i++){const s=document.createElement("span");s.className="star";s.style.left=`${Math.random()*100}%`;s.style.top=`${Math.random()*100}%`;s.style.setProperty("--opacity",(0.25+Math.random()*0.7).toFixed(2));s.style.setProperty("--duration",`${2.4+Math.random()*5}s`);s.style.animationDelay=`${-Math.random()*5}s`;starField.appendChild(s);}
  function revealUniverse(){if(introFinished)return;introFinished=true;nameIntro.classList.add("is-hidden");welcomeIntro.classList.remove("is-active");welcomeIntro.classList.add("is-hidden");universe.classList.add("is-ready");universe.setAttribute("aria-hidden","false");skipIntro.hidden=true;}
  if(reducedMotion){revealUniverse();}else{setTimeout(()=>{if(introFinished)return;nameIntro.classList.add("is-hidden");},4200);setTimeout(()=>{if(introFinished)return;welcomeIntro.classList.remove("is-hidden");welcomeIntro.classList.add("is-active");},5000);setTimeout(revealUniverse,7600);}
  skipIntro.addEventListener("click",revealUniverse);
  function closePanels(except=null){panels.forEach(p=>{if(p!==except){p.classList.remove("is-open");p.setAttribute("aria-expanded","false");}});panelField.classList.toggle("has-open",Boolean(except));}
  function openPanel(p){closePanels(p);p.classList.add("is-open");p.setAttribute("aria-expanded","true");}
  panels.forEach(p=>{
    p.addEventListener("pointerenter",()=>{if(finePointer)openPanel(p);});
    p.addEventListener("pointerleave",e=>{if(finePointer&&!p.contains(e.relatedTarget)&&!p.matches(":focus-within")){p.classList.remove("is-open");p.setAttribute("aria-expanded","false");if(!panels.some(x=>x.classList.contains("is-open")))panelField.classList.remove("has-open");}});
    p.addEventListener("click",e=>{if(e.target.closest("button[data-project]"))return;if(!finePointer){p.classList.contains("is-open")?closePanels():openPanel(p);}else if(!p.classList.contains("is-open"))openPanel(p);});
    p.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target===p){e.preventDefault();p.classList.contains("is-open")?closePanels():openPanel(p);}if(e.key==="Escape")closePanels();});
    p.querySelectorAll("[data-project]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();toastTitle.textContent=`${p.querySelector("h3").innerText} — ${b.dataset.project}`;toast.classList.add("is-visible");closePanels();}));
  });
  document.getElementById("toastClose").addEventListener("click",()=>toast.classList.remove("is-visible"));
  document.getElementById("homeButton").addEventListener("click",e=>{e.preventDefault();toast.classList.remove("is-visible");closePanels();window.scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"});});
  if(finePointer&&!reducedMotion){window.addEventListener("pointermove",e=>{const x=e.clientX/window.innerWidth-.5,y=e.clientY/window.innerHeight-.5;document.querySelector(".planet--moon").style.translate=`${x*9}px ${y*9}px`;},{passive:true});}
})();