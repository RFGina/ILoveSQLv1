import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Inicio() {
    const [status, setStatus] = useState("")

    // FUNCIÓN AJAX PARA EL ENVÍO
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("SENDING");

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xlgnkkge", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("SUCCESS");
                form.reset();
                // Opcional: limpiar el mensaje después de 5 segundos
                setTimeout(() => setStatus(""), 5000);
            } else {
                setStatus("ERROR");
            }
        } catch (error) {
            setStatus("ERROR");
        }
    };
    return (
        <div className="min-h-screen w-full bg-[#F0ECCF] flex flex-col items-center p-4 md:p-8 font-sans text-[#A4886D]">


            <main className="w-full max-w-[1400px] bg-[#A9A283] rounded-[3rem] shadow-2xl p-10 md:p-20 flex flex-col items-center text-center border border-black/5 relative overflow-hidden">


                <div className="mb-8">
                    <Link to="/" className="rounded-2xl text-2xl font-black text-[#BA8485] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                        I<FaRegHeart className="text-xl" />SQL
                    </Link>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-[#F0ECCF] mb-6 leading-tight">
                    Vamos directo al grano.
                </h1>

                <p className="max-w-3xl text-xl md:text-2xl text-[#F0ECCF] opacity-90 leading-relaxed font-medium">
                    Documento mi aprendizaje tal cual lo entiendo, sin adornos ni analogías raras.
                    Si querés, podés aprender conmigo; <span className="underline decoration-[#D7CF92] decoration-4 underline-offset-4">juro que no me molestaría.</span>
                </p>

                <p className="max-w-2xl mt-6 text-lg md:text-xl text-[#F0ECCF]/80 font-bold italic">
                    Eso sí: si buscás aprender con ejemplos, metáforas o analogías, IloveSQL probablemente no sea para vos.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <div className="px-8 py-3 bg-[#BA8485] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-md">
                        <Link to="/paso-a-paso">¿Me acompañas?</Link>
                    </div>
                </div>
            </main>

            {/* FORMU */}
            <section className="w-full max-w-[1400px] mt-8 grid md:grid-cols-2 gap-6">


                <div className="bg-[#9DB6AC] rounded-[3rem] p-10 lg:p-16 flex items-center justify-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-snug text-center md:text-left">
                        ¿Tenés una duda, opinión o sugerencia? <br />
                        <span className="text-[#F0ECCF]">Me encantaría conocerla.</span>
                    </h2>
                </div>


                <form
                    action="https://formspree.io/f/xlgnkkge"
                    method="POST"
                    className="bg-[#EDDBC6] rounded-[3rem] p-10 shadow-xl flex flex-col gap-4 border border-[#A4886D]/10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="nombre"
                            required
                            placeholder="Tu nombre"
                            className="w-full bg-[#F0ECCF] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9DB6AC] outline-none placeholder:text-[#A4886D]/40 font-bold"
                        />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Tu email"
                            className="w-full bg-[#F0ECCF] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9DB6AC] outline-none placeholder:text-[#A4886D]/40 font-bold"
                        />
                    </div>
                    <textarea
                        name="mensaje"
                        required
                        placeholder="Contame lo que quieras..."
                        rows="4"
                        className="w-full bg-[#F0ECCF] border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9DB6AC] outline-none placeholder:text-[#A4886D]/40 font-bold resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        disabled={status === "SENDING"}
                        className="w-full bg-[#BA8485] hover:bg-[#A4886D] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-[#BA8485]/20 active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Enviar mensaje
                        {status === "SENDING" ? "Enviando..." : "Enviar mensaje"}
                    </button>
                    {/* MENSAJES DE ESTADO */}
                    {status === "SUCCESS" && (
                        <p className="mt-2 text-green-500 font-mono text-xs animate-pulse text-center italic">
                            ¡Mensaje enviado con éxito! Te responderé pronto.
                        </p>
                    )}
                    {status === "ERROR" && (
                        <p className="mt-2 text-red-500 font-mono text-xs text-center italic">
                            Hubo un error. Por favor, intenta de nuevo.
                        </p>
                    )}
                </form>
            </section>


            <footer className="mt-12 mb-8 opacity-30 font-bold text-[10px] uppercase tracking-[0.5em]">
                <div>
                    I<FaRegHeart className="inline mx-1" />SQL — Documentando mi aprendizaje
                </div>
                <div className="mt-2 text-[8px] tracking-normal normal-case opacity-70">
                    &copy; {new Date().getFullYear()} Georgina Rotela. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}