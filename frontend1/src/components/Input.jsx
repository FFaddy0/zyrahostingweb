const Input = ({ icon: Icon, iconColor = "text-blue-600", isDarkMode = true, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className={`size-5 ${iconColor}`} />
			</div>
			<input
				{...props}
				className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 transition duration-200 ${
					isDarkMode
						? 'bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
						: 'bg-blue-50 bg-opacity-80 border-blue-200 text-gray-800 placeholder-gray-600 focus:border-blue-400'
				}`}
			/>
		</div>
	);
};
export default Input;