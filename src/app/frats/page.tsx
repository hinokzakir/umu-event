'use client'

import Navbar from "@/components/navbar";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useState } from "react";
import "./frat.css";



export default function Frats() {
	const [hamburgerMenu, setHamburgerMenu] = useState(false);

	return (
		<>
			<Navbar onMenuClick={() => setHamburgerMenu(true)} />
			<div className="frats-page">
				<h1>Fraternities</h1>
				<p>Work in progress.. Here different student organizations will show up listed with contact info</p>
			</div>
			<HamburgerMenu
					state={hamburgerMenu}
					onClose={() => setHamburgerMenu(false)}
				  />
		</>
	);
}