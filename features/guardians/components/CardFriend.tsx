export default function CardFriend({friend}:{friend:string}) {


	return (
		// {/* <!-- Card 1 --> */ }
		<div className="grid col-span-3 relative rounded-2xl " >
			<a className=" group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-2xl py-6 pr-6 pl-9" href="">

				{/* <!-- Title --> */}
				<p className="text-2xl font-semibold text-gray-500 group-hover:text-gray-700"> {friend} </p>

				{/* <!-- Color --> */}
				<div className="bg-blue-400 group-hover:bg-blue-600 h-full w-4 absolute top-0 left-0 rounded-s-lg"> </div>

			</a>
		</div >
	)
}