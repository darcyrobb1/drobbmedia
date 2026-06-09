const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const filterButtons = document.querySelectorAll("[data-filter]");
const tiles = document.querySelectorAll(".photo-tile");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    tiles.forEach((tile) => {
      tile.classList.toggle("is-hidden", filter !== "all" && tile.dataset.category !== filter);
    });
  });
});

const lightbox = document.querySelector("[data-lightbox-modal]");
const lightboxImage = lightbox?.querySelector("img");
const lightboxTitle = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector("img")?.alt || "";
    lightboxTitle.textContent = button.dataset.title || "";
    lightbox.hidden = false;
    lightboxClose?.focus();
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const toast = document.querySelector("[data-toast]");
let toastTimer;

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!toast) return;
    const name = button.dataset.product || "this photo";
    toast.querySelector("p").innerHTML = `<strong>${name}</strong> is ready for a Stripe Payment Link.`;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  });
});

const contactForm = document.querySelector("[data-contact-form]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.querySelector("[data-form-note]");
  if (note) note.hidden = false;
  contactForm.reset();
});
