import { React, useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Table, Typography, Row } from 'antd'
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
    key: 'warehouse'
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
  const [product, setProduct] = useState(items[0])

  const [apiProducts, setApiProducts] = useState([])

  useEffect(() => {
    axios
      .get('/api/v1/products')
      .then(response => {
        setApiProducts(response.data)
      })
      .catch(() => {
        console.log('failed to fetch products')
      })
  }, []) // <= just copied your code

  const onRowClick = record => ({
    onClick: () => {
      setProduct(record)
      console.log(record)
    }
  })

  return (
    <Row>
      <div className="ProductTable">
        <Typography.Title level={3}>Product Items</Typography.Title>
        <ProductActions />
        <Table
          columns={columns}
          dataSource={apiProducts}
          rowKey={item => item.id}
          scroll={{ x: 240 }}
          onRow={onRowClick}
        />
      </div>
      <ProductInfoCard product={product} />
    </Row>
  )
}

export default ProductTable
