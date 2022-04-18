console.log("WEATHER STATION!!");

let getStations = document.querySelector("#getStations");
let tableRoot = document.getElementById("tableRoot");


var base_uri = "https://w1.weather.gov/xml/current_obs/index.xml";
req = new XMLHttpRequest();

req.open("GET", base_uri, true);
req.setRequestHeader("Accept",
    "text / html, application / xhtml + xml, application / xml; q = 0.9,*/*;q=0.8");
req.onreadystatechange = getStationsCallback;
req.send();

let stationsList = [];

function processXML(xmlDoc) {
    let stationsXML = xmlDoc.getElementsByTagName("station");

    for (x = 0; x < stationsXML.length; x++) {

        // Create the parallel object list.
        let station_idXML = stationsXML[x].getElementsByTagName("station_id")[0].innerHTML;
        let stateXML = stationsXML[x].getElementsByTagName("state")[0].innerHTML;
        let station_nameXML = stationsXML[x].getElementsByTagName("station_name")[0].innerHTML;
        let latitudeXML = stationsXML[x].getElementsByTagName("latitude")[0].innerHTML;
        let longitudeXML = stationsXML[x].getElementsByTagName("longitude")[0].innerHTML;
        let xml_urlXML = stationsXML[x].getElementsByTagName("xml_url")[0].innerHTML;

        let station = {
            stationid: station_idXML,
            state: stateXML,
            stationName: station_nameXML,
            latitude: latitudeXML,
            longitude: longitudeXML,
            xmlURL: xml_urlXML
        };
        stationsList.push(station);
    }
}

function getStationsCallback() {
    if (this.readyState == 4 && this.status == 200) {
        processXML(req.responseXML);
    }
}

console.log(stationsList);

function displayStationTable(stationsList, divAttach) {
    
    divAttach.innerHTML = ""; // remove previous search
    let uTable = document.createElement("table");
    createTableHeader(uTable);
    divAttach.appendChild(uTable);

    for (x = 0; x < stationsList.length; x++) {
        createTableRow(uTable,
            stationsList[x].stationid,
            stationsList[x].stationName,
            stationsList[x].state,
            stationsList[x].latitude,
            stationsList[x].longitude);
    }
}



function createTableHeader(tblArg) {
    let hdrRow = tblArg.insertRow();
    let cellStationId = hdrRow.insertCell();
    cellStationId.appendChild(document.createTextNode("Station Id"));
    hdrRow.appendChild(cellStationId)

    let cellStationName = hdrRow.insertCell();
    cellStationName.appendChild(document.createTextNode("Station Name"));
    hdrRow.appendChild(cellStationName);

    let cellStationLat = hdrRow.insertCell();
    cellStationLat.appendChild(document.createTextNode("Latitude"));
    hdrRow.appendChild(cellStationLat);

    let cellStationLong = hdrRow.insertCell();
    cellStationLong.appendChild(document.createTextNode("Longitude"));
    hdrRow.appendChild(cellStationLong);

    let cellStationState = hdrRow.insertCell();
    cellStationState.appendChild(document.createTextNode("State"));
    hdrRow.appendChild(cellStationState);
}

function createTableRow(tblArg, stationIdArg, stationNameArg, stationStateArg, lat, long ) {
    let curRow = tblArg.insertRow();

    let cellStationId = curRow.insertCell();
    cellStationId.appendChild(document.createTextNode(stationIdArg));
    curRow.appendChild(cellStationId);

    let cellStationName = curRow.insertCell();
    cellStationName.appendChild(document.createTextNode(stationNameArg));
    curRow.appendChild(cellStationName);


    let cellStationLat = curRow.insertCell();
    cellStationLat.appendChild(document.createTextNode(lat));
    curRow.appendChild(cellStationLat);

    let cellStationLong = curRow.insertCell();
    cellStationLong.appendChild(document.createTextNode(long));
    curRow.appendChild(cellStationLong);

    let cellStationState = curRow.insertCell();
    cellStationState.appendChild(document.createTextNode(stationStateArg));
    curRow.appendChild(cellStationState);
}

getStations.addEventListener("click",function(){
    let selStates = document.getElementById("selStates").value;
    console.log(selStates);
    let newList = getStationsByState(selStates);
    displayStationTable(newList,tableRoot);

});

function getStationsByState(state) {
    let returnList = null;
    returnList = stationsList.filter(
        function (o) { return o.state == state });
    return (returnList);
}