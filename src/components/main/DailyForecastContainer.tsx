import WeatherSunnyIcon from "@/assets/images/icon-sunny.webp"
export function DailyForecastContainer() {

    return (
        <div className="flex flex-col gap-y-5">
            <span className="text-preset-5">Daily forecast</span>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                <WeatherCard day="Tue" />
                <WeatherCard day="Wed" />
                <WeatherCard day="Thu" />
                <WeatherCard day="Fri" />
                <WeatherCard day="Sat" />
                <WeatherCard day="Sun" />
                <WeatherCard day="Mon" />
            </div>
        </div>
    )
}

type WeatherCardProps = {
    day: string,
}
function WeatherCard({ day }: WeatherCardProps) {

    return (
        <div className="flex flex-col w-[103.66px] md:w-[89.14px] lg:w-[100.57px] h-[165px] items-center gap-y-4 px-2.5 py-4 bg-neutral-800 rounded-12">
            <span className="text-preset-6">{day}</span>
            <img className="h-15 w-15" src={WeatherSunnyIcon} alt="weather icon" />
            <div className="flex justify-between w-full">
                <span className="text-preset-7">68°</span>
                <span className="text-preset-7">57°</span>
            </div>
        </div>
    )
}