import React, { useEffect, useState } from 'react';
import useProfile from './../../../../Hooks/useProfile';
import LoadingPage from '../../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from './../../ErrorPage/ErrorPage';
import { MdCall, MdEmail, MdOutlineDriveFileRenameOutline, MdCameraAlt, MdPeopleAlt, MdLocationPin, MdNearMe } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../SetTtitle/SetTitle';
import { useForm } from 'react-hook-form';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateMobileNumber } from '../../../../assets/scripts/Utility';

import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import AddressForm from './AddressForm';


const EditProfile = () => {
    const { profile, profileLoading, profileError } = useProfile();
    const [isOpen,setOpen] = useState(false);

    const setisOpen = ()=>{
        setOpen(!isOpen)
    }

    // useEffect(() => {
    //     if (!profile?.address) {
    //         console.log(object)
    //     }
    // }, [profile])



    const [imgUpload, setImageUpload] = useState(null);

    const [loadingOnSave, setloadingOnSave] = useState(false);

    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ mode: "onChange" });

    const { user } = useAuthProvider();







    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        setImageUpload(URL.createObjectURL(file));

        setValue("img", file);

    }

    useEffect(() => {
        setImageUpload(profile?.imgURL)
    }, [profile])

    useEffect(() => {
        if (!profile?.address) {
            setisOpen(true)
        }

    }, [profile])




    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(data);
        setloadingOnSave(true);
        // upload image -- form data
        const formData = new FormData();
        formData.append('_id', user._id);
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('gender', data.gender);
        if (data.img) {
            formData.append('imgURL', data.img);
        }



        const updateprofileInfo = {
            _id: user._id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            imgURL: data.img ? data.img : ""
        }

        //   axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/user/update-profile/${user._id}`, formData, {
        //     withCredentiimport { useNavigate } from 'react-router-dom';
        // als: true,import { useNavigate } from 'react-router-dom';


        //   })
        //     .then(data => {
        //       setUser(data.data)
        //       setloadingOnSave(false);
        //       toast.success('successfully added');
        //       navigate('/profile')

        //     }).catch(e => {
        //       setloadingOnSave(false);
        //       // console.log(e);
        //       toast.error(e?.response?.data?.message)
        //     })

    };
    
    

    if (profileLoading) {
        return <LoadingPage />
    }
    if (profileError) {
        return <ErrorPage />
    }

    return (
        <>
            <SetTitle title="Edit-Profile" />
            <div className='w-full lg:w-[900px] mx-auto border p-2 mt-5 md:px-10 rounded shadow'>
                <SectionTitle h1="Edit Profile" />
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="relative cursor-pointer w-20 mx-auto h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 mt-8 mb-4 md:mx-0">
                        {
                            imgUpload ? <img src={imgUpload} className='object-cover w-full h-full' alt="" /> : <div><svg className="absolute w-20 h-20 text-gray-400 top-2 left-0  md:mr-8 md:mx-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg></div>
                        }
                    </div>
                    <div>
                        <div className='relative'>
                            <label htmlFor="image-upload" className='absolute -top-12 left-[52%] bg-gray-400 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer md:left-12'>
                                <MdCameraAlt size={25} className='text-white top-8' />
                            </label>
                        </div>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            name='image'
                            onChange={handleImageUpload}
                            className='hidden'

                        />

                    </div>
                    <div className='grid grid-cols-1 justify-center gap-6 mb-6 md:grid-cols-2 md:justify-start'>
                        <div className=''>
                            <div className='flex items-center'>
                                <MdOutlineDriveFileRenameOutline className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                    defaultValue={profile?.name}
                                    {...register("name", {
                                        required: "*Name required",
                                        maxLength: {
                                            value: 40,
                                            message: "Max length is 40"
                                        }
                                    })} />
                                {errors.name && <p className='p-1 text-xs text-red-600'>{errors.name.message}</p>}
                            </div>
                        </div>



                        {/* phone  */}
                        <div>
                            <div className='flex items-center'>
                                <MdCall className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Phone</label>
                            </div>


                            {
                                profile ?
                                    <>
                                        <div>

                                            <input
                                                type="tel"
                                                name='phone'
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                readOnly
                                                defaultValue={profile?.phone}
                                                {...register("phone")}
                                            />

                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Type here"
                                                defaultValue={profile?.phone}
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                {...register("phone", {
                                                    required: "*Phone No required",
                                                    validate: {
                                                        notPhone: (value) => validateMobileNumber(value)
                                                    },
                                                })} />
                                            {errors.phone && errors.phone.type === "notPhone" && <p className='p-1 text-xs text-red-600'>*Invalid</p>}
                                            {errors.phone && <p className='p-1 text-xs text-red-600'>{errors.phone.message}</p>}
                                        </div>
                                    </>
                            }



                        </div>


                        {/* email  */}
                        <div>
                            <div className='flex items-center'>
                                <MdEmail className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Email Address</label>
                            </div>

                            {
                                profile?.email ?
                                    <>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                readOnly
                                                defaultValue={profile?.email}
                                                {...register("email")}
                                            />

                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                {...register("email", {
                                                    validate: {
                                                        notemail: (value) => validateEmail(value)
                                                    },
                                                })} />
                                            {errors.email && errors.email.type === "notemail" && <p className='p-1 text-xs text-red-600'>*Invalid</p>}
                                            {errors.email && <p className='p-1 text-xs text-red-600'>{errors.email.message}</p>}
                                        </div>
                                    </>
                            }

                        </div>


                        {/* gender  */}
                        <div>
                            <div className='flex items-center'>
                                <MdPeopleAlt className='text-lg mr-3' />
                                <label htmlFor="gender" className="block my-2 mb-2 text-md font-medium">Gender</label>
                            </div>
                            <div>



                                <select
                                    id="gender"
                                    name='gender'
                                    className="bg-gray-50 border w-full md:max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block h-10 p-1 m-0"
                                    defaultChecked={profile?.gender}
                                    {...register("gender", { required: '*Select One' })}
                                >

                                    <option value='Male'>Male</option>
                                    <option value='Female' >Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                        </div>
                    </div>





                    <div className='my-6 text-center md:text-start'>



                        <input type='submit' value=' Save your Profile' disabled={loadingOnSave} className={`'btn border-0  bg-green-400 hover:bg-green-500 disabled:bg-gray-500 pt-4 pr-8 pb-4 pl-8  text-white rounded-xl  ${loadingOnSave ? 'cursor-not-allowed' : 'cursor-pointer'}`} />



                    </div>


                </form>


                {/* address book  */}
                <div className='mt-4 mb-11 max-w-[500px]' id='update-address'>
                    <div className='border border-gray-400 text-gray-700 rounded-md'>


                        <div className='flex items-center bg-gray-200 p-2 rounded-t-md'>
                            <MdLocationPin className='text-[25px] mr-1' />
                            <h3>Address</h3>
                        </div>




                        {/* add address  */}
                        <div className='p-2'>
                            {/* modal trigger  */}
                            <button onClick={setisOpen} htmlFor='address-update-modal' className=' flex rounded-md border border-gray-300 items-center p-1.5 justify-center cursor-pointer w-full '>
                                <AiOutlinePlus className='text-2xl mr-3' />
                                <p>Change Address</p>
                            </button>
                            <Modal isOpen={isOpen} >
                                <ModalContent >
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1 text-center">Address Form</ModalHeader>
                                            <AddressForm address={profile?.address} onClose={setisOpen} onOpen={setisOpen}/>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>



                        </div>





                        {/* existed address show bar  */}
                        {
                            profile?.address && <>
                                <div className='flex rounded-md justify-between items-center m-2 p-2 text-gray-600 border '>
                                    <div className='flex  justify-between items-center gap-2'>
                                        <MdNearMe className='text-2xl pt-1' />
                                        <div className="flex flex-col items-start">

                                            <p>{profile?.address?.streetAddress}, <br /> {profile?.address?.city}, {profile?.address?.stateProvince}, {profile?.address?.postalCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>


            </div >
        </>
    );
};

export default EditProfile;