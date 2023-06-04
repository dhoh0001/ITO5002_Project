"use client"

import { initFirebase } from '@firebase/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const Signin = () => {
    const formSubmit = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        const auth = getAuth();
        let formObject = Object.fromEntries(data.entries()); 
        
        signInWithEmailAndPassword(auth, formObject.email, formObject.password)
            .then((userCredential) => {
                //Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message; 
        });
    }

    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-screen primary-colour">
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 3">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour p-8">
                    <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign into Vertiguard</h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour p-6">
                    <form className="space-y-6" action="#" method="POST" onSubmit={formSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-white">Email address</label>
                        <div className="mt-2">
                        <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-white">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-white hover:text-indigo-500">Forgot password?</a>
                        </div>
                        </div>
                        <div className="mt-2">
                        <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

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