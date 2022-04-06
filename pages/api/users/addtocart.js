import User from "@/model/user";
import connectDB from "@/middleware/connectDB";
import findTotal from '@/lib/utils/findtotal'

async function addtocart(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "req_method_not_supported" });
  }

  let { products, user_id } = req.body;
  if (!products || !user_id) {
    return res.status(422).json({ message: "data_incomplete" });
  }

  try {

      const user = await User.findById(user_id);
      if (user) {
        const {cart} = user;

        let newCart = cart
        let foundItem = newCart.items.filter(item=>item._id==products._id)

       

        if(foundItem.length===0){
          newCart.items = [...newCart.items,products]
        }else{
          let objIndex = newCart.items.findIndex(item=>item._id===products._id)
          newCart.items[objIndex].count +=1
        }

        newCart.total = findTotal(newCart.items)


        const updatedUser = await User.findOneAndUpdate(
          { _id: user_id },
          {$set:{cart:newCart}}
        )


    


        return res.status(200).json(updatedUser.cart);
      }
    

    return res.status(200).json({message:"User doesn't exists"});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error occured!" });
  }
}

export default connectDB(addtocart);
