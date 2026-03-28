import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <HeroSection />
      
      {/* Spacer to allow scrolling past hero */}
      <div className="h-screen flex flex-col items-center justify-center bg-[#121212] border-t border-white/5">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Scroll back up to experience the motion
        </p>
        <div className="mt-8 w-px h-24 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
      </div>
    </main>
  );
}
