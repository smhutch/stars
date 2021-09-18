import React from "react";
import {
  Root as DialogContext,
  Trigger as DialogTrigger,
} from "@radix-ui/react-dialog";
import { AddReviewForm } from "./AddReviewForm";
import { Dialog } from "./Dialog";
import { useControlledDialog } from "../hooks/useControlledDialog";

// TODO: Submitting state
// TODO: Close modal when succeeded
// TODO: Error state

export const AddReviewDialog = ({ productId, trigger }) => {
  const { isOpen, open, close } = useControlledDialog({
    isInitiallyOpen: false,
  });

  return (
    <DialogContext open={isOpen}>
      <DialogTrigger onClick={open}>{trigger}</DialogTrigger>
      <Dialog title="What’s your rating" closeDialog={close}>
        <AddReviewForm productId={productId} onSuccess={close} />
      </Dialog>
    </DialogContext>
  );
};
