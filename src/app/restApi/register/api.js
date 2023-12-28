import { useEffect } from 'react';

const CreateUser = () => {
    useEffect(() => {

        const formData = new FormData();
        formData.append('digits_reg_name', first_name); //Avinash
        formData.append('digits_reg_countrycode', countrycode); // +91
        formData.append('digits_reg_mobile', mobileNumber); // 8827040821
        formData.append('digits_reg_username', username); // test123
        formData.append('digits_reg_password', password); // testpass
        formData.append('digits_reg_email', email); // avinash123@gmail.com
        formData.append('otp', otp); // 267620
        formData.append('ftoken', firebaseAccessToken); // eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2xlYW50ZWNobWFydCIsImF1ZCI6ImNsZWFudGVjaG1hcnQiLCJhdXRoX3RpbWUiOjE2OTI1OTkwMTEsInVzZXJfaWQiOiJuR0JESzBJQ0MwWlg4dTloYUVLTDNlUnV4RzUzIiwic3ViIjoibkdCREswSUNDMFpYOHU5aGFFS0wzZVJ1eEc1MyIsImlhdCI6MTY5MjU5OTAxMSwiZXhwIjoxNjkyNjAyNjExLCJwaG9uZV9udW1iZXIiOiIrOTE4ODI3MDQwODIxIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE4ODI3MDQwODIxIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.F1fAgnHzdfh5E6gmbXc6jAlWg8xnq2KRiZTVVZO_TBm_uPhx75-SC8_7EYj3JzajSgjXRhfJ32EI8RYASxxZeZovRb7DMWZuy4hYWC2Tnipf7wyzMmIEAue7_7KQLp2W0D9yUtVdZgffF_7a-OU8ehWGPJcCiyXWM2JvnQm_pqbulXD_eNy6GD-IbkahS4FV7kMlA1Px2tTiLCRGKTRT2lV9Y
        // AFzFl20D_zOIDV2PInFX6NNUeWPHQ8zhCroNCHmLJt5OYAPbldIGMj0__s_8RYN2_SJvN-ZMToYxY9BU9Cr0CLRrEChpmrRjIVe_sRIg3DQVDB1S1yGIYj2iq3f-w"

        // Add other form data fields as needed

        const createNewUser = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('User created successfully:', data);
                    //   data looks like this. We need to save access token in localStorage
                    //   {
                    //     "success": true,
                    //     "data": {
                    //       "user_id": "767",
                    //       "access_token": "01c88744c78599843658f9db98e88a3a0ead78908c9ca21de1dec9fe9580c77213d29045faec26b266c5d1e5224d7a16ebc60e99dcd0e566e0e95682d11ad0bf",
                    //       "token_type": "bearer"
                    //     }


                } else {
                    console.error('Failed to create user:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        createNewUser();
    }, []);

    return (
        <div>
            <p>Creating a user...</p>
        </div>
    );
};

export default CreateUser;
