import { useState, useEffect } from "react";
import { session, signOut, useSession } from "next-auth/client";
import Navbar from './navbar';
import axios from 'axios';

const Post = props => {

    const date = props.post.updatedAt.slice(0, 10).split('-').reverse().join('-');
    const time = props.post.updatedAt.slice(11, 16);

    return (
        <div key={props.post._id} className="bg-light-grey text-center mt-5 mb-5 w-80 lg:w-120 p-5 h-auto rounded-md cursor-default">
            <div className="flex items-center justify-center mt-5 mb-4">
                <img className="w-12 h-12" src={props.post.profilePic} alt="User Profile Picture" />
                <div className="flex flex-col items-center">
                    <h1 className="flex text-2xl text-primary-500 ml-5 font-semibold">{props.post.user}</h1>
                    <h2 className="flex text-xl text-cadet-blue opacity-80 ml-5 font-semibold">{ 
                        props.post.type === "request" ? <span>Looking for a <span className="text-cadet-blue-50 underline opacity-80">{props.post.profession}</span></span>
                        : <span>Offering <span className="text-cadet-blue-50 underline opacity-80">{props.post.profession}</span> services</span>
                        }</h2>
                </div>
            </div>
            <h3 className="text-md text-primary-500 my-3 font-semibold">{props.post.location}</h3>
            <p className="text-md text-cadet-blue-50 my-3 font-semibold opacity-80">{props.post.description}</p>
            { props.post.type === "request" ?
                <h3 className="text-md text-primary-500 my-3 font-semibold">Budget: £{props.post.budget}</h3>
                :
                ''
            }
            <h3 className="text-vw text-primary-500 my-3 font-semibold">Contact: <a href={'mailto:' + props.post.email}>{props.post.email}</a></h3>
            <h3 className="text-vw text-primary-500 my-3 font-semibold">Posted at { time } on { date }</h3>
        </div>
    )
}

function Splash() {
    // Checks if user is logged in
    const [session, loading] = useSession();

    const [postType, setPostType] = useState('request');
    const [posts, setPosts] = useState([]);
    const [professionFilter, setProfessionFilter] = useState('');

    // Fetches the posts from the DB
    useEffect(() => {
        axios.get('https://protor-backend.herokuapp.com/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [setPosts]);

    // Filters the posts based on the type [request/offer]
    function postList(type, profession) {
        let sortedPosts = [];
        sortedPosts = posts.filter(post => post.type === type);

        if (profession !== '') {
            sortedPosts = sortedPosts.filter(post => post.profession === profession);
        }

        if (!sortedPosts.length) {
            return <h1 className="text-3xl lg:text-5xl font-bold text-center text-primary cursor-default mt-10">There are not posts available for {profession}. Feel free to make one!</h1>
        } else {
            return sortedPosts.map(currentPost => {
                return <Post post={currentPost} key={currentPost._id} />
            });
        }

    };

    let name = session.user.name;
    let firstName = name.split(' ')[0];

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

    if ( typeof window !== "undefined" && loading) return null;

    return (
        <div className="bg-dark-grey min-h-screen h-full">
            <Navbar />
            <h1 className="text-3xl lg:text-5xl font-bold text-center text-primary cursor-default mt-10">Hello { firstName },</h1>
            <h1 className="text-xl lg:text-3xl text-center text-cadet-blue-50 cursor-default my-5">Here are the most recent posts</h1>
            <div className="flex justify-center mb-10">
                <button onClick={() => setPostType('request')} className={(postType === 'request' ? "bg-primary border-transparent border-2 " : "bg-light-grey border-primary border-2 ") + "text-cadet-blue-50 text-sm font-semibold px-4 py-2 rounded mt-4 mx-3 lg:mt-0"}>Job Listings</button>
                <button onClick={() => setPostType('service')} className={(postType === 'service' ? "bg-primary border-transparent border-2 " : "bg-light-grey border-primary border-2 ") + "text-cadet-blue-50 text-sm font-semibold px-4 py-2 rounded mt-4 mx-3 lg:mt-0"}>Professionals</button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-center text-cadet-blue-50 cursor-default my-5">Filter by profession</h1>
                <select name="professionFilter" defaultValue="" id="professionFilter" onChange={(e) => setProfessionFilter(e.target.value)} className="bg-dark-grey text-cadet-blue-50 outline-none border-primary border-2 rounded-md px-2">
                    <option value="" disabled>Select Profession</option>
                    { professions.map(profession => <option key={profession} value={profession}>{profession}</option>) }
                </select>
                <button onClick={() => setProfessionFilter('')} className="inline-block text-sm font-semibold px-4 py-2 bg-primary rounded mt-4 mx-0 lg:mx-3">Reset Filter</button>
                { postList(postType, professionFilter) }
            </div>
        </div>
    )
}    

export default Splash;