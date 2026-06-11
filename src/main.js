import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  contactLinks,
  galleryFilters,
  galleryImages,
  heroSlides,
  navItems,
  portfolioCategories,
  services,
  testimonials,
} from "./data.js";

const e = React.createElement;
const logoSrc = "/assets/drobbmedia-logo.png";

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return e(
    motion.div,
    {
      className: `section-heading ${align === "center" ? "mx-auto text-center" : ""}`,
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    e("p", { className: "eyebrow" }, eyebrow),
    e("h2", null, title),
    text ? e("p", { className: "section-copy" }, text) : null,
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return e(
    "header",
    { className: `navbar ${scrolled ? "navbar-solid" : ""}` },
    e(
      "a",
      { href: "#top", className: "brand", onClick: () => setOpen(false), "aria-label": "DRobbMedia home" },
      e("img", { src: logoSrc, alt: "", className: "brand-logo" }),
      e("span", null, "DRobbMedia"),
    ),
    e(
      "button",
      {
        className: "nav-toggle",
        type: "button",
        "aria-label": "Toggle navigation",
        "aria-expanded": open,
        onClick: () => setOpen((value) => !value),
      },
      e("span", null),
      e("span", null),
    ),
    e(
      "nav",
      { className: `nav-links ${open ? "nav-open" : ""}`, "aria-label": "Primary navigation" },
      navItems.map((item) =>
        e("a", { key: item.href, href: item.href, onClick: () => setOpen(false) }, item.label),
      ),
    ),
  );
}

function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(id);
  }, []);

  return e(
    AnimatePresence,
    null,
    visible
      ? e(
          motion.div,
          {
            className: "loader",
            initial: { opacity: 1 },
            exit: { opacity: 0, transition: { duration: 0.55 } },
          },
          e(motion.div, {
            className: "loader-line",
            initial: { scaleX: 0 },
            animate: { scaleX: 1 },
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }),
          e("p", null, "DRobbMedia"),
        )
      : null,
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 140]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return e(
    "section",
    { id: "top", className: "hero-section" },
    e(
      "div",
      { className: "hero-media", "aria-hidden": "true" },
      e(
        AnimatePresence,
        { mode: "wait" },
        e(motion.img, {
          key: heroSlides[index].src,
          src: heroSlides[index].src,
          alt: "",
          className: "hero-image",
          style: { y: imageY },
          initial: { opacity: 0, scale: 1.04 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.02 },
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        }),
      ),
    ),
    e("div", { className: "hero-overlay" }),
    e(
      motion.div,
      {
        className: "hero-content",
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
        },
      },
      e(
        motion.div,
        {
          variants: {
            hidden: { y: 36, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          },
        },
        e("img", { src: logoSrc, alt: "DRobbMedia logo", className: "hero-logo" }),
        e("h1", null, "DRobbMedia"),
      ),
      e(
        motion.p,
        {
          className: "hero-tagline",
          variants: {
            hidden: { y: 30, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          },
        },
        "Sports, Events, & Commercial Photography",
      ),
      e(
        motion.p,
        {
          className: "hero-intro",
          variants: {
            hidden: { y: 28, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          },
        },
        "Cinematic coverage for fast-moving sport, live events, and wedding moments that deserve to feel as powerful as they looked.",
      ),
      e(
        motion.div,
        {
          className: "hero-actions",
          variants: {
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          },
        },
        e("a", { className: "btn btn-light", href: "#portfolio" }, "View Portfolio"),
        e("a", { className: "btn btn-dark", href: "#contact" }, "Book a Shoot"),
      ),
    ),
    e("a", { href: "#about", className: "scroll-indicator", "aria-label": "Scroll to about section" }, e("span", null)),
  );
}

function About() {
  return e(
    "section",
    { id: "about", className: "section about-section" },
    e(
      "div",
      { className: "site-grid about-grid" },
      e(
        "div",
        null,
        e(SectionHeading, {
          eyebrow: "About",
          title: "Fast when it matters. Quiet when the moment needs space.",
          text:
            "DRobbMedia captures fast-paced sport, live events, and wedding stories with a cinematic, professional style. The work is built around movement, atmosphere, and clean emotion.",
        }),
        e("div", { className: "about-stats" }, e("span", null, "Sport"), e("span", null, "Events"), e("span", null, "Weddings")),
      ),
      e(
        motion.div,
        {
          className: "portrait-frame",
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
        e("img", { src: "/assets/photos/unnamed.jpg", alt: "DRobbMedia portrait placeholder" }),
        e("div", { className: "portrait-caption" }, "Replace with your portrait or behind-the-camera image"),
      ),
    ),
  );
}

function ImageCard({ item, large = false }) {
  return e(
    motion.article,
    {
      className: `image-card ${large ? "image-card-large" : ""}`,
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-70px" },
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
    e("img", { src: item.src, alt: `${item.title} photography placeholder`, loading: "lazy" }),
    e("div", { className: "card-shade" }),
    e(
      "div",
      { className: "image-card-copy" },
      e("h3", null, item.title),
      item.description ? e("p", null, item.description) : e("p", null, item.category),
      e("a", { href: "#galleries" }, "View Gallery"),
    ),
  );
}

function PortfolioCategories() {
  return e(
    "section",
    { id: "portfolio", className: "section section-black" },
    e(
      "div",
      { className: "site-container" },
      e(SectionHeading, {
        eyebrow: "Portfolio",
        title: "Coverage with atmosphere, pace, and polish.",
        text: "Five clear lanes for the work you will replace with final DRobbMedia galleries when ready.",
      }),
      e(
        "div",
        { className: "portfolio-grid" },
        portfolioCategories.map((item, index) => e(ImageCard, { key: item.title, item, large: index === 0 })),
      ),
    ),
  );
}

function GalleryGrid() {
  const [active, setActive] = useState("All");
  const visibleImages = useMemo(
    () => (active === "All" ? galleryImages : galleryImages.filter((image) => image.category === active)),
    [active],
  );

  return e(
    "section",
    { id: "galleries", className: "section gallery-section" },
    e(
      "div",
      { className: "site-container" },
      e(SectionHeading, {
        eyebrow: "Featured Galleries",
        title: "A flexible image system for sport, weddings, events, and portraits.",
        text: "Filter the placeholders now, then swap the image paths in one data file later.",
        align: "center",
      }),
      e(
        "div",
        { className: "filter-row", role: "tablist", "aria-label": "Gallery filters" },
        galleryFilters.map((filter) =>
          e(
            "button",
            {
              key: filter,
              type: "button",
              className: active === filter ? "filter-button filter-active" : "filter-button",
              onClick: () => setActive(filter),
            },
            filter,
          ),
        ),
      ),
      e(
        motion.div,
        { className: "gallery-grid", layout: true },
        e(
          AnimatePresence,
          null,
          visibleImages.map((image, index) =>
            e(
              motion.figure,
              {
                key: image.src + active,
                className: `gallery-item span-${(index % 5) + 1}`,
                layout: true,
                initial: { opacity: 0, y: 24, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 16, scale: 0.98 },
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
              e("img", { src: image.src, alt: `${image.title} placeholder`, loading: "lazy" }),
              e("figcaption", null, e("span", null, image.category), image.title),
            ),
          ),
        ),
      ),
    ),
  );
}

function Services() {
  return e(
    "section",
    { id: "services", className: "section section-black services-section" },
    e(
      "div",
      { className: "site-container" },
      e(SectionHeading, {
        eyebrow: "Services",
        title: "Premium coverage, built around the day.",
        text: "Simple package lanes with room to refine pricing once your final offer is locked.",
      }),
      e(
        "div",
        { className: "services-grid" },
        services.map((service) =>
          e(
            motion.article,
            {
              key: service.title,
              className: "service-card",
              initial: { opacity: 0, y: 26 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
            e("div", null, e("h3", null, service.title), e("p", null, service.description)),
            e("ul", null, service.includes.map((item) => e("li", { key: item }, item))),
            e("div", { className: "service-footer" }, e("strong", null, service.price), e("a", { href: "#contact" }, "Enquire")),
          ),
        ),
      ),
    ),
  );
}

function Testimonials() {
  return e(
    "section",
    { className: "section testimonials-section" },
    e(
      "div",
      { className: "site-container" },
      e(SectionHeading, {
        eyebrow: "Testimonials",
        title: "Placeholder reviews with the right tone.",
        text: "Replace these once you have real client feedback.",
        align: "center",
      }),
      e(
        "div",
        { className: "testimonial-grid" },
        testimonials.map((testimonial) =>
          e(
            motion.article,
            {
              key: testimonial.detail,
              className: "testimonial-card",
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
            e("p", null, `"${testimonial.quote}"`),
            e("div", null, e("strong", null, testimonial.name), e("span", null, testimonial.detail)),
          ),
        ),
      ),
    ),
  );
}

function ContactForm() {
  return e(
    "section",
    { id: "contact", className: "section contact-section" },
    e(
      "div",
      { className: "site-grid contact-grid" },
      e(
        "div",
        null,
        e(SectionHeading, {
          eyebrow: "Book a Shoot",
          title: "Tell me what you need covered.",
          text: "Use this enquiry form as the front door for weddings, sport, events, portraits, and content shoots.",
        }),
        e(
          "div",
          { className: "contact-links" },
          contactLinks.map((link) =>
            e("a", { key: link.label, href: link.href }, e("span", null, link.label), e("strong", null, link.value)),
          ),
        ),
      ),
      e(
        "form",
        {
          className: "contact-form",
          action: "mailto:hello@drobbmedia.com",
          method: "post",
          encType: "text/plain",
        },
        e("label", null, "Name", e("input", { name: "name", type: "text", placeholder: "Your name", required: true })),
        e("label", null, "Email", e("input", { name: "email", type: "email", placeholder: "you@example.com", required: true })),
        e("label", null, "Phone", e("input", { name: "phone", type: "tel", placeholder: "+61 ..." })),
        e(
          "label",
          null,
          "Shoot type",
          e(
            "select",
            { name: "shootType", defaultValue: "Sports Coverage" },
            ["Sports Coverage", "Wedding Photography", "Event Photography", "Portraits", "Highlight Reels"].map((option) =>
              e("option", { key: option, value: option }, option),
            ),
          ),
        ),
        e("label", null, "Event date", e("input", { name: "eventDate", type: "date" })),
        e("label", null, "Location", e("input", { name: "location", type: "text", placeholder: "Suburb, venue, or ground" })),
        e("label", { className: "full" }, "Message", e("textarea", { name: "message", rows: 5, placeholder: "Share the date, coverage needs, and anything I should know." })),
        e("button", { className: "btn btn-light full", type: "submit" }, "Submit Enquiry"),
      ),
    ),
  );
}

function Footer() {
  return e(
    "footer",
    { className: "footer" },
    e(
      "a",
      { href: "#top", className: "brand", "aria-label": "DRobbMedia home" },
      e("img", { src: logoSrc, alt: "", className: "brand-logo" }),
      e("span", null, "DRobbMedia"),
    ),
    e("nav", { "aria-label": "Footer navigation" }, navItems.map((item) => e("a", { key: item.href, href: item.href }, item.label))),
    e("div", { className: "footer-social" }, e("a", { href: "https://instagram.com/drobbmedia" }, "Instagram"), e("a", { href: "mailto:hello@drobbmedia.com" }, "Email")),
    e("p", null, `Copyright ${new Date().getFullYear()} DRobbMedia. All rights reserved.`),
  );
}

function App() {
  return e(
    React.Fragment,
    null,
    e(Loader),
    e(Navbar),
    e("main", null, e(Hero), e(PortfolioCategories), e(GalleryGrid), e(Services), e(Testimonials), e(About), e(ContactForm)),
    e(Footer),
  );
}

createRoot(document.getElementById("root")).render(e(App));
