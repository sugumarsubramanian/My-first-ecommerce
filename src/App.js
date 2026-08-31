import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/organisms/header/header';
import RoutePage from './routes';
import Footer from './components/organisms/footer';
import { loadAuth } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='p-4 pb-16'>
          <RoutePage />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
