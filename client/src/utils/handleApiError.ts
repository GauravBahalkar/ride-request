import { toast } from "sonner";

export const handleApiError = (error: any) => {
  const msg = error?.message || "An unexpected error occurred";
  toast.error(msg);
};
