import { useState } from 'react';
import { session, signOut, useSession } from 'next-auth/client';
import Login from './login';
import Navbar from '../components/navbar';
import axios from 'axios';


function addPost() {
    const [session, loading] = useSession();

    const [stageOne, setStageOne] = useState(true);

    const [type, setType] = useState('request');
    const [desc, setDesc] = useState('');
    const [budget, setBudget] = useState(0);
    const [postcode, setPostcode] = useState('');

    async function onSubmit(event) {
        event.preventDefault();

        let postData = {
            'user': session.user.name,
            'email': session.user.email,
            'profilePic': session.user.image,
            'type': type,
            'description': desc,
            'budget': budget,
            'location': postcode
        }

        return axios.post('http://localhost:5000/posts/addpost', postData)
            .then(res => console.log(res))
    }

    if ( typeof window !== "undefined" && loading) return null;

    return (
        <>
            { !session ? <Login /> :
                <div className="bg-dark-grey h-screen">
                <Navbar />
                <div className="bg-dark-grey flex justify-center items-center">
                    <div className='bg-light-grey text-center mt-32 w-120 h-132 rounded-md'>
                        <div className={ stageOne ? 'block' : 'hidden'}>
                            <h1 className="text-5xl text-primary-500 mt-8 font-semibold">Add post</h1>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold">What type of post is this?</h3>
                                <select name="serviceType" id="serviceType" onChange={() => setType(event.target.value)}>
                                    <option value="request">Looking for a service</option>
                                    <option value="service">Offering a service</option>
                                </select>
                            </div>
                            <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5" onClick={() => setStageOne(false)}>Next</button>
                        </div>

                        <div className={ stageOne ? 'hidden' : 'block'}>
                            { type === 'request'
                            ?
                            <div>
                            <h1 className="text-5xl text-primary-500 mt-8 font-semibold">Request a service</h1>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold">Describe the service you need</h3>
                                <textarea rows="4" cols="25" placeholder="Please type here" onChange={(e) => setDesc(e.target.value)} name="requestDesc" id="requestDesc" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-5 font-semibold">What is your budget?</h3>
                                <input type="number" placeholder="Enter budget" onChange={(e) => setBudget(e.target.value)} name="budget" id="budget" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-5 font-semibold">Please enter your postcode</h3>
                                <input type="text" placeholder="Enter Postcode" onChange={(e) => setPostcode(e.target.value)} name="postcode" id="postcode" />
                            </div>
                            <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5" onClick={() => onSubmit(event)}>Submit</button>
                            </div>
                            :
                            <div>
                            <h1 className="text-5xl text-primary-500 mt-8 font-semibold">Offer a service</h1>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold">Describe who you are and what services you provide</h3>
                                <textarea rows="4" cols="25" placeholder="Please type here" onChange={(e) => setDesc(e.target.value)} name="offerDesc" id="offerDesc" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold">Please enter your postcode</h3>
                                <input type="text" placeholder="Enter Postcode" onChange={(e) => setPostcode(e.target.value)} name="postcode" id="postcode" />
                            </div>
                            <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5">Submit</button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div> }
        </>
    )
}

export default addPost;