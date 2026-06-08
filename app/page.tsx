import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl">
        <div className="flex justify-center mb-6">
          <Gift className="w-20 h-20 animate-bounce-slow" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
          Birthday Gift Generator
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-slide-up">
          Create magical birthday cards with photos, music, and beautiful animations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admin"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create a Card
            </div>
          </Link>
          <Link
            href="/admin/cards"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
          >
            View All Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
