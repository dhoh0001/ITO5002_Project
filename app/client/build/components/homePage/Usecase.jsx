import Image from 'next/image'
import Hero from 'public/community_garden.png'

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

const Usecase = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center ">
          {/* Need to fix on mobile */}
          <p className="ml-36 mr-36 text-xl text-left font-semibold text-black">
            Designed for <span className='green_gradient'>Community Gardens</span>,
            VertiGuard can help with monitoring your plants and ensuring optimum
            growth.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="mt-6 mb-6">
                <HeroImage />
            </div>
        </div>
      </div>
      
    </section>
  );
}

export default Usecase;