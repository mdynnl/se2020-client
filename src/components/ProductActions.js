import React, { useContext } from 'react'
import { PlusOutlined, DeleteOutlined, RestOutlined } from '@ant-design/icons'
import { Button, Row, Col, Space, Badge, Divider } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

const onSearch = productName => {
  console.log(productName)
}

const ProductActions = ({ rowsCount }) => {
  const hasSelectedRows = rowsCount > 0

  const { contextTrashProducts } = useContext(ProductContext)
  const [trashProducts, setTrashProducts] = contextTrashProducts

  return (
    <Row justify="end space-between">
      <Col flex={1}>
        <Space>
          <Badge count={trashProducts.length}>
            <Button size="large" type="link" icon={<RestOutlined />} />
          </Badge>
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            disabled={!hasSelectedRows}
          >
            Delete
          </Button>
          <span>{hasSelectedRows ? `Selected ${rowsCount} items` : ''}</span>
        </Space>
      </Col>
      <Col>
        <Space
          align="end"
          style={{
            marginBottom: 16
          }}
        >
          <Link to="/products/new">
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
      </Col>
    </Row>
  )
}

export default ProductActions
