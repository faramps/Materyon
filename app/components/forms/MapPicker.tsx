"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Props {
  onSelectLocation: (val: { lat: number; lng: number }) => void;
}



export default function MapPicker({ onSelectLocation }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [32.85, 39.92],
      zoom: 5,
      cooperativeGestures: true,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl,
      placeholder: "Konum ara…",
    });

    map.current.addControl(geocoder);

    geocoder.on("result", (e: any) => {
      const [lng, lat] = e.result.center;

      map.current?.flyTo({ center: [lng, lat], zoom: 13 });

      if (markerRef.current) markerRef.current.remove();

      markerRef.current = new mapboxgl.Marker({ color: "#ff4444" })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      onSelectLocation({ lat, lng });
    });

    map.current.on("click", (e: mapboxgl.MapMouseEvent) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;

      if (markerRef.current) markerRef.current.remove();

      markerRef.current = new mapboxgl.Marker({ color: "#ff4444" })
        .setLngLat([lng, lat])
        .addTo(map.current!);

      onSelectLocation({ lat, lng });
    });
  }, []);

  return (
    <div className="space-y-2">
      <div
        ref={mapContainer}
        className="w-full h-80 rounded-xl overflow-hidden border shadow"
      />
    </div>
  );
}
