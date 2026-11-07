import { createTRPCRouter } from "@/server/trpc/init"

import { portalProcedure } from "../procedures"
import { getViewer } from "../viewer"

export const authRouter = createTRPCRouter({
  me: portalProcedure.query(() => getViewer()),
})
