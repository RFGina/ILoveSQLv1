import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // Usamos minúsculas aquí para que la comparación sea más fácil
    const rutasSecciones = {
        "problemas": "/problemas",
        "paso a paso": "/paso-a-paso",
        "noticias": "/noticias"
    };

    useEffect(() => {
        if (query) {
            axios.get(`https://georgina.pythonanywhere.com/api/buscar/?q=${query}`)
                .then(res => setResults(res.data))
                .catch(err => console.error(err));
        }
    }, [query]);

    const handleRedirect = (item) => {
        // 1. Convertimos lo que viene de la DB a minúsculas y quitamos espacios
        const seccionDB = item.seccion_nombre ? item.seccion_nombre.toLowerCase().trim() : "";

        // 2. Buscamos en nuestro objeto
        const rutaDestino = rutasSecciones[seccionDB];

        // 3. Si existe la ruta, vamos allá. Si no, vamos al inicio (evita el undefined)
        if (rutaDestino) {
            navigate(rutaDestino);
        } else {
            console.warn("Sección no reconocida:", seccionDB);
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0ECCF] p-8 font-sans">
            <h1 className="text-3xl font-black text-[#A4886D] mb-6">
                Resultados para: "{query}"
            </h1>

            <div className="grid gap-4">
                {results.length > 0 ? (
                    results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleRedirect(item)}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#BA8485] hover:shadow-md cursor-pointer transition-all group"
                        >
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold text-[#BA8485] group-hover:underline">
                                    {item.titulo}
                                </h2>
                                <span className="text-[10px] bg-[#9DB6AC] text-white px-2 py-1 rounded-lg uppercase font-black">
                                    {item.seccion_nombre || "General"}
                                </span>
                            </div>
                            <p className="text-[#A4886D] mt-2 italic">
                                {item.contenido?.substring(0, 150)}...
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-[#A4886D]">No encontramos nada.</p>
                )}
            </div>
        </div>
    );
}