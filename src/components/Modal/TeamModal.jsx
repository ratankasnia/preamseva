import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
} from "react-icons/fa";
import { IMAGE_API_ROUTE } from "../../api/constant";

export default function TeamModal(props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-3 rounded-full bg-black px-6 py-2 text-sm text-white    "
      >
        Details
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-gray-900 "
                  >
                    <div className="block gap-4 md:flex">
                      <img
                        src={IMAGE_API_ROUTE + "/" + props.item.image}
                        alt=""
                        className="w-[200px] md:h-full md:max-w-[300px]"
                      />
                      <div className="">
                        <span> {props.item.name}</span>
                        <div className="font-normal">
                          <div className="mt-4">{props.item.designation}</div>

                          <div className="mt-4 font-normal">
                            Dr Shubhada Suri is a General Practitioner in South
                            Yorkshire who had worked in elderly care in a
                            hospital for 10 years and now oversees a care home
                            as a General Practitioner. She is also a ex-GP
                            trainer. She looks after elderly people in her role
                            as a General Practitioner. 2023
                          </div>
                          {props.item.fb ? (
                            <>
                              <div className="mt-4 flex items-center gap-4">
                                <FaFacebookF /> {props.item.fb}
                              </div>
                            </>
                          ) : null}

                          {props.item.insta ? (
                            <>
                              <div className="mt-4 flex items-center gap-4">
                                <FaInstagram /> {props.item.insta}
                              </div>
                            </>
                          ) : null}

                          {props.item.linkedin ? (
                            <>
                              <div className="mt-4 flex items-center gap-4">
                                <FaLinkedinIn /> {props.item.linkedin}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <span className="cursor-pointer" onClick={closeModal}>
                      <FaTimes />
                    </span>
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
