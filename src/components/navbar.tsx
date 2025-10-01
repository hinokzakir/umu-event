'use client'

import { Bars3Icon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
	return (
		<div className="navbar">
			<div className="title">umu-event</div>
			<Bars3Icon className='hamburger-button' onClick={onMenuClick} title='menu'></Bars3Icon>
		</div>
	)
}