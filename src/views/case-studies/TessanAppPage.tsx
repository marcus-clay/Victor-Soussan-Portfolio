// Tessan deep dive: reads its own sections from the shared Tessan page.
import React from 'react'
import { TessanChapterPage } from '@/views/case-studies/TessanPage'

export const TessanAppPage: React.FC<React.ComponentProps<typeof TessanChapterPage>> = (props) => (
  <TessanChapterPage {...props} variant="app" />
)

export default TessanAppPage
