import WeatherIcon from "@/assets/images/icon-sunny.webp"

export function WeatherInfoContainer() {

    return (
        <div className="flex flex-col gap-y-5 xl:gap-y-8">
            <WeatherInfo />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetail label="Feels Like" value={64} measure="°" />
                <WeatherDetail label="Humidity" value={46} measure="%" />
                <WeatherDetail label="Wind" value={9} measure=" mph" />
                <WeatherDetail label="Precipitation" value={0} measure=" in" />
            </div>
        </div>
    )
}


function WeatherInfo() {

    return (
        <div className="flex flex-col justify-between items-center md:flex-row gap-y-4 md:gap-0 px-6 py-10 rounded-20 bg-today-small md:bg-today-large h-71.5">
            <div className=" flex flex-col gap-y-3">
                <span className="text-preset-4">Berlin, Germany</span>
                <span className="text-preset-6">Tuesday, Aug 5, 2025</span>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
                <img src={WeatherIcon} alt="weather icon" className="h-30 w-30" />
                <span className="text-preset-1">68°</span>
            </div>
        </div>
    )

}

type DetailContainerProps = {
    label: string,
    value: number,
    measure: string,
}

function WeatherDetail({ label, value, measure }: DetailContainerProps) {

    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border">
            <span className="text-preset-6">{label}</span>
            <span className="text-preset-3">{value.toString()}{measure}</span>
        </div>
    )
}