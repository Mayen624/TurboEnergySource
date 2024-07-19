// An array of links for navigation bar
const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Productos", url: "/products" },
  { name: "Serviciós", url: "/services" },
  { name: "Contactanos", url: "/contact" },
  { name: "Sobre nosotros", url: "/about"}
];
// An array of links for footer
const footerLinks = [
  {
    section: "*",
    links: [
      { name: "Nuestros serviciós", url: "/services" },
      { name: "Nuestros productos", url: "/products" },
      { name: "Contactenos", url: "/contact" },
    ],
  },
  // {
  //   section: "*",
  //   links: [
  //     { name: "About us", url: "#" },
  //     { name: "Blog", url: "/blog" },
  //     { name: "Careers", url: "#" },
  //     { name: "Customers", url: "#" },
  //   ],
  // },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "https://www.google.com/",
  slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};