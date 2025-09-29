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
				<a href="/">Home</a>
			</div>
		</div>
	);
}