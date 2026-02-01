import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // Mapeo de nombres de base de datos a rutas de App.js
    const rutasSecciones = {
        "problemas": "/resolucion-a-problemas",
        "paso a paso": "/paso-a-paso",
        "noticias": "/noticias"
    };

    useEffect(() => {
        if (query) {
            axios.get(`https://georgina.pythonanywhere.com/api/buscar/?q=${query}`)
                .then(res => {
                    console.log("Resultados de la API:", res.data);
                    setResults(res.data);
                })
                .catch(err => console.error("Error en la petición:", err));
        }
    }, [query]);

    const handleRedirect = (item) => {
        // 1. Obtenemos el nombre de la sección (usando la llave 'seccion' de tu serializer)
        const nombreSeccion = item.seccion ? item.seccion.toLowerCase().trim() : "";

        // 2. Buscamos la ruta base definida arriba
        const baseRoute = rutasSecciones[nombreSeccion];

        if (baseRoute && item.id) {
            // 3. Redirige a la página específica: ej. /noticias/5
            navigate(`${baseRoute}/${item.id}`);
        } else {
            // Caso de error: si no hay mapeo, intenta ir a la sección o al inicio
            console.warn("No se pudo mapear la sección:", nombreSeccion);
            navigate(baseRoute || "/");
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
                                <div>
                                    <h2 className="text-xl font-bold text-[#BA8485] group-hover:underline">
                                        {item.titulo}
                                    </h2>
                                    {/* Muestra la sección para que el usuario sepa dónde está */}
                                    <span className="text-[10px] bg-[#9DB6AC] text-white px-2 py-1 rounded-lg uppercase font-black mt-1 inline-block">
                                        {item.seccion || "General"}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[#A4886D] mt-2 italic">
                                {item.contenido?.substring(0, 150)}...
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-[#A4886D] font-bold">No encontramos resultados para tu búsqueda.</p>
                )}
            </div>
        </div>
    );
}