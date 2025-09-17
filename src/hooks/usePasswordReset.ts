import { confirmPasswordReset, requestPasswordReset } from "@/api/auth";
import { useState } from "react";

export function usePasswordReset() {
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  // // Send forgot password email
  // async function sendResetEmail(
  //   email: string,
  //   onSuccessToast: () => void,
  //   closeDialog: () => void
  // ) {
  //   setResetLoading(true);
  //   setResetMessage("");
  //   try {
  //     const res = await fetch(
  //       "http://localhost:8080/api/v1/auth/password-reset/request",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email }),
  //       }
  //     );
  //     const data = await res.json();
  //     if (data.success) {
  //       closeDialog(); // close forgot password dialog
  //       onSuccessToast(); // show your toast notification
  //     } else {
  //       setResetMessage("Something went wrong.");
  //     }
  //   } catch {
  //     setResetMessage("Server error.");
  //   } finally {
  //     setResetLoading(false);
  //   }
  // }

  // // Confirm password reset with token
  // async function confirmReset(
  //   userId: string,
  //   token: string,
  //   newPassword: string,
  //   onSuccess?: () => void
  // ) {
  //   if (!userId || !token || !newPassword) return;
  //   setConfirmLoading(true);
  //   setConfirmMessage("");
  //   try {
  //     const res = await fetch(
  //       "http://localhost:8080/api/v1/auth/password-reset/confirm",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId, token, newPassword }),
  //       }
  //     );
  //     if (res.ok) {
  //       setConfirmMessage("Password reset successful. You can now log in.");
  //       // Show toast on success

  //       if (onSuccess) onSuccess();
  //     } else {
  //       setConfirmMessage("Failed to reset password. Try again.");
  //     }
  //   } catch {
  //     setConfirmMessage("Something went wrong.");
  //   } finally {
  //     setConfirmLoading(false);
  //   }
  // }

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
