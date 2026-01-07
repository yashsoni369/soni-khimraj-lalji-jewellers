import React, { forwardRef } from 'react';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    // Indian Style: Rounded corners (sm/md), rich colors
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-maroon-900 text-white hover:bg-maroon-800 shadow-md", // Royal Maroon
      secondary: "bg-gold-500 text-white hover:bg-gold-600",
      outline: "border border-maroon-900 text-maroon-900 bg-transparent hover:bg-maroon-50",
      ghost: "hover:bg-maroon-50 text-maroon-900",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      link: "text-maroon-900 underline-offset-4 hover:underline p-0 h-auto font-normal",
    };

    const sizes = {
      sm: "h-8 px-4 text-xs",
      md: "h-10 px-6",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// --- CARD ---
export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-white rounded-sm shadow-sm border border-maroon-100 ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`flex flex-col space-y-2 p-4 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

// --- INPUT ---
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-11 w-full border border-maroon-200 bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-maroon-300 focus-visible:outline-none focus-visible:border-maroon-900 focus-visible:ring-1 focus-visible:ring-maroon-900 disabled:cursor-not-allowed disabled:opacity-50 rounded-sm ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// --- TEXTAREA ---
export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[100px] w-full border border-maroon-200 bg-white px-4 py-2 text-sm placeholder:text-maroon-300 focus-visible:outline-none focus-visible:border-maroon-900 focus-visible:ring-1 focus-visible:ring-maroon-900 disabled:cursor-not-allowed disabled:opacity-50 rounded-sm ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// --- BADGE ---
export const Badge: React.FC<{ children: React.ReactNode, variant?: "default" | "secondary" | "outline" | "new", className?: string }> = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "border-transparent bg-maroon-900 text-white",
    secondary: "border-transparent bg-gold-100 text-maroon-900",
    outline: "text-maroon-900 border-maroon-200 border",
    new: "bg-red-600 text-white",
  };
  return (
    <div className={`inline-flex items-center rounded-sm px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// --- DIALOG / MODAL ---
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-cream-50 p-6 shadow-2xl duration-300 animate-in zoom-in-95 slide-in-from-bottom-4 rounded-lg border-2 border-gold-200">
        <div className="flex flex-col space-y-1.5 text-center mb-6 border-b border-gold-200 pb-4">
          <h2 className="text-2xl font-serif text-maroon-900">{title}</h2>
        </div>
        {children}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-maroon-400 hover:text-maroon-900 transition-colors p-2"
        >
          <span className="text-2xl">×</span>
        </button>
      </div>
    </div>
  );
};

// --- TOAST ---
export const useToast = () => {
  const [toast, setToast] = React.useState<{ title: string; desc: string; visible: boolean }>({ title: '', desc: '', visible: false });

  const showToast = (title: string, desc: string) => {
    setToast({ title, desc, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const ToastComponent = () => (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm overflow-hidden bg-maroon-900 text-white shadow-2xl transition-all duration-500 rounded-md ${toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="p-4 text-center">
        <p className="text-sm font-bold uppercase text-gold-400">{toast.title}</p>
        <p className="text-sm text-white/90 mt-1">{toast.desc}</p>
      </div>
    </div>
  );

  return { showToast, ToastComponent };
};