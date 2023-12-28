// import { loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";

// const stripePromise = loadStripe(
//     PROCESS.ENV.publishable_key
// );

// const CheckoutButton = () => {
//     const router = useRouter();

//     const handleCheckout = async () => {
//         try {
//             const stripe = await stripePromise;
//             const response = await fetch("/api/checkout_sessions", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             const { sessionId } = await response.json();
//             const { error } = await stripe.redirectToCheckout({
//                 sessionId,
//             });

//             if (error) {
//                 router.push("/error");
//             }
//         } catch (err) {
//             console.error("Error in creating checkout session:", err);
//             router.push("/error");
//         }
//     };

//     return <button onClick={handleCheckout}>Buy Now</button>;
// };

// export default CheckoutButton;