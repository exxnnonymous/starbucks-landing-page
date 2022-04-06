
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function handler(req, res)  {
    if(req.method === "POST"){

        try{
            let {items} = req.body || []
            const session = await stripe.checkout.sessions.create({
                mode:"payment",
                payment_method_types:['card'],
                line_items:items,
                success_url:process.env.NEXT_PUBLIC_APP_URL + "/payment?status=success",
                cancel_url:process.env.NEXT_PUBLIC_APP_URL + "/payment?status=cancel",
            })

            res.status(200).json(session)
        }catch(err){
            res.status(500).json({message:"Internal server error"})
        }

    }
    else{
        res.status(405).json({message:"Method Not Allowed"})
    }
  }