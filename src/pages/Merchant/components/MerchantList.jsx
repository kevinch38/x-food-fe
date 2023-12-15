import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MerchantItem from './MerchantItem';
import { ServiceContext } from '../../../context/ServiceContext';
import { merchantAction } from '../../../slices/merchantSlice';

const MerchantList = () => {
	const [searchParam, setSearchParam] = useSearchParams();
	const dispatch = useDispatch();
	const { merchants } = useSelector((state) => state.merchant);
	const { merchantService } = useContext(ServiceContext);
	// console.log(merchantService);
	const [paging, setPaging] = useState({});

	const currentPage = parseInt(searchParam.get('page') || 1);
	const currentSize = parseInt(searchParam.get('size') || 1);

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
	}, [currentPage, currentSize, dispatch, merchantService]);

	useEffect(() => {
		if (currentPage < 1 || currentPage > paging.totalPages) {
			searchParam.set('page', 1);
			setSearchParam(searchParam);
		}
	}, [currentPage, paging.totalPages, searchParam, setSearchParam]);

	return (
		<div className='m-4'>
			{merchants && merchants.length !== 0 && (
				<div className='d-flex'>
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
									currentPage >= paging.totalPages &&
									'disabled'
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
			)}

			<div className='d-flex justify-content-between align-items-center'>
				<h2 className='fw-bold'>Merchant List</h2>
			</div>
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
						<th></th>
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
		</div>
	);
};
export default MerchantList;
