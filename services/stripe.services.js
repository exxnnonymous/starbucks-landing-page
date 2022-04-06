import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

let stripePromise = null

const getStripe = ()=>{
    if(!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}



 const redirectToCheckout = async(items)=>{
    //  create stripe checkout
    const {data:{id}} = await axios.post('/api/checkout/create-stripe-session', {
        items,
    })

    // redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({sessionId:id})

}

export default redirectToCheckout
