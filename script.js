// Add your future websites here.
const spaces = [
  {
    name: "Photography",
    label: "NOW",
    description: "Light, places, people, and moments worth keeping.",
    url: "https://photo.suntianji.com"
  },
  {
    name: "Websites",
    label: "VISIT",
    description: "Explore six websites.",
    links: [
      { name: "Webs", url: "https://webs.suntianji.com" },
      { name: "Web 1", url: "https://web1.suntianji.com" },
      { name: "Web 2", url: "https://web2.suntianji.com" },
      { name: "Web 3", url: "https://web3.suntianji.com" },
      { name: "Web 4", url: "https://web4.suntianji.com" },
      { name: "Web 5", url: "https://web5.suntianji.com" }
    ]
  },
  {
    name: "Others",
    label: "SOON",
    description: "Everything that belongs outside the usual categories.",
    url: "https://test.suntianji.com"
  }
];

const cards = document.querySelector("#cards");

cards.innerHTML = spaces.map((space, index) => {
  const content = `
    <div class="card-top">
      <span>0${index + 1} / ${space.label}</span>
      <span class="card-arrow">&nearr;</span>
    </div>
    ${space.links ? `
      <div class="website-links">
        ${space.links.map(link => `
          <a href="${link.url}">${link.name}<span>&nearr;</span></a>
        `).join("")}
      </div>
    ` : ""}
    <div class="card-copy">
      <h3>${space.name}</h3>
      <p>${space.description}</p>
    </div>
  `;

  return space.links
    ? `<article class="card card-with-links reveal">${content}</article>`
    : `<a class="card reveal" href="${space.url}">${content}</a>`;
}).join("");

document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const orbStage = document.querySelector(".orb-stage");
const interactiveOrbs = document.querySelectorAll(".orb-stage > div");

orbStage.addEventListener("pointermove", event => {
  const bounds = orbStage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  interactiveOrbs.forEach((orb, index) => {
    const force = 28 + index * 18;
    orb.style.translate = `${x * force}px ${y * force}px`;
  });
});

orbStage.addEventListener("pointerleave", () => {
  interactiveOrbs.forEach(orb => {
    orb.style.translate = "";
  });
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", event => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `perspective(750px) rotateX(${-y * 11}deg) rotateY(${x * 11}deg) translateY(-14px) scale(1.025)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
