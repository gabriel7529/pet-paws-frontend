// App.jsx

import './assets/css/App.css';
import { PetContext } from "./contexts/PetContext";
import { SavedPostsProvider } from "./contexts/SavedPostsContext.jsx";
import { MainRouter } from "./routers/MainRouter";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "./contexts/config/ConfigContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import i18n from "./i18n.jsx";
import { useCurrentUser } from './hooks/useCurrentUser.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const current_user = useCurrentUser();

  return (
    <div className="App bg-white min-h-screen pb-[70px]">
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <ConfigProvider>
            <PetContext.Provider value={{ current_user}}>
              <SavedPostsProvider>
                <BrowserRouter>
                  <MainRouter />
                </BrowserRouter>
              </SavedPostsProvider>
            </PetContext.Provider>
          </ConfigProvider>
        </UserProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
