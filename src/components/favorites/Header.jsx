function Header({ userName }) {
	return (
		<div>
            <p className="text-center font-bold pt-8">Here's your list of Favorites, {userName}</p>
		</div>
	);
}

export default Header;
