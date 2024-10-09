import { Routes, Route } from  'react-router-dom';
import Home from './pages/home/home';
import MasterData from './pages/master-data/master';
import Navbar from './component/UI/navbar/navbar';
import DivisionData from './pages/division-data/division-data';
import NotFound from './pages/error/error';
import BarangMasuk from './pages/barang-masuk/barang-masuk';
import BarangKeluar from './pages/barang-keluar/barang-keluar';
import SisaStock from './pages/sisa-stock/sisa-stock';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Logout from './pages/logout/logout';
import PrivateRoute from './component/UI/PrivateRoute/PrivateRoute';
import BarangKeluarDetail from './pages/barang-keluar-detail/barang-keluar-detail';
import { AppHook } from './hook/app/app';

const App = () => {
  const { hideNavbar,isAuthenticated,setIsAuthenticated} = AppHook();

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register-make-by-steby' element={<Register setIsAuthenticated={setIsAuthenticated}/>} /> 
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setIsAuthenticated */}
        <Route path='/master-data' element={<PrivateRoute element={<MasterData />} isAuthenticated={isAuthenticated} />} />
        <Route path='/division-data' element={<PrivateRoute element={<DivisionData />} isAuthenticated={isAuthenticated} />} />
        <Route path='/incoming' element={<PrivateRoute element={<BarangMasuk />} isAuthenticated={isAuthenticated} />} />
        <Route path='/outcoming' element={<PrivateRoute element={<BarangKeluar />} isAuthenticated={isAuthenticated} />} />
        <Route path='/outcoming-detail'element={<PrivateRoute element={<BarangKeluarDetail />} isAuthenticated={isAuthenticated} />}/>
        <Route path='/remaining-stock' element={<PrivateRoute element={<SisaStock />} isAuthenticated={isAuthenticated} />} />
        <Route path='/logout' element={<Logout />} /> 
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
