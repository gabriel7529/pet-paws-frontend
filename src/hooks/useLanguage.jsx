import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language);
  }, [language, i18n])

  return { language, setLanguage }
}
