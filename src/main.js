import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  contactLinks,
  heroSlides,
  navItems,
  portfolioSections,
  services,
} from "./data.js";

const e = React.createElement;
const logoSrc = "/assets/drobbmedia-logo.png";

function shuffled(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

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
  const slides = useMemo(() => shuffled(heroSlides), []);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 140]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

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
          key: slides[index].src,
          src: slides[index].src,
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
        "Cinematic coverage for fast-moving sport, high quality commercial photography for businesses, and capturing all types of events to last a lifetime.",
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
    e("a", { href: "#portfolio", className: "scroll-indicator", "aria-label": "Scroll to portfolio section" }, e("span", null)),
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
            "DRobbMedia captures fast-paced sport, live events, and commercial stories with a cinematic, professional style. The work is built around movement, atmosphere, and clean emotion.",
        }),
        e("div", { className: "about-stats" }, e("span", null, "Sport"), e("span", null, "Events"), e("span", null, "Commercial")),
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
        e("img", { src: "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/unnamed.jpg", alt: "DRobbMedia portrait placeholder" }),
        e("div", { className: "portrait-caption" }, "Replace with your portrait or behind-the-camera image"),
      ),
    ),
  );
}

function PortfolioPanel({ section }) {
  const panelRef = useRef(null);
  const photos = useMemo(() => shuffled(section.photos), [section.photos]);
  const isSports = section.id === "portfolio-sports";
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start start", "55% start"],
  });
  const sportsOpacity = useTransform(scrollYProgress, [0, 0.42, 1], [1, 0.86, 0]);
  const sportsY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const sportsScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1.08, 0.72]);
  const sportsBlur = useTransform(scrollYProgress, [0, 0.65, 1], ["blur(0px)", "blur(0px)", "blur(18px)"]);

  return e(
    "article",
    { ref: panelRef, key: section.id, id: section.id, className: `portfolio-panel ${isSports ? "portfolio-panel-featured" : ""}` },
    e(
      motion.div,
      {
        className: "portfolio-panel-copy",
        style: isSports ? { opacity: sportsOpacity, y: sportsY, scale: sportsScale, filter: sportsBlur } : undefined,
        initial: { opacity: 0, y: isSports ? 80 : 34 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: isSports ? 0.72 : 0.36 },
        transition: { duration: isSports ? 0.95 : 0.7, ease: [0.16, 1, 0.3, 1] },
      },
      e("p", { className: "eyebrow" }, `Portfolio / ${section.number}`),
      e("h2", null, section.title),
      e("p", null, section.text),
    ),
    e(
      "div",
      { className: "portfolio-photo-grid", "aria-label": `${section.title} portfolio photos` },
      photos.map((photo, photoIndex) =>
        e(
          motion.figure,
          {
            key: photo,
            className: "portfolio-photo-tile",
            initial: { opacity: 0, y: 42, scale: 0.96 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.7, delay: Math.min(photoIndex, 5) * 0.05, ease: [0.16, 1, 0.3, 1] },
          },
          e("img", { src: photo, alt: `${section.title} portfolio photo ${photoIndex + 1}`, loading: photoIndex < 3 ? "eager" : "lazy" }),
        ),
      ),
    ),
    section.nextId
      ? e(
          "div",
          { className: "portfolio-scroll-trigger", "data-next-section": section.nextId },
          e("a", { href: `#${section.nextId}` }, `Continue to ${section.nextId === "portfolio-events" ? "Events" : "Commercial"}`),
          e("span", { "aria-hidden": true }),
        )
      : null,
  );
}

function PortfolioCategories() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const viewed = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const nextId = entry.target.getAttribute("data-next-section");
          if (!nextId || viewed.has(nextId)) return;
          viewed.add(nextId);
          window.setTimeout(() => {
            document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 280);
        });
      },
      { threshold: 0.78 },
    );

    document.querySelectorAll("[data-next-section]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return e(
    "section",
    { id: "portfolio", className: "portfolio-showcase" },
    portfolioSections.map((section) => e(PortfolioPanel, { key: section.id, section })),
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
          text: "Use this enquiry form as the front door for sport, events, commercial projects, and highlight reels.",
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
            ["Sports Coverage", "Event Photography", "Commercial Photography", "Highlight Reels"].map((option) =>
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
    e("main", null, e(Hero), e(PortfolioCategories), e(Services), e(About), e(ContactForm)),
    e(Footer),
  );
}

createRoot(document.getElementById("root")).render(e(App));
