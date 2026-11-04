'use client'

import React from 'react'
import { Bar, Facepile, Icon, Menu, Segmented, Tabs, Toggle } from '@/components/stageshow/kit'
import ResourceStage, { type Act } from '@/components/resources/scenes/ResourceStage'
import type { SceneProps } from './types'
import './transitions-dev.css'

/** transitions-dev: a grid of small interface pieces (toggle, menu, modal, badge, toast, tabs...), one at one size, the open menu the only one with words. From the many-of-one example.
 *
 * On hover only: the menu, the toast, the modal card, the badge and the switch leave in a short cascade (clear, about 0.6 s);
 * then the switch turns on, the badge and the modal card come in, the menu opens and the toast arrives (build, about 2.6 s),
 * ending on the resting frame. The other tiles do not move. */
export const READY = true

const TEXT = {
  en: { menu: ['Rename', 'Duplicate', 'Archive'] },
  fr: { menu: ['Renommer', 'Dupliquer', 'Archiver'] },
} as const

/** tog: the switch; badge: the bell count; modal: the card on the scrim; toast: the toast; menu: the open menu */
type S = { tog: boolean; badge: boolean; modal: boolean; toast: boolean; menu: boolean }
const EMPTY: S = { tog: false, badge: false, modal: false, toast: false, menu: false }
const DONE: S = { tog: true, badge: true, modal: true, toast: true, menu: true }

async function clear(a: Act<S>) {
  await a.set({ menu: false })
  await a.wait(80)
  await a.set({ toast: false, modal: false })
  await a.wait(80)
  await a.set({ badge: false })
  await a.wait(60)
  await a.set({ tog: false })
  await a.wait(320)
}

async function build(a: Act<S>) {
  await a.wait(300)
  await a.set({ tog: true })
  await a.wait(520)
  await a.set({ badge: true })
  await a.wait(100)
  await a.set({ modal: true })
  await a.wait(560)
  await a.set({ menu: true })
  await a.wait(540)
  await a.set({ toast: true })
  await a.wait(480)
}

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  const tile = (key: string, body: React.ReactNode, cls = '', focus = false) => (
    <div key={key} className={`sc-transitions-dev-tile ${cls}`} data-focus={focus || undefined}>
      {body}
    </div>
  )
  const lines = (k: string) =>
    tile(k, (
      <span style={{ display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'center', justifySelf: 'start', marginLeft: 16 }}>
        <Bar w={58} h={6} tone={3} />
        <Bar w={76} h={5} tone={2} />
        <Bar w={46} h={5} tone={2} />
      </span>
    ))
  return (
    <ResourceStage<S> a={a} initial={EMPTY} poster={DONE} build={build} clear={clear}>
      {(s) => {
        const modal = (
          <div className="sc-transitions-dev-modal sc-transitions-dev-in" data-on={s.modal || undefined}>
            <Bar w={44} h={6} tone={4} />
            <Bar w={62} h={5} tone={2} />
            <Bar w={50} h={5} tone={2} />
            <span className="sc-transitions-dev-btn" />
          </div>
        )
        const tiles: React.ReactNode[] = [
          tile('toggle', <Toggle on={s.tog} />),
          tile('tabs', <Segmented items={[<Bar key="a" w={16} h={5} tone={4} />, <Bar key="b" w={16} h={5} tone={3} />]} value={0} style={{ width: 92 }} />),
          tile('bell', (
            <span className="sc-transitions-dev-bell">
              <Icon name="bell" filled size={26} />
              <b className="sc-transitions-dev-in" data-on={s.badge || undefined}>3</b>
            </span>
          )),
          lines('l0'),
          tile('modal', modal, 'sc-transitions-dev-scrim'),
          tile('menu', (
            <div className="sc-transitions-dev-in sc-transitions-dev-drop" data-on={s.menu || undefined}>
              <Menu items={[...t.menu]} value={1} className="sc-transitions-dev-menu" />
            </div>
          ), '', true),
          tile('acc', (
            <div className="sc-transitions-dev-acc">
              <div><Bar w={44} h={5} tone={4} /><Icon name="chevron-down" size={12} /></div>
              <div><Bar w={36} h={5} tone={3} /><Icon name="chevron-right" size={12} /></div>
              <div style={{ borderBottom: 0 }}><Bar w={50} h={5} tone={3} /><Icon name="chevron-right" size={12} /></div>
            </div>
          )),
          lines('l1'),
          tile('heart', <Icon name="heart" filled size={26} style={{ color: 'var(--ss-icon-faint)' }} />),
          tile('search', (
            <span className="sc-transitions-dev-search">
              <Icon name="search" size={13} />
              <Bar w={34} h={5} tone={2} />
            </span>
          )),
          tile('faces', <Facepile names={['Ana', 'Bo', 'Cy']} size={26} tones={['ink', 'ink', 'ink']} />),
          lines('l2'),
          tile('mail', <Icon name="mail" filled size={26} style={{ color: 'var(--ss-icon-faint)' }} />),
          tile('tabs2', <Tabs items={[<Bar key="a" w={22} h={5} tone={4} />, <Bar key="b" w={22} h={5} tone={2} />, <Bar key="c" w={22} h={5} tone={2} />]} value={0} />),
          tile('toast', (
            <span className="sc-transitions-dev-toast sc-transitions-dev-in" data-on={s.toast || undefined}>
              <Icon name="check" filled size={16} />
              <Bar w={44} h={5} tone={3} />
            </span>
          )),
          lines('l3'),
        ]
        return <div className="sc-transitions-dev-grid">{tiles}</div>
      }}
    </ResourceStage>
  )
}
