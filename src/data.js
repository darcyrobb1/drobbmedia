// Replace image paths here when your final DRobbMedia galleries are ready.
// Keep the same object shape and point `src` to files in /assets/photos or /images.

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides = [
  {
    src: "/assets/photos/sport/RL1D4598.jpg",
    title: "Two centered Colts players smiling after play",
    position: "center 36%",
  },
  {
    src: "/assets/photos/sport/RL1D4836.JPG",
    title: "Centered Colts player kicking in warmup",
    position: "center center",
  },
  {
    src: "/assets/photos/sport/RL1D5141.JPG",
    title: "Two centered players contesting the ball",
    position: "center 42%",
  },
  {
    src: "/assets/photos/sport/RL1D5520.JPG",
    title: "Centered marking contest in front of goal",
    position: "center 48%",
  },
  {
    src: "/assets/photos/sport/RL1D5912 copy.jpg",
    title: "Zoomed-out marking contest with grass visible",
    position: "center bottom",
  },
  {
    src: "/assets/photos/sport/RL1D8789.JPG",
    title: "Centered Colts player celebrating",
    position: "center 34%",
  },
  {
    src: "/assets/photos/sport/RL1D0904.JPG",
    title: "Centered player preparing to handball",
    position: "center 42%",
  },
  {
    src: "/assets/photos/sport/RL1D9987.jpg",
    title: "Centered Colts player breaking through traffic",
    position: "center 40%",
  },
];

export const portfolioSections = [
  {
    id: "portfolio-sports",
    nextId: "portfolio-events",
    number: "01",
    title: "Sports",
    text: "Action, emotion, pressure, and the moments that decide the game.",
    photos: [
      "/assets/photos/sport/IMG_1435.jpg",
      "/assets/photos/sport/RL1D0146 copy.JPG",
      "/assets/photos/sport/RL1D0453.JPG",
      "/assets/photos/sport/RL1D2589.jpg",
      "/assets/photos/sport/RL1D4371.JPG",
      "/assets/photos/sport/RL1D4598.jpg",
      "/assets/photos/sport/RL1D5520.JPG",
      "/assets/photos/sport/RL1D8789.JPG",
    ],
  },
  {
    id: "portfolio-events",
    nextId: "portfolio-commercial",
    number: "02",
    title: "Events",
    text: "Atmosphere, detail, people, and coverage built around the room.",
    photos: [
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/1-RL1D2680.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/1-RL1D3082.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/11-RL1D3523.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/7-RL1D3374.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/8-RL1D3414.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/DSC00269.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/DSC00326.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_0172.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_1148.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_1580.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_1709.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_1775.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/IMG_9731.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/RL1D3419.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/event/RL1D3499.jpg",
    ],
  },
  {
    id: "portfolio-commercial",
    number: "03",
    title: "Commercial",
    text: "Clean brand imagery for teams, people, products, and campaigns.",
    photos: [
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/IMG_2253.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D1584.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D1610.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D1632.jpg",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D2381.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D2406.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D2425.JPG",
      "https://raw.githubusercontent.com/darcyrobb1/drobbmedia/main/assets/photos/commercial/RL1D2430.JPG",
    ],
  },
];

export const services = [
  {
    title: "Sports Coverage",
    description: "Sharp, fast-paced coverage for clubs, teams, tournaments, and individual athletes.",
    includes: ["Pre-game details", "Action coverage", "Edited gallery delivery", "Social-ready selects"],
    price: "From $___",
  },
  {
    title: "Event Photography",
    description: "Polished event coverage built for brands, venues, communities, and milestone moments.",
    includes: ["Arrival and detail shots", "Candid guest coverage", "Key moments", "Fast preview delivery"],
    price: "From $___",
  },
  {
    title: "Commercial Photography",
    description: "Clean brand imagery for businesses, teams, campaigns, products, and social content.",
    includes: ["Planning call", "Shot list", "Edited commercial gallery", "Web and social-ready files"],
    price: "From $___",
  },
  {
    title: "Highlight Reels",
    description: "Short-form motion coverage for sport, events, weddings, and behind-the-scenes stories.",
    includes: ["Vertical video capture", "Music-led edit", "Caption-safe framing", "Platform-ready export"],
    price: "From $___",
  },
];

export const contactLinks = [
  { label: "Email", value: "hello@drobbmedia.com", href: "mailto:hello@drobbmedia.com" },
  { label: "Instagram", value: "@drobbmedia", href: "https://instagram.com/drobbmedia" },
  { label: "Phone", value: "+61 ___ ___ ___", href: "tel:+61000000000" },
];
