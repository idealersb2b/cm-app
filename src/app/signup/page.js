"use client"

import { useMutation } from "@apollo/client"
import Link from "next/link"
import { useState } from "react"
import { MUTATION_CREATE_USER } from "../graphql/users/mutations"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { Formik } from "formik"
import PhoneInput from 'react-phone-input-2'
import OtpInput from 'react-otp-input';
import { auth } from "../../../firebase"
import * as Yup from 'yup';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

import 'react-phone-input-2/lib/style.css'
import { ColorRing } from "react-loader-spinner"

const apiUrl = 'https://dev.cleantech-mart.com/wp-json/digits/v1/create_user/';


const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    username: Yup.string().required("User Name is Required"),
    mobile: Yup.string().required("Mobile Number is Required"),
    password: Yup.string().required("Email Required"),
    email: Yup.string().email("Enter Valid Email").required("Email Required"),
    otp: Yup.string().length(6, "Enter 6 Digts Code").required("OTP Required")
});


function SignUp() {

    const [signupFunctionCall] = useMutation(MUTATION_CREATE_USER);

    const router = useRouter();

    const [otpEnable, setOTPEnable] = useState(false);
    const [otpValue, setOtpValue] = useState(null)

    function onCaptchVerify() {

        if (!window.recaptchaVerifier1) {

            window.recaptchaVerifier1 = new RecaptchaVerifier(auth, 'recaptcha-container-signup', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignUp();
                },
                'expired-callback': () => {

                }
            });
        }

    }


    function onSignUp(phone) {

        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier1;

        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                toast.success("OTP Sent")
                setOTPEnable(true);
                // ...
            }).catch((error) => {
                console.log(error)
            });

    }

    const signUpWithOtp = async (data) => {

        const formData = new FormData();

        // let obj={
        //     'digits_reg_name': data.digits_reg_name,
        // 'digits_reg_countrycode':data.digits_reg_countrycode,
        //  'digits_reg_mobile': data.digits_reg_mobile,
        // 'digits_reg_username': data.digits_reg_username,
        // 'digits_reg_password':data.digits_reg_password,
        // 'digits_reg_email':data.digits_reg_email,
        // 'otp': data.otp,
        //  'ftoken': data.ftoken
        // }
        formData.append('digits_reg_name', data.digits_reg_name);
        formData.append('digits_reg_countrycode', data.digits_reg_countrycode);
        formData.append('digits_reg_mobile', data.digits_reg_mobile);
        formData.append('digits_reg_username', data.digits_reg_username);
        formData.append('digits_reg_password', data.digits_reg_password);
        formData.append('digits_reg_email', data.digits_reg_email);
        formData.append('otp', data.otp);
        formData.append('ftoken', data.ftoken);
        console.log(formData);
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.ftoken}`,
              },
            body: formData,
        }).then((response) => {

            response.json().then((data) => {
                console.log(data);
                if (data.success) {
                    toast("Succesfully Registered")
                } else {
                    throw new Error(data.data.msg)
                }

            }).catch((e) => {
                console.log(e)
                toast.error(e.message)
            })
        }).catch((e) => {
            console.log(e)
            toast.error(e.message)
        })

    }


    return (
        <>
            <div className="flex justify-around items-center sm:mx-14 pt-14 w-full max-w-[1440px] lg:mx-auto ">

                <img className="hidden md:block object-contain w-[558px] h-[422px]" src="/assets/signup.png" />

                <Formik
                    initialValues={{
                        name: '',
                        username: '',
                        mobile: '',
                        password: '',
                        email: '',
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        setSubmitting(true);
                        console.log(values)
                        signupFunctionCall({
                            variables: {
                                username: values.username,
                                password: values.password,
                                email: values.email
                            }
                        })
                            .then((data) => {
                                toast.success("Your Account Is Created !");
                                router.push('/login')
                                setSubmitting(false);
                            })
                            .catch((e) => {
                                toast.warn(e.message);
                                console.log(e);
                                setSubmitting(false);
                            })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isValid,
                        dirty,
                        setFieldValue,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setSubmitting,
                        isSubmitting,
                        /* and other goodies */
                    }) => (

                        <div className="min-w-[250px]">
                            <div className="flex flex-col gap-6">
                                <h2 className="text-4xl font-medium">Create an account</h2>
                                <p className="font-normal">Enter your details below</p>
                            </div>

                            <div className="flex flex-col gap-6 mt-8">
                                <input
                                    placeholder="Name"
                                    name="name"
                                    id='name'
                                    required
                                    onBlur={handleBlur}
                                    value={values.name}
                                    onChange={handleChange}
                                    className={`w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-2
                                    ${errors.name ? 'focus:border-b-red-600' : 'focus:border-b-primary'}
                                    '`}
                                />

                                <input
                                    placeholder="Username"
                                    name="username"
                                    id='username'
                                    required
                                    onBlur={handleBlur}
                                    value={values.username}
                                    onChange={handleChange}
                                    className={`w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-2
                                    ${errors.username ? 'focus:border-b-red-600' : 'focus:border-b-primary'}
                                    '`}
                                />

                                <PhoneInput
                                    className="w-full"
                                    country={'in'}
                                    id='mobile'
                                    placeholder="Mobile Number"
                                    name="mobile"
                                    required
                                    value={values.mobile}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        setFieldValue('mobile', "+" + e);
                                    }}
                                />

                                <input
                                    placeholder="Email"
                                    required
                                    id='email'
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className='w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-primary focus:border-b-2' />

                                <input
                                    placeholder="Password"
                                    name="password"
                                    id='password'
                                    type="password"
                                    required
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className='w-full border border-b-2 p-4 h-12 outline-none border-r-0 border-l-0 border-t-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-primary focus:border-b-2' />

                                <div className=" w-full">
                                    <button  type="submit"
                                        onClick={() => {

                                            if (isValid && dirty) {
                                                handleSubmit();
                                            } else {
                                                toast.error(errors[Object.keys(errors)[0]]);
                                            }

                                        }} className="bg-primary w-full text-white px-28 py-4 rounded">
                                        Create Account
                                    </button>
                                </div>

                                <div className="w-full flex flex-col gap-10">
                                    <button onClick={() => {
                                        onSignUp(values.mobile)
                                    }} className="flex justify-center items-center gap-4 w-full py-4 rounded border-2" >
                                        <span>
                                            SignUp with OTP
                                        </span>
                                    </button>
                                    {
                                        otpEnable ?
                                            <>
                                                <OtpInput
                                                    containerStyle={{
                                                        justifyContent: 'space-between'
                                                    }}
                                                    inputStyle={{
                                                        display: 'flex',
                                                        flex: 1,
                                                        padding: "5px",
                                                        border: '1px solid grey'
                                                    }}
                                                    value={otpValue}
                                                    onChange={(val) => {
                                                        setOtpValue(val);
                                                    }}
                                                    numInputs={6}
                                                    renderSeparator={<span>-</span>}
                                                    renderInput={(props) => <input {...props} />}
                                                />

                                                {
                                                    isSubmitting ? <ColorRing
                                                        visible={true}
                                                        height="56"
                                                        width="56"
                                                        ariaLabel="blocks-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="blocks-wrapper self-center"
                                                        colors={['#00b517', '#00b517', '#00b517', '#00b517', '#00b517']}
                                                    /> : <button onClick={() => {
                                                        setSubmitting(true);

                                                        window.confirmationResult.confirm(otpValue).then(async (data) => {
                                                            const mobileNumber = values.mobile.slice(-10);
                                                            const countrycode = values.mobile.slice(0, -10);

                                                            const postData = {
                                                                'digits_reg_name': values.name,
                                                                'digits_reg_countrycode': countrycode,
                                                                'digits_reg_mobile': mobileNumber,
                                                                'digits_reg_username': values.username,
                                                                'digits_reg_password': values.password,
                                                                'digits_reg_email': values.email,
                                                                'otp': otpValue,
                                                                'ftoken': data._tokenResponse.idToken
                                                            }

                                                            await signUpWithOtp(postData);
                                                        }).catch(e => {
                                                            console.log(e);
                                                            toast.error(e.message)
                                                        }).finally(() => {
                                                            setSubmitting(false);
                                                        })

                                                    }} className="flex justify-center items-center gap-4 w-full py-4 rounded border-2" >
                                                        <span>
                                                            Submit OTP
                                                        </span>
                                                    </button>
                                                }

                                            </>
                                            : null
                                    }
                                </div>

                                <div id="recaptcha-container-signup">

                                </div>

                                <div className="flex justify-center items-center gap-4">
                                    <span>Already have account?</span>
                                    <Link href='/login' className="border-b-2 brder-b-[#7e7e7e] font-medium">Log in</Link>
                                </div>

                            </div>

                        </div>
                    )
                    }
                </Formik>
            </div>
        </>

    )
}

export default SignUp