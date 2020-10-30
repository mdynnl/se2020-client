import { Layout } from 'antd';
import InputForm from '../components/InputForm';

const { Header, Content } = Layout;

function AddNewItem() {
	return (
		<div className="App">
			<Layout>
				<Header
					style={{
						color: 'white',
					}}
				>
					Product Item Module
				</Header>
				<Content>
					<InputForm />
				</Content>
			</Layout>
		</div>
	);
}

export default AddNewItem;
