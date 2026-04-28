import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ value, options, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-48" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          px-5 py-3
          rounded-full
          sketch-border
          bg-white
          font-sketch
          flex justify-between items-center
          hover:bg-sky-blue/40
        "
      >
        {value}
        <span className="ml-2">▾</span>
      </button>

      {open && (
        <ul
          className="
            absolute
            mt-2
            w-full
            bg-white/90
            backdrop-blur-sm
            rounded-2xl
            sketch-border
            shadow-lg
            z-20
            overflow-hidden
          "
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="
                px-5 py-3
                cursor-pointer
                hover:bg-sky-blue/40
                text-sm
              "
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
``