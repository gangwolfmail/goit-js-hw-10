import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-ceb9b81e.js";const s=document.querySelector(".form");function n(r){r.preventDefault();const t=s.delay.value,o=s.state.value;new Promise((e,m)=>{o==="fulfilled"?setTimeout(()=>e(t),t):o==="rejected"&&setTimeout(()=>m(t),t)}).then(e=>{i.success({message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{i.error({message:`❌Rejected promise in ${e}ms`,position:"topRight"})})}s.addEventListener("submit",n);
//# sourceMappingURL=commonHelpers2.js.map
