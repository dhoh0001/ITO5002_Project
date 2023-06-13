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
      className='mx-auto'
    />
  )
}

const Worldwide = () => {
  return (
    <section className="relative pb-12 bg-black">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-12 md:pt-20">
        <div className="md:grid md:grid-cols-12 md:gap-6 place-items-center">
          <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
            <div className="mt-6 mb-6">
                <HeroImage />
            </div>
          </div>
          <div className="flex flex-col max-w-xl md:max-w-none md:w-full md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-left">
            <div className="md:pr-4 lg:pr-12 xl:pr-16 mx-auto">
              <h3 className="h3 mb-3 text-white">Available anywhere.</h3>
              <p className="text-xl text-white">Get access to your data, 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </section>
  );
}

export default Worldwide;