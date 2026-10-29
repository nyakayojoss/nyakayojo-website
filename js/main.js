/* Builds the pages from /pages, then runs routing, theme, countdown and forms. */
document.getElementById("app").innerHTML=["home","about","staff","academics","studentlife","gallery","news","results","admissions","careers","downloads","faqs","portal","contact","admin","apply","applyonline","applyscan","jobapply"].map(function(n){return window.PAGES[n]||""}).join("");
(function(){
var SCHOOL_EMAIL=SCHOOL.email;
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
function show(){var p=(location.hash||"#home").slice(1);if(!$("#"+p+".page"))p="home";
$$(".page").forEach(function(e){e.classList.toggle("on",e.id===p)});
$$("nav a").forEach(function(a){a.classList.toggle("on",(a.dataset.p||"").split(",").indexOf(p)>-1)});

window.scrollTo(0,0);document.title=p.charAt(0).toUpperCase()+p.slice(1)+" – Nyakayojo Secondary School"}
window.addEventListener("hashchange",show);show();

function tick(){if(!$("#cd"))return;var ms=new Date(SCHOOL.deadline)-new Date();if(ms<0)ms=0;
$("#cd").textContent=Math.floor(ms/864e5);$("#ch").textContent=Math.floor(ms/36e5)%24;$("#cm").textContent=Math.floor(ms/6e4)%60}
tick();setInterval(tick,30000);
$$("[data-job]").forEach(function(b){b.onclick=function(){$("#pos").value=b.dataset.job;$("#jf").scrollIntoView({behavior:"auto"});$("#job [name=Name]").focus({preventScroll:true})}});
$$("form.f").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();
if(!f.checkValidity()){f.reportValidity();return}
var kind=f.dataset.kind,ref=kind.slice(0,3).toUpperCase()+"-"+Date.now().toString(36).toUpperCase(),lines=[],ent=[];
new FormData(f).forEach(function(v,k){if(v){lines.push(k+": "+v);ent.push([k,v])}});
var text=kind+" – Nyakayojo Secondary School\nReference: "+ref+"\n\n"+lines.join("\n");
var box=$("#ok-"+f.id);box.innerHTML="";
var h=document.createElement("h3");h.textContent="Thank you. Your "+kind.toLowerCase()+" is ready.";
var p=document.createElement("p");p.innerHTML="Your reference is <code></code>. Print the receipt, download a copy or email it to the school, then bring the documents listed on the Admissions page.";p.querySelector("code").textContent=ref;
var a=document.createElement("a");a.className="btn dk";a.textContent="Download copy";a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));a.download=ref+".txt";
var m=document.createElement("a");m.className="btn alt";m.style.marginLeft="8px";m.textContent="Email to school";m.href="mailto:"+SCHOOL_EMAIL+"?subject="+encodeURIComponent(kind+" "+ref)+"&body="+encodeURIComponent(text);
var w=document.createElement("p");w.style.marginTop="14px";var pr=document.createElement("button");pr.type="button";pr.className="btn alt";pr.style.marginLeft="8px";pr.textContent="Print receipt";pr.onclick=function(){FORMS.openDoc(kind+" receipt",window.receiptHtml(kind,ref,ent))};w.append(a,m,pr);box.append(h,p,w);box.classList.add("show");f.reset();box.scrollIntoView({behavior:"auto",block:"center"})})});

})();
