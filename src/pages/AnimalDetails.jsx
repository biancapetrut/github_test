import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import AdoptForm from "../components/AdoptForm";
import AdoptModal from "../components/AdoptModal";
import { useNavigate } from "react-router-dom";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/pets.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id));
        setAnimal(found);
      });
  }, [id]);

  if (!animal) return null;

  
  const statusStyles = {
    disponibil: "bg-green-100 text-green-700",
    rezervat: "bg-yellow-100 text-yellow-800",
  };


  return (
    <div className="min-h-screen bg-sky-blue paper-texture">
      <Header />

      <main className="relative max-w-[1400px] mx-auto px-8 py-8 grid grid-cols-12 gap-10">

        <button
          onClick={() => navigate(-1)}
          className="
            absolute
            left-0
            top-8
            -translate-x-9
            w-11
            h-11
            rounded-full
            bg-grass-green
            backdrop-blur-sm
            sketch-border
            flex
            items-center
            justify-center
            text-2xl        
            font-black
            hover:bg-sunny-yellow
            transition
            z-10
            shadow-md
          "
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>

        </button>

        <aside className="col-span-3 bg-white/70 backdrop-blur-sm rounded-xl p-6">
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={animal.poza_url}
              alt={animal.nume}
              className="w-full h-full object-cover"
            />
          </div>

         <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-black">
            {animal.nume}
          </h1>

          <div className="ml-auto">
            <span
                className={`
                  px-4
                  py-0.5
                  rounded-full
                  text-sm
                  font-bold
                  ${statusStyles[animal.status] ?? "bg-gray-100 text-gray-700"}
                `}
              >
                {animal.status.toUpperCase()}
            </span>
          </div>
          
        </div>

          <p className="text-base text-gray-500 mb-8">
            {animal.specie} • {animal.rasa}
          </p>

          <ul className="space-y-2 text-base font-sketch text-gray-700">
            <li><b>Vârstă:</b> {animal.varsta}</li>
            <li><b>Sex:</b> {animal.sex}</li>
            <li><b>Locație:</b> {animal.locatie}</li>
            <li><b>Mărime:</b> {animal.marime}</li>
          </ul>
        </aside>

        <section className="col-span-6 space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-sans font-bold mb-3">
              Istoric medical
            </h2>

            <div className="grid grid-cols-2 relative mb-3 font-sketch">
              
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gray-300/70" />

              <div className="text-center px-4">
                <p className="text-lg font-semibold mb-1">
                  Vaccinat
                </p>
                <p className="text-base text-gray-700">
                  {animal.vaccinat ? "Da" : "Nu"}
                </p>
              </div>

              <div className="text-center px-4">
                <p className="text-lg font-semibold mb-1">
                  Sterilizat
                </p>
                <p className="text-base text-gray-700">
                  {animal.sterilizat ? "Da" : "Nu"}
                </p>
              </div>
            </div>

            <div className="font-sketch">
              <p className="text-lg font-semibold mb-1">
                Afecțiuni
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                {animal.afectiuni ?? "Nu există afecțiuni cunoscute."}
              </p>
            </div>
          </div>


          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-sans font-bold mb-2">
              Comportament
            </h2>

            <div className="flex flex-wrap gap-4">
              {animal.temperament.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 px-3 py-3 rounded-full text-base "
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-base leading-relaxed font-sketch">
            <h2 className="text-2xl font-sans font-bold mb-2">
              Istoric de viață
            </h2>

            <p><b>Foști proprietari:</b> {animal.fosti_proprietari}</p>
            <p><b>Motiv predare:</b> {animal.motiv_predare ?? "—"}</p>
            <p>
              <b>Mediu recomandat:</b>{" "}
              {animal.mediu_recomandat ?? "Acest animal se adaptează bine în orice mediu."}
            </p>
          </div>

        </section>

       <aside className="col-span-3 bg-white/70 backdrop-blur-sm rounded-xl p-12 flex flex-col justify-center items-center text-center">

          <h2 className="text-2xl font-sans font-bold mb-4">
            Ești gata să îi oferi o familie?
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="
              w-full
              bg-crayon-red
              text-white
              py-4
              rounded-full
              text-lg
              font-sans font-bold
              sketch-border
              hover:bg-berry-pink
              transition
            "
          >
            Adoptă
          </button>
        </aside>

        {showModal && (
          <AdoptModal
            animal={animal}
            onClose={() => setShowModal(false)}
          />
        )}

        </main>
        <footer className="w-full text-center py-4 font-sketch text-sm opacity-60 border-t border-ink-black/10">
      © 2026 PawPort • Din suflet, pentru animale. 🐾
    </footer>
      </div>
    );
  }   
    
function Stat({ label, value }) {
  return (  
    <div>
      <div className="text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}