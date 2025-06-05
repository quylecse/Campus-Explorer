document.addEventListener("DOMContentLoaded", () => {
    const buildings = [
        {
            id: "building-a",
            name: "Gebäude A",
            description: "Gebäude A ist das zentrale Gebäude mit dem Haupteingang des Campus. Hier findest du den Audimax (den größten Hörsaal) und die Aula, in der manchmal Veranstaltungen stattfinden. Viele Prüfungen werden ebenfalls in Gebäude A geschrieben.",
            image: "img/gebaeude_a.jpg",
            top: "30%",
            left: "38%"
        },
        {
            id: "building-k",
            name: "Gebäude K",
            description: "Gebäude K ist die Bibliothek des Campus. Viele Studierende kommen hierher, um in Ruhe zu lernen, an Projekten zu arbeiten oder einfach ein bisschen zu entspannen. Egal ob du Bücher brauchst, einen ruhigen Platz zum Lesen suchst oder mit deinem Laptop arbeiten willst.",
            image: "img/gebaeude_k.jpg",
            top: "52%",
            left: "24%"
        },
        {
            id: "building-h",
            name: "Gebäude H",
            description: "Gebäude H liegt direkt in der Nähe von der Mensa. Die meisten Veranstaltungen und Vorlesungen für Studiengänge aus der Fakultät IV finden hier statt. Wenn du also z. B. BWL oder Informatik studierst, wirst du wahrscheinlich oft in Gebäude H sein.",
            image: "img/gebaeude_h.jpg",
            top: "73%",
            left: "54.5%"
        }
    ];


    //interaktive Bereiche erzeugen
    const mapWrapper = document.querySelector(".map-wrapper");


    //Info-Box
    const infoBox = document.createElement("div");
    infoBox.id = "info-box";
    document.body.appendChild(infoBox);

    //Hotspots auf dem Bild
    buildings.forEach((building, index) => {
        const hotspot = document.createElement("div");
        hotspot.classList.add("hotspot");
        hotspot.style.top = building.top;
        hotspot.style.left = building.left;
        hotspot.title = building.name;

        //Informationen zum Gebäude, wenn man klickt
        hotspot.addEventListener("click", () => {
            infoBox.innerHTML = `
              <h2>${building.name}</h2>
              <p>${building.description}</p>
              <img src="${building.image}" alt="${building.name}">
              <button id="close-box">Schließen</button>
          `;
            infoBox.style.display = "block";
        });

        //Hotspot Style
        hotspot.style.position = "absolute";
        hotspot.style.width = "3%";
        hotspot.style.height = "4%";
        hotspot.style.backgroundColor = "rgba(240, 73, 7, 0.56)";
        hotspot.style.borderRadius = "50%";
        hotspot.style.cursor = "pointer";

        mapWrapper.appendChild(hotspot);
    });

    // Schließen der Infobox
    document.body.addEventListener("click", (e) => {
        if (e.target.id === "close-box") {
            infoBox.style.display = "none";
        }
    });
});

"use strict";

async function init() {

    fetchWeather();

}

window.onload = init;