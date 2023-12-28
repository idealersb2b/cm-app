import { firebase_app } from "./firebase";
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(phoneNumber) {
    let result = null,
        error = null;
    try {
        const appVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        // ...
                    }).catch((error) => {
                        // Error; SMS not sent
                        // ...
                    });
            }
        });



    } catch (e) {
        error = e;
        console.log("OTP Error", error);
    }

    return { result, error };
}