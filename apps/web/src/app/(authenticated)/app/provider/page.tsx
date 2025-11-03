"use client";
import ProviderRegisterForm from "@/components/provider/register-form";
import ProviderInfo from "@/components/provider/provider-info";
import ProviderLoading from "@/components/provider/provider-loading";
import { useSolana } from "@/components/solana-provider";
import { Badge } from "@/components/ui/badge";
import { getProviderByCreator } from "@/server/provider";
import { useQuery } from "@tanstack/react-query";
import { Building2, Shield, Award, Users } from "lucide-react";

const ProviderPage = () => {
  const { wallet } = useSolana();
  const { data: provider, isLoading } = useQuery({
    queryKey: ["provider", wallet],
    queryFn: async () => getProviderByCreator(wallet.address),
    enabled: !!wallet && !!wallet.address,
  });
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 bg-primary/10 rounded-full ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {provider
              ? "Your Provider Dashboard"
              : "Become a Certificate Provider"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {provider
              ? "Manage your provider profile and start issuing blockchain-verified certificates."
              : "Join our platform as a trusted education provider and start issuing blockchain-verified certificates to your students."}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Blockchain Security
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Issue tamper-proof certificates secured by blockchain technology
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-4">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Global Recognition
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your certificates are instantly verifiable worldwide
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Student Trust
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Build credibility with transparent, verifiable credentials
            </p>
          </div>
        </div>

        {/* Provider Information or Registration Form */}
        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="px-4 py-2 animate-pulse">
                Loading Provider Information...
              </Badge>
            </div>
            <ProviderLoading />
          </div>
        ) : provider ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge variant="default" className="px-4 py-2">
                Your Provider Profile
              </Badge>
            </div>
            <ProviderInfo provider={provider} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2">
                Quick & Easy Registration
              </Badge>
            </div>
            <ProviderRegisterForm />
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By registering as a provider, you agree to our terms of service and
            commit to maintaining the highest standards of educational
            excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
