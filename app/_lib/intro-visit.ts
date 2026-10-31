export const INTRO_SKIP_ATTR = "data-intro-skip"

const SESSION_KEY = "visit-session"

// runs inline in <head> before first paint, so the overlay never flashes on in-site loads
export const INTRO_VISIT_SCRIPT = `(function(){var r=document.documentElement;try{var s=sessionStorage,f=document.referrer,i=f&&new URL(f).origin===location.origin;if(i||s.getItem("${SESSION_KEY}"))r.setAttribute("${INTRO_SKIP_ATTR}","");s.setItem("${SESSION_KEY}","1")}catch(e){}})()`

export function shouldSkipIntro(): boolean {
  return document.documentElement.hasAttribute(INTRO_SKIP_ATTR)
}
