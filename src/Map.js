import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);

        this.platform = null;
        this.map = null;

        this.state = {
            app_id: props.app_id,
            app_code: props.app_code,
            center: {
                lat: props.lat,
                lng: props.lng,
            },
            zoom: props.zoom,
            map: null,
            theme: props.theme,
            style: props.style,
        }
    }

    getPlatform() {
        return new window.H.service.Platform(this.state);
    }

    getMap(container, layers, settings) {
        return new window.H.Map(container, layers, settings);
    }

    getEvents(map) {
        return new window.H.mapevents.MapEvents(map);
    }

    getBehavior(events) {
        return new window.H.mapevents.Behavior(events);
    }

    getUI(map, layers) {
        return new window.H.ui.UI.createDefault(map, layers);
    }

    componentDidMount() {
        this.platform = this.getPlatform();

        var layers = this.platform.createDefaultLayers();
        var element = document.getElementById('here-map');
        this.map = this.getMap(element, layers.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
        });
        
        var svgMarkup = '<svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z" fill="red" transform="translate(0 1028.4)"/><path d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z" fill="#FFF" transform="translate(0 1028.4)"/></g></svg>';

    
        const totData = fetch('/latlng.json') // Call the fetch function passing the url of the API as a parameter
        .then((data)=> {
            return data.json();
        }).catch(function(error) {
            console.log(error);
            // This is where you run code if the server returns any errors
        });
        
        totData.then((datas)=> {
            console.log(datas);
            this.map.setCenter({lat: 20.5937, lng: 78.9629 });  // India Center Place Lat Lng
            for(let i=0;i<datas.length;i++) {
                let icon = new window.H.map.Icon(svgMarkup),
                coords = {lat: datas[i].lat, lng: datas[i].lng },
                marker = new window.H.map.Marker(coords, {icon: icon});
                this.map.addObject(marker);
                //this.map.setCenter(coords);
            }
            var events = this.getEvents(this.map);
            // eslint-disable-next-line
            var behavior = this.getBehavior(events);
            // eslint-disable-next-line
            var ui = this.getUI(this.map, layers);
        });
    }

    shouldComponentUpdate(props, state) {
        this.changeTheme(props.theme, props.style);
        return false;
    }

    render() {
        return (
            <div id="here-map" style={{width: '100%', height: '650px', background: 'grey' }} />
        );
    }
}

export default Map;