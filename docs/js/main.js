console.log(">> Ready :)");const i=document.querySelector(".list-element"),l=document.querySelector(".cart-list"),h=document.querySelector(".button-remove"),C=document.querySelector(".search-input"),v=document.querySelector(".search-button");let r=[],s=[];const u=()=>{localStorage.setItem("cart",JSON.stringify(s))},L=()=>{const t=localStorage.getItem("cart");t&&(s=JSON.parse(t),a())},m=t=>{i.innerHTML="",t.forEach(n=>{const d=document.createElement("li"),e=document.createElement("button");e.dataset.id=n.id,s.some(o=>o.id===n.id)?(e.textContent="Remove",e.classList.add("add-button--red")):(e.textContent="Add",e.classList.add("add-button")),d.innerHTML=`
      <div class="product-img"><img src="${n.image}" alt="${n.title}"></div>
      <h3 class="product-title">${n.title}</h3>
      <p>${n.price} €</p>
    `,d.appendChild(e),e.addEventListener("click",()=>{const o=parseInt(e.dataset.id),p=r.find(c=>c.id===o);s.some(c=>c.id===o)?(s=s.filter(c=>c.id!==o),e.textContent="Add",e.classList.remove("add-button--red"),e.classList.add("add-button")):(s.push(p),e.textContent="Remove",e.classList.remove("add-button"),e.classList.add("add-button--red")),a(),u()}),i.appendChild(d)})},a=()=>{l.innerHTML="",s.forEach(t=>{const n=document.createElement("li");n.innerHTML=`
      <div class="product-img"><img src="${t.image}" alt="${t.title}"></div>
      <h3 class="product-title">${t.title}</h3>
      <p>${t.price} €</p>
    `,l.appendChild(n)})},b=()=>{s=[],a(),u(),document.querySelectorAll(".add-button, .add-button--red").forEach(t=>{t.textContent="Add",t.classList.remove("add-button--red"),t.classList.add("add-button")})};h.addEventListener("click",b);const f=()=>{const t=C.value.toLowerCase(),n=r.filter(d=>d.title.toLowerCase().includes(t));m(n)};v.addEventListener("click",f);fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{r=t,L(),m(r)});
//# sourceMappingURL=main.js.map
