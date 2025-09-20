import { useEffect, useRef, useState } from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, modalConfig }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isMounted && isVisible && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [isMounted, isVisible]);

  if (!isMounted) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } bg-neutral-950/50 dark:bg-neutral-950/60 backdrop-blur-sm sm:backdrop-blur-md`}
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className={`
          relative w-full max-w-[min(90vw,38rem)] sm:max-w-lg md:max-w-xl
          rounded-2xl border bg-white/85 dark:bg-zinc-900/75
          border-zinc-200/60 dark:border-white/10
          backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)]
          ring-1 ring-black/5 dark:ring-white/5
          transition-all duration-300
          ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1 scale-95"
          }
        `}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40/0 to-white/60/0" />

        <div className="relative p-6 sm:p-7 md:p-8">
          <h3
            id="confirm-delete-title"
            className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Confirm {modalConfig.heading}
          </h3>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Are you sure this assignment should be {modalConfig.type}? This
            action cannot be undone.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              ref={cancelRef}
              onClick={onClose}
              className="
                inline-flex items-center justify-center
                px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium
                text-zinc-800 dark:text-zinc-200
                bg-zinc-100 hover:bg-zinc-200
                dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80
                border border-zinc-300/60 dark:border-white/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 dark:focus-visible:ring-zinc-500/60
                transition
              "
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="
                inline-flex items-center justify-center
                px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold
                text-white bg-rose-600 hover:bg-rose-700
                shadow-sm hover:shadow
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70
                transition
              "
            >
              Yes, {modalConfig.heading}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
