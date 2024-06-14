"use client";

import { useTransition } from "react";
import { createClient } from "../supabase/client";
import toast from "react-hot-toast";

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
      data?.error && toast.error(data.error);
      data?.success && toast.success(data.success);
      callback?.();
    });
  }
  return [isPending, handleAction] as const;
}
