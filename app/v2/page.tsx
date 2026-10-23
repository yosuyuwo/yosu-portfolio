import { ContactDialogProvider } from "@/app/_components/shell/_hooks/use-contact-dialog"

import { About } from "./_components/about"
import { ContactFooter } from "./_components/contact-footer"
import { Hero } from "./_components/hero"
import { TopBar } from "./_components/top-bar"
import { WorkIndex } from "./_components/work-index"

export default function V2Page() {
  return (
    <ContactDialogProvider>
      <TopBar />
      <main>
        <Hero />
        <WorkIndex />
        <About />
      </main>
      <ContactFooter />
    </ContactDialogProvider>
  )
}
