import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { updateConfig } from "../../services/config"
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const EditPrivacity = () => {
  const {t} = useTranslation();

  const { updateUser, data } = useUser();

  const apiDataPrivacityToBoolean = (data) => {
    return data?.accountPrivacy === "PUBLIC" ? false : true;
  };

  const [privacity, setPrivacity] = useState(apiDataPrivacityToBoolean(data));

  useEffect(() => {
    if (data && data.privacity !== undefined) {
      setPrivacity(data.privacity);
    }
  }, [data]);

  const togglePrivacidad = () => {
    console.log(data)
    const newPrivacity = !privacity;
    setPrivacity(newPrivacity);
    updateUser({ privacity: newPrivacity });
    updateUser({ accountPrivacy: newPrivacity ? "PRIVATE" : "PUBLIC" });
    try {
      updateConfig(data.id, { accountPrivacy: newPrivacity ? "PRIVATE" : "PUBLIC" });
      toast.success(t("updatedCorrectly"));
    }
    catch (error) {
      console.error(error);
      toast.error(t("errorUpdating"));
    }
  };

  return (
    <div className="p-6 text-custom-350 w-2/4 space-y-6 min-w-64 md:w-96 mx-auto mt-10 bg-white shadow rounded flex flex-col">
      <h2 className="text-xl font-bold mb-4">{t("set.sec.pri.title")}</h2>
      <p className="mb-4 text-justify">
        {privacity
          ? t("set.sec.pri.private")
          : t("set.sec.pri.public")}
      </p>
      <p className="text-justify pb-4">
        {t("set.sec.pri.description")}
      </p>

      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          checked={privacity}
          onChange={togglePrivacidad}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-custom-200 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-custom-350"></div>
        <span className="ms-3 font-bold text-custom-350 dark:text-gray-300">
          {privacity ? t("set.sec.pri.activated") : t("set.sec.pri.deactivated")}
        </span>
      </label>
    </div>
  );
};

export default EditPrivacity;
