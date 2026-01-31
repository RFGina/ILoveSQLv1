import { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaAt } from "react-icons/fa";

export default function SocialFloat() {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/RFGina" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/georgina-rotela-1b4442343/" },
        { icon: <FaInstagram />, href: "https://www.instagram.com/ginaa_xd7" },
    ];

    return (
        <div
            className="fixed bottom-8 left-8 flex flex-col items-center gap-3 z-50" // A la izquierda con buen margen
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >

            <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white rounded-2xl shadow-lg text-[#A4886D] hover:text-[#9DB6AC] hover:scale-110 transition-all border border-[#EDDBC6] flex items-center justify-center"
                    >
                        <span className="text-xl">{social.icon}</span>
                    </a>
                ))}
            </div>


            <button className="p-4 bg-[#BA8485] text-[#F0ECCF] rounded-[1.8rem] shadow-2xl hover:bg-[#9DB6AC] transition-all duration-300 flex items-center justify-center border-[3px] border-[#F0ECCF] active:scale-90">
                <FaAt className={`text-2xl transition-transform duration-500 ${isOpen ? 'rotate-[360deg]' : ''}`} />
            </button>
        </div>
    );
}