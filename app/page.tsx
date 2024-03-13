import Chat from "@/components/chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="relative z-0 flex flex-col items-center justify-center min-h-screen p-8">
      <Chat />
    </main>
  );
}
