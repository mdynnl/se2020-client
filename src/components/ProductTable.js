import { React, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import './Components.css'
import ProductActions from './ProductActions'
import ProductInfoModal from './ProductInfoModal'
import { Table, Typography, Row, Col } from 'antd'
import { ProductContext } from '../context/ProductContext'
import { useHistory } from 'react-router-dom'

// Columns of Table
const columns = [
  {
    title: 'No.',
    render: (text, record, index) => `${index + 1}.`
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
  //Context States

  const {
    contextProducts,
    contextWarehouses,
    contextTrashProducts,
    contextSelectedProduct,
    contextModalVisible
  } = useContext(ProductContext)
  const [apiProducts, setApiProducts] = contextProducts
  const [apiWarehouses, setApiWarehouses] = contextWarehouses
  const [trashProducts, setTrashProducts] = contextTrashProducts
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  const [modalVisible, setModalVisible] = contextModalVisible

  //Local States
  const [tableLoading, setTableLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const history = useHistory()

  useEffect(() => {
    axios
      .all([
        axios.get('/api/foreign/warehouses'),
        axios.get('/api/v1/products'),
        axios.get('/api/v1/products/trash')
      ])
      .then(response => {
        const [
          { data: warehouses },
          { data: products },
          { data: trash }
        ] = response
        setApiProducts(products)
        setApiWarehouses(warehouses)
        setTrashProducts(trash)
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
        console.log('failed to fetch products')
      })
  }, [])

  // Start: Table Row Selection Handlers
  const onRowClick = record => ({
    onClick: () => {
      setSelectedProduct(record)
      setModalVisible(true)
    }
  })

  const onRowSelectChange = selectedRowKeys => {
    setSelectedRows(selectedRowKeys)
  }

  const rowSelection = {
    selectedRows,
    onChange: onRowSelectChange
  }
  //End: Table Row Selection handlers

  //Start: Modal Action Handlers
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

  //End: Modal Action handlers

  //Start: Delete selected Product
  const deleteItem = () => {
    axios
      .delete('/api/v1/products/' + selectedProduct.id)
      .then(response => {
        setModalVisible(false)
        setModalLoading(false)
        setApiProducts(
          apiProducts.filter(item => item.id !== selectedProduct.id)
        )
        console.log(response)
        history.push()
      })
      .catch(() => {
        setModalVisible(false)
        setModalLoading(false)
        console.log('failed to delete')
      })
  }
  //End: Delete Selected Product

  return (
    <Row>
      <Col offset={3} span={18}>
        <div className="ProductTable">
          <Typography.Title level={3}>Product Items</Typography.Title>
          <ProductActions rowsCount={selectedRows.length} />
          <Table
            columns={columns}
            dataSource={apiProducts}
            rowKey={item => item.id}
            loading={tableLoading}
            rowSelection={rowSelection}
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
