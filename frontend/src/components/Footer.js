import React from "react";

const Footer = () => {
      const currentYear = new Date().getFullYear();  

  return (
    <footer className="p-3 bg-dark text-white mt-4 fixed-bottom">
      <article className="text-center my-auto">
      IPVC ESTG - Desenvolvimento Web e Multimédia &copy; - {currentYear}
      </article>
    </footer>
  );
};

export default Footer;
