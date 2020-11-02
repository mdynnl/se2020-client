import { React, useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import {
  Table,
  Typography,
  Row,
  Col,
  Button,
  Space,
  Divider,
  Popconfirm,
  Modal
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './Components.css'
import ProductInfoCard from './ProductInfoCard'
import ProductActions from './ProductActions'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'No.',
    render: (text, record, index) => index + 1
  },
  {
    title: 'Product Name',
    dataIndex: 'name'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    align: 'right'
  },
  {
    title: 'Stock Balance',
    dataIndex: 'stockBalance',
    align: 'right'
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouseId',
    align: 'right'
  }
]

const ProductTable = () => {
  const [tableLoading, setTableLoading] = useState(true)
  const [selectedProduct, setProduct] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const [apiProducts, setApiProducts] = useState([])
  const [apiWarehouses, setApiWarehouses] = useState([])

  useEffect(() => {
    axios
      .all([
        axios.get('/api/foreign/warehouses'),
        axios.get('/api/v1/products')
      ])
      .then(response => {
        const [{ data: warehouses }, { data: products }] = response
        setApiProducts(products)
        setProduct(products[0])
        setApiWarehouses(warehouses)

        setTableLoading(false)
      })
      .catch(() => {
        console.log('failed to fetch products')
      })
  }, []) // <= just copied your code

  const onRowClick = record => ({
    onClick: () => {
      setProduct(record)
      setModalVisible(true)
      console.log(record)
    }
  })

  const handleCancel = () => {
    setModalVisible(false)
  }

  function confirm(e) {
    deleteItem()
  }

  const deleteItem = () => {
    axios
      .delete('/api/v1/products/' + selectedProduct.id)
      .then(response => {
        setModalVisible(false)
        console.log(response)
      })
      .catch(() => {
        setModalVisible(false)
        console.log('failed to delete')
      })
  }

  // not moving columns here
  // just making a new
  const newCols = columns.slice(0, columns.length - 1).concat({
    ...columns[columns.length - 1],
    render: id => {
      const warehouse = apiWarehouses.find(w => w.id == id)
      return warehouse ? warehouse.name : 'unspecified'
    }
  })

  return (
    <Row>
      <Col offset={3} span={18}>
        <div className="ProductTable">
          <Typography.Title level={3}>Product Items</Typography.Title>
          <ProductActions />
          <Table
            columns={newCols} // <= changed
            dataSource={apiProducts}
            rowKey={item => item.id}
            loading={tableLoading}
            scroll={{ x: true }}
            onRow={onRowClick}
          />
        </div>
      </Col>
      <Modal
        title={selectedProduct.name}
        onCancel={handleCancel}
        visible={modalVisible}
        footer={[
          <Space split={<Divider type="vertical" />}>
            <Popconfirm
              title="Are you sure?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
            <Link to="/edit">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={handleCancel}
              >
                Edit
              </Button>
            </Link>
          </Space>
        ]}
      >
        <ProductInfoCard product={selectedProduct} />
      </Modal>
    </Row>
  )
}

export default ProductTable
