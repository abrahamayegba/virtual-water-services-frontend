import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  loading: boolean;
  message: string;
  onConfirm: () => void;
}

export default function ResetPasswordDialog({
  open,
  onOpenChange,
  newPassword,
  setNewPassword,
  loading,
  message,
  onConfirm,
}: ResetPasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>Enter your new password below.</DialogDescription>
        </DialogHeader>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          className="w-full mt-2 px-3 py-2 border rounded-md"
        />

        {message && <p className="text-sm mt-2">{message}</p>}

        <DialogFooter>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-2 px-4 mt-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
