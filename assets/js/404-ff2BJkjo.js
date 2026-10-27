const e=document.getElementById("countdown");let t=10;if(e){const n=setInterval(()=>{t--,e.textContent=t,t<=0&&(clearInterval(n),window.location.href="/strand-lab/")},1e3)}
