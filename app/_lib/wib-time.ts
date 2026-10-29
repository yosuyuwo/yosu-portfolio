export const WIB = "Asia/Jakarta"

export function getWibParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: WIB,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const hour = parts.find((p) => p.type === "hour")?.value ?? "00"
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00"
  const second = parts.find((p) => p.type === "second")?.value ?? "00"
  return {
    hour,
    minute,
    second,
    hourNum: Number(hour),
    minuteNum: Number(minute),
    secondNum: Number(second),
    display: `${hour}:${minute}`,
  }
}
