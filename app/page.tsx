import Chat from "@/components/chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-0">
      <Chat />
    </main>
  );
}
