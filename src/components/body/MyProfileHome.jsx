import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reduxToolKit/userAuthSlice';

const MyProfileHome = () => {
    const dispatch = useDispatch();

    // ✅ Memoize the parsed user from localStorage
    const userlogin = useMemo(() => {
        return JSON.parse(localStorage.getItem("user")) || {};
    }, []);

    // ✅ Avoid infinite dispatch loop by memoizing userlogin
    useEffect(() => {
        if (userlogin) {
            dispatch(login(userlogin));
        }
    }, [dispatch, userlogin]);

    const user = useSelector((store) => store.auth.singleUser);
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className='text-start py-4 bg-white px-4 mb-5 shadow-lg mt-3' style={{ width: '50vw' }}>
            <div>
                <span className='py-2 d-flex justify-content-start gap-4 text-primary align-items-center'>
                    <h5 className='text-black p-0 m-0 fontHeading'>Personal Information</h5> Edit
                </span>
                <div className='d-flex justify-content-start align-items-start gap-2'>
                    <div
                        style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', width: '40%' }}
                        className='p-3 fw-bold d-flex justify-content-start align-items-center gap-2 rounded-2'
                    >
                        <p className='p-0 m-0'>{user.first_name}</p>
                    </div>
                    <div
                        style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', width: '40%' }}
                        className='p-3 fw-bold d-flex justify-content-start align-items-center gap-2 rounded-2'
                    >
                        <p className='p-0 m-0'>{user.last_name}</p>
                    </div>
                </div>
            </div>
{/* 
            <div className='d-flex flex-column gap-1 py-3'>
                <p className='p-0 m-0'>Your Gender</p>
                <div className='d-flex justify-content-start align-items-center gap-5'>
                    <div className='d-flex justify-content-start align-items-center gap-2 text-secondary'>
                        <input type="radio" name='gender' />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className='d-flex justify-content-start align-items-center gap-2 text-secondary'>
                        <input type="radio" name='gender' />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
            </div> */}

            <div className='py-3'>
                <span className='d-flex justify-content-start gap-4 text-primary align-items-center py-2'>
                    <h5 className='text-black p-0 m-0 fontHeading'>Email Address</h5> Edit
                </span>
                <div
                    style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', width: '60%' }}
                    className='p-3 d-flex justify-content-start align-items-center gap-2 rounded-2'
                >
                    <p className='text-secondary p-0 m-0'>{user.email}</p>
                </div>
            </div>

            <div className='py-3'>
                <span className='d-flex justify-content-start gap-4 text-primary align-items-center py-2'>
                    <h5 className='text-black p-0 m-0 fontHeading'>Phone Number</h5> Edit
                </span>
                <div
                    style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', width: '60%' }}
                    className='p-3 d-flex justify-content-start align-items-center gap-2 rounded-2'
                >
                    <p className='text-secondary p-0 m-0'>{user.phone_number}</p>
                </div>
            </div>

            <div className='py-3'>
                <span className='d-flex justify-content-start gap-4 text-primary align-items-center py-2'>
                    <h5 className='text-black p-0 m-0 fontHeading'>Date of Birth</h5> Edit
                </span>
                <div
                    style={{ background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', width: '60%' }}
                    className='p-3 d-flex justify-content-start align-items-center gap-2 rounded-2'
                >
                    <p className='text-secondary p-0 m-0'>{user.date_of_birth}</p>
                </div>
            </div>

            <div className='py-3'>
                <span className='d-flex justify-content-start gap-4 text-primary align-items-center py-2'>
                    <h5 className='text-black p-0 m-0 fontHeading'>Address</h5> Edit
                </span>
                <div className='d-flex justify-content-start align-items-center gap-5'>
                    <div className='d-flex justify-content-start align-items-center gap-2 text-secondary w-25'>
                        {user.address}, {user.city}, {user.state}, {user.country}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfileHome;
