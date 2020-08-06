import React, { useState, useEffect } from 'react'
import './styles.scss'

import Form from './Form'
import WarnMsg from './WarnMsg'
import Output from './Output'
import { Charset } from './types'
import ColorSchemeSwitcher from './ColorSchemeSwitcher'

interface AppState {
	tradText: string
	simpText: string
	displayDuplicates: boolean
	primaryCharSet: Charset
}

// 发行发型、干燥干部、天干地支、皇后之后、预卜萝卜、
// 才是天才、了解不了、丑角好丑、手表表现

const initialAppState: AppState = {
	tradText: `北冥有魚，其名為鯤。
鯤之大，不知其幾仟裏也。
化而為鳥，其名為鵬。
鵬之背，不知其幾仟裏也，怒而飛，其翼若垂天之雲。
是鳥也，海運則將徙於南冥。`,
	simpText: `北冥有鱼，其名为鲲。
鲲之大，不知其几千里也。
化而为鸟，其名为鹏。
鹏之背，不知其几千里也，怒而飞，其翼若垂天之云。
是鸟也，海运则将徙于南冥。`,
	displayDuplicates: false,
	primaryCharSet: 'trad',
}

if (!localStorage.appState) {
	localStorage.appState = JSON.stringify(initialAppState)
}

let appState = {} as AppState

try {
	appState = JSON.parse(localStorage.appState) as AppState

	if (
		!([
			['tradText', 'string'],
			['simpText', 'string'],
			['displayDuplicates', 'boolean'],
			['primaryCharSet', 'string'],
		] as const).every(([prop, type]) => typeof appState[prop] === type)
	) {
		throw new TypeError()
	}
} catch (_e) {
	// empty or corrupted state - reinitialize

	appState = initialAppState
}

const App: React.FC = () => {
	const [formState, setFormState] = useState(appState)

	const { simpText, tradText, displayDuplicates, primaryCharSet } = formState

	const primaryText = primaryCharSet === 'simp' ? simpText : tradText
	const secondaryText = primaryCharSet === 'simp' ? tradText : simpText

	useEffect(() => {
		localStorage.appState = JSON.stringify(formState)
	}, [formState])

	return (
		<div className='container'>
			<ColorSchemeSwitcher />
			<h1>Traditional ⇄ simplified ruby-text generator</h1>

			<Form formState={formState} setFormState={setFormState} />
			{Array.from(primaryText).length !==
				Array.from(secondaryText).length && (
				<WarnMsg
					msg={
						'Length of simplified and traditional input are different — please check results.'
					}
				/>
			)}
			<h2>Output</h2>
			<Output
				primaryText={primaryText}
				secondaryText={secondaryText}
				displayDuplicates={displayDuplicates}
			/>
		</div>
	)
}

export default App
