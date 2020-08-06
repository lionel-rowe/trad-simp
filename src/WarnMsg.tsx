import React from 'react'

interface WarnMsgProps {
	msg: string
}

const WarnMsg: React.FC<WarnMsgProps> = ({ msg }) => {
	return <div className='warn-msg'>Warning: {msg}</div>
}

export default WarnMsg
