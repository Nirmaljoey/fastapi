import React from "react";
import { FaPhone, FaEnvelope, FaTelegram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/21yard.svg";
import font from "../assets/font.png";
import mint from "../assets/Mintsifry_logo.png"

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-700 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="flex flex-col items-start">
                    <img src={logo} alt="21Yard Logo" className="w-32 mb-4" />

                    <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <FaPhone className="text-lg" /> +7 (812) 389-55-12
                        </p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-lg" /> info@21yard.com
                        </p>
                        <p className="flex items-center gap-2">
                            <FaTelegram className="text-lg" /> @manager21yard
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Основные разделы</h4>
                        <ul className="text-sm space-y-1">
                            <li>Главная страница</li>
                            <li>Заказы</li>
                            <li>Мои заявки</li>
                            <li>Тарификация</li>
                            <li>Шаблоны</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Поиск заявок</h4>
                        <ul className="text-sm space-y-1">
                            <li>Новые заказы</li>
                            <li>Популярные заявки</li>
                            <li>Мои отклики</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-end text-white">
                    <h4 className="text-sm font-semibold mb-2 text-white">Дополнительно</h4>
                    <ul className="text-sm space-y-1">
                        <li><a href="https://21yard.com/rules.pdf" className="hover:underline text-white">Политика конфиденциальности</a></li>
                        <li><a href="https://dev.21yard.com/rules.pdf" className="hover:underline text-white">Условия использования сервиса</a></li>
                        <li><a href="https://dev.21yard.com/oferta.pdf" className="hover:underline text-white">Оферта</a></li>
                    </ul>

                    <div className="mt-4 flex gap-4 bg-transparent">
                        <a href="https://t.me/zakazov_yard" target="_blank" rel="noopener noreferrer">
                            <FaTelegram className="text-2xl cursor-pointer text-white hover:text-blue-400" />
                        </a>
                        <a href="https://www.youtube.com/channel/UC6ZUOLajKj0rs0gunat8RNw" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-2xl text-white cursor-pointer hover:text-red-500" />
                        </a>
                        <a href="https://api.whatsapp.com/send/?phone=%2B79215851520&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="text-2xl text-white cursor-pointer hover:text-green-500" />
                        </a>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <img src={mint} alt="mint" className="w-20" />
                        <img src={font} alt="font" className="w-20" />

                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-white mt-6">
                <h4 className="text-sm font-semibold">Юридический адрес</h4>
                <p className="text-sm mt-2">
                    194021 Санкт-Петербург, ул. Шателена, д. 9, лит. А, пом. 2-Н
                </p>
                <p className="text-sm">
                    197022 Санкт-Петербург, пр-кт Медиков, д. 3А офис 218
                </p>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs">
                <p>21Yard © 2025</p>
                <p>ООО "21ГРУПП", ИНН 7814959568, ОГРН 1137847482486</p>
            </div>
        </footer>
    );
};

export default Footer;
