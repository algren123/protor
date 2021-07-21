import Link from 'next/link'

export const Landing = () => {
    return (
        <div className="h-screen w-full bg-light-grey flex justify-center items-center">
            <div className="bg-dark-grey text-center w-80 h-120 rounded-md">
                <h1 className="text-5xl text-primary-500 mt-20 font-semibold">Protor</h1>
                <Link href='/login'><button className="bg-primary font-semibold rounded-full px-10 py-1 w-64 mt-20 mb-5">Login</button></Link>
                <Link href='/signup'><button className="bg-primary font-semibold rounded-full px-10 py-1 w-64 mb-5">Sign up</button></Link>
            </div>
        </div>
    )
}