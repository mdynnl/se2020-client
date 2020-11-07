import { React, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import './Components.css'
import ProductActions from './ProductActions'
import ProductInfoModal from './ProductInfoModal'
import { Table, Typography, Row, Col } from 'antd'
import { ProductContext } from '../context/ProductContext'
import { useHistory } from 'react-router-dom'

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
    dataIndex: ['warehouse', 'name'],
    align: 'right'
  }
]

const ProductTable = () => {
  const [tableLoading, setTableLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)
  const history = useHistory()

  const {
    contextProducts,
    contextWarehouses,
    contextSelectedProduct,
    contextModalVisible
  } = useContext(ProductContext)
  const [apiProducts, setApiProducts] = contextProducts
  const [apiWarehouses, setApiWarehouses] = contextWarehouses
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  const [modalVisible, setModalVisible] = contextModalVisible

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
  }, [])

  const onRowClick = record => ({
    onClick: () => {
      setSelectedProduct(record)
      setModalVisible(true)
    }
  })

  const handleEdit = () => {
    setModalVisible(false)
  }

  const handleCancel = () => {
    setModalVisible(false)
    setSelectedProduct({})
  }

  const confirm = e => {
    setModalLoading(true)

    deleteItem()
  }

  const deleteItem = () => {
    axios
      .delete('/api/v1/products/' + selectedProduct.id)
      .then(response => {
        setModalVisible(false)
        setModalLoading(false)
        console.log(response)
        history.push()
      })
      .catch(() => {
        setModalVisible(false)
        setModalLoading(false)
        console.log('failed to delete')
      })
  }

  return (
    <Row>
      <Col offset={3} span={18}>
        <div className="ProductTable">
          <Typography.Title level={3}>Product Items</Typography.Title>
          <ProductActions />
          <Table
            columns={columns}
            dataSource={apiProducts}
            rowKey={item => item.id}
            loading={tableLoading}
            scroll={{ x: true }}
            onRow={onRowClick}
          />
        </div>
      </Col>
      <ProductInfoModal
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        confirm={confirm}
        modalLoading={modalLoading}
      />
    </Row>
  )
}

export default ProductTable
