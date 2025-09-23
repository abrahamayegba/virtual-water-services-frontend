import { confirmPasswordReset, requestPasswordReset } from "@/api/auth";
import { useState } from "react";

export function usePasswordReset() {
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  async function sendResetEmail(
    email: string,
    onSuccessToast: () => void,
    closeDialog: () => void
  ) {
    try {
      setResetLoading(true);
      setResetMessage("");
      const data = await requestPasswordReset(email);
      if (data.success) {
        closeDialog();
        onSuccessToast();
      } else {
        setResetMessage("Something went wrong.");
      }
    } catch {
      setResetMessage("Server error.");
    } finally {
      setResetLoading(false);
    }
  }

  async function confirmReset(
    userId: string,
    token: string,
    newPassword: string,
    onSuccess?: () => void
  ) {
    try {
      setConfirmLoading(true);
      setConfirmMessage("");
      await confirmPasswordReset(userId, token, newPassword);
      setConfirmMessage("Password reset successful. You can now log in.");
      if (onSuccess) onSuccess();
    } catch {
      setConfirmMessage("Failed to reset password. Try again.");
    } finally {
      setConfirmLoading(false);
    }
  }

  return {
    resetLoading,
    resetMessage,
    sendResetEmail,
    setResetLoading,
    confirmLoading,
    setConfirmMessage,
    setConfirmLoading,
    confirmMessage,
    confirmReset,
  };
}
