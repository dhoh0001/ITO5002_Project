"use client"

import Link from 'next/link';
import { useAuthContext, AuthContextProvider } from '@/context/AuthContext'

const Nav = () => {
    const { user } = useAuthContext();
 
    return (
        <nav className='flex-between w-full pb-3 pt-3'>
            <Link href="/" className="flex gap-2 flex-center ml-3">
                {user ?
                <div>Welcome {user.email}</div>
                :
                <div>VertiGuard</div>
                }
            </Link>

            <div className="sm:flex hidden">
                    {user ? 
                    <div className="flex gap-3 md:gap-5">
                        <Link href="dashboard"
                        className="black_btn">
                            View/Link Farm
                        </Link> 

                        <Link href="user/signin"
                        className="outline_btn"
                        onClick={() => auth.signOut()}>
                            Sign Out
                        </Link> 
                    </div>
                    :
                    <div className="flex gap-3 md:gap-5">
                        <Link href="user/signin"
                        className="outline_btn">
                            Sign In
                        </Link> 
                    </div>    
                    }
                    
            </div>
        </nav>
    )
}

export default Nav