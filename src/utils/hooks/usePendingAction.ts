"use client";

import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { createClient } from "../supabase/client";

export function usePendingAction(
  action: (formData: any) => Promise<{ success?: string; error?: string }>,
  callback?: () => void,
) {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();
  function handleAction(formData: any) {
    startTransition(async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Invalid user");
      }
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
