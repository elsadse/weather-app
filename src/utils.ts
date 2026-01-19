import type { Position } from "@/type";

export async function getUserPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
            },
            (error) => {
                let message = "Erreur lors de la récupération de la position.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = "L'utilisateur a refusé la géolocalisation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = "Informations de position indisponibles.";
                        break;
                    case error.TIMEOUT:
                        message = "La requête a expiré.";
                        break;
                }
                reject(new Error(message));
            },
        )
    })
}
