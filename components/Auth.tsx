"use client";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function Auth() {
  const { getCurrentUser, user, tokenLoading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  useEffect(() => {
    if (tokenLoading) return;
    if (user.isLoggedIn) {
      if (pathName === "/auth/dashboard") return;
      router.replace("/auth/dashboard");
    } else {
      if (pathName === "/") return;
      router.replace("/?modal=auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user, tokenLoading]);
  return <div />;
}
