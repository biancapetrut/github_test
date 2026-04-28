import { useState, useRef, useEffect } from "react";

export default function CustomDropdownSlim({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full p-3 rounded-full bg-white border border-gray-300
          flex justify-between items-center
          font-sans cursor-pointer mb-3
        "
      >
        {value || "Selectează un motiv"}
        <span className="text-gray-500">▼</span>
      </button>


      {open && (
        <div
          className="
            absolute z-20 mt-3 w-full
            bg-white border border-gray-300
            rounded-2xl p-1
            shadow-md
          "
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="
                w-full text-left px-4 py-2
                rounded-xl
                hover:bg-sky-blue
                transition
                font-sans
              "
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}