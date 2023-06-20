"use client"

import { initFirebase } from '@firebase/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/navigation';

const Signin = () => {
    const router = useRouter();
    
    const formSubmit = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        const auth = getAuth();
        let formObject = Object.fromEntries(data.entries()); 
        
        signInWithEmailAndPassword(auth, formObject.email, formObject.password)
            .then((userCredential) => {
                //Signed in 
                const user = userCredential.user;
                router.push('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message; 
                const errorDiv = document.getElementById("errorMessage");

                if (errorCode === 'auth/user-not-found') {
                    errorDiv.innerHTML = 'Error: Unable to find an account with that email, please try again.';
                } else if (errorCode === 'auth/wrong-password') {
                    errorDiv.innerHTML = 'Error: Your password is incorrect, please try again';
                } else {
                    errorDiv.innerHTML = 'Internal Error, please try again in a few minutes.';
                }
        });
    }

    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-screen primary-colour">
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 3">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign into Vertiguard</h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour p-6">
                    <form className="space-y-6" action="#" method="POST" onSubmit={formSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-white">Email Address</label>
                        <div className="mt-2">
                        <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-white">Password</label>
                        </div>
                        <div className="mt-2">
                        <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div id="errorMessage" className='block text-sm font-medium leading-6 text-white'></div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signin
