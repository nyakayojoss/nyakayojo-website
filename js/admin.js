/* Admin panel: add, edit and delete news, events and vacancies; publish, back up, restore. */
(function(){var D=window.DATA,R=document.getElementById("admroot"),tab="news",ed=-2,msg="";
var KIND={news:{n:"News",keys:["d","t","s","b"],lab:["Date","Title","Summary","Full story"],obj:1},events:{n:"Events",keys:["d","t","s"],lab:["Date","Title","Details"]},jobs:{n:"Vacancies",keys:["t","s"],lab:["Position","Description and how to apply"]}};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var ok=function(){return sessionStorage.getItem("nsr_adm")==="1"},code=function(){return localStorage.getItem("nsr_pass")||SCHOOL.adminCode};
var val=function(k,r,j){var K=KIND[k];return K.obj?r[K.keys[j]]:r[j]};
function dl(name,text,type){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:type||"text/plain"}));a.download=name;a.click()}
function ic(n){return'<svg class="i"><use href="#i-'+n+'"/></svg>'}
function form(k){var K=KIND[k],r=ed>=0?D[k][ed]:null;
return'<form class="af" data-k="'+k+'"><h3>'+(r?"Edit":"Add")+' '+K.n.toLowerCase().replace(/s$/,"")+'</h3>'+K.keys.map(function(_,j){var v=r?val(k,r,j):"",big=j===K.keys.length-1&&K.keys.length>2||k==="jobs"&&j===1;
return'<label>'+K.lab[j]+(j===K.keys.indexOf("t")||K.keys[j]==="t"?" *":"")+(big?'<textarea name="f'+j+'" rows="5">'+esc(v)+'</textarea>':'<input name="f'+j+'" value="'+esc(v)+'"'+(K.keys[j]==="t"?" required":"")+'>')+'</label>'}).join("")+'<div class="arow"><button class="btn dk" type="submit">'+(r?"Save changes":"Publish to site")+'</button>'+(r?'<button type="button" class="btn alt" data-a="cancel">Cancel</button>':"")+'</div></form>'}
function list(k){var K=KIND[k],a=D[k];return'<div class="alist">'+(a.length?a.map(function(r,i){return'<div class="arow2"><div><b>'+esc(val(k,r,K.keys.indexOf("t")))+'</b><small>'+esc(val(k,r,0)===val(k,r,K.keys.indexOf("t"))?"":val(k,r,0))+'</small></div><div><button class="chip" data-a="edit" data-i="'+i+'">Edit</button><button class="chip" data-a="del" data-i="'+i+'">Delete</button></div></div>'}).join(""):'<p class="lead">Nothing here yet. Add the first item.</p>')+'</div>'}
function backup(){return'<div class="grid g2"><div class="card"><h3>Publish to all visitors</h3><p>Edits are saved in this browser. To show them to everyone, download <code>content.js</code> and upload it to the <code>js/</code> folder of your website, replacing the old one.</p><p style="margin-top:12px"><button class="btn dk" data-a="pub">'+ic("download")+' Download content.js</button></p></div><div class="card"><h3>Backup and restore</h3><p>Save all your posts to a file, or restore them.</p><p style="margin-top:12px"><button class="btn alt" data-a="exp">Export backup</button> <label class="btn alt" style="cursor:pointer">Import<input type="file" accept=".json" data-a="imp" hidden></label></p></div><div class="card"><h3>Change passcode</h3><form class="af" data-k="pass"><label>New passcode (6+ characters)<input name="p" type="password" minlength="6" required></label><button class="btn dk" type="submit">Update</button></form></div><div class="card"><h3>Reset</h3><p>Remove edits made in this browser and return to the original content.</p><p style="margin-top:12px"><button class="btn alt" data-a="reset">Reset to original</button></p></div></div>'}
function draw(){if(!ok()){R.innerHTML='<form class="af login" data-k="login"><h3>'+ic("lock")+' Staff sign in</h3><label>Passcode<input type="password" name="p" required autocomplete="current-password"></label><button class="btn dk" type="submit">Sign in</button><p class="note" role="status">'+esc(msg)+'</p></form>';return}
R.innerHTML='<div class="atabs">'+["news","events","jobs","backup"].map(function(t){return'<button class="'+(t===tab?"on":"")+'" data-a="tab" data-t="'+t+'">'+(t==="backup"?"Publish and backup":KIND[t].n)+'</button>'}).join("")+'<span></span><button class="chip" data-a="live">View live site</button><button class="chip" data-a="out">Sign out</button></div>'+(msg?'<p class="amsg" role="status">'+esc(msg)+'</p>':"")+(tab==="backup"?backup():'<div class="split">'+list(tab)+form(tab)+'</div>');msg=""}
function note(m){msg=m;draw()}
R.addEventListener("submit",function(e){e.preventDefault();var f=e.target,k=f.dataset.k,v=function(n){return f.elements[n].value.trim()};
if(k==="login"){if(v("p")===code()){sessionStorage.setItem("nsr_adm","1");msg="";draw()}else note("Wrong passcode.");return}
if(k==="pass"){localStorage.setItem("nsr_pass",v("p"));note("Passcode updated.");return}
var K=KIND[k],r=K.obj?{}:[];K.keys.forEach(function(x,j){K.obj?r[x]=v("f"+j):r[j]=v("f"+j)});
if(k==="news"&&!r.d)r.d=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
if(ed>=0)D[k][ed]=r;else D[k].unshift(r);ed=-2;STORE.save();note("Saved. Download content.js from Publish and backup to update all visitors.")});
R.addEventListener("click",function(e){var b=e.target.closest("[data-a]");if(!b||b.tagName==="INPUT")return;var a=b.dataset.a,i=+b.dataset.i;
if(a==="tab"){tab=b.dataset.t;ed=-2;draw()}else if(a==="edit"){ed=i;draw()}else if(a==="cancel"){ed=-2;draw()}
else if(a==="del"){if(confirm("Delete this item?")){D[tab].splice(i,1);STORE.save();note("Deleted.")}}
else if(a==="out"){sessionStorage.removeItem("nsr_adm");draw()}else if(a==="live"){location.hash="#home";location.reload()}
else if(a==="pub")dl("content.js","window.SITE_CONTENT="+JSON.stringify(STORE.data())+";","text/javascript");
else if(a==="exp")dl("nyakayojo-backup.json",JSON.stringify(STORE.data()),"application/json");
else if(a==="reset"){if(confirm("Remove all edits in this browser?")){localStorage.removeItem(STORE.K);location.reload()}}});
R.addEventListener("change",function(e){if(e.target.dataset.a!=="imp")return;var fr=new FileReader();fr.onload=function(){try{var o=JSON.parse(fr.result);["news","events","jobs"].forEach(function(k){if(Array.isArray(o[k]))D[k]=o[k]});STORE.save();note("Backup restored.")}catch(x){note("That file could not be read.")}};fr.readAsText(e.target.files[0])});
window.addEventListener("hashchange",function(){if(location.hash==="#admin")draw()});draw();
})();
