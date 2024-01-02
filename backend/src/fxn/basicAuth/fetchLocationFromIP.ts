export async function getLocationFromIP(ipAddress: string) {
  const rawData: any = await fetch(`https://geo.geosurf.io/${ipAddress}`);
  const { city, country, postal, isp } = await rawData.json();
  return { city, country, postal, isp };
}
