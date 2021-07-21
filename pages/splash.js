import { useState, useEffect } from "react";
import { session, signOut, useSession } from "next-auth/client";
import Navbar from '../components/navbar';
import Image from 'next/image';
import splashPic from '../public/splash.jpg'

function Splash() {

    const [session, loading] = useSession();
    const [content, setContent] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/secret")
            const json = await res.json();

            if (json.content) {
                setContent(json.content)
            }
        }
        console.log(firstName)

        fetchData();
    }, [session]);

    let name = session.user.name;
    let firstName = name.split(' ')[0];

    if ( typeof window !== "undefined" && loading) return null;

    return (
        <div className="bg-dark-grey h-screen">
            <Navbar />
            <div>
                <Image src={splashPic} alt="Splash Picture" layout="fill" />
            </div>
            <div className="text-center">
                <h1 className="text-7xl text-cadet-blue-50 cursor-default my-10">Hello { firstName }</h1>
            </div>
        </div>
    )
}    

export default Splash;