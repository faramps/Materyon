export async function getLocationName(lat: number, lng: number) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?language=tr&access_token=${token}`;

  const res = await fetch(url);
  const data = await res.json();

  const feature = data.features?.[0];
  if (!feature) return { city: null, district: null, address: null };

  let city = null;
  let district = null;

  for (const ctx of feature.context ?? []) {
    if (ctx.id.includes("place")) district = ctx.text_tr || ctx.text;
    if (ctx.id.includes("region")) city = ctx.text_tr || ctx.text;
  }

  return {
    city,
    district,
    address: feature.place_name_tr || feature.place_name,
  };
}
