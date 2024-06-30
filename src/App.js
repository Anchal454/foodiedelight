import { ToastContainer } from 'react-toastify';
import Router from './routes/sections';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={5000}
      />
    </>
  );
}

export default App;
