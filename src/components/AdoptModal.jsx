import AdoptForm from "./AdoptForm";

export default function AdoptModal({ animal, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-md sketch-border">
       <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="
            absolute
            top-3
            right-3
            z-50
            w-10
            h-10
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            text-xl
            font-bold
            cursor-pointer
            hover:bg-red-100
            transition
            pointer-events-auto
          "
          aria-label="Închide formularul"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-sans font-bold">
            Îl adopți pe {animal.nume}
          </h2>
          <p className="text-base font-sans font-bold text-gray-600">
            <b>{animal.specie}</b> • {animal.rasa} • {animal.locatie}
          </p>
        </div>

        <AdoptForm animal={animal} />
      </div>
    </div>
  );
}