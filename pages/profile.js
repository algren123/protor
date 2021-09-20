import { useState, useEffect, useMemo } from 'react';
import { session, signOut, useSession } from 'next-auth/client';
import Login from './login';
import Navbar from '../components/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const Post = props => {

    const date = props.post.updatedAt.slice(0, 10).split('-').reverse().join('-');
    const time = props.post.updatedAt.slice(11, 16);

    return (
        <div className="bg-light-grey text-center my-5 w-80 lg:w-120 p-5 h-auto rounded-md cursor-default">
            <div className="flex items-center justify-center mt-5">
                <img className="w-10 h-10" src={props.post.profilePic} alt="User Profile Picture" />
                <h1 className="flex text-2xl text-primary-500 ml-5 font-semibold">{props.post.user}</h1>
            </div>
            <h3 className="text-md text-primary-500 my-3 font-semibold">{props.post.location}</h3>
            <p className="text-md text-cadet-blue-50 my-3 font-semibold opacity-80">{props.post.description}</p>
            { props.post.type === "request" ?
                <h3 className="text-md text-primary-500 my-3 font-semibold">Budget: £{props.post.budget}</h3>
                :
                ''
            }
            <h3 className="text-vw text-primary-500 my-3 font-semibold">Posted at { time } on { date }</h3>
            <div className="text-center my-5">
                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50" onClick={() => {props.deletePost(props.post._id)} }><i className="fas fa-trash-alt mr-2"></i>Delete</button>
            </div>
        </div>
    )
}

function Profile() {
    const [session, loading] = useSession();
    const [posts, setPosts] = useState([]);

    // Postcode handlers
    const [postcodeExist, setPostcodeExist] = useState(null);
    const [showPostcode, setShowPostcode] = useState(false);
    const [postcode, setPostcode] = useState('');

    // Gets the user's info from MongoDB
    const [userInfo, setUserInfo] = useState({});

    // Postcode validator
    const [invalid, setInvalid] = useState(false);
    const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/

    useEffect(() => {
        axios.get('https://protor-backend.herokuapp.com/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err));

        async function getUser() {
            const user = await axios.get('https://protor-backend.herokuapp.com/users?email=' + session.user.email)
                                    .then((res) => {
                                        return res.data[0]
                                    });
                                    
            setUserInfo(user);
        }

        if (session) {
            getUser().then(() => {
                userInfo.postcode ? setPostcodeExist(true) : setPostcodeExist(false);
            })
        }
        
        }, [setPosts, userInfo.postcode, showPostcode]);

    function handlePostcodeChange(event) {
        if (event.target.value.match(postcodeRegex) !== null) {
            setInvalid(false);
            setPostcode(event.target.value);
        } else {
            setInvalid(true);
            setPostcode(event.target.value);
        }
    };

    async function postcodeSubmit(event) {
        event.preventDefault();

        if (invalid || (postcode === '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                theme: 'dark',
                text: 'Postcode is wrong or empty',
            })
        } else {
            let userData = {
                'postcode': postcode
            };

            const userId = await axios.get('https://protor-backend.herokuapp.com/users?email=' + session.user.email)
                                      .then((res) => {
                                        if (res.status == 200) {
                                                return res.data[0]._id
                                            }
                                        })
                                      .catch((err) => console.log(err))

            await axios.post('https://protor-backend.herokuapp.com/users/update/' + userId, userData)
                        .then(res => console.log(res))
                        .then(() => setShowPostcode(false))
        }
        
    }

    function deletePost(id) {
        axios.delete('https://protor-backend.herokuapp.com/posts/' + id)
            .then(res => console.log(res.data));

        setPosts(posts.filter(el => el._id !== id));
    };

    function postList() {
        let sortedPosts = [];
        sortedPosts = posts.filter(post => post.email === session.user.email);
        return sortedPosts.map(currentPost => {
            return <Post post={currentPost} deletePost={deletePost} key={currentPost._id}/>
        });
    };

    if ( typeof window !== "undefined" && loading) return null;

    return (
        <>
        { !session ? <Login /> :
        <div className="min-h-screen h-full bg-dark-grey">
            <Navbar />
            <div className="text-center">
                <h1 className="text-5xl text-primary font-bold my-10 cursor-default">Your Profile</h1>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-around">
                <div className="flex flex-col items-center">
                    <h1 className="hidden lg:block text-5xl text-primary font-semibold my-10 self-center">Your details</h1>
                    <img className="w-32 h-32 mb-3 self-center" src={ session.user.image } />
                    <h1 className="text-2xl text-primary font-semibold">Name: { session.user.name }</h1>
                    <h1 className="text-2xl text-primary font-semibold">Email: { session.user.email }</h1>
                    {
                        !postcodeExist
                        ?
                            <div className="flex flex-col">
                                <input type="text" onChange={(e) => handlePostcodeChange(e)} name="postcode" id="postcode" className={(invalid ? "border-primary-600 " : "border-primary ") + "outline-none rounded-md bg-dark-grey mt-8 mb-2 px-5 border-2 text-cadet-blue-50"} name="postcode" id="postcode"/>
                                <button className="bg-primary font-semibold rounded-full mt-5 px-10 py-1 w-50" onClick={(e) => postcodeSubmit(e)}>
                                    Add postcode
                                </button>
                            </div>
                        :
                            <div className="flex flex-col w-64 items-center">
                                <h1 className="text-2xl text-primary font-semibold">Postcode: {userInfo.postcode}</h1>
                                <button className="bg-primary font-semibold rounded-full mt-5 px-10 py-1 w-50" onClick={() => setShowPostcode(!showPostcode)}>
                                        Change postcode
                                </button>
                                { showPostcode ?
                                    <div className="flex flex-col">
                                        <input type="text" onChange={(e) => handlePostcodeChange(e)} name="postcode" id="postcode" className={(invalid ? "border-primary-600 " : "border-primary ") + "outline-none rounded-md bg-dark-grey mt-8 mb-2 px-5 border-2 text-cadet-blue-50"} name="postcode" id="postcode" />
                                        <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50" onClick={(e) => postcodeSubmit(e)}>
                                            Add postcode
                                        </button>
                                        <p className={(invalid ? "block " : "hidden ") + "text-primary-600 font-bold text-center"}>Postcode is incorrect format e.g. "NE10 0ZT"</p>

                                    </div>
                                    :
                                    '' }
                            </div>
                    }
                    </div>
                <div className="flex flex-col">
                    <h1 className="text-5xl text-primary font-semibold my-10 self-center">Posts</h1>
                    { postList() }
                </div>
            </div>
        </div>
        }
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"></link>
        </>
    )
}

export default Profile;