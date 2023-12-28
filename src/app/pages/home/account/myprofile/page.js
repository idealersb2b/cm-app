"use client"

import { isLoggedInVar } from '@/app/Providers';
import { useReactiveVar } from '@apollo/client';

import { MUTATION_UPDATE_CUSTOMER_DETAILS } from '@/app/graphql/customer/mutations';
import { QUERY_GET_CUSTOMER_DETAILS } from '@/app/graphql/customer/queries';
import { MUTATION_UPDATE_USER_PASSWORD,MUTATION_UPDATE_ROLE } from '@/app/graphql/mutations';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { data } from 'autoprefixer';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import lottie from "lottie-web";
import reactLogo from "../../../../../../public/lottie/animation_llkii2bv.json";
import * as Yup from 'yup';

// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     lastName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//   });

function MyProfile() {
    //here

    const isLoggedIn = () => {
        // Implement your logic to check if the user is logged in
        // For example, check if the authentication token exists in localStorage
        return localStorage.getItem('authToken') !== null;
      };
    const [updateMyRole] = useMutation(MUTATION_UPDATE_ROLE);
    //const isLoggedIn = useReactiveVar(isLoggedInVar);
    //here
    const [updateUserPassword] = useMutation(MUTATION_UPDATE_USER_PASSWORD);
    const [customerDetails] = useLazyQuery(QUERY_GET_CUSTOMER_DETAILS);
    const [profile, setProfile] = useState({
        email: "",
        firstName: "",
        lastName: ""
    })
    const [isLoading, setIsLoading] = useState(true)
    const [updateProfileDetails] = useMutation(MUTATION_UPDATE_CUSTOMER_DETAILS);

    const [userId, setUserId] = useState(null);

    const fetchCustomerDetails = () => {

        setIsLoading(true);

        customerDetails({
            variables: {
                id: localStorage.getItem('userId')
            }
        }).then((result) => {
            return result.data;
        }).then((data) => {

            console.log(data.customer);

            setProfile({
                email: data.customer.email || "",
                firstName: data.customer.firstName || "",
                lastName: data.customer.lastName || "",
            })

            setIsLoading(false);
        })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        fetchCustomerDetails();
    }, [userId])

    useEffect(() => {
        lottie.loadAnimation({
            animationData: reactLogo,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true, // boolean
            container: document.querySelector("#lottie-loading"),
        });
    }, []);

    if (isLoading) {
        return <div className='w-full h-96 flex justify-center items-center'>
            <div className='h-20 w-20' id='lottie-loading'></div>
        </div>
    }

    return (
        <>
        <Formik
            initialValues={{ firstName: profile.firstName, lastName: profile.lastName, email: profile.email, PhoneNumber: '', currentPassword: '', newPassword: '', confirmPassword: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Eamil is Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                setSubmitting(true)

                updateProfileDetails({
                    variables: {
                        email: values.email,
                        firstName: values.firstName,
                        id: localStorage.getItem('userId'),
                        lastName: values.lastName
                    }
                })
                    .then((data) => data.data)
                    .then((data) => {
                        console.log(data);
                        toast.success("Information Submitted Succesfully")
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <div className="w-full mt-8 sm:px-20 flex flex-col gap-6 bg-white sm:py-10">
                    <h2 className='font-medium text-xl mb-4'>Edit Your Profile</h2>
                    <div className='flex flex-wrap justify-between'>
                        <div className='flex flex-col w-full xl:w-[320px] gap-2'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                id='firstName'
                                name='firstName'
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                className={`bg-littledarkgrey  border h-12 w-full outline-none rounded px-4 py-3 
                                            ${touched.firstName && values.firstName.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                placeholder='ABC' />

                            {
                                touched.PhoneNumber
                            }
                        </div>
                        <div className='flex flex-col w-full xl:w-[320px] gap-2'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                id='lastName'
                                name='lastName'
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                    ${touched.lastName && values.lastName.length == 0 ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                placeholder='DEFG' />
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-between'>
                        <div className='flex flex-col w-full xl:w-[320px] gap-2'>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                name='email'
                                value={values.email}
                                type='email'
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                    ${touched.email && values.email.length == 0 ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                placeholder='Example@gmail.com' />
                        </div>
                        {/* <div className='flex flex-col w-full xl:w-[320px] gap-2'>
                                        <label htmlFor='PhoneNumber'>Phone Number</label>
                                        <input
                                            id='PhoneNumber'
                                            name='PhoneNumber'
                                            value={values.PhoneNumber}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                     ${touched.PhoneNumber && values.PhoneNumber.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='9876543210' />
                                    </div> */}
                    </div>

                    <h2 className='pt-6'>Password Changes</h2>
                    <div className='flex flex-col w-full gap-2'>
                        <input
                            id='newPassword'
                            name='newPassword'
                            value={values.newPassword}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                 ${touched.newPassword && values.newPassword.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                            placeholder='New Password' />

                        <input
                            id='confirmPassword'
                            name='confirmPassword'
                            value={values.confirmPassword}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder='Confirm New Password'
                            className={`bg-littledarkgrey border  h-12 w-full outline-none rounded px-4 py-3
                                 ${touched.confirmPassword && values.confirmPassword.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                        />

                    </div>

                    <div className='flex flex-col sm:flex-row justify-end gap-8'>
                        <button
                            onClick={() => {

                                if (values.newPassword.length === 0 || values.confirmPassword.length == 0) {
                                    toast.warn("Enter Correct Values")
                                    return;
                                }

                                if (values.newPassword !== values.confirmPassword) {
                                    toast.warn("New Password and COnfirm Password Are Not Same")
                                    return;
                                }


                            //     export const MUTATION_UPDATE_USER_PASSWORD = gql`
                            //     mutation MyMutation($id: ID!, $password: String!) {
                            //        updateUser(input: { id: $id, password: $password }) {
                            //          user {
                            //            id
                            //            username
                            //          }
                            //        }
                            //      }
                            //    `
                               


                                updateUserPassword({
                                    variables: {
                                        id: userId,
                                        password: values.confirmPassword
                                    }
                                }).then((data) => {
                                    console.log(data);
                                    toast.success('Your Password has been Changed')
                                })
                                    .catch((e) => {
                                        console.log(e);
                                        toast.error(e.message)
                                    })
                            }}
                            className='bg-primary px-12 py-4 text-white rounded'>Change Password</button>
                        <button>Cancel</button>
                        <button
                            onClick={() => {

                                console.log(errors)

                                if (Object.keys(errors).length > 0) {
                                    return;
                                }

                                handleSubmit();
                            }}
                            disabled={isSubmitting}
                            type='submit'
                            className='bg-primary px-12 py-4 text-white rounded'>Save Changes</button>
                    </div>
                </div>
            )}
        </Formik>


<button onClick={()=>{
    let s="wcfm_vendor"
//console.log(localStorage.getItem('authToken'))
if(localStorage.getItem("authToken"))
{

    updateMyRole({variables:{
        id: userId,
       roles:s
    }}).then((data) => {
        console.log(data,"mutation for role is updated");
        
    })
        
}
}}>seller</button>
</>
    )
}

export default MyProfile