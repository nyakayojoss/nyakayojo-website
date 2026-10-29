/* Drawer menu, page-load bar, copy chips, selection lock, toast. */
(function(){var $=function(s){return document.querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var d=$("#drawer"),sc=$("#scrim"),bg=$("#burger");
function drawer(o){d.classList.toggle("open",o);sc.hidden=!o;d.setAttribute("aria-hidden",!o);bg.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":""}
bg.onclick=function(){drawer(true)};$("#dclose").onclick=sc.onclick=function(){drawer(false)};
function route(){var p=(location.hash||"#home").slice(1);drawer(false);
$$("#drawer .dlist a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+p)});
var b=$("#bar");b.style.opacity=1;b.style.width="0";requestAnimationFrame(function(){b.style.width="75%";setTimeout(function(){b.style.width="100%";setTimeout(function(){b.style.opacity=0},300)},180)})}
window.addEventListener("hashchange",route);route();
document.addEventListener("keydown",function(e){if(e.key==="Escape")drawer(false)});
var t=document.createElement("div");t.id="toast";t.setAttribute("role","status");document.body.appendChild(t);
document.addEventListener("click",function(e){var c=e.target.closest("[data-copy]");if(!c)return;var v=c.dataset.copy;
var done=function(){t.textContent="Copied: "+v;t.classList.add("on");setTimeout(function(){t.classList.remove("on")},1800)};
if(navigator.clipboard)navigator.clipboard.writeText(v).then(done,done);else{var x=document.createElement("textarea");x.value=v;document.body.appendChild(x);x.select();document.execCommand("copy");x.remove();done()}});
var ed=function(e){return/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)};
document.addEventListener("selectstart",function(e){if(!ed(e))e.preventDefault()});
document.addEventListener("contextmenu",function(e){if(e.target.tagName==="IMG")e.preventDefault()});
document.addEventListener("dragstart",function(e){if(e.target.tagName==="IMG")e.preventDefault()});
})();
