import React from "react"
import { useToast as useToastPrimitive } from "@/components/ui/use-toast"
import {
  type ToastProps,
  type Toast,
  ToastAction,
} from "@/components/ui/toast"

type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastAction>

export type ToastOptions = Partial<
  Pick<ToastProps, "variant" | "duration" | "onOpenChange" | "onSwipeEnd">
> & {
  title?: string
  description?: React.ReactNode
  action?: ToastActionProps
}

export const useToast = () => {
  const { toast, dismiss, toasts } = useToastPrimitive()

  return {
    toast: (options: ToastOptions) => {
      return toast({
        ...options,
        title: options.title,
        description: options.description,
        variant: options.variant,
        action: options.action ? <ToastAction {...options.action} /> : undefined,
        duration: options.duration || 5000,
      })
    },
    dismiss,
    toasts,
  }
}

export type { Toast }
