import Link from 'next/link';
import Navbar from './navbar';
import Footer from './footer';

export const Landing = () => {
    return (
        <div className="bg-dark-grey">
            <Navbar />
            <div className="h-full w-full text-center xl:px-40">
                <h1 className="text-6xl font-bold text-primary py-10">Protor</h1>
                <div className="md:flex md:flex-row  2xl:mx-52">
                    <p className="text-xl font-semibold text-primary pt-5 ml-8 mr-3 text-left md:my-auto md:mx-20">Connect with your community and ask for a service, or maybe even advertise your skills!</p>
                    <img className="mx-10 w-72 h-64" src="/community.svg" alt="Two people sitting next to each other promoting inclusion and community" />
                </div>
                <div className="flex flex-col md:flex-row 2xl:mx-52">
                    <img className="order-last md:order-1 mx-10 mt-5 w-72 h-64" src="/connection.svg" alt="Two people sitting different window frames talking to each other via phones" />
                    <p className="order-1 md:order-last text-xl font-semibold text-primary pt-5 ml-8 mr-3 text-left md:my-auto md:mx-20">Need some professional help around the house? Plumbing, construction or something else trade-related? Make a post and describe what you would need help with!</p>
                </div>
                <div className="md:flex md:flex-row  2xl:mx-52">
                    <p className="text-xl font-semibold text-primary pt-5 ml-8 mr-3 text-left md:my-auto md:mx-20">Are you a tradesmen and have extra time during the week? Or you want to earn some money on the weekends? Create a post advertising your services!</p>
                    <img className="mx-10 mt-5 w-72 h-64" src="/neighbours.svg" alt="Two people sitting different window frames talking to each other via phones" />
                </div>
            </div>
            <Footer />
        </div>
    )
}