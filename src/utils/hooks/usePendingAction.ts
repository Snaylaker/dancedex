"use client";

import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";

export function usePendingAction(
  action: (formData: any) => Promise<{ success?: string; error?: string }>,
  callback?: () => void,
) {
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: any) {
    startTransition(async () => {
      const data = await action(formData);
      data?.error &&
        toast({
          description: data.error,
        });
      data?.success &&
        toast({
          description: data.success,
        });
      callback?.();
    });
  }
  return [isPending, handleAction] as const;
}
