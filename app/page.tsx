import { About } from "@/app/_components/about"
import { ContactFooter } from "@/app/_components/contact-footer"
import { Intro } from "@/app/_components/intro"
import { PageEnter } from "@/app/_components/page-enter"
import { Sidebar } from "@/app/_components/sidebar"
import { TopBar } from "@/app/_components/top-bar"
import { WorkGrid } from "@/app/_components/work-grid"
import { ContactDialogProvider } from "@/app/_hooks/use-contact-dialog"

export default function Page() {
  return (
    <ContactDialogProvider>
      <PageEnter />
      <div className="md:grid md:grid-cols-[auto_minmax(0,1fr)]">
        <Sidebar />
        <div>
          <TopBar />
          <main>
            <Intro />
            <WorkGrid />
            <About />
          </main>
        </div>
      </div>
      <ContactFooter />
    </ContactDialogProvider>
  )
}
