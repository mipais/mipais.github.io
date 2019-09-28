function init_vars() {
m_el= document.getElementById("m");
l_el= document.getElementById("l");
a_el= document.getElementById("a");
v_el= document.getElementById("v");
v_to= null;

kwd= {};
doc= {};
}

function mix(l) {
	var r= [];	
	while (l.length) {
		var idx=Math.floor(Math.random()*l.length);
		r.push(l.splice(idx,1)[0]);
	}
	return r;
}

function blink(e) {
	clearTimeout(v_to);
	e.prepend(v_el);
	v_el.style.display='block';
	v_to= setTimeout(() => v_el.style.display='none', 1000);
}

function c(que,el) {
	a_el.value= location.href.replace(/\?.*/,'')+'n/'+que;
	a_el.select();
	document.execCommand('copy'); 
	blink(el);
}

function u(filtro) {
	var r= [];
	Object.keys(doc).forEach(k => { var d=doc[k];
		if (!d.titulo || !d.uloc) return;

		if (!d.kwdl) {
			d.kwdl= d.kwd.split(/\s*\|\s*/);
			d.kwdl.forEach(k => kwd[k]=1);	
		}
		if (filtro=="*" || d.kwdl.indexOf(filtro)>-1) { r.push(d);}
	});	

	l_el.innerHTML= mix(r).map(d => '<div class="card" onclick="c(\''+d.uloc+'\',this)">'+d.titulo+'<br><a href="n/'+d.uloc+'">ir</a></div>').join('');
}

function init_from_meta() {
	init_vars();
	fetch("meta.json").then(res => res.json()).then( rdoc => {
		doc= rdoc;
		u("*");
		m_el.innerHTML= ['*'].concat(Object.keys(kwd).sort()).map(k => '<button onclick="u(\''+k+'\')">'+k+'</button>').join(' ');
	});
}

function init_from_img() {
}
