'use client'

import Navbar from "@/components/navbar";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client'
import "./login.css";

// Input validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8 && password.length <= 128;
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);
  
  if (!limit) {
    rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset if more than 15 minutes passed
  if (now - limit.lastAttempt > 15 * 60 * 1000) {
    rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Max 5 attempts per 15 minutes
  if (limit.count >= 5) {
    return false;
  }
  
  limit.count++;
  limit.lastAttempt = now;
  return true;
};



export default function Login() {
	const [hamburgerMenu, setHamburgerMenu] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [user, setUser] = useState<any>(null);

	const supabase = createClient();

	useEffect(() => {
		// Check if user is logged in on component mount
		const getUser = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			setUser(user);
		};
		getUser();
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		// Input validation
		const sanitizedEmail = sanitizeInput(email);
		const sanitizedPassword = sanitizeInput(password);

		if (!validateEmail(sanitizedEmail)) {
			setMessage('Please enter a valid email address');
			setLoading(false);
			return;
		}

		if (!validatePassword(sanitizedPassword)) {
			setMessage('Password must be between 8-128 characters');
			setLoading(false);
			return;
		}

		// Rate limiting
		if (!checkRateLimit(sanitizedEmail)) {
			setMessage('Too many login attempts. Please try again in 15 minutes.');
			setLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: sanitizedEmail,
				password: sanitizedPassword,
			});

			if (error) {
				setMessage('Invalid credentials');
			} else {
				setMessage('Login successful!');
				// Get updated user data
				const { data: { user } } = await supabase.auth.getUser();
				setUser(user);
			}
		} catch (error) {
			setMessage('An error occurred. Please try again.');
		}
		
		setLoading(false);
	};

	const handleLogout = async (e: React.FormEvent) => {
		setLoading(true);
		setMessage('');
		
		const { error } = await supabase.auth.signOut();
		if (error) {
			setMessage(error.message);
		} else {
			setMessage('Logout successful!');
			setUser(null);
		}
		setLoading(false);
	}

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		// Input validation
		const sanitizedEmail = sanitizeInput(email);
		const sanitizedPassword = sanitizeInput(password);

		if (!validateEmail(sanitizedEmail)) {
			setMessage('Please enter a valid email address');
			setLoading(false);
			return;
		}

		if (!validatePassword(sanitizedPassword)) {
			setMessage('Password must be between 8-128 characters');
			setLoading(false);
			return;
		}

		// Rate limiting
		if (!checkRateLimit(sanitizedEmail)) {
			setMessage('Too many signup attempts. Please try again in 15 minutes.');
			setLoading(false);
			return;
		}

		try {
			const { error } = await supabase.auth.signUp({
				email: sanitizedEmail,
				password: sanitizedPassword,
			});

			if (error) {
				setMessage('Signup failed. Please try again.');
			} else {
				setMessage('Check your email for verification link!');
			}
		} catch (error) {
			setMessage('An error occurred. Please try again.');
		}
		
		setLoading(false);
	};

	return (
		<>
			<Navbar onMenuClick={() => setHamburgerMenu(true)} />
			<div className="login-page">
				<h1>Login/Signup</h1>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(sanitizeInput(e.target.value))}
							required
							maxLength={254}
							autoComplete="email"
							spellCheck={false}
						/>
					</div>
					<div className="form-group">
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
							maxLength={128}
							autoComplete="current-password"
						/>
					</div>
				</form>
				<div className="button-container">
					<button onClick={handleLogin} disabled={loading}>
						{loading ? 'Loading...' : 'Login'}
					</button>
					<button onClick={handleLogout} disabled={loading}>
						{loading ? 'Loading...' : 'Logout'}
					</button>
				</div>
				{message && <p>{message}</p>}
				{user && <p>Logged in as: {user.email}</p>}
			</div>
			<HamburgerMenu
					state={hamburgerMenu}
					onClose={() => setHamburgerMenu(false)}
				  />
		</>
	);
}