"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FiNavigation } from "react-icons/fi";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapDetail({
  location,
}: {
  location: { lat: number; lng: number };
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.lng, location.lat],
      zoom: 12,
      attributionControl: false,
    });

    mapRef.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left"
    );

    new mapboxgl.Marker({ color: "#3b82f6" })
      .setLngLat([location.lng, location.lat])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-700">
      <div ref={mapContainer} className="w-full h-full" />

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
      >
        <FiNavigation size={16} />
        Yol Tarifi
      </a>
    </div>
  );
}
