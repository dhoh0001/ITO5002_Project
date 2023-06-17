'use client'

import Link from 'next/link';
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useContext, useEffect, useState } from 'react';

const Nav = () => {
  const { user } = useAuthContext();
  const [accessToken, setAccessToken] = useState("loading");
  const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       user.getIdToken().then((token) => {
  //         setAccessToken(token);
  //       });
  //     } else {
  //       setAccessToken(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (accessToken !== "loading") {
  //     axios
  //       .get('http://ec2-3-27-1-118.ap-southeast-2.compute.amazonaws.com/user', {
  //         headers: {
  //           authorization: `${accessToken}`
  //         }
  //       })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [accessToken]);


  return (
    <nav className='flex-between w-full pb-3 pt-3'>
      <Link href="/" className="flex gap-2 flex-center ml-3">
        {user ? <div>Welcome {user.email}</div> : <div>VertiGuard</div>}
      </Link>

      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="dashboard" className="black_btn">
              Dashboard
            </Link>

            <Link
              href="user/signin"
              className="outline_btn"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="user/signin" className="outline_btn">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
