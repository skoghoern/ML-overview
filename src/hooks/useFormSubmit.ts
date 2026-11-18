import { useCallback, useState } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function useFormSubmit(endpoint: string | undefined) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      if (!endpoint) {
        setStatus("error");
        return false;
      }

      setStatus("submitting");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        setStatus("success");
        return true;
      } catch (error) {
        console.error(error);
        setStatus("error");
        return false;
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, submit, reset, configured: Boolean(endpoint) };
}
