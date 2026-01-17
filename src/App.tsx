import "@/App.css";
import Header from "@/components/header/Header";
import { SearchBar } from "@/components/search/SearchBar";

export function App() {
  return (
    <div className="app-container">
      <Header />
      <div
        className="
            flex justify-center items-center
            mt-[48px] mb-[48px]
            sm:mt-[48px] sm:mb-[48px]
            md:mt-[64px] md:mb-[64px]"
      >
        <p className="text-center text-[62px]">How's the sky looking today?</p>
      </div>
      <div>
        <SearchBar/>
      </div>
    </div>
  );
}
