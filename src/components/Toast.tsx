import { useEffect } from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

interface ToastProps {
  toast?: ToastMessage | null;
  message?: ToastMessage | null;
  onClose: () => void;
}

export function Toast({ toast, message, onClose }: ToastProps) {
  const activeToast = toast || message;

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeToast, onClose]);

  if (!activeToast) return null;

  const isError = activeToast.type === 'error';
  const isWarning = activeToast.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 max-w-sm z-50 bg-stone-900 text-white p-4 rounded-xl shadow-lg border border-stone-800 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
      {isError ? (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      ) : isWarning ? (
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 text-xs">
        <div className="font-semibold text-white">{activeToast.title}</div>
        <p className="text-stone-300 mt-0.5 leading-relaxed">{activeToast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 rounded transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
