import { React, useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Table, Typography, Row, Col } from 'antd'
import './Components.css'
import ProductInfoCard from './ProductInfoCard'
import ProductActions from './ProductActions'

const columns = [
  {
    title: 'No',
    key: 'index',
    render: (text, record, index) => index + 1
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    align: 'right'
  },
  {
    title: 'Stock Balance',
    dataIndex: 'stockBalance',
    key: 'stockBalance',
    align: 'right'
  },
  {
    title: 'Warehouse',
    dataIndex: 'warehouseId',
    key: 'warehouseId'
  }
]

const items = [
  {
    id: 1,
    name: 'Product 1',
    price: 10000,
    stockBalance: 250,
    warehouse: 'Warehouse 4',
    description: 'this item is blah blah',
    picture:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
  {
    id: 2,
    name: 'Product 3',
    price: 35000,
    stockBalance: 100,
    warehouse: 'Warehouse 3',
    description: 'this item is blah blah',
    picture: 'https://homepages.cae.wisc.edu/~ece533/images/watch.png'
  },
  {
    id: 3,
    name: 'Product 5',
    price: 50000,
    stockBalance: 100,
    warehouse: 'Warehouse 2',
    description: 'this item is blah blah',
    picture:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
  {
    id: 4,
    name: 'Product 2',
    price: 100000,
    stockBalance: 80,
    warehouse: 'Warehouse 1',
    description: 'Product of Myanmar',
    picture: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png'
  }
]

const ProductTable = () => {
  const [tableLoading, setTableLoading] = useState(true)
  const [product, setProduct] = useState(items[0])

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
      setProduct(record)
    }
  })

  // not moving columns here
  // just making a new
  const newCols = columns.slice(0, columns.length - 2).concat({
    ...columns[columns.length - 1],
    render: id => {
      const warehouse = apiWarehouses.find(w => w.id == id)
      return warehouse ? warehouse.name : 'unspecified'
    }
  })

  return (
    <Row>
      <Col flex="auto">
        <div className="ProductTable">
          <Typography.Title level={3}>Product Items</Typography.Title>
          <ProductActions />
          <Table
            columns={newCols} // <= changed
            dataSource={apiProducts}
            rowKey={item => item.id}
            loading={tableLoading}
            scroll={{ x: 240 }}
            onRow={onRowClick}
          />
        </div>
      </Col>
      <Col>
        <ProductInfoCard product={product} />
      </Col>
    </Row>
  )
}

export default ProductTable
