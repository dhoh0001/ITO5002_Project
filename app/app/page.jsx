import Link from 'next/link';
import Usecase from '@components/homePage/Usecase';
import Calltoaction from '@components/homePage/Calltoaction';
import Worldwide from '@components/homePage/Worldwide';

const Home = () => {
    return (
    <section className="relative">
        <section className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
                <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                        <stop stopColor="#FFF" offset="0%" />
                        <stop stopColor="#ABD8B6" offset="77.402%" />
                        <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                </defs>
                <g fill="url(#illustration-01)" fillRule="evenodd">
                    <circle cx="1212" cy="428" r="128" />
                    <circle cx="155" cy="143" r="64" />
                    <circle cx="85" cy="443" r="64" />
                </g>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Hero content */}
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Section header */}
                    <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Monitor your garden with <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-800">VertiGuard</span></h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Designed for <span className='green_gradient'>Community Gardens</span>,
                            VertiGuard can help with monitoring your plants and ensuring optimum growth.
                        </p>
                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                        <div>
                            <Link href="user/signup"
                                className="px-4 py-2 secondary-colour text-white rounded-md">
                                Sign up now!
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
      <Usecase />
      <Worldwide />  
      <Calltoaction />   
    </section>
    )
}

export default Home