import './App.css';
import  Nav from './component/nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './component/Footer';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PvtComponent';
import Login from './component/login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/Update';
import Profile from './component/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
     <Routes>
      <Route  element={<PrivateComponent/>}>
      <Route path="/product" element={<ProductList/>}/>
      <Route path="/add-products" element={<AddProduct/>}/>
      <Route path="/update/:id" element={<UpdateProduct/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/logout" element={<h1>Logout component</h1>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp />}/>
     </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
