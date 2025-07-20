import { useContext, useState } from 'react';
import { ConfigContext } from '../contexts/config/ConfigContext';
import { useTranslation } from 'react-i18next';
import  Menu  from '../components/Settings/Menu';
import EditProfile from '../components/Settings/EditProfile';
import EditPassword from '../components/Settings/EditPassword';
import EditDetails from '../components/Settings/EditDetails';
import EditPrivacity from '../components/Settings/EditPrivacity';
import BlockedAccounts from '../components/Settings/BlockedAccounts';
import EditTheme from '../components/Settings/EditTheme';
import EditLanguage from '../components/Settings/ChangeLanguage';
import ReportProblem from '../components/Settings/ReportProblem';
import Faq from '../components/Settings/Faq';
import Logout from '../components/Settings/Logout';
import DeleteAccount from '../components/Settings/DeleteAccount';
import useWindowSize from '../hooks/useWindowsSize';
import  AlternateHeader  from '../components/Settings/Header'

const Settings = () => {
  const  {selectedSection}  = useContext(ConfigContext);
  const { width } = useWindowSize();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  }


  const renderContent = () => {
    switch (selectedSection) {
      case 'settings.user.edit':
        return <EditProfile />;
      case 'settings.user.password':
        return <EditPassword />;
      case 'settings.user.details':
        return <EditDetails />;
      case 'settings.security.privacy':
        return <EditPrivacity />;
      case 'settings.security.blockedAccounts':
        return <BlockedAccounts />;
      case 'settings.preferences.theme':
        return <EditTheme />;
      case 'settings.preferences.language':
        return <EditLanguage />;
      case 'settings.support.reportProblem':
        return <ReportProblem />;
      case 'settings.support.faqs':
        return <Faq />;
      case 'settings.manage.logout':
        return <Logout/>;
      case 'settings.manage.deleteAccount':
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  /*const handleSave = () => {
    // Example configuration data

  };*/

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <div>
       <AlternateHeader title={width>768? t("settings.title"): t(selectedSection)} toggleMenu={toggleMenu}/>
      <div className="flex flex-1 ">
        <Menu isOpenMenu={isOpenMenu} toggleMenu={toggleMenu}/>
        <main className="flex flex-1 p-4 bg-white justify-center">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Settings;
