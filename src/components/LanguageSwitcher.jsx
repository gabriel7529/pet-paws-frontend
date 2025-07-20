import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getConfig, updateConfig } from "../services/config";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;

    try {
      await i18n.changeLanguage(newLang);
      localStorage.setItem('language', newLang);
      const config = await getConfig(user.id);
      await updateConfig(config.data.id, { language: newLang.toUpperCase() });
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
};

export default LanguageSwitcher;
