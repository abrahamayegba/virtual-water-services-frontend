import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  message: string;
  onSend: () => void;
}

export default function ForgotPasswordDialog({
  open,
  onOpenChange,
  email,
  setEmail,
  loading,
  message,
  onSend,
}: ForgotPasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email and we’ll send you a reset link.
          </DialogDescription>
        </DialogHeader>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-2 px-3 py-2 border rounded-md"
        />

        {message && <p className="text-sm mt-2">{message}</p>}

        <DialogFooter>
          <button
            onClick={onSend}
            disabled={loading}
            className="w-full py-2 px-4 mt-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
