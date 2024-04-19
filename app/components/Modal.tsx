import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Spinner } from "./Loading";
import { useTransition, animated } from "@react-spring/web";

type Props = {
  isOpen: boolean;
  closeModal?: () => void;
  isLoading?: boolean;
};

export default function Modal({
  isOpen,
  closeModal,
  children,
  isLoading,
}: PropsWithChildren<Props>) {
  const onClose = () => {
    if (closeModal) closeModal();
  };
  const transition = useTransition(isLoading, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
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

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden sm:rounded-2xl bg-white text-left align-middle drop-shadow-2xl transition-all ">
                  <div
                    className="absolute"
                    style={{
                      display: closeModal ? "block" : "none",
                    }}
                  >
                    <IoMdCloseCircle
                      className="text-3xl ml-5 mt-5 text-gray-400 cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>

                  {children}
                  {transition((style, item) => {
                    if (item) {
                      return (
                        <animated.div
                          style={style}
                          className="absolute z-50 top-0 w-full h-full bg-white flex justify-center items-center"
                        >
                          <Spinner className="w-10 h-10" />
                        </animated.div>
                      );
                    }
                  })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
