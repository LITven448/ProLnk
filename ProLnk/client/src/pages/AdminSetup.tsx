import { useState } from "react";
import ProLnkLogo from "@/components/ProLnkLogo";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Zap, ArrowRight, Lock } from "lucide-react";

export default function AdminSetup() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const promoteMutation = trpc.admin.selfPromoteToAdmin.useMutation({
    onSuccess: () => {
      toast.success("Admin access granted! Redirecting to admin dashboard...");
      utils.auth.me.invalidate();
      setTimeout(() => navigate("/admin"), 1500);
    },
    onError: (err) => toast.error(err.message),
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6 px-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--teal)" }}>
          <Lock className="w-8 h-8 text-white" />
        </div>
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-heading text-gray-900 mb-2 tracking-wide">SIGN IN REQUIRED</h2>
          <p className="text-gray-500 text-sm mb-6">
            You need to sign in with the network owner account to complete admin setup.
          </p>
          <Button
            className="w-full text-white font-heading"
            style={{ backgroundColor: "var(--teal)" }}
            onClick={() => { window.location.href = getLoginUrl(); }}
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  if (user?.role === "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6 px-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-green-100">
          <ShieldCheck className="w-8 h-8 text-green-600" />
        </div>
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-heading text-gray-900 mb-2 tracking-wide">ALREADY AN ADMIN</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your account already has admin access. Head to the dashboard.
          </p>
          <Button
            className="w-full text-white font-heading gap-2"
            style={{ backgroundColor: "var(--teal)" }}
            onClick={() => navigate("/admin")}
          >
            Go to Admin Dashboard <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <ProLnkLogo height={36} variant="light" className="shrink-0 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Network Owner Setup</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0A1628]" />
              </div>
              <div>
                <h2 className="font-heading text-gray-900 tracking-wide">ACTIVATE ADMIN ACCESS</h2>
                <p className="text-xs text-gray-500">One-time setup for the network owner</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Signed in as:</p>
                <p className="text-sm text-gray-900 font-semibold">{user?.name ?? "Unknown"}</p>
                <p className="text-xs text-gray-500">{user?.email ?? ""}</p>
              </div>

              <div className="bg-[#F5E642]/10 border border-[#0A1628]/20 rounded-xl p-4 text-sm text-teal-800">
                <p className="font-semibold mb-1">What admin access gives you:</p>
                <ul className="space-y-1 text-xs text-[#0A1628]">
                  <li>- Review and approve partner applications</li>
                  <li>- View all network activity and commissions</li>
                  <li>- Manage per-industry commission rates</li>
                  <li>- View the live AI opportunity feed</li>
                  <li>- Broadcast messages to all partners</li>
                </ul>
              </div>

              <p className="text-xs text-gray-400 text-center">
                This action can only be performed by the registered network owner account.
              </p>
            </div>

            <Button
              className="w-full text-white font-heading h-12 text-base gap-2"
              style={{ backgroundColor: "var(--teal)" }}
              disabled={promoteMutation.isPending}
              onClick={() => promoteMutation.mutate()}
            >
              {promoteMutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Activating...</>
              ) : (
                <><ShieldCheck className="w-5 h-5" /> Activate Admin Access</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
