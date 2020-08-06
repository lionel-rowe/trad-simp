import React, { useState, useEffect } from 'react'

type Variant = 'dark' | 'light'

const changeVariant = (variant: Variant) => {
	;(document.querySelector(
		'#water-css',
	) as HTMLLinkElement).href = `https://cdn.jsdelivr.net/gh/kognise/water.css@1.4.0/dist/${variant}.min.css`

	document.body.setAttribute('class', variant)
}

const useDarkVariant = () => {
	return localStorage.colorSchemeOverride
		? localStorage.colorSchemeOverride === 'dark'
		: window.matchMedia &&
				matchMedia('(prefers-color-scheme: dark)').matches
}

const initialVariant: Variant = useDarkVariant() ? 'dark' : 'light'

const ColorSchemeSwitcher: React.FC = () => {
	const [variant, setVariant] = useState<Variant>(initialVariant)

	useEffect(() => {
		localStorage.colorSchemeOverride = variant

		changeVariant(variant)
	}, [variant])

	return (
		<div className='color-scheme-switcher-container'>
			<button
				onClick={() =>
					setVariant((v) => (v === 'dark' ? 'light' : 'dark'))
				}
				className='color-scheme-switcher'
				aria-label='Switch color scheme'
			>
				{variant === 'dark' ? '🌞' : '🌛'}
			</button>
		</div>
	)
}

export default ColorSchemeSwitcher
