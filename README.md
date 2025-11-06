# APEC OnChain Academy

A blockchain-powered certificate management platform built on Solana. Create, mint, and claim verifiable credentials with cryptographic proof of authenticity.

## Overview

APEC OnChain Academy enables educational institutions and organizations to issue tamper-proof, blockchain-backed certificates on the Solana network. Students can claim their certificates as NFTs, which can be instantly verified by anyone, anywhere.

### Key Features

- 🎓 **Verifiable Credentials** - Issue blockchain-backed certificates with cryptographic proof
- ⚡ **Instant Claiming** - Students claim certificates via QR codes and receive them as Solana NFTs
- 🔒 **Merkle Tree Proofs** - Efficient verification using Merkle tree cryptography
- 🌐 **Decentralized Storage** - Certificate metadata stored on-chain and in Supabase
- 🔐 **Secure Authentication** - Privy.io integration for wallet-based authentication
- 📊 **Course Management** - Create and manage courses with certificate templates
- 🎨 **Modern UI** - Built with Next.js, TailwindCSS, and shadcn/ui

### Some resource
- [Profile](https://apec-learning-web.vercel.app/profile/D6ghYKKSngtijiDtyEjR1Q4PwQmeh24u5mgMFkvw4dq)
- [NFT metadata](https://apec-learning-web.vercel.app/metadata/Hv2L4qCA3VcAN7GZYqPx5vhSwq1ekYXJMLm98woQHhYR.json)
- [NFT image](https://apec-learning-web.vercel.app/image/certificate/Hv2L4qCA3VcAN7GZYqPx5vhSwq1ekYXJMLm98woQHhYR.png)

## Tech Stack

### Frontend & Framework
- **TypeScript** - Type-safe development
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with compiler optimizations
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library

### Blockchain & Web3
- **Solana** - High-performance blockchain network
- **@solana/kit** - Solana Web3.js v2 toolkit
- **Token-2022** - Solana Token Extensions program
- **Codama** - Solana program SDK generator
- **Merkle Trees** - Efficient certificate verification

### Backend & Database
- **tRPC** - End-to-end type-safe APIs
- **Drizzle ORM** - TypeScript-first database toolkit
- **PostgreSQL** - Primary database
- **Supabase** - Storage and additional backend services

### Authentication & Security
- **Privy.io** - Wallet authentication and user management
- **Next Safe Action** - Type-safe server actions

### Development Tools
- **Turborepo** - Monorepo build system
- **Biome** - Fast linter and formatter
- **Bun** - JavaScript runtime and package manager

## Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** >= 1.3.1 ([Installation guide](https://bun.sh))
- **Node.js** >= 20 (for compatibility)
- **PostgreSQL** database (local or hosted)
- **Solana CLI** (optional, for program development)

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd apec-certificate-web

# Install dependencies
bun install
```

### 2. Environment Setup

Create a `.env` file in `apps/web/` with the following variables:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# Privy Authentication
NEXT_PUBLIC_PRIVY_APP_ID="your-privy-app-id"
NEXT_PUBLIC_PRIVY_CLIENT_ID="your-privy-client-id"
PRIVY_APP_SECRET="your-privy-app-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_PROJECT_URL="https://your-project.supabase.co"
SUPABASE_API_KEY="your-supabase-service-role-key"
NEXT_PUBLIC_STORAGE_COURSE_BUCKET="course-images"

# Solana
NEXT_PUBLIC_SOLANA_RPC="api.devnet.solana.com"  # or your RPC endpoint

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3001"
```

#### Getting API Keys

- **Privy**: Sign up at [privy.io](https://privy.io) and create an app
- **Supabase**: Create a project at [supabase.com](https://supabase.com)
- **Solana RPC**: Use public endpoints or get a dedicated RPC from [Helius](https://helius.dev) or [QuickNode](https://quicknode.com)

### 3. Database Setup

```bash
# Push the database schema
bun db:push

# (Optional) Open Drizzle Studio to view your database
bun db:studio
```

### 4. Run Development Server

```bash
# Start all applications
bun dev

# Or run only the web app
bun dev:web
```

Open [http://localhost:3001](http://localhost:3001) to see the application.

## Project Structure

```
apec-certificate-web/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/           # App router pages
│       │   ├── components/    # React components
│       │   ├── hooks/         # Custom React hooks
│       │   ├── lib/           # Utilities and configurations
│       │   └── server/        # Server actions
│       └── package.json
│
├── packages/
│   ├── api/                   # tRPC API layer
│   │   └── src/
│   │       └── routers/       # API route handlers
│   │
│   ├── db/                    # Database layer
│   │   └── src/
│   │       ├── schema/        # Drizzle schemas
│   │       ├── migrations/    # Database migrations
│   │       └── [entity]/      # Entity-specific queries
│   │
│   └── program-sdk/           # Solana program SDK
│       ├── idls/              # Anchor IDL files
│       └── src/               # Generated TypeScript SDK
│
├── package.json               # Root package configuration
├── turbo.json                 # Turborepo configuration
└── biome.json                 # Biome linter/formatter config
```

## Available Scripts

### Development
- `bun dev` - Start all applications in development mode
- `bun dev:web` - Start only the web application
- `bun build` - Build all applications for production
- `bun check-types` - Type-check all packages

### Database
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open Drizzle Studio (database GUI)
- `bun db:generate` - Generate migration files
- `bun db:migrate` - Run database migrations

### Code Quality
- `bun check` - Run Biome linting and formatting

## How It Works

### Certificate Lifecycle

1. **Provider Setup** - Organizations create a provider account on-chain
2. **Course Creation** - Create courses with certificate templates
3. **Certificate Issuance** - Add students to courses and generate Merkle tree proofs
4. **On-Chain Proof** - Store Merkle root on Solana for verification
5. **Certificate Claiming** - Students claim certificates as Token-2022 NFTs
6. **Verification** - Anyone can verify certificate authenticity using Merkle proofs

### Solana Program

The platform uses a custom Solana program (located in `packages/program-sdk`) that handles:
- Provider account management
- Course registration
- Certificate proof storage (Merkle roots)
- NFT minting with Token-2022 extensions

## Development Workflow

1. **Make changes** to your code
2. **Type-check** with `bun check-types`
3. **Format & lint** with `bun check`
4. **Test locally** with `bun dev`
5. **Build** with `bun build` to ensure production readiness

## Contributing

This project uses:
- **Biome** for consistent code formatting and linting
- **TypeScript** strict mode for type safety
- **Turborepo** for efficient monorepo builds

Run `bun check` before committing to ensure code quality.

## License

[Add your license here]

---

Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
