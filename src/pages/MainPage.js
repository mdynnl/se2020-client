import { Layout } from 'antd';
import ProductTable from '../components/ProductTable';

const { Content } = Layout;

function MainPage() {
	return (
		<div>
			<Layout>
				<Content>
					<ProductTable />
				</Content>
			</Layout>
		</div>
	);
}

export default MainPage;
