import { useState } from "react";
import Button from "./ui/Button";
import Description from "./ui/Description";
import {useUser} from '../../hooks/useUser';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { patchUser } from "../../services/users";
import { useTranslation } from "react-i18next";

const DeleteAccount = () => {
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const { logout, data } = useUser();

  const handleClick = () => {
    if (isConfirmed) {

      try {
        patchUser(data.userId, { isActive: false });
        toast.success(t("set.man.delAcc.deletedCorrectly"));
        logout();
        navigate("/login");
      }
      catch (error) {
        console.error(t("set.man.delAcc.errorDeleting"), error);
        toast.error(t("set.man.delAcc.errorDeleting"));
      }

    } else {
      setShowError(true);
    }
  };

  return (
    <div className="p-6 flex flex-col items-start">
      <Description text={t("set.man.delAcc.confirmation")} />
      <label className="flex items-center pt-2">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => setIsConfirmed(!isConfirmed)}
          className="mr-2 border-custom-200 focus:ring-custom-200 text-custom-350"
        />
        <span className="text-custom-350">{t("set.man.delAcc.accept")}</span>
      </label>
      {!isConfirmed && showError && <p className="text-custom-350">{t("set.man.delAcc.errorAccept")}</p>}
      <Button onClick={handleClick}>{t("settings.manage.deleteAccount")}</Button>

    </div>
  );
};

export default DeleteAccount;
