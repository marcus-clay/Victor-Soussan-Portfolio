'use client'

import React from 'react'
import { Bar, Facepile, Icon, Menu, Segmented, Tabs, Toggle } from '@/components/stageshow/kit'
import StillStage from './StillStage'
import type { SceneProps } from './types'
import './transitions-dev.css'

/** transitions-dev: a grid of small interface pieces (toggle, menu, modal, badge, toast, tabs...), one at one size, the open menu the only one with words. From the many-of-one example. */
export const READY = true

const TEXT = {
  en: { menu: ['Rename', 'Duplicate', 'Archive'] },
  fr: { menu: ['Renommer', 'Dupliquer', 'Archiver'] },
} as const

export default function Scene({ lang, a }: SceneProps) {
  const t = TEXT[lang]
  const tile = (key: string, body: React.ReactNode, cls = '', focus = false) => (
    <div key={key} className={`sc-transitions-dev-tile ${cls}`} data-focus={focus || undefined}>
      {body}
    </div>
  )
  const modal = (
    <div className="sc-transitions-dev-modal">
      <Bar w={44} h={6} tone={4} />
      <Bar w={62} h={5} tone={2} />
      <Bar w={50} h={5} tone={2} />
      <span className="sc-transitions-dev-btn" />
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
  const tiles: React.ReactNode[] = [
    tile('toggle', <Toggle on={true} />),
    tile('tabs', <Segmented items={[<Bar key="a" w={16} h={5} tone={4} />, <Bar key="b" w={16} h={5} tone={3} />]} value={0} style={{ width: 92 }} />),
    tile('bell', (
      <span className="sc-transitions-dev-bell">
        <Icon name="bell" filled size={26} />
        <b>3</b>
      </span>
    )),
    lines('l0'),
    tile('modal', modal, 'sc-transitions-dev-scrim'),
    tile('menu', <Menu items={[...t.menu]} value={1} className="sc-transitions-dev-menu" />, '', true),
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
      <span className="sc-transitions-dev-toast">
        <Icon name="check" filled size={16} />
        <Bar w={44} h={5} tone={3} />
      </span>
    )),
    lines('l3'),
  ]
  return (
    <StillStage a={a}>
      <div className="sc-transitions-dev-grid">{tiles}</div>
    </StillStage>
  )
}
