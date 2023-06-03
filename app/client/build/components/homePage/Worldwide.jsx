import Image from 'next/image'
import Hero from 'public/earth.avif'

const HeroImage = () => {
  return (
    <Image
      src={Hero}
      alt="A hero image of people working together in a community farm."
      width={350}
      height={300}
      placeholder="blur"
    />
  )
}

const Worldwide = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full bg-black">
        {/* Left */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {/* Need to fix on mobile */}
            <div className="mt-6 mb-6">
                <HeroImage />
            </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
            <p className="ml-36 mr-36 text-xl text-right font-semibold text-white sm:mb-6">
            VertiGuard makes your data available <span className='green_gradient'>everywhere</span>.
            <br /> 
            Get <span className='green_gradient'>up-to-date</span> data on how your plants are doing, 24/7.
          </p>
        </div>
      </div>
      
    </section>
  );
}

export default Worldwide;