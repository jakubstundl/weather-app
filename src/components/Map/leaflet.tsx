import Head from "next/head";

import Map from "@/components/Map";

import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function CityWeatherMap({
  coords,
  layer,
}: {
  coords: { x: number; y: number };
  layer: string;
}) {
  const DEFAULT_CENTER = [coords.x, coords.y];
  return (
    <>
      <Map width="400" height="400" center={DEFAULT_CENTER} zoom={10}>
        {({
          TileLayer,
          Marker,
          Popup,
        }: {
          TileLayer: any;
          Marker: any;
          Popup: any;
        }) => (
          <>
             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <TileLayer
              url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=84fe0ab7b8e1da2d85374181442b3639`}
            /> 
            {/* <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker> */}
          </>
        )}
      </Map>
    </>
  );
}
