import logo from "@/assets/images/logo.svg";
import { UnitContainer } from "@/components/header/UnitContainer";

function Header() {
  
    return (
    <header
      className="
            flex flex-row 
            justify-between 
            mt-[16px] px-[16px]
            sm:mt-[24px] sm:px-[24px]
            md:mt-[48px] md:px-[112px]"
    >
      <img src={logo} alt="Weather App Logo" className="h-[28px] sm:h-[40px] md:h-[40px]" />
      <UnitContainer />
    </header>
  );
}

export default Header;
