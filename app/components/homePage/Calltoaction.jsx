import Link from 'next/link';

const Calltoaction = () => {
    return (
      <div className="flex items-center justify-center h-[60vh] primary-colour">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-8">Ready to sign up?</h2>
          <Link href="user/signup"
            className="px-4 py-2 secondary-colour text-white rounded-md">
              Let's get started
          </Link> 
        </div>
      </div>
    );
  };
  
  export default Calltoaction;