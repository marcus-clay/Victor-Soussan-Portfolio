/** What every scene of a skill receives */
export type SceneProps = {
  lang: 'en' | 'fr'
  /** The accent hue of the skill: `hex` for the one accented element, `soft` for a tinted fill */
  a: { hex: string; soft: string }
  /** The short annotation of the skill (its `note` in the catalogue), already in the page's language */
  note: string
}
