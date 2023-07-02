import logo from './logo.svg';
import './App.css';

import { TextField ,Container} from '@mui/material';

import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import BookDetails from './components/BookDetails';
import BookContainer from './components/BookContainer';
import Loader from './assets/Loader';
import { useSelector } from 'react-redux';

function App() {

  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
      <Route path="/book/:id" element={<BookDetails/>}/>
      <Route exact path="/" element={<BookContainer/>}/>
    </Routes>
    </BrowserRouter>
 
    </>
  );
}

export default App;
