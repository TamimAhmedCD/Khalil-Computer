"use client";

import { usePathname } from "next/navigation";

const useCurrentPath = () => {
  const pathname = usePathname();
  return pathname;
};

export default useCurrentPath;
