import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t py-6 text-center text-gray-600">
      <p>© {new Date().getFullYear()} PlasticSwap. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
