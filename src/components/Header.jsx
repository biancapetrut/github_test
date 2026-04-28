import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="
        sticky 
        top-0 
        z-50
        w-full
        px-10 py-6
        border-b border-ink-black/10
        bg-sky-blue paper-texture
        relative
        flex items-center
      "
    >
      <Link
        to="/"
        className="
          bg-sunny-yellow
          px-4 py-2
          rounded-bubble
          sketch-border
          rotate-2
          hover:rotate-0
          transition-transform
        "
      >
        <span className="font-display font-black text-2xl">
          🐾 PawPort
        </span>
      </Link>

      <nav
        className="
          absolute
          left-1/2
          -translate-x-1/2
          flex gap-6
        "
      >
        <Link
          to="/adopta"
          className="
            bg-grass-green
            px-6 py-2
            rounded-full
            sketch-border
            font-handwriting font-bold
            text-base
            hover:scale-105
            active:scale-95
            transition-transform
          "
        >
          Adoptă
        </Link>

        <Link
          to="/ofera"
          className="
            bg-berry-pink
            px-6 py-2
            rounded-full
            sketch-border
            font-handwriting font-bold
            text-base
            hover:scale-105
            active:scale-95
            transition-transform
          "
        >
          Oferă spre adopție
        </Link>

        
        <Link
        to="/contact"
        className="bg-white px-6 py-2 rounded-full sketch-border font-handwriting font-bold text-base hover:scale-105 transition-transform"
        >
        Contactează‑ne
        </Link>

      </nav>
    </header>
  );
}