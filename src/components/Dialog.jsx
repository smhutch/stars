import React from "react";
import {
  Content as DialogContent,
  Overlay as DialogOverlay,
  Title as DialogTitle,
} from "@radix-ui/react-dialog";

export const Dialog = ({ children, closeDialog, title }) => {
  return (
    <>
      <DialogOverlay className="dialog-overlay" />
      <DialogContent
        className="dialog-content"
        onEscapeKeyDown={closeDialog}
        onPointerDownOutside={closeDialog}
        onInteractOutside={closeDialog}
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </>
  );
};
