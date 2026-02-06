import * as React from "react";

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;

  // ✅ REQUIRED for use-toast.ts
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastActionElement = React.ReactElement<{
  altText?: string;
}>;

export function Toast({
  title,
  description,
  action,
}: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 rounded-xl bg-black text-white p-4 shadow-xl">
      {title && <div className="font-semibold">{title}</div>}
      {description && (
        <div className="text-sm text-gray-300">{description}</div>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
