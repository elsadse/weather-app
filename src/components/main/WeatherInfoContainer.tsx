import Bg_today_large from "@/assets/images/bg-today-large.svg"
import Bg_today_small from "@/assets/images/bg-today-small.svg"
import WeatherIcon from "@/assets/images/icon-sunny.webp"
import { useEffect, useState } from "react";

export function WeatherInfoContainer() {

    return (
        <div className="flex flex-col w-[343px] md:w-[720px] lg:w-[800px] gap-5 lg:gap-y-8">
            <WeatherInfo />
            <WeatherDetailsContainer />
        </div>
    )
}


function WeatherInfo() {
    const [bg, setBg] = useState(Bg_today_small);

    useEffect(() => {
        const updateBg = () => {
            setBg(window.innerWidth >= 768 ? Bg_today_large : Bg_today_small);
        };

        updateBg();
        window.addEventListener("resize", updateBg);
        return () => window.removeEventListener("resize", updateBg);
    }, []);

    return (
        <div className=" flex flex-col md:flex-row justify-center items-center md:justify-start w-[343px] md:w-[720px] lg:w-full  h-[286px] gap-y-4 md:gap-0 px-6 py-20  rounded-20
            bg-cover bg-center bg-no-repeat
        "
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className=" flex flex-col h-[68px] gap-3  md:w-[380px] lg:w-[460px] ">
                <span className="text-preset-4">Berlin, Germany</span>
                <span className="text-preset-6">Tuesday, Aug 5, 2025</span>
            </div>
            <div className="flex flex-row gap-5">
                <img src={WeatherIcon} alt="weather icon" className="h-[120px] w-[120px]" />
                <span className="text-preset-1">68°</span>
            </div>
        </div>
    )

}

function WeatherDetailsContainer() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 lg:gap-x-6">
            <DetailContainer label="Feels Like" value={64} measure="°" />
            <DetailContainer label="Humidity" value={46} measure="%" />
            <DetailContainer label="Wind" value={9} measure=" mph" />
            <DetailContainer label="Precipitation" value={0} measure=" in" />
        </div>
    )
}

type DetailContainerProps = {
    label: string,
    value: number,
    measure: string,
}

function DetailContainer({ label, value, measure }: DetailContainerProps) {

    return (
        <div className="flex flex-col w-[163.5px] md:w-[165px] lg:w-[182px] h-[118px] gap-6 p-5 bg-neutral-800 rounded-12">
            <span className="text-preset-6">{label}</span>
            <span className="text-preset-3">{value.toString()}{measure}</span>
        </div>
    )
}