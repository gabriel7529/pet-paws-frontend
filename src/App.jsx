import './assets/css/App.css'
import {PetContext} from "./contexts/PetContext"
import { MainRouter } from './routers/MainRouter'
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.jsx'
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
function App() {
  return (
    <>
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <PetContext.Provider value={[]}>
            <div className={"container"}>
                <LanguageSwitcher />
                <MainRouter></MainRouter>
            </div>
          </PetContext.Provider>
        </I18nextProvider>
       </div>
    </>
  )
}

export default App
