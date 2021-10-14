import { signIn } from "next-auth/client";
import Link from "next/link";

function Login() {
    return (
        <div className="h-screen w-full bg-light-grey flex justify-center items-center">
            <div className="bg-dark-grey text-center w-80 h-120 rounded-md">
                <h1 className="text-5xl text-primary-500 mt-32 font-semibold">Login</h1>
                <h3 className="text-md text-primary-500 mt-10 font-semibold">Don't have an account? <Link href="/signup"><span className="font-bold cursor-pointer">Sign up</span></Link></h3>
                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-3 mb-5" onClick={() => signIn("google", { callbackUrl: "https://www.protor.uk/"})}>Login with Google</button>
                <button className="bg-primary font-semibold rounded-full px-10 py-1 w-50 mt-20 mb-5" onClick={() => window.location.href = '/'}>Go Home</button>
            </div>
        </div>
    )
}

export default Login;