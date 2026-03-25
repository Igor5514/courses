import { Toaster, toast } from "sonner";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export function PageWrapper({ children } : {children: React.ReactNode}) {
  
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
  }, [flash.success]);

  return (
    <>
      <div className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
        {children}
      </div>
      <Toaster position="top-center" richColors  />
    </>
    
  );
}
