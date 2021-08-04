import { useState } from 'react';
import { session, signOut, useSession } from 'next-auth/client';
import Login from './login';
import Navbar from '../components/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';


function addPost() {
    const [session, loading] = useSession();

    const [stageOne, setStageOne] = useState(true);
    const [invalid, setInvalid] = useState(false);

    const [type, setType] = useState('request');
    const [profession, setProfession] = useState('');
    const [desc, setDesc] = useState('');
    const [budget, setBudget] = useState(0);
    const [postcode, setPostcode] = useState('');

    const professions = [
        'Builder',
        'Carpenter',
        'Electrician',
        'Gardener',
        'Handyman',
        'Painter',
        'Plumber',
        'Roofer',
        'Tiler'
    ];

    const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
    
    function handlePostcodeChange(event) {
        if (event.target.value.match(postcodeRegex) !== null) {
            setInvalid(false);
            setPostcode(event.target.value);
        } else {
            setInvalid(true);
            setPostcode(event.target.value);
        }
    };

    async function onSubmit(event) {
        event.preventDefault();

        if (desc === '' || postcode === '' || (type === 'request' ? budget === 0 : '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all the fields',
            })
        } else if (invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter correct postcode',
            })
        } else {
            let postData = {
                'user': session.user.name,
                'email': session.user.email,
                'profilePic': session.user.image,
                'type': type,
                'profession': profession,
                'description': desc,
                'budget': budget,
                'location': postcode.toUpperCase()
            }
    
            return axios.post('https://protor-backend.herokuapp.com/posts/addpost', postData)
                .then((res) => {
                    if (res.status == 200) {
                        window.location = "/";
                    };
                });
        }
    }

    if ( typeof window !== "undefined" && loading) return null;

    return (
        <>
            { !session ? <Login /> :
                <div className="bg-dark-grey h-screen">
                <Navbar />
                <div className="bg-dark-grey flex justify-center items-center">
                    <div className='bg-light-grey text-center mt-16 lg:mt-32 w-72 lg:w-120 min-h-144 rounded-md'>
                        <div className={ stageOne ? 'block' : 'hidden'}>
                            <h1 className="text-5xl text-primary-500 mt-8 font-semibold">Add post</h1>
                            <h3 className="text-3xl text-cadet-blue-50 mt-10 font-semibold">What type of post is this?</h3>
                            <div className="flex justify-center items-center mt-10">
                                <div className="flex flex-col items-center">
                                    <input onClick={(e) => setType(e.target.value)} value="request" type="radio" className="opacity-0 fixed w-0" name="requestService" id="requestService" />
                                    <label className="cursor-pointer text-primary text-md font-bold mb-3 bg-dark-grey w-24 lg:w-28 h-40 mx-5 rounded-lg" for="requestService">
                                        <span className="text-5xl text-primary mb-5">
                                            <i className="fas fa-hand-holding mb-5"></i>
                                        </span>Requesting a service
                                    </label>
                                </div>
                                <div className="flex flex-col items-center">
                                    <input onClick={(e) => setType(e.target.value)} value="service" type="radio" className="opacity-0 fixed w-0" name="requestService" id="offerService" />
                                    <label className="cursor-pointer text-primary text-md font-bold mb-3 bg-dark-grey w-24 lg:w-28 h-40 mx-5 rounded-lg" htmlFor="offerService">
                                        <span className="text-3xl text-primary mb-5">
                                            <i class="fas fa-wrench my-5 px-5"></i>
                                        </span>Offering a service
                                    </label>
                                </div>
                            </div>

                            <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-12 mb-5" onClick={() => setStageOne(false)}>Next</button>
                        </div>

                        <div className={ stageOne ? 'hidden' : 'block'}>
                            { type === 'request'
                            ?
                            <div>
                            <h1 className="text-3xl lg:text-5xl text-primary-500 mt-8 font-semibold">Request a service</h1>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold mb-2">What tradesperson do you need?</h3>
                                <select name="profession" id="profession" onChange={(e) => setProfession(e.target.value)} className="bg-dark-grey text-cadet-blue-50 outline-none border-primary border-2 rounded-md px-2">
                                    <option disabled selected>Select profession</option>
                                    { professions.map((profession) => <option value={profession} key={profession}> {profession} </option>)}
                                </select>
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-3 font-semibold">Describe the service you need</h3>
                                <textarea rows="4" cols="25" placeholder="Please type here" onChange={(e) => setDesc(e.target.value)} className="outline-none rounded-md resize-none bg-dark-grey mt-3 px-5 border-2 border-primary text-cadet-blue-50" name="requestDesc" id="requestDesc" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-5 font-semibold">What is your budget?</h3>
                                <input type="number" placeholder="Enter budget" onChange={(e) => setBudget(e.target.value)} className="outline-none rounded-md bg-dark-grey mt-3 px-5 border-2 border-primary text-cadet-blue-50" name="budget" id="budget" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-5 font-semibold">Please enter your postcode</h3>
                                <input type="text" placeholder="Enter Postcode" onChange={(e) => handlePostcodeChange(e)} className={(invalid ? "border-primary-600 " : "border-primary ") + "outline-none rounded-md bg-dark-grey my-3 px-5 border-2 text-cadet-blue-50"} name="postcode" id="postcode" />
                                <p className={(invalid ? "block " : "hidden ") + "text-primary-600 font-bold"}>Postcode is incorrect format e.g. "NE10 0ZT"</p>
                            </div>
                            <div>
                                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5 mx-2" onClick={() => setStageOne(true)}>Back</button>
                                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5 mx-2" onClick={() => onSubmit(event)}>Submit</button>
                            </div>
                            </div>
                            :
                            <div>
                            <h1 className="text-3xl lg:text-5xl text-primary-500 mt-8 font-semibold">Offer a service</h1>
                            <div>
                                <h3 className="text-md text-primary-500 mt-10 font-semibold mb-2">What type of tradesperson are you?</h3>
                                <select name="profession" id="profession" onChange={(e) => setProfession(e.target.value)} className="bg-dark-grey text-cadet-blue-50 outline-none border-primary border-2 rounded-md px-2">
                                    <option disabled selected>Select profession</option>
                                    { professions.map((profession) => <option value={profession} key={profession}> {profession} </option>)}
                                </select>
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-3 font-semibold">Describe what service you provide</h3>
                                <textarea rows="4" cols="25" placeholder="Please type here" onChange={(e) => setDesc(e.target.value)} className="outline-none rounded-md resize-none bg-dark-grey mt-2 px-5 border-2 border-primary text-cadet-blue-50" name="offerDesc" id="offerDesc" />
                            </div>
                            <div>
                                <h3 className="text-md text-primary-500 mt-5 font-semibold">Please enter your postcode</h3>
                                <input type="text" placeholder="Enter Postcode" onChange={(e) => handlePostcodeChange(e)} className={(invalid ? "border-primary-600 " : "border-primary ") + "outline-none rounded-md bg-dark-grey my-3 px-5 border-2 text-cadet-blue-50"} name="postcode" id="postcode" />
                                <p className={(invalid ? "block " : "hidden ") + "text-primary-600 font-bold"}>Postcode is incorrect format e.g. "NE10 0ZT"</p>
                            </div>
                            <div className="my-5">
                                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5 mx-2" onClick={() => setStageOne(true)}>Back</button>
                                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5" onClick={() => onSubmit(event)}>Submit</button>
                            </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
            </div> }
        </>
    )
}

export default addPost;