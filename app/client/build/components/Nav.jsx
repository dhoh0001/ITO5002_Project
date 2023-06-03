"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Nav = () => {
    const isUserLoggedIn = true;
    const signOut = false;
    
    return (
        <nav className='flex-between w-full pb-3 pt-3 primary-colour'>
            <Link href="/" className="flex gap-2 flex-center ml-3">
                <Image 
                // Need to create the logo for VertiGuard
                   src="/assets/images/logo.svg"
                   alt="VertiGuard Logo"
                   width={20}
                   height={20}
                   className="object-contain"
                />
            </Link>

            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="dashboard"
                        className="black_btn">
                            View/Link Farm
                        </Link> 

                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                    </div>
                ): (
                    <>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav