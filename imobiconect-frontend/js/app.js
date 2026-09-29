const properties = [
  {
    id: 1, title: "Casa para alugar / 2 quartos", purpose: "alugar", type: "Casa",
    price: 500, neighborhood: "Centro", rooms: 2, bathrooms: 1, garage: true,
    reference: "Próximo à praça", description: "Casa bem localizada, com ambientes ventilados e espaço confortável.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    contact: "(98) 97066-4000"
  },
  {
    id: 2, title: "Casa com quintal / 3 quartos", purpose: "comprar", type: "Casa",
    price: 185000, neighborhood: "Anil", rooms: 3, bathrooms: 2, garage: true,
    reference: "Próximo ao comércio local", description: "Imóvel com quintal, garagem e três quartos.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    contact: "(98) 97066-4000"
  },
  {
    id: 3, title: "Casa compacta / 1 quarto", purpose: "alugar", type: "Casa",
    price: 420, neighborhood: "Centro", rooms: 1, bathrooms: 1, garage: false,
    reference: "", description: "Opção compacta para quem busca praticidade e localização central.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80",
    contact: "(98) 97066-4000"
  },
  {
    id: 4, title: "Casa ampla / 4 quartos", purpose: "comprar", type: "Casa",
    price: 260000, neighborhood: "Quiabos", rooms: 4, bathrooms: 2, garage: true,
    reference: "Próximo à avenida principal", description: "Casa ampla com quatro quartos e garagem.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    contact: "(98) 97066-4000"
  }
];

const $ = (selector) => document.querySelector(selector);
const grid = $("#propertyGrid");
const count = $("#resultsCount");
const empty = $("#emptyState");

function money(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function purposeLabel(purpose) {
  return purpose === "alugar" ? "Aluguel" : "Venda";
}

function render(list) {
  grid.innerHTML = list.map(p => `
    <article class="card">
      <div class="card-image"><img src="${p.image}" alt="${p.title}"></div>
      <div class="card-body">
        <span class="badge">${purposeLabel(p.purpose)}</span>
        <h3>${p.title}</h3>
        <div class="meta">Bairro: ${p.neighborhood}</div>
        <div class="meta">${p.rooms} quarto${p.rooms !== 1 ? "s" : ""} • ${p.bathrooms} banheiro${p.bathrooms !== 1 ? "s" : ""}</div>
        <div class="price">${money(p.price)}${p.purpose === "alugar" ? "/mês" : ""}</div>
        <button class="secondary" onclick="openProperty(${p.id})">Ver detalhes</button>
      </div>
    </article>
  `).join("");
  count.textContent = `${list.length} ${list.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`;
  empty.classList.toggle("hidden", list.length !== 0);
}

function selected(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value;
}

function applyFilters() {
  const term = $("#search").value.trim().toLowerCase();
  const purpose = selected("purpose");
  const rooms = Number(selected("rooms"));
  const min = Number($("#minPrice").value || 0);
  const max = Number($("#maxPrice").value || Infinity);

  const filtered = properties.filter(p => {
    const textMatch = !term || `${p.title} ${p.neighborhood} ${p.type}`.toLowerCase().includes(term);
    const purposeMatch = purpose === "todos" || p.purpose === purpose;
    const roomMatch = rooms === 0 || (rooms === 4 ? p.rooms >= 4 : p.rooms === rooms);
    const priceMatch = p.price >= min && p.price <= max;
    return textMatch && purposeMatch && roomMatch && priceMatch;
  });
  render(filtered);
  $("#filters").classList.remove("open");
}

window.openProperty = function(id) {
  const p = properties.find(item => item.id === id);
  $("#propertyDetails").innerHTML = `
    <img class="modal-photo" src="${p.image}" alt="${p.title}">
    <p class="eyebrow">${purposeLabel(p.purpose)}</p>
    <h2>${p.title}</h2>
    <p class="price">${money(p.price)}${p.purpose === "alugar" ? "/mês" : ""}</p>
    <div class="detail-grid">
      <div class="detail-item"><b>Bairro</b><br>${p.neighborhood}</div>
      <div class="detail-item"><b>Quartos</b><br>${p.rooms}</div>
      <div class="detail-item"><b>Banheiros</b><br>${p.bathrooms}</div>
      <div class="detail-item"><b>Garagem</b><br>${p.garage ? "Sim" : "Não"}</div>
    </div>
    ${p.reference ? `<p><b>Ponto de referência:</b> ${p.reference}</p>` : ""}
    <p>${p.description}</p>
    <p><b>Contato do anunciante:</b> ${p.contact}</p>
    <button class="primary full" onclick="showToast('Contato disponível para negociação com o anunciante.')">Falar com o anunciante</button>
  `;
  $("#propertyDialog").showModal();
}

window.showToast = function(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

$("#searchForm").addEventListener("submit", e => { e.preventDefault(); applyFilters(); });
$("#applyFilters").addEventListener("click", applyFilters);
$("#clearFilters").addEventListener("click", () => {
  $("#search").value = ""; $("#minPrice").value = ""; $("#maxPrice").value = "";
  document.querySelector('input[name="purpose"][value="todos"]').checked = true;
  document.querySelector('input[name="rooms"][value="0"]').checked = true;
  render(properties);
});
$("#openFilters").addEventListener("click", () => $("#filters").classList.add("open"));
$("#closeFilters").addEventListener("click", () => $("#filters").classList.remove("open"));
$("#openLogin").addEventListener("click", () => $("#loginDialog").showModal());
$("#openAdvertise").addEventListener("click", () => $("#advertiseDialog").showModal());

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => document.getElementById(btn.dataset.close).close());
});

$("#loginForm").addEventListener("submit", e => {
  e.preventDefault();
  $("#loginDialog").close();
  showToast("Login demonstrativo. Conectaremos esta tela à API depois.");
});

$("#propertyForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  properties.unshift({
    id: Date.now(),
    title: data.title,
    purpose: data.purpose,
    type: data.type,
    price: Number(data.price),
    neighborhood: data.neighborhood,
    rooms: Number(data.rooms),
    bathrooms: Number(data.bathrooms || 1),
    garage: data.garage === "Sim",
    reference: data.reference,
    description: data.description,
    image: data.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
    contact: "Contato do usuário logado"
  });
  e.currentTarget.reset();
  $("#advertiseDialog").close();
  render(properties);
  showToast("Imóvel adicionado ao protótipo.");
});

render(properties);
