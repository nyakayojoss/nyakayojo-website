/* Gallery filter and lightbox, search, downloads, forms demo, cookie notice, back to top. */
(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))},D=window.DATA;
var lb=document.createElement("div");lb.className="lb";lb.hidden=true;lb.innerHTML='<button aria-label="Close"><svg class="i" aria-hidden="true"><use href="#i-close"/></svg></button><figure><img alt=""><figcaption></figcaption></figure>';document.body.appendChild(lb);
function openLb(f){var im=f.querySelector("img"),t=lb.querySelector("img");t.style.display=im?"":"none";if(im){t.src=im.src.replace("w=900","w=1600");t.alt=im.alt}lb.querySelector("figcaption").textContent=f.querySelector("figcaption").textContent;lb.hidden=false;lb.querySelector("button").focus()}
lb.onclick=function(e){if(e.target===lb||e.target.tagName==="BUTTON")lb.hidden=true};
var sr=document.createElement("div");sr.className="sr";sr.hidden=true;sr.innerHTML='<div class="srbox"><input type="search" placeholder="Search pages, news, FAQs and downloads" aria-label="Search the website"><ul></ul></div>';document.body.appendChild(sr);
var idx=[];D.pages.forEach(function(p){idx.push([p[1],p[0],"Page"])});D.news.forEach(function(n){idx.push([n.t,"news","News"])});D.faqs.forEach(function(f){idx.push([f[0],"faqs","FAQ"])});D.policies.forEach(function(f){idx.push([f[0],"faqs","Policy"])});D.downloads.forEach(function(d){idx.push([d[1],"downloads","Download"])});D.staff.forEach(function(s){idx.push([s[0],"staff","Staff"])});
var si=sr.querySelector("input"),sl=sr.querySelector("ul");
function openS(){sr.hidden=false;si.value="";sl.innerHTML="";si.focus()}
si.oninput=function(){var q=si.value.toLowerCase().trim();sl.innerHTML="";if(!q)return;var r=idx.filter(function(x){return x[0].toLowerCase().indexOf(q)>-1}).slice(0,8);
if(!r.length){sl.innerHTML="<li style='padding:10px;color:var(--mute)'>No results. Try another word.</li>";return}
r.forEach(function(x){var li=document.createElement("li"),a=document.createElement("a"),s=document.createElement("small");a.href="#"+x[1];a.textContent=x[0];s.textContent=x[2];a.appendChild(s);a.onclick=function(){sr.hidden=true};li.appendChild(a);sl.appendChild(li)})};
sr.onclick=function(e){if(e.target===sr)sr.hidden=true};$("#srbtn").onclick=openS;
document.addEventListener("keydown",function(e){if(e.key==="Escape"){lb.hidden=true;sr.hidden=true}
if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();openS()}
if(e.key==="Enter"&&document.activeElement.classList.contains("g-item"))openLb(document.activeElement)});
function doc(k){var d=D.docs[k],h='<!DOCTYPE html><meta charset=utf-8><title>'+d.title+'</title><style>body{font:15px Arial;margin:30px}td{border-bottom:1px solid #444;padding:10px 6px}</style><h1>'+SCHOOL.name+'</h1><h2>'+d.title+'</h2><table width=100%>'+d.rows.map(function(r){return'<tr><td>'+r.join('</td><td>')+'</td></tr>'}).join("")+'</table><p>'+(d.note||"")+'</p>',a=document.createElement("a");
a.href=URL.createObjectURL(new Blob([h],{type:"text/html"}));a.download=k+".html";a.click()}
document.addEventListener("click",function(e){var t=e.target,f=t.closest("[data-filter]");
if(f){$$("[data-filter]").forEach(function(b){b.classList.toggle("on",b===f)});$$(".g-item").forEach(function(g){g.hidden=f.dataset.filter!=="all"&&g.dataset.cat!==f.dataset.filter});return}
var g=t.closest(".g-item");if(g){openLb(g);return}
var d=t.closest("[data-doc]");if(d)FORMS.open(d.dataset.doc)});
document.addEventListener("submit",function(e){var f=e.target;if(f.id!=="portal-form"&&f.id!=="nl")return;e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
var n=f.id==="nl"?f.parentNode.querySelector(".note"):f.querySelector(".note");n.textContent=f.id==="nl"?"Thanks. You are on the list (demo).":"Portal sign-in is not connected yet. A developer must link this form to your school system.";f.reset()});
var tt=document.createElement("button");tt.className="totop";tt.setAttribute("aria-label","Back to top");tt.textContent="↑";tt.onclick=function(){scrollTo({top:0})};document.body.appendChild(tt);
addEventListener("scroll",function(){tt.classList.toggle("show",scrollY>600)});
try{if(!localStorage.getItem("ck")){var c=document.createElement("div");c.className="ck";c.innerHTML="<span>This site uses only essential storage to run the forms and remember this notice.</span>";var b=document.createElement("button");b.className="btn";b.textContent="Got it";b.onclick=function(){localStorage.setItem("ck","1");c.hidden=true};c.appendChild(b);document.body.appendChild(c)}}catch(x){}
})();
/* Multi-step form wizard */
(function(){
document.querySelectorAll("form.wizard").forEach(function(f){var st=[].slice.call(f.querySelectorAll(".step")),bar=f.querySelector(".wiz"),i=0,bk=f.querySelector("[data-wz=back]"),nx=f.querySelector("[data-wz=next]"),sb=f.querySelector("[type=submit]");
st.forEach(function(s,n){var li=document.createElement("li");li.innerHTML="<span>"+(n+1)+". </span>"+s.dataset.t;bar.appendChild(li)});
function go(n){i=n;st.forEach(function(s,k){s.classList.toggle("on",k===n)});[].forEach.call(bar.children,function(li,k){li.className=k===n?"on":k<n?"done":""});bk.style.visibility=n?"visible":"hidden";nx.style.display=n<st.length-1?"":"none";sb.style.display=n===st.length-1?"":"none"}
nx.onclick=function(){var els=[].slice.call(st[i].querySelectorAll("input,select,textarea"));for(var k=0;k<els.length;k++){if(!els[k].checkValidity()){els[k].reportValidity();return}}go(i+1);f.scrollIntoView({behavior:"auto",block:"start"})};
bk.onclick=function(){go(i-1)};f.addEventListener("reset",function(){go(0)});go(0)})})();
