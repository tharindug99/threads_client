import React, { Suspense } from "react";
import AuthModal from "../../components/Modals/AuthModal";

export default function Page() {
  return (
    <main className="w-full h-[80vh]">
      <Suspense>
        <AuthModal />
      </Suspense>
    </main>
  );
}
