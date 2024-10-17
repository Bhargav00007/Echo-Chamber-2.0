import Dashboard from "../../components/Dashboard";
import Chat from "./chat/page";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <Dashboard />
      <Chat />
    </main>
  );
}
