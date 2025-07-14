import './assets/css/App.css'
import {PetContext} from "./contexts/PetContext"
import { MainRouter } from './routers/MainRouter'
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.jsx'

import { useCurrentUser } from './hooks/useCurrentUser.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const current_user=useCurrentUser();

  return (
    <>
      <div className="App bg-white">
        <I18nextProvider i18n={i18n}>
          <PetContext.Provider value={{current_user}}>
            <div>
                <BrowserRouter>
                  <MainRouter/>
                </BrowserRouter>
            </div>
          </PetContext.Provider>
        </I18nextProvider>
       </div>
    </>
  )
}

export default App
