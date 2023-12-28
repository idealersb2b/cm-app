"use client"
// import Image from "next/image"
import Link from "next/link"
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import { MUTATION_LOGIN } from '../graphql/login/mutations'
import { setCookie } from 'nookies'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MUTATION_SEND_PASSWORD_RESET } from '../graphql/users/mutations'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { UsernameInVar, isLoggedInVar, isVendorInVar } from "../Providers"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { auth } from "../../../firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2'
import * as Yup from 'yup';
import 'react-phone-input-2/lib/style.css'
import { QUERY_GET_USER_TOKENS } from "../graphql/users/queries"
import { ColorRing } from "react-loader-spinner"

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .required('Username Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password Required'),
});


const apiUrl = 'https://dev.cleantech-mart.com/wp-json/digits/v1/login_user/';

function Login() {

    const [loginFunctionCall] = useMutation(MUTATION_LOGIN);
    const [sendPasswordReset] = useMutation(MUTATION_SEND_PASSWORD_RESET);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const userName = useReactiveVar(UsernameInVar);
    //const isVendor = useReactiveVar(isVendorInVar);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otpEnable, setOTPEnable] = useState(false);
    const [otpValue, setOtpValue] = useState(null)
    const [optLoading, setOtpLoading] = useState(false);

    const [getUserTokens] = useLazyQuery(QUERY_GET_USER_TOKENS);


    const router = useRouter();

    function onCaptchVerify() {

        if (!window.recaptchaVerifier2) {

            window.recaptchaVerifier2 = new RecaptchaVerifier(auth, 'recaptcha-container-login', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignUp();
                },
                'expired-callback': () => {

                }
            });

        }
    }

    const loginWithOTP = async (countrycode, mobileNumber, otp, firebaseAccessToken) => {
        try {

            const formData = new FormData();
            formData.append('countrycode', "+" + countrycode);
            formData.append('user', mobileNumber);
            formData.append('otp', otp);
            formData.append('ftoken', firebaseAccessToken);

            console.log(countrycode, mobileNumber, otp, firebaseAccessToken);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    const access_token = data.data.access_token
                    const userId = data.data.user_id;
                    const refreshToken = data.data.refresh_token

                    setCookie(null, 'refreshToken', refreshToken, {
                        maxAge: 30 * 24 * 60 * 60
                    })

                    localStorage.setItem('authToken', access_token);

                    console.log({ access_token, userId, refreshToken });

                    getUserTokens({
                        variables: {
                            id: Number(userId)
                        },
                    }).then((data) => data.data).then(data => {

                        console.log("Final Result", data);

                        const clientMutationId = uuidv4();

                        localStorage.setItem('clientMutationId', clientMutationId);

                        localStorage.setItem('userId', data.user.id)

                        localStorage.setItem('customerId', data.user.databaseId)

                        localStorage.setItem('userName', data.user.firstName)

                        localStorage.setItem('authToken', data.user.jwtAuthToken);

                        localStorage.setItem('userRole', data.user.roles.edges[0].node.name);

                        if (data.user.roles.edges[0].node.name === 'wcfm_vendor') {
                            isVendorInVar(true);
                        } 
                        else {
                            isVendorInVar(false);
                         }



                        UsernameInVar(data.user.firstName)

                        localStorage.setItem('woocommerce_session_token', data.user.wooSessionToken);

                        setCookie(null, 'refreshToken', data.user.jwtRefreshToken, {
                            maxAge: 30 * 24 * 60 * 60
                        })

                        toast.success("Yes You Have SuccessFull LoggedIn !");
                        isLoggedInVar(true);
                        router.push('/');
                    }).catch((e) => {
                        toast.error(e.message);
                    })
                } else {
                    toast.error("Try Again!")
                    return;
                }
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    function onSignUp(phone) {
        setOtpLoading(true);

        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier2;

        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                toast.success("OTP Sent")
                // ...
            }).catch((error) => {
                console.log(error)

            })
            .finally(() => {
                setOtpLoading(false);
            });

    }

    return (
        <>
            <div className="flex justify-around items-center sm:mx-14 pt-14 w-full max-w-[1440px] lg:mx-auto ">
                <img className="hidden md:block object-contain w-[558px] h-[422px]" src="/assets/login.png" />
                <div className="min-w-[250px]">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-4xl font-medium">Log in to Exclusive</h2>
                        <p className="font-normal">Enter your details below</p>
                    </div>
                    <div id="recaptcha-container-login"></div>
                    {
                        !otpEnable ?
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={loginSchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    setSubmitting(true)

                                    loginFunctionCall({ variables: { username: values.username, password: values.password } })
                                        .then((result) => result.data).then((data) => {

                                            console.log(data);

                                            const clientMutationId = uuidv4();

                                            localStorage.setItem('clientMutationId', clientMutationId);

                                            localStorage.setItem('userId', data.login.user.id)

                                            localStorage.setItem('customerId', data.login.user.databaseId)

                                            localStorage.setItem('userName', data.login.user.username)

                                            localStorage.setItem('authToken', data.login.authToken);

                                            localStorage.setItem('userRole', data?.login?.user?.roles?.edges[0]?.node.name);

                                            if (data?.user?.roles?.edges[0]?.node?.name === 'wcfm_vendor') {
                                                isVendorInVar(true);
                                            } 
                                            else {
                                              isVendorInVar(false);
                                            }

                                            isLoggedInVar(true);

                                            UsernameInVar(data.login.user.username)

                                            localStorage.setItem('woocommerce_session_token', data.login.user.wooSessionToken);

                                            setCookie(null, 'refreshToken', data.login.refreshToken, {
                                                path: '/',
                                                maxAge: 30 * 24 * 60 * 60
                                            })

                                            setCookie(null, 'authToken', data.login.authToken, {
                                                path: '/',
                                                maxAge: 5 * 60
                                            })

                                            toast.success("Yes You Have SuccessFull LoggedIn !");

                                            setSubmitting(false)

                                        }).then(() => {
                                            router.push('/');
                                        })
                                        .catch((e) => {
                                            console.log(e);
                                            toast.warning(e.message);
                                            setSubmitting(false)
                                        })
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    isValid,
                                    dirty,
                                    setSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <div className="flex flex-col gap-10 mt-8">

                                        <input
                                            placeholder="Email or Phone Number"
                                            name="username"
                                            required
                                            value={values.username}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 ${(touched.username && values.username.length === 0) || errors.username ? 'border-b-red-600 border-b-2' : 'focus:border-b-primary focus:border-b-2'}`} />
                                        <div className="relative">
                                            <input
                                                placeholder="Password"
                                                name="password"
                                                type={isPasswordVisible ? 'text' : 'password'}
                                                required
                                                onBlur={handleBlur}
                                                value={values.password}
                                                onChange={handleChange}
                                                className={`w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 ${touched.password && values.password.length === 0 ? 'border-b-red-600 border-b-2' : 'focus:border-b-primary focus:border-b-2'}`} />
                                            {
                                                !isPasswordVisible ?
                                                    <AiFillEyeInvisible className="absolute right-0 absolute-center w-6 h-6 top-1/4" onClick={() => setIsPasswordVisible(true)} /> :
                                                    <AiFillEye className="absolute right-0 absolute-center w-6 h-6 top-1/4" onClick={() => setIsPasswordVisible(false)} />
                                            }

                                            <div className="text-xs flex gap-2 mt-2">
                                                <span>Forgot Password?</span>
                                                <Link href='#' onClick={() => {
                                                    setSubmitting(true);
                                                    sendPasswordReset({
                                                        variables: {
                                                            input: {
                                                                username: values.username,
                                                                clientMutationId: uuidv4(),
                                                            }
                                                        }
                                                    }).then(data => {
                                                        console.log(data);
                                                        data?.extensions?.debug.forEach(element => {
                                                            toast.error(element.message);
                                                        });

                                                        if (data?.extensions?.debug.length === 0) {
                                                            toast.success("Link Has Been Sent To Your Email");
                                                        }

                                                    }).catch((e) => {
                                                        console.log(e);
                                                        toast.error(e);
                                                    }).finally(() => {
                                                        setSubmitting(false);
                                                    })
                                                }} className="border-b-2 brder-b-[#7e7e7e] font-medium">Click here</Link>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-center ">
                                            {
                                                isSubmitting ? <ColorRing
                                                    visible={true}
                                                    height="56"
                                                    width="56"
                                                    ariaLabel="blocks-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="blocks-wrapper"
                                                    colors={['#00b517', '#00b517', '#00b517', '#00b517', '#00b517']}
                                                /> : <button
                                                    type='submit'
                                                    disabled={isSubmitting}
                                                    onClick={() => {
                                                        if (isValid && dirty) {
                                                            handleSubmit();
                                                        } else {
                                                            toast.error(errors[Object.keys(errors)[0]]);
                                                        }
                                                    }}
                                                    className="bg-primary w-full text-white px-28 py-4 rounded" >
                                                    Login
                                                </button>
                                            }


                                        </div>
                                        <div className="flex justify-center items-center gap-4">
                                            <span>Don’t have an account?</span>
                                            <Link href='/signup' className="border-b-2 brder-b-[#7e7e7e] font-medium">Sign up</Link>
                                        </div>
                                    </div>
                                )}
                            </Formik> : null
                    }

                    <div className="w-full flex flex-col gap-10">
                        {
                            otpEnable ? <button onClick={() => setOTPEnable(false)} className="flex justify-center items-center gap-4 w-full py-4 rounded border-2" >
                                <span>
                                    Login with Email or Username
                                </span>
                            </button>
                                :
                                <button onClick={() => setOTPEnable(true)} className="flex justify-center items-center gap-4 w-full py-4 rounded border-2" >
                                    <span>
                                        Login with OTP
                                    </span>
                                </button>
                        }
                        {
                            otpEnable ? <>
                                <PhoneInput
                                    className="w-full mt-8"
                                    country={'in'}
                                    value={phoneNumber}
                                    onChange={phone => setPhoneNumber(phone)}
                                />

                                {
                                    optLoading ? <ColorRing
                                        visible={true}
                                        height="56"
                                        width="56"
                                        ariaLabel="blocks-loading"
                                        wrapperClass="blocks-wrapper self-center"
                                        colors={['#00b517', '#00b517', '#00b517', '#00b517', '#00b517']}
                                    /> :
                                        <button className="bg-primary text-white p-4 rounded"
                                            onClick={() => {
                                                onSignUp("+" + phoneNumber)
                                            }}
                                        >
                                            Submit
                                        </button>
                                }

                                <OtpInput
                                    value={otpValue}
                                    containerStyle={{
                                        justifyContent: 'space-between'
                                    }}
                                    inputStyle={{
                                        display: 'flex',
                                        flex: 1,
                                        padding: "5px",
                                        border: '1px solid grey'
                                    }}
                                    onChange={(val) => {

                                        console.log(val);
                                        setOtpValue(val);

                                        if (val.length === 6) {

                                            setOtpLoading(true);

                                            window.confirmationResult.confirm(val).then(async (data) => {
                                                const mobileNumber = phoneNumber.slice(-10);
                                                const countrycode = phoneNumber.slice(0, -10);
                                                console.log(data._tokenResponse.idToken)

                                                await loginWithOTP(countrycode, mobileNumber, val,
                                                    data._tokenResponse.idToken)

                                            }).catch(e => {
                                                console.log(e);
                                                toast.error(e.message);
                                            }).finally(() => {
                                                setOtpLoading(false);
                                            })
                                        }

                                    }}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />

                            </>

                                : null
                        }
                    </div>
                </div>

            </div>
        </>

    )
}

export default Login