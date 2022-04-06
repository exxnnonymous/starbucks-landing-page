import axios from "axios"


const  API_URL = '/api/users/';

const addtocart = async(products, user_id)=>{
    await axios.post(API_URL + "addtocart", {
        products,
        user_id,
      });
    
}
const removefromcart = async(product_id, user_id)=>{
     await axios.post(API_URL + "removefromcart", {
        product_id,
        user_id,
      });
    
}

const emptycart = async( user_id)=>{
    await axios.post(API_URL + "emptycart", {
        
        user_id,
      });
    
}

const cartService = {
    addtocart,
    removefromcart,
    emptycart
}

export default cartService