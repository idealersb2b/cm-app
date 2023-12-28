import { loadStripe } from "@stripe/stripe-js";





export async function checkout({ lineItems, userId }) {

    const stripe = await loadStripe(PROCESS.ENV.publishable_key);

    stripe.redirectToCheckout({
        mode: "subscription",
        billingAddressCollection: "required",
        lineItems,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
    })

}