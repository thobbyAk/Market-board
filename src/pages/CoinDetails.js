import React, { useState } from "react";
import LineChart from "../components/Chart";
import { CopyClipboard } from "../components/CopytoClipboard";
import {
	currencyFormatToAbs,
	removeHttp,
	round,
	covertToUpperCase,
} from "../lib/utils.js";
import { useParams } from "react-router-dom";

const CoinDetails = () => {
	const { id } = useParams();

	const [details, setCoinDetails] = React.useState({});
	const [chartData, setChartData] = useState({});
	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
			const newdata = await response.json();
			setCoinDetails(newdata);
			console.log("newData", newdata);
			if (newdata?.tickers) {
				setChartData({
					labels: newdata?.tickers
						? newdata?.tickers.map((crypto) => crypto?.timestamp)
						: [1, 3],
					datasets: [
						{
							label: "Price in USD",
							data: newdata?.tickers
								? newdata?.tickers.map((crypto) => crypto?.converted_last?.usd)
								: [0, 0],
							borderColor: "rgb(75, 192, 192)",
							backgroundColor: "rgb(75, 192, 192)",
							borderWidth: 1,
							radius: 0,
						},
					],
				});
			}
		};

		fetchData();
	}, [id]);
	const [coinPrice, setCoinPrice] = useState(0.0);
	const [usdPrice, setUsdPrice] = useState(0.0);
	// console.log("coinDetails", coinDetails);
	// const CC = dynamic(
	// 	() =>
	// 		import("../../components/CopytoClipboard").then((mod) => mod.CopyClipboard),
	// 	{ ssr: false }
	// );

	const calculateCoin = (e) => {
		setCoinPrice(e.target.value);
		setUsdPrice(e.target.value * details?.market_data?.current_price?.usd);
	};

	const calculateUsd = (e) => {
		setUsdPrice(e.target.value);

		const newCoin = e.target.value / details?.market_data?.current_price?.usd;
		setCoinPrice(newCoin);
	};
	if (details) {
		return (
			<div className="py-6">
				<div className="mx-auto max-w-7xl px-4 ">
					<div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4">
						<div className="col-span-2 px-5">
							<div className="inline-flex items-center px-2  py-0.5 rounded-md text-xs font-medium bg-red-800 text-gray-100 mb-1 md:mb-0 md:mt-0 dark:bg-gray-600 dark:bg-opacity-40">
								#{details?.market_cap_rank}
							</div>
							<div className="flex mt-4 flex-start">
								<div className="h-10 w-10 flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full"
										src={details?.image?.small}
										alt=""
									/>
								</div>
								<div className="ml-4">
									<div className="font-medium text-2xl text-white">{details?.name}</div>
									<div className="text-gray-300">{`${covertToUpperCase(
										details?.symbol || ""
									)}`}</div>
								</div>
							</div>
							<div className="flex">
								<h2 className="text-4xl mb-3 font-bold text-white">
									{currencyFormatToAbs(details?.market_data?.current_price?.usd)}
								</h2>
							</div>
							<div className="flex flex-start flex-col">
								{details?.market_data?.market_cap_change_percentage_24h_in_currency
									?.btc > 0 ? (
									<span className=" text-gray-300">
										{" "}
										{details?.market_data?.current_price?.btc} BTC
										<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-green-800">
											{" "}
											{`${round(
												details?.market_data?.market_cap_change_percentage_24h_in_currency
													?.btc
											)}%`}
										</span>{" "}
									</span>
								) : (
									<span className=" text-gray-300">
										{" "}
										{details?.market_data?.current_price?.btc} BTC{" "}
										<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-red-800">
											{`${round(
												details?.market_data?.market_cap_change_percentage_24h_in_currency
													?.btc
											)}%`}
										</span>
									</span>
								)}
								{details?.market_data?.market_cap_change_percentage_24h_in_currency
									?.eth > 0 ? (
									<span className=" text-gray-300">
										{" "}
										{details?.market_data?.current_price?.eth} ETH
										<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-green-800">
											{" "}
											{`${round(
												details?.market_data?.market_cap_change_percentage_24h_in_currency
													?.eth
											)}%`}
										</span>{" "}
									</span>
								) : (
									<span className=" text-gray-300">
										{" "}
										{details?.market_data?.current_price?.eth} ETH{" "}
										<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-red-800">
											{`${round(
												details?.market_data?.market_cap_change_percentage_24h_in_currency
													?.eth
											)}%`}
										</span>
									</span>
								)}
							</div>

							<div className="flex justify-start">
								<h2 className=" mb-3 font-medium text-white mr-3">
									{details?.platforms?.ethereum}{" "}
								</h2>
								<CopyClipboard content={details?.platforms?.ethereum} />
							</div>
							<div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
								<div className="col-span-2 lg:col-span-1">
									<div className="flex justify-between mb-4 border-b-2 border-gray-700 ">
										<span className="text-gray-500 dark:text-white text-left dark:text-opacity-60">
											Market Cap
										</span>
										<span className="text-gray-900 dark:text-white text-right font-medium">
											{currencyFormatToAbs(details?.market_data?.market_cap?.usd)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Total Volume
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{currencyFormatToAbs(details?.market_data?.total_volume?.usd)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Fully Diluted Valuation
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{currencyFormatToAbs(
												details?.market_data?.fully_diluted_valuation?.usd
											)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Total Value Locked
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{currencyFormatToAbs(details?.market_data?.total_value_locked?.usd)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Fully Diluted Valuation / TVL Ratio
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{details?.market_data?.fdv_to_tvl_ratio}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Market Cap / TVL Ratio
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{details?.market_data?.mcap_to_tvl_ratio}
										</span>
									</div>
								</div>
								<div className="col-span-2 lg:col-span-1">
									<div className="flex justify-between mb-4 border-b-2 border-gray-700 ">
										<span className="text-gray-500 dark:text-white text-left dark:text-opacity-60">
											Circulating Supply
										</span>
										<span className="text-gray-900 dark:text-white text-right font-medium">
											{currencyFormatToAbs(details?.market_data?.circulating_supply)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Total Supply{" "}
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{currencyFormatToAbs(details?.market_data?.total_supply)}
										</span>
									</div>
									<div className="flex justify-between mb-4 border-b-2 border-gray-700">
										<span className="text-gray-500 dark:text-white  text-left  dark:text-opacity-60">
											Max Supply{" "}
										</span>
										<span className="text-gray-900 dark:text-white  text-right  font-medium">
											{currencyFormatToAbs(details?.market_data?.max_supply)}
										</span>
									</div>
								</div>
							</div>
							<div>{chartData ? <LineChart chartData={chartData} /> : null}</div>
						</div>
						<div className="col-span-1 px-5">
							<div className="flex justify-between flex-row px-5">
								<button
									className="
                dark:focus:outline-none dark:focus:text-white dark:hover:bg-sky-600 dark:hover:text-white dark:text-white disabled:opacity-50 focus:outline-none focus:text-white hover:bg-cyan-700 hover:text-white bg-cyan-600 border border-transparent font-medium inline-flex items-center rounded-md text-white justify-center px-2.5 py-1.5 text-xs"
								>
									Buy/Sell
								</button>
								<button
									className="
              dark:focus:outline-none dark:focus:text-white dark:hover:bg-sky-600 dark:hover:text-white dark:text-white disabled:opacity-50 focus:outline-none focus:text-white hover:bg-cyan-700 hover:text-white bg-cyan-600 border border-transparent font-medium inline-flex items-center rounded-md text-white justify-center px-2.5 py-1.5 text-xs"
								>
									Long/Short
								</button>

								<a
									href={`https://etherscan.io/address/${details?.platforms?.ethereum}`}
									className="
              dark:focus:outline-none dark:focus:text-white dark:hover:bg-sky-600 dark:hover:text-white dark:text-white disabled:opacity-50 focus:outline-none focus:text-white hover:bg-cyan-700 hover:text-white bg-cyan-600 border border-transparent font-medium inline-flex items-center rounded-md text-white justify-center px-2.5 py-1.5 text-xs"
								>
									View on Etherscan
								</a>
							</div>
							<div>
								<div className="font-medium text-lg mt-8 text-gray-200">Info</div>
								<div className="flex mb-3 flex-row">
									<div className="w-1/4">
										<span className="text-gray-500 text-xs dark:text-white text-left dark:text-opacity-60">
											{" "}
											Website
										</span>
									</div>
									<div className="flex">
										<a
											href={details?.links?.homepage[0]}
											className="px-2.5 flex items-center justify-center py-1 h-7 my-0.5 rounded-md  text-sm font-medium text-gray-300 bg-cyan-600   "
										>
											{removeHttp(details?.links?.homepage[0])}
										</a>
									</div>
								</div>
								<div className="flex mb-3 flex-row">
									<div className="w-1/4">
										<span className="text-gray-500 dark:text-white text-xs text-left dark:text-opacity-60">
											{" "}
											Source Code
										</span>
									</div>
									<div className="flex">
										<a
											href={details?.links?.repos_url?.github[0]}
											className="px-2.5 flex items-center justify-center py-1 h-7 my-0.5 rounded-md  text-sm font-medium text-gray-300 bg-cyan-600   "
										>
											GitHub
										</a>
									</div>
								</div>
								<div className="flex mb-3 flex-row">
									<div className="w-1/4">
										<span className="text-gray-500 text-xs dark:text-white text-left dark:text-opacity-60">
											{" "}
											Community
										</span>
									</div>
									<div className="flex flex-row">
										<div>
											<a
												href={`http://twitter.com/${details?.links?.twitter_screen_name}`}
												className="px-2.5 flex items-center mr-3 justify-center py-1 h-7 my-0.5 rounded-md  text-sm font-medium text-gray-300 bg-cyan-600   "
											>
												{details?.links?.twitter_screen_name}
											</a>
										</div>
										<div>
											<a
												href={`https://t.me/${details?.links?.telegram_channel_identifier}`}
												className="px-2.5 flex items-center justify-center py-1 h-7 my-0.5 rounded-md  text-sm font-medium text-gray-300 bg-cyan-600   "
											>
												{details?.links?.telegram_channel_identifier}
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="p-5 mt-8 border rounded-xl border-2 border-gray-600">
								<div className="font-medium text-lg text-gray-200">
									{`${covertToUpperCase(details?.symbol || "")}  to USD`}
								</div>
								<div>
									<label
										htmlFor="price"
										className="block text-sm font-medium text-gray-500"
									>
										{`Price in ${covertToUpperCase(details?.symbol || "")}`}
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 flex item-center pl-3"></div>
										<input
											type="number"
											name="price"
											value={coinPrice}
											onChange={(event) => {
												calculateCoin(event);
											}}
											className="block w-full h-10 rounded-md text-white border-gray-300 pl-7 bg-gray-800 pr-12 bg-dark focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
											placeholder="0.00"
											aria-describedby="price-currency"
										/>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
											<span className="text-gray-500 sm:text-sm" id="price-currency">
												{` ${covertToUpperCase(details?.symbol || "")}`}
											</span>
										</div>
									</div>
								</div>
								<div>
									<label
										htmlFor="price"
										className="block text-sm mt-4 font-medium text-gray-500"
									>
										Price in USD
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 flex item-center pl-3">
											{/* <span className="text-gray-500 sm:text-sm"></span> */}
										</div>
										<input
											value={usdPrice}
											onChange={(event) => {
												calculateUsd(event);
											}}
											type="number"
											name="price"
											id="price"
											className="block w-full h-10 rounded-md bg-gray-800 text-white border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="0.00"
											aria-describedby="price-currency"
										/>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
											<span className="text-gray-500 sm:text-sm" id="price-currency">
												USD
											</span>
										</div>
									</div>
								</div>
								<div className="block text-sm font-medium my-2 text-gray-500">
									{`1 ${covertToUpperCase(details?.symbol || "")} = `}
									{currencyFormatToAbs(details?.market_data?.current_price?.usd)}
								</div>
								{/* <button
                                className="
              dark:focus:outline-none w-full h-10 dark:focus:text-white dark:hover:bg-sky-600 dark:hover:text-white dark:text-white disabled:opacity-50 mt-4 focus:outline-none focus:text-white hover:bg-cyan-700 hover:text-white bg-cyan-600 border border-transparent font-medium inline-flex items-center rounded-md text-white justify-center px-2.5 py-1.5 text-xs"
                            >
                                Convert
                            </button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default CoinDetails;
