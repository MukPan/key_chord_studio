import './styles/globals.css'
import './styles/pianoStyle.css'
import './styles/Home.module.css'

import ReactDOM from 'react-dom/client'
import StartPage from "./pages/StartPage.jsx";

const app = document.getElementById('app');

if (app === null) {
  throw new Error('app not found');
}

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <StartPage />
  </React.StrictMode>,
);