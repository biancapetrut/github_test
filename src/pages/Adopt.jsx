import { useEffect, useState } from "react";
import Header from "../components/Header";
import PetCard from "../components/PetCard";
import CustomDropdown from "../components/CustomDropdown";
import { useSearchParams } from "react-router-dom";

const SPECII = [
  "Toate",
  "Câine",
  "Pisică",
  "Reptilă",
  "Pasăre",
  "Pește",
  "Altele"
];

export default function Adopt() {
  const [toateAnimalele, setToateAnimalele] = useState([]);
 const [searchParams, setSearchParams] = useSearchParams();

const specieSelectata = searchParams.get("specie") || "Toate";
const orasSelectat = searchParams.get("oras") || "Orase";

const specieFiltrata = specieSelectata !== "Toate";
const orasFiltrat = orasSelectat !== "Orase";


  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => setToateAnimalele(data));
  }, []);

  const oraseUnice = [
    "Orase",
    ...Array.from(new Set(toateAnimalele.map((p) => p.locatie))),
  ];

  const animaleFiltrate = toateAnimalele.filter((pet) => {
    const matchSpecie =
      specieSelectata === "Toate" || pet.specie === specieSelectata;
    const matchOras =
      orasSelectat === "Orase" || pet.locatie === orasSelectat;

    return matchSpecie && matchOras;
  });

  return (
  <div className="min-h-screen bg-sky-blue paper-texture flex flex-col hide-scrollbar">
    <Header />
    <hr className="border-ink-black/10 sticky top-[64px] z-40 bg-white" />

    <main className="flex-1 min-h-0 max-w-7xl mx-auto px-6 py-6 w-full flex flex-col">

      <div className="shrink-0 flex items-end justify-between gap-6 pb-4 border-b border-ink-black/10">
        <div>
          <h1 className="font-display font-black font-sans text-4xl mb-1">
            Găsește-ți noul prieten!
          </h1>
          <p className="font-handwriting text-lg opacity-70">
            Alege o specie și un oraș pentru a vedea animalele disponibile.
          </p>
        </div>

        <div className="flex gap-4">
          <CustomDropdown
            value={specieSelectata}
            options={SPECII}
            onChange={(value) =>
              setSearchParams({
                specie: value,
                oras: orasSelectat,
              })
            }
          />

          <CustomDropdown
            value={orasSelectat}
            options={oraseUnice}
            onChange={(value) =>
              setSearchParams({
                specie: specieSelectata,
                oras: value,
              })
            }
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar mt-6">

        {animaleFiltrate.length === 0 ? (
          <p className="font-handwriting text-2xl opacity-80 text-center mt-10">
            {specieFiltrata && !orasFiltrat && (
              <>Nu am găsit animale pentru această specie.</>
            )}
            {!specieFiltrata && orasFiltrat && (
              <>Nu am găsit animale pentru acest oraș.</>
            )}
            {specieFiltrata && orasFiltrat && (
              <>Nu am găsit animale pentru această specie și acest oraș.</>
            )}
          </p>
        ) : (
         <div className="flex flex-wrap gap-10 justify-center items-start pb-20">
            {animaleFiltrate.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}

      </div>
    </main>

    <footer className="w-full text-center py-4 font-sketch text-sm opacity-60 border-t border-ink-black/10">
      © 2026 PawPort • Din suflet, pentru animale. 🐾
    </footer>
  </div>
);}
