"use client"

import { initFirebase } from '@firebase/firebaseApp';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios";
import { useRouter } from 'next/navigation';

const Signup = () => {
    const app = initFirebase();
    const router = useRouter();
    
    const formSubmit = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        const auth = getAuth();
        let formObject = Object.fromEntries(data.entries()); 
        
        createUserWithEmailAndPassword(auth, formObject.email, formObject.password, formObject.firstName, formObject.lastName)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const url = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com`
                const url2 = `http://ec2-13-239-65-84.ap-southeast-2.compute.amazonaws.com/user?uid=${user.uid}&firstName=${formObject.firstName}&lastName=${formObject.lastName}&email=${user.email}`
                
                const headers = {
                    authorization: `Bearer ${user.accessToken}`,
                    test: 'test'
                };

                const config = {
                      headers:{
                              authorization: `Bearer ${user.accessToken}`,
                            }
                };


                const data = {
                    userId: 1,
                    uid: `${user.uid}`,
                    firstName: `${formObject.firstName}`,
                    lastName: `${formObject.lastName}`, 
                    email: `${user.email}`
                }

                axios.put(url2, data,config);
                // axios.post(url,data,config);
                router.push('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorDiv = document.getElementById("errorMessage");

                if (errorCode === 'auth/weak-password') {
                    errorDiv.innerHTML = 'Please use a more complex password.';
                } else if (errorCode === 'auth/email-already-in-use') {
                    errorDiv.innerHTML = 'That email is already being used for an account, please sign in instead.';
                } else {
                    errorDiv.innerHTML = 'Internal Error, please try again in a few minutes.';
                }
        });
    }

    return (
        <section className="pt-4 w-full lg:h-[calc(100vh-58px)] md:h-screen primary-colour">
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 3">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour p-8">
                    <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign up for Vertiguard</h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm secondary-colour p-6">
                    <form className="space-y-6" action="#" method="POST" onSubmit={formSubmit}>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-white">First Name</label>
                        <div className="mt-2">
                        <input id="firstName" name="firstName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-white">Last Name</label>
                        <div className="mt-2">
                        <input id="lastName" name="lastName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-white">Email address</label>
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
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup
