import { BrowserRouter } from 'react-router-dom';

import Footer from './components/ui/Footer';
import Navigation from './routes/Navigation';

import './css/style.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
