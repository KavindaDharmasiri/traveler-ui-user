// src/components/ThemeColors.jsx
import React from "react";

export default function ThemeStyles() {
  return (
    <style>{`
      :root {
        --primary: #217964;
        --primary-dark: #154d40;
        --primary-light: #36bfa0;

        --background-light: #ffffff;
        --background-dark: #0f172a;

        --surface-light: #f3f4f6;
        --surface-dark: #1e293b;
      }

      /* Light-mode utility classes (match your class names) */
      .bg-primary { background-color: var(--primary); }
      .bg-primary-dark { background-color: var(--primary-dark); }
      .bg-primary-light { background-color: var(--primary-light); }
      .bg-background-light { background-color: var(--background-light); }
      .bg-background-dark { background-color: var(--background-dark); }
      .bg-surface-light { background-color: var(--surface-light); }
      .bg-surface-dark { background-color: var(--surface-dark); }

      .text-primary { color: var(--primary); }
      .text-primary-dark { color: var(--primary-dark); }
      .text-primary-light { color: var(--primary-light); }

      .border-primary { border-color: var(--primary); }
      .ring-primary { --tw-ring-color: var(--primary); } /* works with Tailwind ring utilities */

      /* Dark-variant versions of your custom classes.
         NOTE: colon in class must be escaped with \\: in CSS.
         These activate when a parent has .dark class (Tailwind darkMode class style). */
      .dark .dark\\:bg-background-dark { background-color: var(--background-dark); }
      .dark .dark\\:bg-surface-dark { background-color: var(--surface-dark); }

      /* Optional: if you ever use dark:text-primary, etc */
      .dark .dark\\:text-primary { color: var(--primary); }

      /* ---- Your existing custom CSS from the page can also live here ---- */
      .hero-bg {
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5)),
          url(https://images.pexels.com/photos/840719/pexels-photo-840719.jpeg);
        background-size: cover;
        background-position: center 100%;
      }

      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      .glass-word { position: relative; display: inline-block; }
      .glass-base{
        position: relative; z-index: 1;
        color: rgba(255,255,255,0.22);
        text-shadow:
          0 1px 0 rgba(255,255,255,0.25),
          0 2px 0 rgba(255,255,255,0.15),
          0 6px 14px rgba(0,0,0,0.35);
      }
      .glass-blur{
        position: absolute; inset: 0; z-index: 2; pointer-events: none;
        color: rgba(255,255,255,0.28);
        filter: blur(3px);
        opacity: 0.9;
      }
      .glass-highlight{
        position: absolute; inset: 0; z-index: 3; pointer-events: none;
        background: linear-gradient(
          135deg,
          rgba(255,255,255,0.85) 0%,
          rgba(255,255,255,0.25) 45%,
          rgba(255,255,255,0.05) 70%,
          rgba(255,255,255,0) 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .nav-link {
        position: relative;
        padding: 10px 14px;
        border-radius: 9999px;
        transition: color 200ms ease, background 200ms ease;
      }

      .nav-link.active {
        color: rgba(255,255,255,0.98);
        background: rgba(255,255,255,0.10);
        backdrop-filter: blur(10px) saturate(160%);
        -webkit-backdrop-filter: blur(10px) saturate(160%);
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.22),
          0 12px 30px rgba(0,0,0,0.28);
      }

      .nav-link.active::before {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: 9999px;
        background: linear-gradient(
          135deg,
          rgba(255,255,255,0.55) 0%,
          rgba(255,255,255,0.18) 35%,
          rgba(255,255,255,0.04) 70%,
          rgba(255,255,255,0) 100%
        );
        opacity: 0.75;
        pointer-events: none;
      }

      .nav-link:not(.active):hover {
        color: #fff;
        background: rgba(255,255,255,0.06);
      }
    `}</style>
  );
}
