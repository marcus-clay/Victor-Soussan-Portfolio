/**
 * Excerpts of testimonials. A quote is never rewritten: an excerpt is always a literal
 * prefix of the original text, cut where a sentence ends, and `rest` is the exact remainder
 * (excerpt + rest === content, up to the single whitespace between them).
 */

// A sentence ends at . ! ? or … followed by a space and a capital letter or an opening quote.
// "prototypé... pour" or "(UI kit, ergonomie...) qui" are not sentence ends.
const SENTENCE_END = /(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Ý«"“])/

export function splitSentences(content: string): string[] {
  return content.trim().split(SENTENCE_END)
}

export interface QuoteExcerpt {
  excerpt: string
  rest: string
}

interface ExcerptOptions {
  /** Upper bound on the excerpt length, except when the first sentence alone is longer. */
  maxChars?: number
  /** Upper bound on the number of sentences kept. */
  maxSentences?: number
}

export function getExcerpt(
  content: string,
  { maxChars = 220, maxSentences = 2 }: ExcerptOptions = {},
): QuoteExcerpt {
  const sentences = splitSentences(content)
  let excerpt = sentences[0]
  for (let i = 1; i < sentences.length && i < maxSentences; i++) {
    const next = `${excerpt} ${sentences[i]}`
    if (next.length > maxChars) break
    excerpt = next
  }
  const rest = content.trim().slice(excerpt.length).trim()
  return { excerpt, rest }
}

/** Featured quote: the first `count` sentences, whatever their length. */
export function getLeadSentences(content: string, count = 3): QuoteExcerpt {
  const sentences = splitSentences(content)
  const excerpt = sentences.slice(0, count).join(' ')
  const rest = content.trim().slice(excerpt.length).trim()
  return { excerpt, rest }
}
