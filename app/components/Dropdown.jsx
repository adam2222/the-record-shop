import React, { Component } from 'react'

export default (props) => {
	const { onChange, album } = props

	const options = []
	for (let i = 0; i < album.quantity_available; i++) {
		options.push(
			<option key={i + 1} value={i + 1}>{i + 1}</option>
		)
	}

	return (
		<select onChange={onChange}>
			{options}
		</select>
	)
}
