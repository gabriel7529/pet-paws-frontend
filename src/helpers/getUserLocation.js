export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        // Opciones para mejorar la precisión
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0 
        };

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                resolve([longitude, latitude]);
            },
            (err) => {
                console.error('Error obteniendo la geolocalización', err);
                reject(err); // Rechazar la promesa con el error
            },
            options // Pasa las opciones al método
        );
    });
};
