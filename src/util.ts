
export const icons = {
    veryCold: '/src/assets/images/icon-fog.webp',  
    cold: '/src/assets/images/icon-snow.webp',         
    cool: '/src/assets/images/icon-rain.webp',         
    mild: '/src/assets/images/icon-storm.webp',          
    warm: '/src/assets/images/icon-sunny.webp',          
    hot: '/src/assets/images/icon-sunny.webp',           
    veryHot: '/src/assets/images/icon-sunny.webp',      
}

export function getIconTemperature(temp: number): string {
    if (temp <= 0) return icons.veryCold;
    if (temp <= 10) return icons.cold;
    if (temp <= 18) return icons.cool;
    if (temp <= 24) return icons.mild;
    if (temp <= 30) return icons.warm;
    if (temp <= 35) return icons.hot;
    return icons.hot

}

export const celsiusToFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32;
export const kmhToMph = (kmh: number) => kmh * 0.621371;
export const mmToInch = (mm: number) => mm / 25.4;