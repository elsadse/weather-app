type DayDropdownProps={
    selectedDay: string
}

export function DayDropdown({selectedDay}: DayDropdownProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  //const selectedDay = "Tuesday";

  return (
    <div className=" absolute bottom-10 right-3
        flex flex-col
        bg-[#262540] rounded-lg 
        h-[313px] w-[214px]
        gap-[4px]
        p-[8px]
    ">
      {days.map((day) =>{ 
        const isSelected = day === selectedDay;
        return (
                <div
                key={day}
                className={` h-[39px] w-[198px] px-[8px] py-[10px]
                        hover:bg-[#302F4A]
                        ${isSelected ? "bg-[#302F4A] rounded-lg" : "hover:bg-[#302F4A] hover:rounded-lg"}
                        cursor-pointer 
                    `}
                    //style={}
                >
                {day}
                </div>
            );
        })}
    </div>
  );
}
