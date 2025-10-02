interface hamburgerMenuProps {
	state: any;
	onClose: () => void;
  }

export default function HamburgerMenu({ state, onClose }: hamburgerMenuProps) {
	if (!state) return null;

	return (
		<div 
			className="popup-overlay"
			onClick={onClose}
		>
			<div 
				className="hamburger-menu"
				onClick={(e) => e.stopPropagation()}
			>
				<button 
					className="popup-close"
					onClick={onClose}
				>
					×
				</button>
				<div className="hamburger-items-container">
					<a href="/login">Login/Signout</a>
					<a href="/">Home</a>
					<a href="/frats">Student-organizations</a>
				</div>
			</div>
		</div>
	);
}