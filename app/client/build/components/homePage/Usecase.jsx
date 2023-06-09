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
      className='mx-auto'
    />
  )
}

const Usecase = () => {
  return (
    <section className="relative pb-6">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-gray-100 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">What is VertiGuard?</h1>
            <p className="text-xl text-gray-600">VertiGuard is a customizable Dashboard that you can hook up your plant sensors to get up-to-date feedback
            on how your farm is doing, no matter where you are.</p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Designed for you.</h3>
                <p className="text-xl text-gray-600">VertiGuard can be as simple or as detailed as you want, great for beginner gardners to advanced horticulturists.</p>
              </div>
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Quick to Understand.</h3>
                <p className="text-xl text-gray-600">The default dashboard gives you all the information you need at a glance.</p>
              </div>
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Visual first.</h3>
                <p className="text-xl text-gray-600">Graphs are an integral part of VertiGuard, configured for you.</p>
              </div>
            </div>

            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-left">
              {/* Replace with image of dashboard */}
                <HeroImage />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Usecase;