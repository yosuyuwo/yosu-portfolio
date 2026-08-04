import Image from "next/image"

import { Button } from "@/components/ui/button"
import { cdnUrl } from "@/lib/cdn"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div>
          <p className="text-muted-foreground">
            R2 CDN example (set <code>NEXT_PUBLIC_R2_CDN_URL</code> and upload
            the asset):
          </p>
          <Image
            src={cdnUrl("portfolio/hero.webp")}
            alt="Portfolio hero from R2 CDN"
            width={1200}
            height={800}
            className="mt-2 h-auto w-full"
          />
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
