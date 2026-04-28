import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-blue paper-texture flex flex-col">

      <div className="flex-grow flex items-center justify-center px-4">

        <div className="flex flex-col items-center w-full max-w-5xl">

          <div className="mb-10 relative -translate-y-6">
            <div className="bg-sunny-yellow px-6 py-3 rounded-bubble sketch-border rotate-2 hover:rotate-0 transition-transform floating-animation">
              <h1 className="font-display font-black text-3xl md:text-4xl tracking-tight">
                🐾 PawPort
              </h1>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2
              className="
                font-display font-black
                text-5xl md:text-7xl
                leading-tight
                mb-6
                whitespace-nowrap
              "
            >
              Cel mai bun{" "}
              <span className="text-white drop-shadow-[4px_4px_0px_#1E293B]">
                prieten
              </span>{" "}
              te așteaptă!
            </h2>

            <p className="font-handwriting text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
              Locul unde animalele își găsesc o nouă familie.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-6">

            <button
              onClick={() => navigate("/adopta")}
              className="
                bg-grass-green
                px-12 py-8
                rounded-wiggly
                sketch-border
                flex flex-col items-center
                gap-3
                font-display font-black
                text-lg md:text-xl
                hover:scale-105
                wiggle-hover
                transition-all
              "
            >
              <span className="material-symbols-outlined text-4xl">
                pets
              </span>
              Adoptă un Animal
            </button>

            <button
              onClick={() => navigate("/ofera")}
              className="
                bg-berry-pink
                px-12 py-8
                rounded-wiggly
                sketch-border
                flex flex-col items-center
                gap-3
                font-display font-black
                text-lg md:text-xl
                hover:scale-105
                wiggle-hover
                transition-all
              "
            >
              <span className="material-symbols-outlined text-4xl">
                home
              </span>
              Oferă spre Adopție
            </button>

          </div>

        </div>
      </div>

      <footer className="w-full text-center py-6 font-sketch text-sm opacity-60 border-t border-ink-black/10">
        © 2026 PawPort • Din suflet, pentru animale. 🐾
      </footer>
    </div>
  );
}