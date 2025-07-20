export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        console.log("ejecutandose")
        
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
                reject(err);
            },
            options
        );
    });
};
