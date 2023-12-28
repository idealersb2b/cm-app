"use client"

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

function SuccessPayment() {
    const params = useSearchParams();
    const sessionId = params.get('session_id');
    const userId = params.get('userId');


    useEffect(() => {
        const fetchCheckoutSession = async () => {
            const stripe = await loadStripe(PROCESS.ENV.publishable_key);

            try {
                const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
                const session = await response.json();

                if (session.payment_status === 'paid') {
                    console.log('Payment successful');
                    console.log('User ID:', userId);
                    // Call your API or perform other actions here
                } else {
                    console.log('Payment not successful');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
            }
        };

        if (sessionId) {
            fetchCheckoutSession();
        }
    }, [sessionId, userId]);

    return (
        <div>
            <h1>Payment Verification</h1>
            {/* You can add more content to the success page if needed */}
        </div>
    );
}

export default SuccessPayment;
