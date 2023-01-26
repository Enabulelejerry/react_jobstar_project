import { BrowserRouter,Routes,Route, Router } from "react-router-dom";
import {Landing,Error,Register,ProctectedRoute} from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  AddJob,
  Alljobs,
  Stats,
  SharedLayout
} from './pages/dashboard'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' 
        element={
          <ProctectedRoute>
              <SharedLayout />
          </ProctectedRoute>
        }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<Alljobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}

export default App;
