import React from 'react';
import './Components.css';
import 'antd/dist/antd.css';
import { Typography, Image, Button, Descriptions } from 'antd';

const ProductDetail = () => {
	const product = {
		name: 'Product 1',
		price: 20000,
		stockBalance: 100,
		warehouse: 'Mandalay Branch',
		description: 'This product is for blah blah',
	};

	return (
		<div className="ProductDetail">
			<Typography.Title level={5} style={{ color: '#343434' }}>
				Product Info
			</Typography.Title>
			<Image
				width="200px"
				style={{ marginTop: '8px', marginBottom: '24px' }}
				alt="ProductItem"
				src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
			/>
			<br />
			<Descriptions column={1}>
				<Descriptions.Item label="Product Name">
					{product.name}
				</Descriptions.Item>
				<Descriptions.Item label="Price">{product.price}</Descriptions.Item>
				<Descriptions.Item label="Stock Balance">
					{product.stockBalance}
				</Descriptions.Item>
				<Descriptions.Item label="Warehouse">
					{product.warehouse}
				</Descriptions.Item>
				<Descriptions.Item label="Description">
					{product.description}
				</Descriptions.Item>
			</Descriptions>
			<Button type="primary">Edit</Button>
		</div>
	);
};

export default ProductDetail;
