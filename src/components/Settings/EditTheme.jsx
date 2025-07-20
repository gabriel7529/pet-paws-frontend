import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { updateConfig } from "../../services/config"
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const EditTheme = () => {
  const { t } = useTranslation();

  const { updateUser, data } = useUser();

  const [darkMode, setDarkTheme] = useState(
    data?.darkMode ?? false
  );

  useEffect(() => {
    if (data && data.darkMode !== undefined) {
      setDarkTheme(data.darkMode);
    }
  }, [data]);

  const togglePrivacidad = () => {
    const newDarkMode = !darkMode;
    setDarkTheme(newDarkMode);
    updateUser({ darkMode: newDarkMode });
    try {
      updateConfig(data.id, { darkMode: newDarkMode });
      toast.success(t("updatedCorrectly"));
    }
    catch (error) {
      console.error(error);
      toast.error(t("errorUpdating"));
    }
  };

  return (
    <div className="p-6 text-custom-350 w-2/4 space-y-6 min-w-64 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-custom-350">{t("set.pre.the.title")}</h2>

      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={togglePrivacidad}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-custom-350"></div>
        <span className="ms-3 font-bold text-custom-250 dark:text-gray-300">
          {darkMode ? t("set.pre.the.activated") : t("set.pre.the.deactivated")}
        </span>
      </label>

    </div>
  );
};

export default EditTheme;
