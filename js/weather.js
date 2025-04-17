async function fetchWeather() 
{

    let weatherElement = document.getElementById('weatherStuff');

    //Initialize json
    //let jsonData = await fetch('https://wttr.in/Hanover?format=j1');
    //let jsonText = await jsonData.text();

    weatherElement.innerHTML = '<strong>HELLO</strong>';
    
    
}

function createObjFromJson(jsonObject) {
    let geoObject = new GeometryObject;
    let objects = [];
    geoObject.drawMode = jsonObject.drawMode;
    let i = 0;
    for (let value of jsonObject.objects) {
        if (value.type == "square") {
            objects[i] = new SquareObject();
            objects[i].create(value.vertices);
            geoObject.add(objects[i]);
            i++;
        }
    }
    if (geoObject.drawMode == "TRIANGLES") {
        geoObject.indexArray = indexTriStripe(geoObject.vertCoordinates, true);
    } else if (geoObject.drawMode == "TRIANGLE_STRIP") {
        geoObject.indexArray = indexTriStripe(geoObject.vertCoordinates, true);
    } else {
        console.log(geoObject.drawMode);
        throw new Error("Other DrawModes Not supported yet");
    }

    return geoObject;
}
