import './assets/css/App.css'
import {PetContext} from "./contexts/PetContext"
import { MainRouter } from './routers/MainRouter'
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.jsx'
import Header from './components/template/Header.jsx'
import { useCurrentUser } from './hooks/useCurrentUser.jsx';
import  Footer  from './components/template/Footer.jsx';

function App() {
  const current_user=useCurrentUser();

  return (
    <>
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <PetContext.Provider value={{current_user}}>
            <div className="flex flex-col h-screen justify-between">
                <Header/>
                <MainRouter></MainRouter>
                <Footer/>
            </div>
          </PetContext.Provider>
        </I18nextProvider>
       </div>
    </>
  )
}

export default App
