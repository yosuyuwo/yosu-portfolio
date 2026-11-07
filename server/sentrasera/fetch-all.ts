import "server-only"

import { unwrap } from "./procedures"

// PostgREST caps responses at 1000 rows, which would silently truncate progress counts and exports
const PAGE_SIZE = 1000

export async function fetchAllRows<T>(
  context: string,
  fetchPage: (
    from: number,
    to: number
  ) => PromiseLike<{ data: T[] | null; error: unknown }>,
  from = 0
): Promise<T[]> {
  const page = unwrap(context, await fetchPage(from, from + PAGE_SIZE - 1))
  if (page.length < PAGE_SIZE) return page
  return [...page, ...(await fetchAllRows(context, fetchPage, from + PAGE_SIZE))]
}
