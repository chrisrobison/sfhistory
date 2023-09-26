(function() {
    const $ = str => document.querySelector(str);
    const $$ = str => document.querySelectorAll(str);

    let app = {
        data: {
            themes: {
                "20th Century":"#990",
                "Alta California":"#80c",
                "Anza Expedition":"#0c8",
                "Authors":"#c80",
                "Business":"#08c",
                "Civil War":"#00a",
                "Explorers":"#0a0",
                "Mayors":"#060",
                "Mexican-Am. War":"#600",
                "Military": "#0aa",
                "Pioneers/Gold Rush": "#a0a",
                "Politicians": "#aa0"
            },
            basemaps: {
                 "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' }) ,
                 "Stadia Alidade Smooth": L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', { maxZoom: 20, attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' }) ,
                 "Stadia Alidade Smooth Dark": L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { maxZoom: 20, attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' }) ,
                 "Spinal Map": L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', { attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', apikey: '9ec2826e615f4f09999da5f2e730dd4a', maxZoom: 22 }) ,
                 "Thunderforest Pioneer": L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', { attribution:'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', apikey: '9ec2826e615f4f09999da5f2e730dd4a', maxZoom: 22 }),
                 "Stamen Toner": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains: 'abcd', minZoom: 0, maxZoom: 20, ext: 'png' }) ,
                 "Stamen Toner Light": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains: 'abcd', minZoom: 0, maxZoom: 20, ext: 'png' }) ,
                 "Stamen Watercolor": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains: 'abcd', minZoom: 1, maxZoom: 16, ext: 'jpg' }) ,
                 "Stamen Terrain": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', { attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', subdomains: 'abcd', minZoom: 0, maxZoom: 18, ext: 'png' }) ,
                 "Esri World Street Map": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012' }) 

            }
        },
        state: {
            loaded: false,
            polylines: [],
            tooltips: [],
            markup: [],
            popupOpen: false,
            layers: [],
            pins: [],
            markups: [],
            baseMaps: {},
            overlayMaps: {}
        },
        setupMap: function() {
            app.state.layers.push(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '' })); // .addTo(map);
            app.state.layers.push(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}));
            app.state.baseMaps = { "OpenstreetMap": app.state.layers[0], "ArcGIS": app.state.layers[1] };

            // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '' })).addTo(map);
            let map = L.map($(`#map`), {
                center: [37.8437122, -122.3491274],
                zoom: 10,
                zoomControl: true,
                fadeAnimation: true,
                zoomAnimation: true,
                layers: [app.state.layers[1]]
            });
            app.state.map = map;
            map.on("popupopen", app.popupOpen);
            app.state.layerControl = L.control.layers(app.state.baseMaps, app.state.overlayMaps).addTo(map);

            let maps = Object.keys(app.data.basemaps);
            maps.forEach(basemap=>{
                app.state.layerControl.addBaseLayer(app.data.basemaps[basemap], basemap);
            });

            return map;
        },
        popupOpen: function(evt) {
            console.log("popupOpen");
            console.dir(evt);
        },
        init: function() {
            let map = app.setupMap();
            fetch("sf-street-history.json").then(r => r.json()).then(data => {
                app.data = data;
                app.setupStreets(map);
                //app.setupPeople();
                app.setupHoods();
            });
            
            fetch("newlandmarks.json").then(r => r.json()).then(data => {
                app.state.landmarks = data;
                app.setupLandmarks();
            });
            fetch("sf-bars.json").then(r => r.json()).then(data => {
                app.data.bars = data;
                app.setupBars();
            });
        },
        showtab: function(tab) {
            $("a.selected").classList.remove("selected");
            $(`#${tab}Tab`).classList.add("selected");
            $(".viewing").classList.remove("viewing");
            $(`#${tab}`).classList.add("viewing");
        },
        setupBars: function() {
            let bars = app.data.bars;

            let keys = Object.keys(bars);
            let arr = [];
            keys.forEach(key=>{
                arr.push(bars[key]);
            });

            arr = arr.sort((a, b) => { return (a.name < b.name) ? - 1 : ((a > b) ? 1 : 0 ) });
            let barMarkers = [];
            let barPopups = [];
            arr.forEach(item=>{
                let bar = item;
                let markup = document.createElement("details");
                markup.title = `${bar.name}`;
                let desc = (bar.desc) ? `<p>${bar.desc}</p>` : '';
                let img = (bar.image) ? `<img src="img/${bar.image}">` : '';
                let hasimg = (bar.image) ? "*" : "";
                let link = (bar.link) ? `<p><a href="${bar.link}" target="_blank">More info...</a></p>` : '';
                let addr = (bar.address) ? `<p>${bar.address}</p>` : '';
                markup.innerHTML = `<summary>${bar.name}${hasimg}<\/summary>${img}${desc}${addr}${link}`;

                $("#bars").append(markup);
                let marker = L.marker([bar.lat, bar.lng], { title: bar.name });
                let popup = marker.bindPopup(`<summary>${bar.name}${hasimg}<\/summary>${img}${desc}${addr}${link}`);
                barMarkers.push(marker);
                marker.onclick = function(e) { app.state.barMarkers.forEach((mark, idx) => {
                    if (mark.options.title == e.target.title) mark.openPopup(); }); };

            });
            app.state.barMarkers = L.layerGroup(barMarkers);
            app.state.layerControl.addOverlay(app.state.barMarkers, "Bars");
        },
        setupHoods: function() {
            let hoods = app.data.neighborhoods;

            let keys = Object.keys(hoods);
            let arr = [];
            keys.forEach(key=>{
                arr.push(hoods[key]);
            });

            arr = arr.sort((a, b) => { return (a.name < b.name) ? - 1 : ((a > b) ? 1 : 0 ) });
            
            arr.forEach(item=>{
                let hood  = item;
                let markup = document.createElement("details");
                let desc = (hood.history) ? `<p>${hood.history}</p>` : '';
                let img = (hood.image) ? `<img src="img/${hood.image}">` : '';
                let hasimg = (hood.image) ? "*" : "";
                let link = (hood.link) ? `<p><a href="${hood.link}" target="_blank">More info...</a></p>` : '';
                markup.innerHTML = `<summary>${hood.name}${hasimg}<\/summary>${img}${desc}${link}`;
                $("#hoods").append(markup);
            });

        },
        getWiki: async function(topic) {
            topic = topic.replace(/\W/, '_');
            let resp = await fetch(`wiki.php?q=${topic}`);
            let data  = await resp.json();
            return data;
        },
        setupLandmarks: async function() {
            let arr = app.state.landmarks;

            arr = arr.sort((a, b) => { return (a.name < b.name) ? - 1 : ((a > b) ? 1 : 0 ) });
            let newarr = [], seen = [];
            let fgroup = L.featureGroup().addTo(app.state.map);
            console.log("setting up landmarks");
            for (const item of arr) {
                console.dir(item);
                let landmark = item;
                let markup = document.createElement("details");
                let addr = (landmark.address) ? `<p>${landmark.address}</p>` : '';
                console.log("date: " + landmark.date);
                let year = (landmark.date) ? `<p>Date: ${landmark.date}</p>` : '';
                let wiki = (landmark.wiki) ? `<p>${landmark.wiki}</p>` : '';
                let img = (landmark.image) ? `<img src="${landmark.image}">` : '';
                let link = (landmark.link) ? `<p><a href="${landmark.link}" target="_blank">More info...</a></p>` : '';
                if (landmark.coord && typeof(landmark.coord)=="string") {
                    let latlon = landmark.coord.split(/\;/);
                    console.log(`latlon: ${latlon}`);
                    landmark.coord = [latlon[1], latlon[0]];
                }
                if (landmark.coord) {
                    let pin = L.marker([landmark.coord[1],landmark.coord[0]]);
                    let markpop = L.popup().setContent(`<h1>${landmark.name}<\/h1>${addr}${img}<div class="history">${wiki}</div><p>${link}<\/p><br clear="both">`);
                    pin.bindPopup(markpop);
                    fgroup.addLayer(pin);
               
                    app.state.pins.push(pin);
                    let hasimg = (landmark.wiki) ? "*" : "";
                    markup.innerHTML = `<summary>${landmark.name}${hasimg}<\/summary>${img}<p>${wiki}</p><div class='detail'>${addr}${year}${link}</div>`;
                    markup.onclick = function(evt) {
                        // pin.setStyle({ color: "#f0f" });
                        app.state.map.flyToBounds(pin.getBounds());
                        pin.openPopup();
                        console.dir(evt);
                    };
                    markup.onmouseover = function(evt) {
                        pin.setStyle({color: "#ff0000"});
                    };
                    markup.onmouseout = function(evt) {
                        pin.setStyle({color: "#3388ff"});
                    };
                    app.state.markups.push(markup);
                }
                $("#landmarks").append(markup);
            }
            app.state.layers['landmarks'] = fgroup;
            app.state.layerControl.addOverlay(app.state.layers['landmarks'], "Landmarks");
        },
        setupPeople: function() {
            let people = app.data.entities;

            let keys = Object.keys(people);
            let arr = [];
            keys.forEach(key=>{
                arr.push(people[key]);
            });

            arr = arr.sort((a, b) => { return (a.name < b.name) ? - 1 : ((a > b) ? 1 : 0 ) });

            arr.forEach(item=>{
                let person  = item;
                let markup = document.createElement("details");
                let desc = (person.desc) ? `<p>${person.desc}</p>` : '';
                let img = (person.image) ? `<img src="img/${person.image}">` : '';
                let hasimg = (person.image) ? "*" : "";
                let link = (person.link) ? `<p><a href="${person.link}" target="_blank">More info...</a></p>` : '';
                markup.innerHTML = `<summary>${person.name}${hasimg}<\/summary>${img}${desc}${link}`;
                $("#people").append(markup);
            });
        },
        setupStreets: function(map) {
            let keys = Object.keys(app.data.streets);
            console.log("street indexes:");
            console.dir(keys);
            let streets = L.featureGroup();
            let bounds = [];
            let html = "";
            let arr = keys.map(function(k) {
                return app.data.streets[k];
            });
            arr = arr.sort((a, b) => {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ?
                    -1 : 0);
            });
            arr.forEach(str => {
                //let str = app.data.streets[key];
                let img = '';
                if (app.data.entities[str.entityIds] && app.data
                    .entities[str.entityIds].image) {
                    img =
                        `<img style='float:left;' src='img/${app.data.entities[str.entityIds].image}'>`;
                }
                let desc = (str.entityIds && app.data.entities[
                        str.entityIds] && app.data.entities[
                        str.entityIds].desc) ?
                    `<p>${app.data.entities[str.entityIds].desc}<\/p>` :
                    '';
                let person = (app.data.entities[str.entityIds] &&
                        app.data.entities[str.entityIds].name
                    ) ?
                    `<h2>${app.data.entities[str.entityIds].name}<\/h2>` :
                    '';
                let poly = L.polyline(str.polyline).bindPopup(`<h1>${str.name}<\/h1>${person}${img}<p>${str.history}<\/p>${desc}<br clear="both">`);
                let markup = document.createElement('details');
                let history = (str.history) ?
                    `<p>${str.history}<\/p>` : '';
                let hasimg = (img) ? "*" : "";
                markup.innerHTML =
                    `<summary>${str.name}${hasimg}<\/summary>${img}${history}${desc}`;
                markup.onclick = function(evt) {
                    poly.setStyle({
                        color: "#f0f"
                    });
                    app.state.map.flyToBounds(poly.getBounds());
                    poly.openPopup();
                    console.dir(evt);
                };
                markup.onmouseover = function(evt) {
                    poly.setStyle({color: "#ff0000"});
                };
                markup.onmouseout = function(evt) {
                    poly.setStyle({color: "#3388ff"});
                };
                /* markup.onmouseout = function(evt) {
                    poly.setStyle({color: "#3388ff"});
                    // poly.closePopup();
                    console.dir(evt);
                };
                */
                $("#streets").append(markup);
                app.state.markup.push(markup);

                poly.on('mouseover', function(e) {
                    if (!app.state.popupOpen) {
                        e.target.setStyle({
                            color: "#f00"
                        });
                    }
                });
                poly.on('mouseout', function(e) {
                    if (!app.state.popupOpen) {
                        e.target.setStyle({
                            color: "#3388ff"
                        });
                    }
                });
                poly.on('popupopen', function(e) {
                    app.state.popupOpen = true;
                    e.target.setStyle({
                        color: "#f00"
                    });
                });
                poly.on('popupclose', function(e) {
                    app.state.popupOpen = false;
                    e.target.setStyle({
                        color: "#3388ff"
                    });
                });
                let tooltip = poly.bindTooltip(`${str.name}`)
                    .addTo(map);
                bounds.push(str.polyline);
                poly.addTo(streets);

                app.state.polylines.push(poly);
                app.state.tooltips.push(poly);
            });
            // $("nav").innerHTML = html;
            streets.addTo(map);
            app.state.layers['streets'] = streets;
            app.state.layerControl.addOverlay(app.state.layers['streets'], "Streets");

            map.fitBounds(bounds);
        },
        fetch: function(url, callback) {
            fetch(url).then(response => response.json()).then(data => {
                app.data = data;
                app.state.loaded = true;
                if (callback && typeof(callback) ===
                    "function") {
                    callback(data);
                }
            });
        },
        display: function(data, tgt) {
            let out = "<table><thead><tr>";
            const keys = Object.keys(data[0]);
            if (keys) {
                keys.forEach(key => {
                    out += `<th>${key}</th>`;
                });
            }
            out += "</tr></thead><tbody>";
            data.forEach(item => {
                out += `<tr>`;
                keys.forEach(key => {
                    out += `<td>${item[i]}</td>`;
                });
                out += `</tr>`;
            });
            out += "</tbody></table>";

            if (tgt) {
                tgt.innerHTML = out;
            }
            return out;
        }
    }
    window.app = app;
    app.init();
})();

