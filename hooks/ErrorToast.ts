import { useToast } from "@/components/ui/use-toast"
import { CSSProperties } from "react";

export const ErrorToast = () => {
  const { toast } = useToast()

  const setOpenErrorToast = (title: string, description:string, style?: CSSProperties ): void => {
    toast({
      title,
      description,
      style: {
        backgroundColor: "#f44336",
        color: "white",
        ...style,
      },
    });
  };

  return { setOpenErrorToast }
}