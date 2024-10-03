const lokasjoner = [
    { name: "Steinkjer, Norway", latitude: 64.04, longitude: 11.51 },
    { name: "Bergen, Norway", latitude: 60.39, longitude: 5.32 },
    { name: "New York, USA", latitude: 40.73, longitude: -73.93 },
    { name: "Melbourne, Australia", latitude: -37.84, longitude: 144.94 },
    { name: "Liverpool, England", latitude: 53.40, longitude: -2.98 },
    { name: "Paris, France", latitude: 48.86, longitude: 2.34 },
];


function fetchVaer() {
    const vaerVisning = document.getElementById('vaer-visning');
    vaerVisning.innerHTML = '';

    const vaerLov = lokasjoner.map(lokasjon => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lokasjon.latitude}&longitude=${lokasjon.longitude}&current_weather=true`;

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Feil! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => ({
                location: lokasjon.name,
                weather: data.current_weather
            }))
            .catch(error => {
                console.error(`Feil under henting av vær for ${lokasjon.name}:`, error);
                return null; 
            });
    });

    Promise.all(vaerLov)
        .then(results => {
            results.filter(result => result !== null).forEach(result => {
                const vaerTekst = document.createElement('div');
                vaerTekst.classList.add('vaer-tekst');
                vaerTekst.innerHTML = `
                    <h3>${result.location}</h3>
                    <p>Temperatur: ${result.weather.temperature}°C</p>
                    <p>Vind Hastighet: ${result.weather.windspeed} km/t</p>
                    <p>Vind Retning: ${result.weather.winddirection}°</p>
                `;
                vaerVisning.appendChild(vaerTekst);
            });
        });
}

window.onload = fetchVaer;
setInterval(fetchVaer, 30000);