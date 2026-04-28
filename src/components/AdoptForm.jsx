import { useState } from "react";

export default function AdoptForm({ animal }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Numele este obligatoriu";

    if (!form.email.trim()) {
      e.email = "Emailul este obligatoriu";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Email invalid";
    }

    if (!form.message.trim()) e.message = "Mesajul este obligatoriu";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("📩 CERERE ADOPȚIE", {
      animal: {
        id: animal.id,
        nume: animal.nume,
        specie: animal.specie,
        rasa: animal.rasa,
        locatie: animal.locatie,
      },
      solicitant: {
        nume: form.name,
        email: form.email,
        mesaj: form.message,
      },
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-grass-green/20 border border-grass-green text-center p-5 rounded-xl">
        <p className="text-lg font-sans font-bold text-green-700">
          Cererea a fost trimisă!
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Mulțumim că vrei să îi oferi o familie lui <b>{animal.nume}</b>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <input
          type="text"
          placeholder="Nume complet"
          maxLength={50}
          className="w-full p-3 rounded-full sketch-border"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          maxLength={100}
          className="w-full p-3 rounded-full sketch-border"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <textarea
          placeholder={`De ce vrei să îl adopți pe ${animal.nume}?`}
          maxLength={400}
          rows={4}
          className="w-full p-3 rounded-xl sketch-border"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-crayon-red text-white py-3 rounded-full font-bold sketch-border hover:bg-berry-pink transition"
      >
        Trimite cererea
      </button>
    </form>
  );
}