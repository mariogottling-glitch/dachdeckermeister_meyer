(() => {
  const data = window.MEYER_HOMEPAGE_DATA;
  if (!data) return;

  const servicesRoot = document.querySelector("[data-home-services]");
  const partnersRoot = document.querySelector("[data-home-partners]");

  if (servicesRoot) {
    servicesRoot.innerHTML = data.services.map(service => `
      <a class="home-service-card" href="${service.href}">
        <figure>
          <img src="${service.image}" alt="${service.alt}" width="1672" height="941" loading="lazy" decoding="async" />
        </figure>
        <div class="home-service-card-copy">
          <span>${service.number} / Leistung</span>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <b aria-hidden="true">↗</b>
        </div>
      </a>
    `).join("");
  }

  if (partnersRoot) {
    partnersRoot.innerHTML = data.partners.map(partner => {
      const tag = partner.href ? "a" : "article";
      const attributes = partner.href
        ? `href="${partner.href}" target="_blank" rel="noopener noreferrer" aria-label="${partner.name} – Website öffnen"`
        : `data-placeholder="true"`;
      const mark = partner.logo
        ? `<div class="home-partner-logo"><img src="${partner.logo}" alt="${partner.alt}" loading="lazy" decoding="async" /></div>`
        : `<div class="home-partner-mark" aria-hidden="true">M</div>`;
      return `
      <${tag} class="home-partner-card" ${attributes}>
        <span>${partner.number}</span>
        ${mark}
        <div>
          <p>${partner.trade}</p>
          <h3>${partner.name}</h3>
          <small>${partner.note}${partner.href ? " ↗" : ""}</small>
        </div>
      </${tag}>`;
    }).join("");
  }

  const alignHashTarget = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: "auto" });
    }));
  };

  alignHashTarget();
  addEventListener("hashchange", alignHashTarget);

  document.querySelectorAll(".home-accordion details").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".home-accordion details").forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  document.addEventListener("click", event => {
    const serviceDetails = event.target.closest(".nav-services");
    document.querySelectorAll(".nav-services[open]").forEach(details => {
      if (details !== serviceDetails) details.removeAttribute("open");
    });
  });
})();
