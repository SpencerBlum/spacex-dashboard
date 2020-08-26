import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  return (
      <div>
    <ComposableMap projection="geoAlbers">
        <ZoomableGroup zoom = {1}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#DDD"
              stroke="#FFF"
            />
          ))
        }
      </Geographies>
      <Marker coordinates={[-120.5724, 34.7420]}>
        <circle r={12} fill="#F53" />
      </Marker>
      <Marker coordinates={[-80.6077, 28.3922]}>
        <circle r={12} fill="#F53" />
      </Marker>
      <Marker coordinates={[-97.1111, 25.5915]}>
        <circle r={12} fill="#F53" />
      </Marker>
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

export default MapChart;