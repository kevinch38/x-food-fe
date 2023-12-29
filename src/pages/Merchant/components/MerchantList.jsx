import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MerchantItem from './MerchantItem';
import { ServiceContext } from '../../../context/ServiceContext';
import { merchantAction } from '../../../slices/merchantSlice';
import CreateMerchantModal from './CreateMerchantModal';
import EmptyState from '../../../components/EmptyState';
import DeleteMerchantModal from './DeleteMerchantModal';
import { useDebounce } from '@uidotdev/usehooks';

const MerchantList = () => {
	const [searchParam, setSearchParam] = useSearchParams();
	const dispatch = useDispatch();
	const { merchants } = useSelector((state) => state.merchant);
	const { merchantService } = useContext(ServiceContext);

	const [paging, setPaging] = useState({});
	const [merchantID, setMerchantID] = useState();

	let currentPage = parseInt(searchParam.get('page') || 1);
	let currentSize = parseInt(searchParam.get('size') || 10);

	const [searchState, setSearchState] = useState(
		searchParam.get('search') || ''
	);
	const debounceSearch = useDebounce(searchState, 300);

	const handleChange = (e) => {
		const { value } = e.target;
		setSearchState(value);

		if (value.trim() === '') {
			searchParam.delete('search');
			setSearchParam(searchParam);
		}
	};

	const onNext = () => {
		if (currentPage === paging.totalPages) return;
		searchParam.set('page', currentPage + 1);
		setSearchParam(searchParam);
	};

	const onPrevious = () => {
		if (currentPage === 1) return;
		searchParam.set('page', currentPage - 1);
		setSearchParam(searchParam);
	};

	// useEffect(() => {
	// 	currentPage = parseInt(searchParam.get('page') || 1);
	// 	currentSize = parseInt(searchParam.get('size') || 10);
	// }, [paging]);

	useEffect(() => {
		const onGetMerchants = () => {
			dispatch(
				merchantAction(async () => {
					const result = await merchantService.fetchMerchants({
						paging: true,
						page: currentPage,
						size: currentSize,
						merchantName: debounceSearch,
					});
					setPaging(result.paging);
					return result;
				})
			);
		};
		onGetMerchants();
	}, [
		currentPage,
		currentSize,
		debounceSearch,
		dispatch,
		merchantService,
		merchants.length,
	]);

	useEffect(() => {
		searchParam.set('search', debounceSearch);
		setSearchParam(searchParam);
	}, [debounceSearch, searchParam, setSearchParam]);

	useEffect(() => {
		if (currentPage < 1 || currentPage > paging.totalPages) {
			searchParam.set('page', 1);
			setSearchParam(searchParam);
		}
	}, [currentPage, paging.totalPages, searchParam, setSearchParam]);

	console.log(searchParam.toString());
	return (
		<>
			<div className='mt-0 m-4 container-fluid mb-0'>
				<div className='d-flex w-100 mt-0 mb-0'>
					<nav aria-label='page navigation example'>
						<ul className='pagination d-flex align-items-center mt-3'>
							<li key={currentPage} className='page-item'>
								<div
									className={`text-black h5 ${
										paging.totalPages ? `me-2` : ` me-3`
									}`}
									to={`/backoffice/menus?page=${currentPage}&size=${currentSize}`}
								>
									{currentPage}/{paging.totalPages}
								</div>
							</li>
							<li
								className={`h2 me-2 text-black cursor-pointer bi bi-arrow-left-circle ${
									currentPage == 1 && 'disabled'
								}`}
								onClick={() => {
									onPrevious(currentPage);
								}}
							/>

							<li
								className={`h2 text-black cursor-pointer bi bi-arrow-right-circle ${
									currentPage >= paging.totalPages &&
									'disabled'
								}`}
								onClick={() => {
									onNext(currentPage);
								}}
							/>
						</ul>
					</nav>
					<div className='container mt-1 mb-0 p-0'>
						<input
							onChange={handleChange}
							className='form-control h-75 mb-0'
							type='text'
							name="search"
							id="search"
							value={searchState}
							placeholder='Search By Merchant Name'
						/>
					</div>
				</div>
			</div>
			<hr className='mt-0' />
			<div
				className='mt-0 m-0 container-fluid table-responsive'
				style={{ overflowX: 'scroll' }}
			>
				<div className='d-flex justify-content-between align-items-center'>
					<h2 className='fw-bold'>Merchant List</h2>
					<i
						className='bi bi-plus-circle-fill h2 cursor-pointer m-2 mt-4'
						style={{
							color: 'rgb(101, 213, 26)',
						}}
						onClick={() => {setMerchantID(null);setSearchState('')}}
						data-bs-toggle='modal'
						data-bs-target={`#createMerchantModal`}
					></i>
				</div>

				{merchants && merchants.length !== 0 ? (
					<>
						<table className='table text-center align-middle'>
							<thead>
								<tr>
									<th className='fw-normal'>No</th>
									<th className='fw-normal'>ID</th>
									<th className='fw-normal'>Name</th>
									<th
										className='fw-normal'
										style={{ minWidth: '100px' }}
									>
										PIC Name
									</th>
									<th
										className='fw-normal'
										style={{ minWidth: '100px' }}
									>
										PIC Number
									</th>
									<th
										className='fw-normal'
										style={{ minWidth: '100px' }}
									>
										PIC Email
									</th>
									<th className='fw-normal'>Description</th>
									<th className='fw-normal'>Status</th>
									<th className='fw-normal'>Join Date</th>
									<th className='fw-normal'>Created At</th>
									<th className='fw-normal'>Updated At</th>
									<th className='fw-normal'>Action</th>
									<th style={{ minWidth: '100px' }}></th>
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{merchants &&
									merchants.length !== 0 &&
									merchants.map((merchant, idx) => {
										return (
											<MerchantItem
												key={merchant.merchantID}
												merchant={merchant}
												idx={++idx}
												setMerchantID={setMerchantID}
											/>
										);
									})}
							</tbody>
						</table>
					</>
				) : (
					<div className='w-100'>
						<EmptyState />
					</div>
				)}
				<CreateMerchantModal
					setMerchantID={setMerchantID}
					merchantID={merchantID}
				/>
				<DeleteMerchantModal
					setMerchantID={setMerchantID}
					merchantID={merchantID}
				/>
			</div>
		</>
	);
};
export default MerchantList;
