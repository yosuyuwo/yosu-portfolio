const BOLD_MARKER = /\*\*/g
const HEADING_PREFIX = /^[ \t]{0,3}#{1,6}[ \t]+/gm
const BULLET_PREFIX = /^[ \t]*[-*•][ \t]+/gm
const INLINE_CODE_FENCE = /`+/g
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

// Safety net for models that ignore the "no markdown" rule; runs on the full text each render, so streamed chunk boundaries don't matter.
export function toPlainText(text: string): string {
  return text
    .replace(MARKDOWN_LINK, "$1 ($2)")
    .replace(BOLD_MARKER, "")
    .replace(HEADING_PREFIX, "")
    .replace(BULLET_PREFIX, "")
    .replace(INLINE_CODE_FENCE, "")
}
