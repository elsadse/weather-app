type UnitButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function UnitButton({ label, active, onClick }: UnitButtonProps) {
  
    return (
    <div
      className={`
                transition-colors ${
                  active ? "bg-[#302F4A]" : "bg-[#262540] hover:bg-[#262540]"
                }`}
    >
      <button onClick={onClick}>{label}</button>
    </div>
  );
}
