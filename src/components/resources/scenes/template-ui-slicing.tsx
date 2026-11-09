'use client'

import React from 'react'
import { Avatar, Bar, Row, Window } from '@/components/stageshow/kit'
import { Box } from 'lucide-react'
import type { SceneProps } from '@/components/skills/scenes/types'
import ResourceStage, { type Act } from './ResourceStage'
import './template-ui-slicing.css'

/**
 * template-ui-slicing: a sketched interface in a browser window, its regions cut out by dashed outlines, and a small
 * inspector card on the window's right edge that lists the components they become, indented as a tree. Layout
 * "panel over product" (panel-annotation example): the window inset top and left and bled off the bottom, the panel
 * straddling its right edge over the page margin, never over the page.
 *
 * At rest the frame is finished (`poster`). On hover the outlines leave in reverse order, then are drawn again one
 * after the other (left to right), the matching row of the tree taking the tint as its outline is drawn. `n` is the
 * number of regions cut out so far; the row of the last one is the active row.
 */
export const READY = true

const T = {
  en: { title: 'Components' },
  fr: { title: 'Composants' },
}

type S = { n: 0 | 1 | 2 | 3 }
const initial: S = { n: 0 }
const poster: S = { n: 3 }

/** The outlines are drawn one after the other and the story ends on the finished frame (`poster`) */
async function build(a: Act<S>) {
  await a.wait(150)
  await a.set({ n: 1 })
  await a.wait(700)
  await a.set({ n: 2 })
  await a.wait(700)
  await a.set({ n: 3 })
  await a.wait(500)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = T[lang]
  return (
    <ResourceStage<S> a={a} initial={initial} build={build} poster={poster}>
      {(s) => (
        <div className="sc-res-slicing">
          <Window url="acme.co/catalogue" urlShape="pill" className="win" body={{ className: 'page' }}>
            <div className="slice header" data-show={s.n >= 1 || undefined}>
              <Bar w={40} h={9} r={4.5} tone={4} />
              <span className="nav">
                <Bar w={22} h={6} r={3} tone={2} />
                <Bar w={26} h={6} r={3} tone={2} />
              </span>
              <Avatar plain size={18} />
            </div>

            <div className="cols">
              <div className="slice card" data-show={s.n >= 2 || undefined}>
                <div className="media" />
                <Bar w={58} h={8} r={4} tone={4} />
                <Bar w={64} h={6} r={3} tone={2} />
                <Bar w={44} h={6} r={3} tone={2} />
                <Bar w={56} h={6} r={3} tone={2} />
                <Bar w={50} h={6} r={3} tone={2} />
              </div>

              <div className="list">
                <div className="slice item" data-show={s.n >= 3 || undefined}>
                  <Row pad={0} lead={<Avatar plain size={20} />} title={<Bar w={42} h={7} r={3.5} tone={4} />} subtitle={<Bar w={28} h={6} r={3} tone={2} />} />
                </div>
                {[[38, 26], [48, 32], [34, 22], [42, 28]].map(([x, y], i) => (
                  <Row key={i} pad={0} className="plain" lead={<Avatar plain size={20} />} title={<Bar w={x} h={7} r={3.5} tone={3} />} subtitle={<Bar w={y} h={6} r={3} tone={2} />} />
                ))}
              </div>
            </div>
          </Window>

          <div className="inspector">
            <div className="insp-title">{t.title}</div>
            <div className="tree">
              <div className="node" data-on={s.n === 1 || undefined}>
                <Box size={13} strokeWidth={1.7} />
                Header
              </div>
              <div className="node" data-on={s.n === 2 || undefined}>
                <Box size={13} strokeWidth={1.7} />
                ProductCard
              </div>
              <div className="node filler">
                <Box size={13} strokeWidth={1.7} />
                <Bar w={34} h={6} r={3} tone={2} />
              </div>
              <div className="node sub" data-on={s.n === 3 || undefined}>
                <Box size={13} strokeWidth={1.7} />
                ListItem
              </div>
            </div>
          </div>
        </div>
      )}
    </ResourceStage>
  )
}
