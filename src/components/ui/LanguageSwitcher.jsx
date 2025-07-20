import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const LanguageSwitcher = ({ addClass }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className={`relative w-64 m-auto text-center ${addClass}`}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="bg-custom-200 md:bg-custom-100 border text-custom-50 md:text-custom-200 p-2 w-full rounded-lg focus:outline-none focus:ring-custom-300 focus:border-custom-500 dark:text-white flex justify-between items-center font-semibold"
      >
        {languages.find((l) => l.code === selectedLanguage)?.label}
        {/* Triángulo hacia abajo */}
        <svg
          className="ml-2 w-4 h-4 fill-current text-white md:text-custom-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M31.1 192h257.9c28.4 0 42.8 34.5 22.6 54.6l-128.1 128c-12.5 12.5-32.8 12.5-45.3 0l-128.1-128C-11.7 226.5 2.5 192 31.1 192z" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-custom-300 shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="p-2 cursor-pointer text-custom-200 bg-white hover:bg-custom-100"
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  addClass: PropTypes.string,
};

export default LanguageSwitcher;
