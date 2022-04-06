import axios from "axios";



const buyproduct = async (bought_product,user_id) => {
    const res = await axios.post('/api/users/updateproduct', {
        bought_product,
        user_id,
    });
  
    return res.data;
  };

  export default buyproduct