import Image from "next/image"

const LOGO_SRC = "/sentrasera-logo/svg/sentrasera-logo-horizontal-blue.svg"
const LOGO_WIDTH = 598
const LOGO_HEIGHT = 96

export function PortalLogo({ className }: { className: string }) {
  return (
    <Image
      src={LOGO_SRC}
      alt="SentraSera"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      loading="eager"
      className={className}
    />
  )
}
