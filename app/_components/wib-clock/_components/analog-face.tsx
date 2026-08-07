export function AnalogFace({
  hourNum,
  minuteNum,
  secondNum,
}: {
  hourNum: number
  minuteNum: number
  secondNum: number
}) {
  const secondDeg = secondNum * 6
  const minuteDeg = minuteNum * 6 + secondNum * 0.1
  const hourDeg = (hourNum % 12) * 30 + minuteNum * 0.5

  return (
    <svg viewBox="0 0 40 40" className="size-16" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = Number((20 + Math.sin(angle) * 14.5).toFixed(3))
        const y1 = Number((20 - Math.cos(angle) * 14.5).toFixed(3))
        const x2 = Number((20 + Math.sin(angle) * 16.5).toFixed(3))
        const y2 = Number((20 - Math.cos(angle) * 16.5).toFixed(3))
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-foreground/40"
            strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
          />
        )
      })}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="10"
        className="stroke-foreground"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 20 20)`}
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="7.5"
        className="stroke-foreground"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${minuteDeg} 20 20)`}
      />
      <line
        x1="20"
        y1="22"
        x2="20"
        y2="6.5"
        className="stroke-foreground/70"
        strokeWidth="0.7"
        strokeLinecap="round"
        transform={`rotate(${secondDeg} 20 20)`}
      />
      <circle cx="20" cy="20" r="1.4" className="fill-foreground" />
    </svg>
  )
}
