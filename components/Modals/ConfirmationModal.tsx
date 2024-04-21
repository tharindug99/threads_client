import React from "react";
import Modal from "../Modal";
import Logo from "../Logo";
import Button from "../Button";
import useModal from "@/hooks/useModal";

type Props = {
  title: string;
  description: string;
  onClose?: () => void;
  onConfirm?: () => void;
  isOpen?: boolean;
  buttonLabel?: string;
  modelName: string;
  secondaryButtonLabel?: string;
  onSecondaryButtonClick?: () => void;
};
export default function ConfirmationModal({
  title,
  description,
  onClose,
  onConfirm,
  isOpen,
  buttonLabel,
  modelName,
  secondaryButtonLabel,
  onSecondaryButtonClick,
}: Props) {
  const { isOpen: isModalOpen, onClose: onModalClose } = useModal(modelName);
  return (
    <Modal
      isOpen={isOpen || isModalOpen}
      closeModal={() => {
        onClose?.();
        onModalClose?.();
      }}
    >
      <div
        id="modal-body"
        className="p-12 mx-4 flex justify-center items-center h-screen sm:h-auto"
      >
        <div className="flex flex-1 flex-col items-center mt-2">
          <div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <h1 className="text-xl py-4">{title}</h1>
                <p className="max-w-[400px] text-sm text-gray-500">
                  {description}
                </p>
                <div className="flex justify-center mt-8">
                  {secondaryButtonLabel && (
                    <Button
                      onClick={onSecondaryButtonClick}
                      variant="tertiary"
                      className=" px-8 mx-1"
                    >
                      {secondaryButtonLabel}
                    </Button>
                  )}
                  {buttonLabel && (
                    <Button onClick={onConfirm} className=" px-8 mx-1">
                      {buttonLabel}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
