(()=>{var q=Object.create;var w=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,T=Object.prototype.hasOwnProperty;var O=t=>w(t,"__esModule",{value:!0});var h=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var k=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of C(e))!T.call(t,a)&&(n||a!=="default")&&w(t,a,{get:()=>e[a],enumerable:!(s=j(e,a))||s.enumerable});return t},f=(t,e)=>k(O(w(t!=null?q(A(t)):{},"default",!e&&t&&t.__esModule?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var m=h((nt,y)=>{var N={isValid:"bg-success",isSemiValid:"bg-warning",isInvalid:"is-invalid",letterInput:"letter-input",word:"word",wordDisabled:"word--disabled"};y.exports.CLASSES=N});var D=h((rt,x)=>{x.exports.calculate=(t,e)=>{let n=[];return e.split("").forEach((s,a)=>{let i=s.toLowerCase(),l=-1;t.indexOf(i)>-1&&(t[a]===i?l=2:l=1),n.push({letter:s,status:l})}),n}});var g=f(m());var u=f(m()),d={letterInput:`.${u.CLASSES.letterInput}`,letterInputInvalid:`.${u.CLASSES.letterInput}.${u.CLASSES.isInvalid}`,rows:"#rows",word:`.${u.CLASSES.word}`,wordDisabled:`.${u.CLASSES.wordDisabled}`};var I=f(m());function V(t){let{name:e,value:n,disabled:s}=t,a=`${I.CLASSES.letterInput} form-control form-control-lg text-center text-uppercase`;return`<input ${s?"disabled":""} class="${a}" type="text" maxlength="1" name="${e}" aria-label="${e}" ${n?`value=${n}`:""} required="required">`}function K(t){let e="";return t.forEach(n=>{let{name:s,value:a,disabled:i}=n;e+=`<div class="letter-wrapper">${V({name:s,value:a,disabled:i})}</div>`}),e}function L(t){let{initialValue:e}=t,n="";for(let s=0;s<6;s+=1){let a=[],i=!0;e[s]?.disabled===!1&&(i=!1);for(let l=0;l<5;l+=1){let c="";e[s]?.letters[l]&&(c=e[s].letters[l].letter),a.push({name:`${s}-${l}`,value:c,disabled:i})}n+=`<div data-row="${s}" class="word d-flex justify-content-center ${i?"word--disabled":""}">${K(a)}</div>`}return n}var p=f(m());function E(t){let e=document.querySelector(`${d.rows} ${d.word}[data-row="${t}"]`);e.classList.remove(p.CLASSES.wordDisabled),e.querySelectorAll(d.letterInput).forEach((s,a)=>{s.disabled=!1,a===0&&s.focus()})}function S(t){t.querySelectorAll(d.letterInput).forEach(n=>{n.disabled=!0}),t.classList.add(p.CLASSES.wordDisabled)}function v(t){t.forEach((e,n)=>{e.forEach((s,a)=>{let{status:i}=s,l=document.querySelector(`${d.letterInput}[name="${n}-${a}"]`);i===1&&l.classList.add(p.CLASSES.isSemiValid),i===2&&l.classList.add(p.CLASSES.isValid)})})}var B=f(D()),r={},_=[{letters:[{letter:"",status:0},{letter:"",status:0},{letter:"",status:0},{letter:"",status:0},{letter:"",status:0}],disabled:!1}];function J(){let t="catala",e=new URLSearchParams(window.location.search),n=Object.fromEntries(e.entries());return n.lang==="ca"&&(t="catala"),n.lang==="en"&&(t="english"),t}var o={projectKey:"word-finder",database:[],language:J(),data:_,sortedData:{english:[],catala:[]}};function P(){r.rows=document.getElementById("rows"),r.form=document.querySelector("form"),r.submitButton=document.getElementById("submit"),r.reloadButton=document.getElementById("reload"),r.solution=document.getElementById("solution"),r.playedWords=document.getElementById("played-words"),r.wordCount=document.getElementById("word-count")}function H(){let t=document.getElementById("fireworks_wrapper");t.querySelector(".fireworks").classList.add("pyro"),setTimeout(()=>{t.querySelector(".fireworks").classList.remove("pyro")},1e4)}function $(){let t=localStorage.getItem(o.projectKey);t?(o.sortedData=JSON.parse(t),o.sortedData.english=o.sortedData.english.sort(),o.sortedData.catala=o.sortedData.catala.sort(),r.playedWords.innerText=o.sortedData[o.language].join(", "),r.wordCount.innerText=`(${o.sortedData[o.language].length} / ${o.database.length})`):(localStorage.setItem(o.projectKey,JSON.stringify(o.sortedData)),$())}function U(){o.sortedData[o.language].push(o.solution.join("")),localStorage.setItem(o.projectKey,JSON.stringify(o.sortedData)),$()}function z(t){let e=t.findIndex(n=>n.status<2)===-1;if(e){let n=document.querySelector(`${d.rows} ${d.word}:not(${d.wordDisabled})`);r.submitButton.hidden=!0,r.reloadButton.hidden=!1,S(n),H(),U()}return e}function Z(){r.solution.innerText=o.solution.join(""),r.solution.hidden=!1,r.submitButton.hidden=!0,r.reloadButton.hidden=!1}function F(t){t.preventDefault();let e="",n=document.querySelector(`${d.rows} ${d.word}:not(${d.wordDisabled})`);if(n.querySelectorAll(d.letterInputInvalid).length>0)return;n.querySelectorAll(d.letterInput).forEach(b=>{e+=b.value}),S(n);let i=+n.dataset.row+1;i<6&&E(i);let l=B.calculate(o.solution,e);o.data[+n.dataset.row]=l,v(o.data),!z(l)&&i===6&&Z()}function G(t){let{target:e}=t,{value:n,name:s}=e;if(n!==""&&e.classList.contains(g.CLASSES.letterInput)){let a=/[a-zA-Z]/g,i=n.match(a),l=+s.split("-")[1];if(l<4){let c=`${s.split("-")[0]}-${l+1}`;document.querySelector(`${d.letterInput}[name="${c}"]`).focus()}else l===4&&r.submitButton.focus();i?e.classList.remove(g.CLASSES.isInvalid):e.classList.add(g.CLASSES.isInvalid)}}function Q(){window.location.reload()}function R(){let t=Math.floor(Math.random()*o.database.length),e=o.database[t].split("");return console.log(e),e}function X(){r.form.addEventListener("submit",F),document.addEventListener("keyup",G),r.reloadButton.addEventListener("click",Q)}function Y(){if(X(),o.solution=R(),o.sortedData[o.language].length===o.database.length){r.rows.innerHTML="\u{1F389} Congratulations, you have completed all words! \u{1F44F}",r.submitButton.hidden=!0;return}for(;o.sortedData[o.language].indexOf(o.solution.join(""))>-1;)o.solution=R();o.data=_,r.rows.innerHTML=L({initialValue:o.data})}function tt(){let t=document.getElementById(`button-${o.language}`);t.classList.add("btn-outline-success"),t.classList.remove("btn-outline-secondary")}function et(){P(),tt(),fetch(`./database/${o.language}.json?${new Date().getTime()}`).then(t=>t.json()).then(t=>{o.database=t.words,$(),Y()})}et();})();
