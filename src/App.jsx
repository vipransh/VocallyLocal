import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AppContext from './context/AppContext.jsx'
import Main from './components/Main.jsx'
import StorePage from './pages/StorePage.jsx'
import ViewStore from './pages/ViewStore.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Layout from './Layout.jsx'
import './index.css'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import AddShop from './components/AddShop.jsx'
import ManageStore from './pages/ManageStore.jsx'
import OrderPage from './pages/OrderPage.jsx'
import OrderHistory from './pages/OrderHistory.jsx'
// import './App.css'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='findShop' element={<StorePage/>}/>
      <Route path='Store' element={<ViewStore/>}/>
      <Route path='checkout' element={<OrderPage/>}/>
      <Route path='Shop/product' element={<ProductPage/>}/>
      <Route path='AddYourShop' element={<AddShop/>}/>
      <Route path='manageStore' element={<ManageStore/>}/>
      <Route path='orderHistory' element={<OrderHistory/>}/>
    </Route>
  )
)

function App() {
  return (
    
           <AppContext>
             <RouterProvider router={router}/>
           </AppContext>
     

  )
}

export default App
