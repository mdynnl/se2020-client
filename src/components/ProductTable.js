import { React, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Input, Row, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Components.css';
import ProductInfoCard from './ProductInfoCard';
import { Link } from 'react-router-dom';

const { Search } = Input;

const columns = [
	{
		title: 'No.',
		dataIndex: 'id',
		key: 1,
	},
	{
		title: 'Product Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		align: 'right',
	},
	{
		title: 'Stock Balance',
		dataIndex: 'stockBalance',
		key: 'stockBalance',
		align: 'right',
	},
	{
		title: 'Warehouse',
		dataIndex: 'warehouse',
		key: 'warehouse',
	},
];

const items = [
	{
		id: 1,
		name: 'Product 1',
		price: 10000,
		stockBalance: 250,
		warehouse: 'Warehouse 1',
		description: 'this item is blah blah',
		imgUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
	},
	{
		id: 2,
		name: 'Product 3',
		price: 35000,
		stockBalance: 100,
		warehouse: 'Warehouse 3',
		description: 'this item is blah blah',
		imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png',
	},
	{
		id: 3,
		name: 'Product 5',
		price: 50000,
		stockBalance: 100,
		warehouse: 'Yangon Warehouse',
		description: 'this item is blah blah',
		imgUrl:
			'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
	},
	{
		id: 4,
		name: 'Product 2',
		price: 100000,
		stockBalance: 80,
		warehouse: 'Warehouse 1',
		description: 'Product of Myanmar',
		imgUrl: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
	},
];

const onSearch = (productName) => {
	console.log(productName);
};

const ProductTable = () => {
	const [product, setProduct] = useState(items[0]);

	const onRowClick = (record) => {
		return {
			onClick: () => {
				setProduct(record);
				console.log(record);
			},
		};
	};

	return (
		<Row>
			<div className="ProductTable">
				<Typography.Title level={'h3'}>Product Items</Typography.Title>
				<Row justify="end space-between">
					<Space
						style={{
							marginBottom: '16px',
						}}
					>
						<Link to="/add-new">
							<Button  type="primary" icon={<PlusOutlined />}>Add New</Button>
						</Link>
						<Search
							style={{
								width: '200px',
							}}
							placeholder="Search product"
							onSearch={onSearch}
							enterButton
							allowClear
						/>
					</Space>
				</Row>
				<Table
					columns={columns}
					dataSource={items}
					scroll={{ x: 240 }}
					onRow={onRowClick}
				/>
			</div>
			<ProductInfoCard product={product} />
		</Row>
	);
};

export default ProductTable;
