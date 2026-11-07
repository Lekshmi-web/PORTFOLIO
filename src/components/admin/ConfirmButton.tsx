"use client";

interface ConfirmButtonProps {
  action: () => Promise<void>;
  message: string;
  children: React.ReactNode;
  className?: string;
}

/** A form button that asks for confirmation before running a server action. */
export function ConfirmButton({ action, message, children, className }: ConfirmButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
