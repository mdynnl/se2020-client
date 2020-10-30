import React from 'react';
import './Components.css';
import 'antd/dist/antd.css';
import {
	Typography,
	Form,
	Row,
	Col,
	Card,
	Image,
	Input,
	InputNumber,
	Button,
	Select,
} from 'antd';

const InputForm = () => {
	const Option = { Select };

	const warehouseList = [
		{ id: 1, name: 'Warehouse 1' },
		{ id: 2, name: 'Warehouse 2' },
		{ id: 3, name: 'Yangon Branch' },
		{ id: 4, name: 'Mandalay Branch' },
	];

	return (
		<div className="InputForm">
			<Typography.Title
				level={2}
				style={{ alignSelf: 'center', color: '#343434' }}
			>
				Add A New Product Item
			</Typography.Title>
			<Form layout="vertical">
				<Row>
					<Col>
						<Card
							hoverable={true}
							style={{ marginRight: 24, marginTop: 8, width: 200 }}
							size="small"
						>
							<Image
								alt="ProductItem"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						</Card>
					</Col>
					<Col flex={1} style={{ padding: 8 }}>
						<Form.Item label="Product Name">
							<Input placeholder="Product 1" />
						</Form.Item>
						<Form.Item label="Price">
							<InputNumber
								min={0}
								placeholder="1000"
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label="Stock Balance">
							<InputNumber
								min={0}
								placeholder="100"
								style={{ width: '100%' }}
							/>
						</Form.Item>
						<Form.Item label="Warehouse">
							<Select
								placeholder="Select a warehouse"
								showSearch
								filterOption={(input, option) => {
									return (
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									);
								}}
							>
								{warehouseList.map((warehouse) => {
									return <Option value={warehouse.id}>{warehouse.name}</Option>;
								})}
							</Select>
						</Form.Item>
						<Form.Item label="Description">
							<Input.TextArea placeholder="Item Brief Description" />
						</Form.Item>
						<Form.Item>
							<Button type="primary">Save</Button>
							<Button style={{ marginLeft: 8 }} type="secondary">
								Cancel
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default InputForm;
