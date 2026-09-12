import Timer from "@/components/Timer";
import Settings from "@/components/Settings"

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-black/30 bg-blend-multiply"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <Settings />
      <Timer />
    </div>
  );
}
