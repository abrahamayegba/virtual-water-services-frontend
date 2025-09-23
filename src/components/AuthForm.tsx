import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCompanies, useRoles } from "@/hooks/useGetCompanies&Roles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company, Role } from "@/types/types";
import { useSearchParams } from "react-router-dom";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import ResetPasswordDialog from "./ResetPasswordDialog";
import { toast } from "sonner";
import { API_BASE_URL } from "@/api/config";
interface AuthFormProps {
  isLogin?: boolean;
}

export default function AuthForm({
  isLogin: initialMode = true,
}: AuthFormProps) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    companyId: "",
    roleId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotDialog, setShowForgotDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [params, setParams] = useSearchParams();

  const {
    resetLoading,
    resetMessage,
    sendResetEmail,
    confirmLoading,
    confirmMessage,
    confirmReset,
  } = usePasswordReset();

  function clearResetParams() {
    params.delete("token");
    params.delete("userId");
    setParams(params, { replace: true }); // replace: true avoids creating a new history entry
  }

  useEffect(() => {
    const token = params.get("token");
    const userId = params.get("userId");
    if (token && userId) {
      setResetToken(token);
      setResetUserId(userId);
      setShowResetDialog(true);
    }
  }, [params]);

  const { data: companiesData, isLoading: companiesLoading } = useCompanies();
  const { data: rolesData, isLoading: rolesLoading } = useRoles();
  function handleSendResetEmail() {
    sendResetEmail(
      resetEmail,
      () =>
        toast("Reset link sent!", {
          description: "Check your email for the password reset link.",
          action: {
            label: "Close",
            onClick: () => {},
          },
        }),
      () => setShowForgotDialog(false)
    );
  }
  function handleConfirmReset() {
    confirmReset(resetUserId!, resetToken!, newPassword, () => {
      setShowResetDialog(false);
      clearResetParams();
      toast("Password reset successful!", {
        description: "You can now sign in using your new password.",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) setError("Invalid email or password");
        else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        if (!formData.name || !formData.companyId || !formData.roleId) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }
        const success = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyId: formData.companyId,
          roleId: formData.roleId,
        });
        if (!success) setError("Registration failed. Email may already exist.");
        else {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Form submission error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border-l shadow">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Sign in to continue your training"
              : "Create your account to begin"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <div className=" flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => setShowForgotDialog(true)}
                  className="ml-2 text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, companyId: value }))
                  }
                  value={formData.companyId}
                >
                  <SelectTrigger className=" w-full px-3 h-[42px] text-base py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companiesLoading ? (
                      <SelectItem value="" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      companiesData?.companies?.map((company: Company) => (
                        <SelectItem
                          className=" w-full text-base py-2"
                          key={company.id}
                          value={company.id}
                          disabled={
                            company.companyName === "Virtual Water Services ltd"
                          }
                        >
                          {company.companyName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, roleId: value }))
                  }
                  value={formData.roleId}
                >
                  <SelectTrigger className=" w-full px-3 h-[42px] text-base py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className=" w-full">
                    {rolesLoading ? (
                      <SelectItem value="" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      rolesData?.roles?.map((role: Role) => (
                        <SelectItem
                          className=" w-full text-base py-2"
                          key={role.id}
                          value={role.id}
                          disabled={role.roleName !== "Student"}
                        >
                          {role.roleName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 mt-2 rounded-md disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              loading
                ? "bg-blue-300"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading
              ? isLogin
                ? "Signing In..."
                : "Signing Up..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        <ForgotPasswordDialog
          open={showForgotDialog}
          onOpenChange={setShowForgotDialog}
          email={resetEmail}
          setEmail={setResetEmail}
          loading={resetLoading}
          message={resetMessage}
          onSend={handleSendResetEmail}
        />

        <ResetPasswordDialog
          open={showResetDialog}
          onOpenChange={setShowResetDialog}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          loading={confirmLoading}
          message={confirmMessage}
          onConfirm={handleConfirmReset}
        />
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
