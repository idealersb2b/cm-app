import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';




const LoginUser = () => {

    const formData = new FormData();

    const loginUser = async ({ countrycode, mobileNumber, email, otp, firebaseAccessToken }) => {
        try {



            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logged in successfully:', data);

                // UseQuery logic here
                // Replace QUERY_GET_USER_TOKENS with your actual query constant
                const { loading, error, loginData } = useQuery(QUERY_GET_USER_TOKENS, {
                    context: {
                        headers: {
                            Authorization: `Bearer ${data.data.access_token}`, // Using the correct key
                            // Other headers if needed
                        },
                    },
                });

                console.log(loginData);
            } else {
                console.error('Failed to login user:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    loginUser();
}, []);

return (
    <div>
        <p>Logging in user...</p>
    </div>
);
};

export default LoginUser;
