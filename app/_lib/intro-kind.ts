export type IntroKind = "photo" | "logo" | "none"

export const INTRO_KIND_ATTR = "data-intro-kind"

const LAST_VISIT_KEY = "last-visit"
const SESSION_KEY = "visit-session"
const LEGACY_SEEN_KEY = "intro-seen"

// runs inline in <head> before first paint, so the overlay never flashes for visitors who skip it
export const INTRO_KIND_SCRIPT = `(function(){var r=document.documentElement;try{var d=new Date(),t=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),L=localStorage,S=sessionStorage,l=L.getItem("${LAST_VISIT_KEY}")||(L.getItem("${LEGACY_SEEN_KEY}")?"legacy":null),k=!l?"photo":l!==t||!S.getItem("${SESSION_KEY}")?"logo":"none";L.setItem("${LAST_VISIT_KEY}",t);L.removeItem("${LEGACY_SEEN_KEY}");S.setItem("${SESSION_KEY}","1");r.setAttribute("${INTRO_KIND_ATTR}",k)}catch(e){r.setAttribute("${INTRO_KIND_ATTR}","logo")}})()`

export function readIntroKind(): IntroKind {
  const kind = document.documentElement.getAttribute(INTRO_KIND_ATTR)
  return kind === "photo" || kind === "none" ? kind : "logo"
}
