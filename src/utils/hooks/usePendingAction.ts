"use client";

import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";

export function usePendingAction(
  action: (formData: FormData) => Promise<void | { error: string }>,
  callback?: () => void,
) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: FormData) {
    console.log("formData", formData);
    startTransition(async () => {
      const data = await action(formData);
      data?.error &&
        toast({
          description: data.error,
        });
      callback?.();
    });
  }
  return [isPending, handleAction] as const;
}
