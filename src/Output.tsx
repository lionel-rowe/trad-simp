import React, { useState, useRef, useEffect } from 'react'
import CharWithRuby from './CharWithRuby'
import { zip } from './utils'

interface OutputProps {
	primaryText: string
	secondaryText: string
	displayDuplicates: boolean
}

const Output: React.FC<OutputProps> = ({
	primaryText,
	secondaryText,
	displayDuplicates,
}) => {
	const [html, setHtml] = useState('')

	const renderedRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setHtml(renderedRef.current?.innerHTML || '')
	}, [primaryText, secondaryText, displayDuplicates])

	return (
		<>
			<output>
				<div className='rendered' ref={renderedRef}>
					{zip(
						Array.from(primaryText),
						Array.from(secondaryText),
					).map(([primaryChar, secondaryChar], idx) => {
						return (
							<CharWithRuby
								key={[
									idx.toString(),
									primaryChar,
									secondaryChar,
								].join('')}
								primaryChar={primaryChar}
								secondaryChar={secondaryChar}
								displayDuplicates={displayDuplicates}
							/>
						)
					})}
				</div>
			</output>

			<h3>HTML</h3>

			<output>
				<textarea
					className='html-src'
					readOnly
					value={html}
					onClick={(e) => {
						e.currentTarget.select()
					}}
				/>
			</output>
		</>
	)
}

export default Output
