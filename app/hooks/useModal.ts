import { useSearchParams, useRouter } from "next/navigation";
type TTUseModalOptions = {
  customCloseUrl?: string;
};
export default function useModal(modal: string, options?: TTUseModalOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return {
    isOpen: searchParams.get("modal") === modal,
    onClose: router.back,
  };
}
