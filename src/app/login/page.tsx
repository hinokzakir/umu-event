'use client'

import Navbar from "@/components/navbar";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useState } from "react";
import "./login.css";



export default function Login() {
	const [hamburgerMenu, setHamburgerMenu] = useState(false);

	return (
		<>
			<Navbar onMenuClick={() => setHamburgerMenu(true)} />
			<div className="login-page">
				<h1>Login/Signout</h1>
				<p>Work in progress.. Here users will be able to login/signout</p>
			</div>
			<HamburgerMenu
					state={hamburgerMenu}
					onClose={() => setHamburgerMenu(false)}
				  />
		</>
	);
}