"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      position="top-center"
      richColors={true}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-slate-500',
          actionButton: 'group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50',
          cancelButton: 'group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500',
          success: 'group-[.toast]:!bg-green-50 group-[.toast]:!text-green-900 group-[.toast]:!border-green-500',
          error: 'group-[.toast]:!bg-red-50 group-[.toast]:!text-red-900 group-[.toast]:!border-red-500',
          warning: 'group-[.toast]:!bg-yellow-50 group-[.toast]:!text-yellow-900 group-[.toast]:!border-yellow-500',
          info: 'group-[.toast]:!bg-blue-50 group-[.toast]:!text-blue-900 group-[.toast]:!border-blue-500',
        },
      }}
      {...props} />)
  );
}

export { Toaster }
