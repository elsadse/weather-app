import { Header } from "@/components/header/Header";
import { MainContent } from "@/components/main/MainContent";

export function App() {

  return (
    <>
      <Header />
      <div className="text-preset-2 text-center md:w-[482px] lg:w-[1216px] mx-auto">
        How's the sky looking today?
      </div>
      <MainContent />
    </>
  );
}
