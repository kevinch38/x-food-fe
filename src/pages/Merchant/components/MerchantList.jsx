import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MerchantItem from './MerchantItem';
import { ServiceContext } from '../../../context/ServiceContext';
import { merchantAction } from '../../../slices/merchantSlice';
import CreateMerchantModal from './CreateMerchantModal';
import EmptyState from '../../../components/EmptyState';

const MerchantList = () => {
	const [searchParam, setSearchParam] = useSearchParams();
	const dispatch = useDispatch();
	const { merchants } = useSelector((state) => state.merchant);
	const { merchantService } = useContext(ServiceContext);

	const [paging, setPaging] = useState({});

	let currentPage = parseInt(searchParam.get('page') || 1);
	let currentSize = parseInt(searchParam.get('size') || 10);

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
						page: currentPage,
						size: currentSize,
					});
					setPaging(result.paging);
					return result;
				})
			);
		};
		onGetMerchants();
	}, [currentPage, currentSize, dispatch, merchantService, merchants.length]);

	useEffect(() => {
		if (currentPage < 1 || currentPage > paging.totalPages) {
			searchParam.set('page', 1);
			setSearchParam(searchParam);
		}
	}, [currentPage, paging.totalPages, searchParam, setSearchParam]);
	console.log(merchants.length);

	return (
		<div
			className='m-4 container-fluid table-responsive'
			style={{ overflowX: 'scroll' }}
		>
			<div className='d-flex w-100'>
				<nav aria-label='page navigation example'>
					<ul className='pagination'>
						<li key={currentPage} className='page-item'>
							<div
								className={`page-link text-black`}
								to={`/backoffice/menus?page=${currentPage}&size=${currentSize}`}
							>
								{currentPage}/{paging.totalPages}
							</div>
						</li>
						<li
							className={`page-link text-black cursor-pointer bi bi-arrow-left-circle ${
								currentPage == 1 && 'disabled'
							}`}
							onClick={() => {
								onPrevious(currentPage);
							}}
						/>

						<li
							className={`page-link text-black cursor-pointer bi bi-arrow-right-circle ${
								currentPage >= paging.totalPages && 'disabled'
							}`}
							onClick={() => {
								onNext(currentPage);
							}}
						/>
					</ul>
				</nav>
				<div className='container'>
					<input
						className='form-control h-75 '
						type='text'
						placeholder='Search...'
					/>
				</div>
			</div>

			<div className='d-flex justify-content-between align-items-center'>
				<h2 className='fw-bold'>Merchant List</h2>
				<i
					className='bi bi-plus-circle-fill h2 cursor-pointer m-2 mt-5'
					style={{
						color: 'rgb(101, 213, 26)',
					}}
					data-bs-toggle='modal'
					data-bs-target={`#createMerchantModal`}
				></i>
			</div>

			{merchants && merchants.length !== 0 ? (
				<>
					<table className='table text-center'>
						<thead>
							<tr>
								<th className='fw-normal'>No</th>
								<th className='fw-normal'>ID</th>
								<th className='fw-normal'>Name</th>
								<th className='fw-normal'>PIC Name</th>
								<th className='fw-normal'>PIC Number</th>
								<th className='fw-normal'>PIC Email</th>
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
			<CreateMerchantModal />
		</div>
	);
};
export default MerchantList;
