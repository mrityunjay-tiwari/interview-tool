# Prepnova - AI-powered Interview Coaching

Prepnova is an AI-powered interview coaching platform designed to help candidates ace their interviews. It leverages cutting-edge AI to provide real-time feedback on answers, body language, and engagement, providing a comprehensive analysis to turn every practice session into measurable growth.

## Features

- **Real-time AI Analysis**: Instant feedback on your interview performance using advanced AI models.
- **Body Language & Pose Detection**: Integrated MediaPipe technology to analyze posture and non-verbal communication.
- **Seamless Video Calls**: Powered by Stream Video SDK for high-quality, reliable mock interviews.
- **Personalized Insights**: Track your progress over time with interactive dashboards and charts.
- **Growth Tracking**: Detailed metrics to help you identify strengths and areas for improvement.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Motion](https://motion.dev/)
- **State & UI**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Shadcn/UI](https://ui.shadcn.com/)
- **Video & AI**: [Stream Video SDK](https://getstream.io/video/), [MediaPipe](https://google.github.io/mediapipe/), [OpenRouter AI](https://openrouter.ai/)
- **Backend & Database**: [Prisma](https://www.prisma.io/) (ORM), [PostgreSQL](https://www.postgresql.org/), [NextAuth.js](https://next-auth.js.org/)
- **Visuals**: [Recharts](https://recharts.org/), [Rough Notation](https://roughnotation.com/)

## Backend Repository

The backend source code for this project can be found here:
**[Prepnova Backend](https://github.com/mrityunjay-tiwari/stream-interview-be)**

## Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm / yarn / pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mrityunjay-tiwari/stream.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary keys (Database URL, Stream API keys, NextAuth secrets, etc.).

4. Run Prisma migrations:

   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

