import Chat from "@/components/chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Chat />
    </main>
  );
}
