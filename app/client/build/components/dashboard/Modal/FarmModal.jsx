"use client"
import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setShowModal(true)}>
        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
        <span className="ml-3">Add Farm</span>
    </a>

      {showModal ? (
        <div>
            <form className="" action="#" method="POST" onSubmit="">
                <div className="border-2 border-gray-200 border-dashed rounded-lg text-white mx-2">
                    <label className="block text-sm font-bold mx-2 text-white pt-4">Farm Name</label>
                    <input className="shadow mx-2 justify-center appearance-none border rounded py-2 px-1 text-black" />
                    <div className="pt-4">
                        <button
                            className="black_btn mx-2 mb-2"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Submit
                        </button>
                        <button
                            className="black_btn mx-2 mb-2"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </div>
      ) : null}
    </>
  );
}

export default Modal;