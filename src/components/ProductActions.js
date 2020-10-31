import { PlusOutlined } from '@ant-design/icons'
import { Button, Row, Space } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link } from 'react-router-dom'

const onSearch = productName => {
  console.log(productName)
}

const ProductActions = () => (
  <Row justify="end space-between">
    <Space
      style={{
        marginBottom: 16
      }}
    >
      <Link to="/add-new">
        <Button type="primary" icon={<PlusOutlined />}>
          Add New
        </Button>
      </Link>
      <Search
        placeholder="Search product"
        onSearch={onSearch}
        enterButton
        allowClear
      />
    </Space>
  </Row>
)

export default ProductActions
