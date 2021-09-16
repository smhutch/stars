import { useState } from "react";

/**
 * In most cases uncontrolled dialogs will work fine.
 * This hook can be used when we require more control of the Dialog state.
 * For example, when we want to close the dialog once an async operation is completed.
 */
export const useControlledDialog = ({ isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return {
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    isOpen,
  };
};
