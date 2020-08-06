import React from 'react'

interface CharWithRubyProps {
	primaryChar: string
	secondaryChar: string
	displayDuplicates: boolean
}

const CharWithRuby: React.FC<CharWithRubyProps> = ({
	primaryChar,
	secondaryChar,
	displayDuplicates,
}) => {
	const renderSecondaryChar =
		displayDuplicates || primaryChar !== secondaryChar

	if ([primaryChar, secondaryChar].every((ch) => ch === '\n')) {
		return (
			<>
				{'\n'}
				<br />
				{'\n'}
			</>
		)
	}

	if (!renderSecondaryChar) {
		return <>{primaryChar}</>
	}

	return (
		<>
			<ruby>
				{primaryChar}
				{renderSecondaryChar && (
					<>
						<rp>(</rp>
						<rt>{secondaryChar}</rt>
						<rp>)</rp>
					</>
				)}
			</ruby>
		</>
	)
}

export default CharWithRuby
