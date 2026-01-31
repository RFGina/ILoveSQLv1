import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // Este objeto mapea el nombre de la sección en la DB con la ruta en React
    const rutasSecciones = {
        "Problemas": "/problemas",
        "Paso a paso": "/paso-a-paso",
        "Noticias": "/noticias"
    };

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:8000/api/buscar/?q=${query}`)
                .then(res => setResults(res.data))
                .catch(err => console.error(err));
        }
    }, [query]);

    const handleRedirect = (item) => {
        // Obtenemos la ruta base (ej: /problemas)
        const baseRoute = rutasSecciones[item.seccion_nombre] || "/";
        // Navegamos pasando el título o el ID para que la otra página sepa qué mostrar
        // Si tu página de destino ya carga todos los datos, podrías pasar el índice o título
        navigate(baseRoute, { state: { selectedTitle: item.titulo } });
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
                            key={item.id} // Soluciona el error de la "key"
                            onClick={() => handleRedirect(item)} // Hace que todo el cuadro sea clickeable
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