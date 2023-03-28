import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

export default function Map() {
  const mapEl = useRef(null);
  useEffect(() => {
    let view;

    loadModules(
      ["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"],
      {
        css: true,
      }
    ).then(([MapView, WebMap, GeoJSONLayer]) => {
      const webMap = new WebMap({
        basemap: "topo-vector",
      });
      view = new MapView({
        map: webMap,
        // center: [482],
        // zoom: 5,
        // untuk ntt
        center: [485, -10],
        zoom: 7,
        // use ref as container
        container: mapEl.current,
      });
      // geojson untuk ntt
      const geoJson = new GeoJSONLayer({
        url: "http://programsatujutarumah.pu.go.id/leaflet/geojson/NTT.geojson",
      });
      //   const geoJson = new GeoJSONLayer({
      //     url: "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json",
      //   });
      webMap.add(geoJson);
    });

    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  }, []);

  return <div style={{ height: 800, color: "blueviolet" }} ref={mapEl}></div>;
}
