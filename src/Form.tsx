import React from 'react'
import { sortAsc } from './utils'
import { convertS2T, convertT2S } from './convertCharset'
import { Charset } from './types'

interface FormState {
	simpText: string
	tradText: string
	displayDuplicates: boolean
	primaryCharSet: Charset
}

interface FormProps {
	formState: FormState
	setFormState: (newState: FormState) => void
}

const Form: React.FC<FormProps> = ({ formState, setFormState }) => {
	const { simpText, tradText, displayDuplicates, primaryCharSet } = formState

	return (
		<form action='' onSubmit={(e) => e.preventDefault()}>
			<div className='form-section'>
				<fieldset>
					<legend>Primary charset</legend>
					<label htmlFor='primary-charset-trad'>
						Traditional
						<input
							type='radio'
							name='primary-charset'
							value='trad'
							id='primary-charset-trad'
							checked={primaryCharSet === 'trad'}
							onChange={() => {
								setFormState({
									...formState,
									primaryCharSet: 'trad',
								})
							}}
						/>
					</label>{' '}
					<label htmlFor='primary-charset-simp'>
						Simplified
						<input
							type='radio'
							name='primary-charset'
							value='simp'
							id='primary-charset-simp'
							checked={primaryCharSet === 'simp'}
							onChange={() => {
								setFormState({
									...formState,
									primaryCharSet: 'simp',
								})
							}}
						/>
					</label>
				</fieldset>
			</div>

			{[
				<div key='simp' className='form-section'>
					<label htmlFor='simp'>
						Simplified
						<br />
						<textarea
							className='input'
							name='simp'
							id='simp'
							value={simpText}
							onChange={(e) =>
								setFormState({
									...formState,
									simpText: e.currentTarget.value,
								})
							}
						/>
					</label>
					<br />
					<button
						type='button'
						onClick={async () => {
							const t2s = await convertT2S

							setFormState({
								...formState,
								simpText: t2s(tradText),
							})
						}}
					>
						Guess from traditional
					</button>
				</div>,
				<div key='trad' className='form-section'>
					<label htmlFor='trad'>
						Traditional
						<br />
						<textarea
							className='input'
							name='trad'
							id='trad'
							value={tradText}
							onChange={(e) =>
								setFormState({
									...formState,
									tradText: e.currentTarget.value,
								})
							}
						/>
					</label>
					<br />
					<button
						type='button'
						onClick={async () => {
							const s2t = await convertS2T

							setFormState({
								...formState,
								tradText: s2t(simpText),
							})
						}}
					>
						Guess from simplified
					</button>
				</div>,
			].sort(sortAsc((x) => x.key === primaryCharSet))}

			<div className='form-section'>
				<label htmlFor='display-duplicates'>
					Include duplicates
					<input
						type='checkbox'
						name='display-duplicates'
						id='display-duplicates'
						checked={displayDuplicates}
						onChange={(e) => {
							setFormState({
								...formState,
								displayDuplicates: e.currentTarget.checked,
							})
						}}
					/>
				</label>
			</div>
		</form>
	)
}

export default Form
