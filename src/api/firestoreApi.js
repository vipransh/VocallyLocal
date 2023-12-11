import { firestore} from "../config/firebaseConfig";
import { addDoc,query,where ,collection,onSnapshot,getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


let userRef=collection(firestore,"user");
let storeRef=collection(firestore,"store");
let productRef=collection(firestore,"products");
let orderRef=collection(firestore,"orders");

export const createNewUser=(object)=>{
    try {
     const res=addDoc(userRef,object)
     return res
    } catch (error) {
        return error
    }
    
}

export const createStore=(object)=>{
  try {
    const res=addDoc(storeRef,object)
    return res
  } catch (error) {
    return error
  }
}

export const addProductInStore=(object)=>{
  try {
    const res=addDoc(productRef,object)
    return res
  } catch (error) {
    return error
  }
}

export const createOrder=(object)=>{
  try {
    const res=addDoc(orderRef,object)
    return res
  } catch (error) {
    return error
  }
}

export const getOrderListForAdmin=async(id)=>{
  const orderQuery=query(orderRef,where("storeId","==",id),where("status","!=","delivered"));

  try {
    const querySnapshot=await getDocs(orderQuery);
    const orders=[]

    querySnapshot.forEach((doc)=>{
      orders.push({id: doc.id, ...doc.data()});
    });
    return orders;
  } catch (error) {
    console.error("Error getting stores by city:", error);
  }
}

export const getOrderListForUser=async(id)=>{
  const orderQuery=query(orderRef,where("userId","==",id));

  try {
    const querySnapshot=await getDocs(orderQuery);
    const orders=[]

    querySnapshot.forEach((doc)=>{
      orders.push({id: doc.id, ...doc.data()});
    });
    return orders;
  } catch (error) {
    console.error("Error getting stores by city:", error);
  }
}

export const getStoreByCity=async(city)=>{
  city=city.toLowerCase();
  const storeQuery=query(storeRef,where("city","==",city));

  try {
    const querySnapshot=await getDocs(storeQuery);
    const stores=[]

    querySnapshot.forEach((doc)=>{
      stores.push({id: doc.id, ...doc.data()});
    });
    return stores;
  } catch (error) {
    console.error("Error getting stores by city:", error);
  }
}

export const getProductsByStoreId=async(id)=>{
  const storeQuery=query(productRef,where("storeId","==",id));

  try {
    const querySnapshot=await getDocs(storeQuery);
    const products=[]

    querySnapshot.forEach((doc)=>{
      products.push({id: doc.id, ...doc.data()});
    });
    return products;
  } catch (error) {
    console.error("Error getting stores by city:", error);
  }
}

export const getStoreByAdmin=async(id)=>{
  const storeQuery=query(storeRef,where("storeAdmin","==",id));

  try {
    const querySnapshot=await getDocs(storeQuery);
    const stores=[]

    querySnapshot.forEach((doc)=>{
      stores.push({id: doc.id, ...doc.data()});
    });
    // console.log("st",stores);
    return stores;
  } catch (error) {
    console.error("Error getting store:", error);
  }
}

export const getStoreById=async(id)=>{
  const storeDocRef=doc(storeRef, id);
  try {
    const docSnapshot = await getDoc(storeDocRef);

    if (docSnapshot.exists()) {
      const storeData = { id: docSnapshot.id, ...docSnapshot.data() };
      return storeData;
    } else {
      console.log("Store not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting stores by city:", error);
  }
}

export const getProductById=async(id)=>{
  const productDocRef=doc(productRef, id);
  try {
    const docSnapshot = await getDoc(productDocRef);

    if (docSnapshot.exists()) {
      const storeData = { id: docSnapshot.id, ...docSnapshot.data() };
      return storeData;
    } else {
      console.log("Product not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting product by id:", error);
  }
}




export const getUserInfo=async(setData)=>{
      try {
           const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              try {
                const res = query(userRef, where("userId", "==", user.uid));
                const snapshot = await getDocs(res);
    
                const userData = snapshot.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                });
    
                unsubscribe(); // Unsubscribe after fetching user data
                // resolve(userData);
                // console.log("tseting",userData);
                setData(userData)
                
              } catch (error) {
                console.log(error);
                return []
              }
            } else {
              // Handle the case when the user is not authenticated
            //   reject("User not authenticated");
               return []
            }
          });
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    
}


export const updateOrderStatus = async (id, newStatus) => {
  const docRef = doc(firestore, "orders", id);

const data = {
  status: newStatus
};

try {
   await updateDoc(docRef, data);
  return true;
} catch (error) {
  console.log(error);
  return false
}

};

export const updateShopAdminStatus = async (id) => {
  const docRef = doc(firestore, "user", id);

const data = {
  storeAdmin: true,
};

try {
   await updateDoc(docRef, data);
  return true;
} catch (error) {
  console.log(error);
  return false
}

};

