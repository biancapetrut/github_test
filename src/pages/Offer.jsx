import { useState } from "react";
import Header from "../components/Header";
import CustomDropdownSlim from "../components/CustomDropdownSlim";
import { useNavigate } from "react-router-dom";

const TEMPERAMENTE = [
  "Se înțelege cu copiii",
  "Jucăuș",
  "Prietenos cu alte animale",
  "Sociabil",
  "Nu se înțelege cu copiii",
  "Nu se înțelege cu alte animale",
  "Timid",
  "Energic",
  "Animal de interior",
  "Animal de exterior",
  "Liniștit",
  "Protector",
];

const SPECII = [
  "Câine",
  "Pisică",
  "Pasăre",
  "Pește",
  "Reptilă",
  "Rozător",
  "Iepure",
  "Altul",
];

export default function Ofera() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showAllTemperaments, setShowAllTemperaments] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nume: "",
    poza: null,
    pozaPreview: null,
    specie: "",
    specieCustom: "",
    rasa: "",
    poveste: "",
    motiv: "",
    temperament: [],
    numeProprietar: "",
    email: "",
    telefon: "",
  });

  const toggleTemperament = (tag) => {
    setFormData((prev) => ({
      ...prev,
      temperament: prev.temperament.includes(tag)
        ? prev.temperament.filter((t) => t !== tag)
        : [...prev.temperament, tag],
    }));
  };

  return (
    <div className="min-h-screen bg-sky-blue paper-texture flex flex-col">
      <Header />

      {/* STEPPER */}
      <div className="shrink-0 flex justify-center gap-3 py-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-10 h-1 rounded-full ${
              step >= s ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

     <main className="flex-grow flex items-center justify-center px-6 ">
  {submitted ? (
    <div className="w-full max-w-xl min-h-fit bg-white/70 backdrop-blur-sm rounded-2xl p-10 flex flex-col justify-center text-center">
      <h2 className="text-2xl font-bold font-sans mb-3">
        Mulțumim!
      </h2>

      <p className="text-gray-600 font-base font-sans">
        {formData.nume && formData.nume.trim() !== "" ? (
          <>
            Cererea pentru <b>{formData.nume}</b> a fost trimisă cu succes.
            Echipa PawPort te va contacta în cel mai scurt timp.
          </>
        ) : (
          <>
            Cererea a fost trimisă cu succes.
            Echipa PawPort te va contacta în cel mai scurt timp.
          </>
        )}
      </p>

      <button
        onClick={() => navigate("/adopta")}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full font-bold font-sans transition"
      >
        Întoarce-te la pagina principală
      </button>
    </div>
  ) : (
          <>
            {step === 1 && (
              <div className="w-full max-w-xl overflow-y-auto bg-white/70 backdrop-blur-sm rounded-2xl p-10 flex flex-col justify-between ">
                <div>
                  <h2 className="text-3xl font-sans font-bold text-center mb-2">
                    Cine este prietenul tău?
                  </h2>
                  <p className="text-center text-base text-gray-600 mb-6">
                    Începe călătoria spre o nouă familie.
                  </p>

                  <label className="w-56 h-56 mx-auto mb-6 flex items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer overflow-hidden bg-white">
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const allowedTypes = ["image/jpeg", "image/png"];

                        if (!allowedTypes.includes(file.type)) {
                          alert("Te rugăm să încarci doar imagini JPG sau PNG.");
                          e.target.value = ""; 
                          return;
                        }

                        setFormData({
                          ...formData,
                          poza: file,
                          pozaPreview: URL.createObjectURL(file),
                        });
                      }}
                    />
                    {formData.pozaPreview ? (
                      <img
                        src={formData.pozaPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-base text-gray-500 text-center">
                        Încarcă o poză.
                      </span>
                    )}
                  </label>

                  <input
                    type="text"
                    maxLength={30}
                    placeholder="Numele animalului (opțional)"
                    className="w-full p-3 rounded-full"
                    value={formData.nume}
                    onChange={(e) =>
                      setFormData({ ...formData, nume: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-orange-500 font-sans text-white px-6 py-3 rounded-full font-bold"
                  >
                    Continuă →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && ( () => {
                const isSpecieInvalid =
                  formData.specie === "" ||
                  (formData.specie === "Altul" && formData.specieCustom.trim() === "");
              return (
                <div className="w-full max-w-xl  bg-white/70 backdrop-blur-sm rounded-2xl p-10 flex flex-col justify-between">
                  
                  <div>
                    <h2 className="text-3xl font-bold font-sans text-center mb-3 -mt-4">
                      Ce fel de animal este?
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      {SPECII.map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            setFormData({ ...formData, specie: s })
                          }
                          className={`
                            p-5 rounded-2xl border text-center font-medium transition font-sans
                            ${
                              formData.specie === s
                                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                                : "border-gray-300 bg-white hover:bg-gray-50 hover:border-orange-300"
                            }
                          `}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {formData.specie === "Altul" && (
                      <input
                        type="text"
                        maxLength={30}
                        placeholder="Specifică tipul de animal*"
                        className="w-full p-3 rounded-full mb-2"
                        value={formData.specieCustom || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specieCustom: e.target.value,
                          })
                        }
                      />
                    )}

                    {formData.specie === "Altul" &&
                            formData.specieCustom.trim() === "" && (
                              <p className="text-red-500 text-sm mb-1">
                                Te rugăm să specifici tipul de animal.
                              </p>
                            )}


                    <input
                      type="text"
                      maxLength={30}
                      placeholder="Rasa (opțional)"
                      className="w-full p-3 rounded-full mb-2"
                      value={formData.rasa}
                      onChange={(e) =>
                        setFormData({ ...formData, rasa: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-between">
                      <button onClick={() => setStep(1)}>← Înapoi</button>

                      <button
                          onClick={() => setStep(3)}
                          disabled={isSpecieInvalid}
                          className={`px-6 py-3 rounded-full font-bold font-sans text-white transition
                            ${
                              isSpecieInvalid
                                ? "bg-gray-400 cursor-not-allowed font-sans"
                                : "bg-orange-500 hover:bg-orange-600 font-sans"
                            }`}
                        >
                          Continuă →
                      </button>
                    </div>
                </div>
              );
            })()}
            
            {step === 3 && ( () => {
              const isMotivInvalid = !formData.motiv || formData.motiv.trim() === "";

              return(
                <div className="w-full max-w-xl  bg-white/70 backdrop-blur-sm rounded-2xl p-10 flex flex-col">
                  <h2 className="text-3xl font-bold font-sans text-center mb-3 -mt-4">Povestea lui</h2>

                  <CustomDropdownSlim
                    value={formData.motiv}
                    options={[
                      "Nu mai am timp",
                      "Mutare",
                      "Probleme personale",
                      "Alt motiv",
                    ]}
                    onChange={(value) =>
                      setFormData({ ...formData, motiv: value })
                    }
                  />

                  <textarea
                    placeholder="Spune-ne povestea lui... (opțional)"
                    maxLength={300}
                    className="flex-grow p-3 rounded-xl resize-none mb-4"
                    value={formData.poveste}
                    onChange={(e) =>
                      setFormData({ ...formData, poveste: e.target.value })
                    }
                  />

                <p className="font-semibold mb-2">Temperament</p>
                  <div
                    className={`
                      flex flex-wrap gap-2 mb-2
                      ${!showAllTemperaments ? "max-h-[72px] overflow-hidden" : ""}
                    `}
                  >
                    {TEMPERAMENTE.map((t) => (
                      <button
                        key={t}
                        onClick={() => toggleTemperament(t)}
                        className={`
                          px-3 py-1 rounded-full border text-sm font-sans
                          ${
                            formData.temperament.includes(t)
                              ? "bg-blue-100 border-blue-500"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {TEMPERAMENTE.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllTemperaments(!showAllTemperaments)}
                      className="text-sm text-orange-600 mb-4"
                    >
                      {showAllTemperaments ? "Vezi mai puține ▲" : "Vezi toate opțiunile ▼"}
                    </button>
                  )}

                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)}>← Înapoi</button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={isMotivInvalid}
                      className={`px-6 py-3 rounded-full font-bold font-sans text-white transition
                        ${isMotivInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}
                      `}
                    >
                      Continuă →
                    </button>
                  </div>

                </div>
              );
            })()}

            {step === 4 && (() => {
              const isNameInvalid =
                !formData.numeProprietar ||
                formData.numeProprietar.trim() === "";

              const isEmailInvalid =
                !formData.email ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

              const isContactInvalid = isNameInvalid || isEmailInvalid;

              return (
                <div className="w-full max-w-xl h-[400px] bg-white/70 backdrop-blur-sm rounded-2xl p-10 flex flex-col justify-between">

                  <h2 className="text-3xl font-bold font-sans text-center mb-3">
                    Date de contact
                  </h2>

                  <div>
                    <input
                      type="text"
                      maxLength={50}
                      placeholder="Nume complet*"
                      className="w-full p-3 rounded-full mb-4"
                      value={formData.numeProprietar}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numeProprietar: e.target.value,
                        })
                      }
                    />
                    {isNameInvalid && (
                      <p className="text-red-500 text-sm mb-1">
                        Te rugăm să completezi numele.
                      </p>
                    )}

                    <input
                      type="email"
                      maxLength={100}
                      placeholder="Email*"
                      className="w-full p-3 rounded-full mb-4"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {isEmailInvalid && (
                      <p className="text-red-500 text-sm mb-1">
                        Te rugăm să introduci un email valid.
                      </p>
                    )}

                    <input
                      type="tel"
                      maxLength={15}
                      placeholder="Număr de telefon (opțional)"
                      className="w-full p-3 rounded-full"
                      value={formData.telefon || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          telefon: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(3)}>← Înapoi</button>

                    <button
                      onClick={() => {
                        console.log("OFERTA ADOPȚIE", {
                          animal: {
                            nume: formData.nume,
                            specie:
                              formData.specie === "Altul"
                                ? formData.specieCustom
                                : formData.specie,
                            rasa: formData.rasa,
                          },
                          contact: {
                            nume: formData.numeProprietar,
                            email: formData.email,
                          },
                        });

                        setSubmitted(true);
                      }}
                      disabled={isContactInvalid}
                      className={`px-6 py-3 rounded-full font-bold font-sans text-white transition mt-4
                        ${
                          isContactInvalid
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                    >
                      Trimite cererea
                    </button>
                  </div>

                </div>
                );
              })()}
        </>
        )}
      </main>
      <footer className="w-full text-center py-4 font-sketch text-sm opacity-60 border-t border-ink-black/10">
      © 2026 PawPort • Din suflet, pentru animale. 🐾
    </footer>
    </div>
  );
}
