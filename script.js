const toggle=document.getElementById("themeToggle");
toggle.addEventListener("click",()=>{
 const dark=document.documentElement.dataset.theme==="dark";
 document.documentElement.dataset.theme=dark?"light":"dark";
 toggle.textContent=dark?"🌙 Dark":"☀️ Light";
 toggle.setAttribute("aria-pressed",String(!dark));
});
