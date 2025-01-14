"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <div>
          <p className="text-sm leading-5 text-gray-700 text-center sm:text-left">
            &copy; 2024 Shoes Anjor. Todos los derechos reservados
          </p>
        </div>
        <div className="flex items-center gap-4 ">
          <Facebook
            onClick={() => window.open("https://www.facebook.com/")}
            target="_blank"
            size={20}
            className=" text-gray-500 hover:text-primary"
          />
          <Instagram
            onClick={() => window.open("https://www.instagram.com/")}
            target="_blank"
            size={20}
            className="text-gray-500 hover:text-primary"
          />
          <Twitter
            onClick={() => window.open("https://x.com/")}
            target="_blank"
            size={20}
            className="text-gray-500 hover:text-primary"
          />
        </div>
      </div>
    </footer>
  );
}
