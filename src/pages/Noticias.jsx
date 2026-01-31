import { useState, useEffect } from "react";
import { MdBookmarkBorder } from "react-icons/md";
import { getContenidoBySeccion } from "../api/coneapi";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";


export default function Noticias() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);


    useEffect(() => {

        getContenidoBySeccion("Noticias").then((data) => {
            setPages(data);
            setLoading(false);
        });
    }, []);

    const hideScrollbarStyle = {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
    };


    if (loading) {
        return (
            <div className="h-screen w-full bg-[#F0ECCF] flex items-center justify-center">
                <span className="text-[#A4886D] font-black animate-pulse">Cargando bitácora...</span>
            </div>
        );
    }


    if (pages.length === 0) {
        return (
            <div className="h-screen w-full bg-[#F0ECCF] flex items-center justify-center text-[#A4886D] font-black">
                No hay contenido disponible para esta sección.
            </div>
        );
    }

    const current = pages[page];

    return (
        <div className="h-screen w-full bg-[#F0ECCF] flex items-start justify-center p-4 md:p-6 pt-4 md:pt-6 font-sans overflow-hidden text-[#A4886D]">
            <div className="flex w-full h-[92vh] gap-4 md:gap-6">


                <aside className="hidden md:flex w-56 lg:w-64 bg-[#9DB6AC] rounded-[3rem] shadow-xl p-6 flex-col border border-black/5 shrink-0 overflow-hidden">
                    <h2 className="font-bold text-lg text-white flex items-center gap-2 mb-6 px-2">
                        <span><MdBookmarkBorder /></span> Índice
                    </h2>

                    <ul className="space-y-2 overflow-y-auto" style={hideScrollbarStyle}>
                        {pages.map((p, i) => (
                            <li
                                key={i}
                                onClick={() => setPage(i)}
                                className={`cursor-pointer px-4 py-2 rounded-xl transition-all text-[10px] lg:text-[11px] font-black tracking-widest uppercase
                                    ${i === page
                                        ? "bg-[#F0ECCF] text-[#668077] shadow-md"
                                        : "hover:bg-white/10 text-white"}`}
                            >
                                {p.title}
                            </li>
                        ))}
                    </ul>
                </aside>


                <main className="flex-1 bg-[#A9A283] rounded-[3rem] shadow-2xl p-8 md:p-12 lg:p-14 flex flex-col relative border border-black/5 overflow-hidden">
                    <div className="flex-1 overflow-y-auto pr-2" style={hideScrollbarStyle}>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 md:mb-8 text-[#F0ECCF]">
                            {current.title}
                        </h1>

                        <p className="whitespace-pre-line text-lg md:text-xl lg:text-2xl leading-relaxed text-[#F0ECCF] opacity-95">
                            {current.content}
                        </p>
                    </div>


                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#F0ECCF]/20">
                        <button
                            onClick={() => setPage(p => p - 1)}
                            disabled={page === 0}
                            className="px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-[#D7CF92] text-[#A4886D] text-sm md:text-base font-black hover:bg-[#F0ECCF] disabled:opacity-30 transition-all active:scale-95 shadow-sm"
                        >
                            <CiCircleChevLeft style={{ fontSize: '25px' }} />
                        </button>

                        <div className="text-[#F0ECCF] font-black text-lg md:text-2xl tracking-tighter">
                            {String(page + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
                        </div>

                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === pages.length - 1}
                            className="px-6 md:px-10 py-3 md:py-4 rounded-3xl bg-[#BA8485] text-white text-sm md:text-base font-black hover:bg-[#A4886D] disabled:opacity-30 transition-all active:scale-95 shadow-md shadow-[#BA8485]/20"
                        >
                            <CiCircleChevRight style={{ fontSize: '25px' }} />
                        </button>
                    </div>
                </main>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .overflow-y-auto::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
}