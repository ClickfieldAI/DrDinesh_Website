"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { consultationHref } from "@/config/navigation";
import type { ConsultationLocation } from "@/config/locations";

interface LocationsMapProps {
  locations: ConsultationLocation[];
}

/**
 * Minimal structural typing for the subset of Leaflet's API used here.
 * Leaflet is intentionally loaded from a CDN (see loadLeaflet below)
 * rather than as an npm dependency, so no @types/leaflet package is
 * installed either — these are just enough shapes to keep this file
 * type-safe without pulling in the real library's types.
 */
interface LeafletLatLng {
  lat: number;
  lng: number;
}
interface LeafletBounds {
  extend(latlng: [number, number]): void;
  isValid(): boolean;
}
interface LeafletMarker {
  addTo(map: LeafletMap): LeafletMarker;
  bindPopup(html: string): LeafletMarker;
  openPopup(): LeafletMarker;
  on(event: string, handler: () => void): LeafletMarker;
  getLatLng(): LeafletLatLng;
}
interface LeafletTileLayer {
  addTo(map: LeafletMap): LeafletTileLayer;
}
interface LeafletMap {
  remove(): void;
  fitBounds(bounds: LeafletBounds, options?: { padding?: [number, number]; maxZoom?: number }): void;
  panTo(latlng: LeafletLatLng, options?: { animate?: boolean }): void;
}
interface LeafletDivIcon {
  __leafletDivIcon: true;
}
interface LeafletStatic {
  map(el: HTMLElement, options?: { scrollWheelZoom?: boolean }): LeafletMap;
  tileLayer(url: string, options?: { attribution?: string; maxZoom?: number }): LeafletTileLayer;
  marker(latlng: [number, number], options?: { icon?: LeafletDivIcon; title?: string }): LeafletMarker;
  divIcon(options: { className: string; html: string; iconSize: [number, number]; iconAnchor: [number, number]; popupAnchor: [number, number] }): LeafletDivIcon;
  latLngBounds(initial: [number, number][]): LeafletBounds;
}

declare global {
  interface Window {
    L?: LeafletStatic;
  }
}

const LEAFLET_CSS_HREF = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

let leafletLoadPromise: Promise<void> | null = null;

/**
 * Loads Leaflet from a CDN once per page (no npm dependency — keeps the
 * project's existing dependency surface untouched, per the client's "avoid
 * unnecessary dependencies" request). Safe to call from multiple mounts.
 */
function loadLeaflet(): Promise<void> {
  if (window.L) return Promise.resolve();
  if (leafletLoadPromise) return leafletLoadPromise;

  leafletLoadPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS_HREF;
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS_SRC}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Leaflet")));
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_JS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Leaflet"));
    document.head.appendChild(script);
  });

  return leafletLoadPromise;
}

/**
 * Interactive Chennai map with the four consultation locations. Built on
 * Leaflet + OpenStreetMap tiles (free, no API key) loaded from a CDN so no
 * new npm dependency is introduced. A synced list below/beside the map
 * lets a visitor select a location either by clicking its marker or its
 * list entry; both stay in sync.
 */
export function LocationsMap({ locations: items }: LocationsMapProps): React.ReactElement {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<globalThis.Map<string, LeafletMarker>>(new globalThis.Map());
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then(() => {
        if (cancelled || !mapContainerRef.current || mapRef.current) return;
        const L = window.L;
        if (!L) {
          setMapError(true);
          return;
        }

        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: false,
        });
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Champagne-toned pin, consistent with the site's restrained
        // single-stroke iconography rather than Leaflet's default blue pin.
        const pinIcon = L.divIcon({
          className: "",
          html: `<span style="
            display:flex;align-items:center;justify-content:center;
            width:30px;height:30px;border-radius:50% 50% 50% 0;
            background:#9A8060;border:2px solid #F8F5ED;
            transform:rotate(-45deg);box-shadow:0 2px 6px rgba(80,65,45,0.35);
          "><span style="
            display:block;width:8px;height:8px;border-radius:50%;
            background:#F8F5ED;transform:rotate(45deg);
          "></span></span>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -28],
        });

        const bounds = L.latLngBounds([]);

        items.forEach((location) => {
          const marker = L.marker([location.lat, location.lng], { icon: pinIcon, title: location.name }).addTo(map);

          const popupHtml = `
            <div style="font-family: var(--font-sans, sans-serif); min-width: 200px;">
              <p style="margin:0 0 4px; font-weight:600; font-size:14px; color:#22201C;">${location.name}</p>
              <p style="margin:0 0 10px; font-size:12px; line-height:1.5; color:#6F6A61;">${location.address}</p>
              <a href="${location.googleMapsUrl}" target="_blank" rel="noopener noreferrer"
                 style="font-size:12px; font-weight:500; color:#9A8060; text-decoration:underline; text-underline-offset:3px;">
                Open in Google Maps &#8599;
              </a>
            </div>
          `;
          marker.bindPopup(popupHtml);
          marker.on("click", () => setSelectedSlug(location.slug));

          markersRef.current.set(location.slug, marker);
          bounds.extend([location.lat, location.lng]);
        });

        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        }

        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectLocation(slug: string): void {
    setSelectedSlug(slug);
    const marker = markersRef.current.get(slug);
    const map = mapRef.current;
    if (!marker || !map) return;
    map.panTo(marker.getLatLng(), { animate: true });
    marker.openPopup();
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-bg-secondary) sm:aspect-[16/10] lg:aspect-auto lg:min-h-[32rem]">
        <div ref={mapContainerRef} className="absolute inset-0" aria-hidden={mapError} />
        {!mapReady && !mapError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-small text-(--color-ink-faint)">Loading map&hellip;</span>
          </div>
        ) : null}
        {mapError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="text-small text-(--color-ink-muted)">
              The interactive map couldn&rsquo;t load. Use the list to open each location directly in Google Maps.
            </span>
          </div>
        ) : null}
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((location, index) => {
          const isSelected = selectedSlug === location.slug;
          return (
            <li key={location.slug}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => selectLocation(location.slug)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectLocation(location.slug);
                  }
                }}
                className={`flex w-full flex-col gap-1 rounded-(--radius-md) border p-4 text-left transition-colors duration-(--duration-fast) ease-(--ease-editorial) cursor-pointer ${
                  isSelected
                    ? "border-(--color-accent) bg-(--color-champagne-light)"
                    : "border-(--color-border) bg-(--color-surface) hover:border-(--color-border-strong)"
                }`}
              >
                <span className="flex items-baseline gap-2">
                  <span aria-hidden="true" className="text-small tabular-nums text-(--color-ink-faint)">
                    0{index + 1}
                  </span>
                  <span className="text-h3 text-(--color-ink)">{location.name}</span>
                </span>
                <span className="text-small text-(--color-ink-muted)">{location.area}</span>
                <span className="text-small mt-1 text-(--color-ink-faint)">{location.address}</span>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="text-small text-(--color-accent) underline underline-offset-4 decoration-(--color-border-strong) transition-colors duration-(--duration-fast) ease-(--ease-editorial) hover:decoration-(--color-accent)"
                  >
                    Open in Google Maps &#8599;
                  </a>
                  <Button href={consultationHref} variant="secondary">
                    Book a Consultation
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
