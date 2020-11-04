import { React, useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import './Components.css'
import ProductActions from './ProductActions'
import ProductInfoModal from './ProductInfoModal'
import { Table, Typography, Row, Col } from 'antd'

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
  const [selectedProduct, setSelectedProduct] = useState({})
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
        setApiWarehouses(warehouses)
        setTableLoading(false)
      })
      .catch(() => {
        console.log('failed to fetch products')
      })
  }, []) // <= just copied your code

  const onRowClick = record => ({
    onClick: () => {
      setSelectedProduct(record)
      setModalVisible(true)
      console.log(record)
    }
  })

  const handleCancel = () => {
    setModalVisible(false)
  }

  const confirm = e => {
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
      const warehouse = apiWarehouses.find(w => w.id === id)
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
      <ProductInfoModal
        selectedProduct={selectedProduct}
        visible={modalVisible}
        handleCancel={handleCancel}
        confirm={confirm}
      />
    </Row>
  )
}

export default ProductTable
