import { React } from 'react';
import './Components.css';
import 'antd/dist/antd.css';
import { Image, Card, Descriptions, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const ProductInfoCard = ({ product }) => {
	return (
		<div style={{ paddingTop: '86px' }}>
			<Card
				title={product.name}
				style={{
					width: '400px',
					margin: '24px',
				}}
			>
				<img
					height="150px"
					width="150px"
					placeholder={true}
					style={{
						marginBottom: '24px',
						objectFit: 'cover',
					}}
					alt="Product Item"
					src={product.imgUrl}
				/>
				<Card.Meta
					description={
						<>
							<Descriptions column={1} size="small">
								<Descriptions.Item label="Product Name">
									{product.name}
								</Descriptions.Item>
								<Descriptions.Item label="Price">
									{product.price}
								</Descriptions.Item>
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
							<br />
							<Button icon={<EditOutlined />}>Edit</Button>
						</>
					}
				/>
			</Card>
		</div>
	);
};

export default ProductInfoCard;
