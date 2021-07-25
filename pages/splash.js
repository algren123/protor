import { useState, useEffect } from "react";
import { session, signOut, useSession } from "next-auth/client";
import Navbar from '../components/navbar';
import axios from 'axios';

const Post = props => {
    return (
        <div className="bg-light-grey text-center mt-32 w-120 h-64 rounded-md">
            <h1 className="text-5xl text-primary-500 mt-8 font-semibold">{props.post.user}</h1>
            <h3 className="text-2xl text-primary-500 font-semibold">Postcode: {props.post.location}</h3>
            <p className="text-md text-primary-500 font-semibold">{props.post.description}</p>
            <h3 className="text-md text-primary-500 font-semibold">Budget: £{props.post.budget}</h3>
            <h3 className="text-2xl text-primary-500 font-semibold">Contact: {props.post.email}</h3>
        </div>
    )
}

function Splash() {

    const [session, loading] = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [setPosts]);

    function postList() {
        return posts.map(currentPost => {
            return <Post post={currentPost} />
        });
    };

    let name = session.user.name;
    let firstName = name.split(' ')[0];
    if ( typeof window !== "undefined" && loading) return null;

    return (
        <div className="bg-dark-grey h-screen">
            <Navbar />
            <h1 className="text-3xl lg:text-5xl text-center text-primary cursor-default mt-10">Hello { firstName },</h1>
            <h1 className="text-3xl lg:text-3xl text-center text-cadet-blue-50 cursor-default my-5">Here are the most recent posts</h1>
            <div className="flex justify-center">{ postList() }</div>
        </div>
    )
}    

export default Splash;