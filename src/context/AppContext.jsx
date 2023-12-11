import React,{useState,useEffect,useContext,createContext} from "react";
import { getUserInfo } from "../api/firestoreApi";
import { getLoggedOut } from "../api/authHelper";


 const FirebaseContext = createContext(null);


 const AppContext=({children})=>{
    const [user,setUser]=useState([]);
    const [loading,setLoading]=useState(true)
    const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")) || []);

    const fetchUserData=async()=>{
           setLoading(true)
            let resp=await getUserInfo(setUser);
            setLoading(false);
            // console.log("user from context",user);
    }
    


    useEffect(()=>{
        fetchUserData();
    },[])


    useEffect(() => {
        window.addEventListener('storage', handleStorageEvent);
        return () => window.removeEventListener('storage', handleStorageEvent);
      }, []);
    
      const handleStorageEvent = (event) => {
        if (event.key !== 'cart') return;
        setCart(JSON.parse(event.newValue));
      };
    
    const setLocalstorage=()=>{
        localStorage.setItem("cart",JSON.stringify(cart));
      }

    useEffect(()=>{
        setLocalstorage()
    },[cart])  

    const loggedOut=()=>{
       getLoggedOut();
       setUser([]);
    }

    const addToCart=(prod)=>{
      const existingProduct=cart.find((item)=>item.id===prod.id)

      if(existingProduct){
        setCart((prevCart)=>prevCart.map((item)=>item.id===prod.id? {...item, quantity: item.quantity+1}: item))
      }
      else{
        setCart((prevCart)=>[...prevCart, {...prod, quantity: 1}]);
      }
      
    }
   
    const incrementProductQuantity=(id)=>{
        setCart((prevCart)=>prevCart.map((item)=>item.id===id? {...item, quantity: item.quantity+1}: item));
    }

    const decrementProductQuantity=(id)=>{
        setCart((prevCart)=>prevCart.map((item)=>item.id===id? {...item, quantity: item.quantity-1}: item))
    }

    const removeProduct=(id)=>{
        setCart((prevCart)=>prevCart.filter((item)=>item.id!==id))
    }

    const clearCart=()=>{
        setCart([]);
    }
    

    return (
        <FirebaseContext.Provider value={{
            user,
            loading,
            loggedOut,
            fetchUserData,
            cart,
            addToCart,
            removeProduct ,
            clearCart,
            incrementProductQuantity,
            decrementProductQuantity
        }}>
            {children}
        </FirebaseContext.Provider>
    )
 }

 export const useFirebase=()=>{
    return useContext(FirebaseContext);
 }

 export default AppContext;