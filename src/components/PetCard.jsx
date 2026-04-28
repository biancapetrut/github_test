import { useNavigate } from "react-router-dom";

export default function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white
        w-[260px]
        rounded-[2rem]
        p-6
        mt-2
        sketch-border
        flex flex-col items-center
        text-center
        hover:-translate-y-2
        transition-transform
      "
    >
      <div className="w-40 h-40 rounded-full overflow-hidden sketch-border mb-4">
        <img
          src={pet.poza_url}
          alt={pet.nume}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-display font-black text-2xl mb-4">
        {pet.nume}
      </h3>

      <div className="w-full space-y-2 text-sm font-sketch mb-6">
        <InfoRow label="Specie" value={pet.specie} color="bg-sky-blue" />
        <InfoRow label="Vârstă" value={pet.varsta} color="bg-sunny-yellow" />
        <InfoRow label="Locație" value={pet.locatie} color="bg-grass-green" />
      </div>

      <button
        onClick={() => navigate(`/adopta/${pet.id}`)}
        className="
          mt-auto
          w-full
          py-3
          rounded-full
          font-display font-bold
          sketch-border
          bg-sky-blue
          hover:bg-ocean-blue
          hover:text-white
          transition-colors
        "
      >
        Vezi mai multe detalii
      </button>
    </div>
  );
}

function InfoRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center border-b border-dotted border-ink-black/30 pb-1">
      <span className="opacity-70">{label}</span>
      <span className={`${color} px-3 py-1 rounded-full text-xs font-bold`}>
        {value}
      </span>
    </div>
  );
}