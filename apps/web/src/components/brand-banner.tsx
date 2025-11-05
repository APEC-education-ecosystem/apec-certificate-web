import { GraduationCap, Shield, Award } from "lucide-react";

export function BrandBanner() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary/90 to-primary/70 rounded-xl shadow-2xl">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-8 md:px-12 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                APEC Learning
              </h2>
            </div>
            <p className="text-base md:text-lg text-white/90 max-w-2xl">
              Empowering learners with blockchain-verified certifications. Earn,
              own, and showcase your achievements on the Solana blockchain.
            </p>
          </div>

          {/* Features */}
          <div className="flex gap-4 md:gap-6">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">
                  Verified
                </p>
                <p className="text-xs md:text-sm text-white/80">On-chain</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-white" />
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-white">NFT</p>
                <p className="text-xs md:text-sm text-white/80">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}
