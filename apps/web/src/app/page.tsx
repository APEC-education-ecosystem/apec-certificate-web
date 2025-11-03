import ApiHeathCheck from "@/components/api-heathcheck";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Award, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              Powered by Solana Blockchain
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="bg-linear-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              APEC OnChain
            </span>
            <br />
            <span className="text-foreground">Academy</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Create, mint, and claim verifiable blockchain certificates on
            Solana. Secure, transparent, and tamper-proof credentials for the
            digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/app">
              <Button
                size="lg"
                variant={"default"}
                className="text-lg px-8 py-6"
              >
                Get Started
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-(--shadow-card)">
            <div className="w-12 h-12 rounded-lg bg-(--gradient-primary) flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Verifiable Credentials
            </h3>
            <p className="text-muted-foreground">
              Issue blockchain-backed certificates that can be instantly
              verified by anyone, anywhere.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-(--shadow-card)">
            <div className="w-12 h-12 rounded-lg bg-(--gradient-accent) flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tamper-Proof</h3>
            <p className="text-muted-foreground">
              Certificates stored on Solana blockchain cannot be altered,
              ensuring permanent authenticity.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-(--shadow-card)">
            <div className="w-12 h-12 rounded-lg bg-(--gradient-primary) flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Claiming</h3>
            <p className="text-muted-foreground">
              Students can claim their certificates instantly with QR codes for
              easy sharing and verification.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-32">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 APEC OnChain Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
