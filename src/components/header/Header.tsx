import Logo from "@/components/header/Logo";
import UnitsSwitcher from "@/components/header/UnitSwitcher";

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
      <Logo />
      <UnitsSwitcher />
    </header>
  );
}

export default Header;
