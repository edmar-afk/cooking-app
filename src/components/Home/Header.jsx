import chefImg from '../../assets/images/chef.png';function Header() {	return (
		<>
			<div className="flex flex-row justify-between items-center mb-4">
				<div className="flex flex-col">
					<p>Welcome to Cooking App,</p>
					<p className="font-bold">Name Name Name</p>
				</div>
				<div className='border-1 p-1 rounded-lg bg-orange-100'>
					<img
						src={chefImg}
						alt=""
						className="w-10 h-10"
					/>
				</div>
			</div>
		</>
	);
}

export default Header;
