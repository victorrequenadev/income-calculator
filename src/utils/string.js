export function parseDuration(value) {
  const [hh, mm = "0"] = value.split(":");
  const minuteFraction = Number(mm.padEnd(2, "0") / 60);
  return Number(hh) + minuteFraction;
}
