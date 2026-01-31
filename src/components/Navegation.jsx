import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { FaRegHeart, FaSearch } from "react-icons/fa"; // Agregué FaSearch
import { PiHamburger } from "react-icons/pi";

export default function Navegation() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {

            navigate(`/buscar?q=${searchTerm}`);
            setSearchTerm("");
        }
    };

    return (
        <nav className="relative bg-[#F0ECCF] shadow-sm font-sans">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between gap-4">

                    {/* Menu Mobile Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex items-center justify-center rounded-xl p-2 text-[#A4886D] hover:bg-[#EDDBC6] transition-colors"
                        >
                            <PiHamburger />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="">
                        <Link
                            to="/"
                            className="group bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-[#A4886D]/10 inline-flex items-center gap-2 hover:bg-white hover:shadow-md transition-all duration-300"
                        >
                            <span className="text-2xl font-black text-[#BA8485] flex items-center gap-2">
                                I
                                <FaRegHeart className="text-xl group-hover:scale-110 transition-transform duration-300" />
                                SQL
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:block flex-1">
                        <div className="flex space-x-2">
                            <Link to="/" className="rounded-xl bg-[#9DB6AC] px-4 py-2 text-sm font-semibold text-white">Inicio</Link>
                            <Link to="/paso-a-paso" className="rounded-xl px-4 py-2 text-sm font-medium text-[#A4886D] hover:bg-[#EDDBC6]">Paso a paso</Link>
                            <Link to="/noticias" className="rounded-xl px-4 py-2 text-sm font-medium text-[#A4886D] hover:bg-[#EDDBC6]">Últimas noticias</Link>
                            <Link to="/resolucion-a-problemas" className="rounded-xl px-4 py-2 text-sm font-medium text-[#A4886D] hover:bg-[#EDDBC6]">Resolución a Problemas</Link>
                        </div>
                    </div>

                    {/* BARRA DE BÚSQUEDA */}
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md hidden md:block">
                        <input
                            type="text"
                            placeholder="Buscar tutoriales..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/50 border border-[#A4886D]/30 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#9DB6AC] text-[#A4886D] placeholder-[#A4886D]/60 transition-all"
                        />
                        <button type="submit" className="absolute right-3 top-2.5 text-[#A4886D] hover:text-[#BA8485]">
                            <FaSearch />
                        </button>
                    </form>

                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="sm:hidden space-y-2 px-4 pt-2 pb-6 bg-[#F0ECCF]">
                    {/* Buscador en versión móvil */}
                    <form onSubmit={handleSearch} className="mb-4 relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white px-4 py-2 rounded-xl text-[#A4886D]"
                        />
                    </form>
                    <Link to="/" className="block rounded-xl bg-[#9DB6AC] px-4 py-2 text-white font-medium">Inicio</Link>
                    <Link to="/paso-a-paso" className="block rounded-xl px-4 py-2 text-[#A4886D] hover:bg-[#EDDBC6]">Paso a Paso</Link>
                    <Link to="/noticias" className="block rounded-xl px-4 py-2 text-[#A4886D] hover:bg-[#EDDBC6]">Noticias</Link>
                    <Link to="/resolucion-a-problemas" className="block rounded-xl px-4 py-2 text-[#A4886D] hover:bg-[#EDDBC6]">Resolución de problemas</Link>
                </div>
            )}
        </nav>
    );
}