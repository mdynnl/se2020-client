import React, { useContext } from 'react'
import './Components.css'
import 'antd/dist/antd.css'
import { Descriptions, Space } from 'antd'
import { ProductContext } from '../context/ProductContext'

const ProductDesc = ({ product, warehouse }) => {
  return (
    <>
      <Descriptions column={1} size="middle">
        <Descriptions.Item label="Product Name">
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Stock Balance">
          {product.stockBalance}
        </Descriptions.Item>
        <Descriptions.Item label="Warehouse">{warehouse}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {product.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

const ProductImagePreview = ({ picture }) => {
  return (
    <img
      height="150px"
      width="150px"
      style={{
        objectFit: 'cover'
      }}
      alt="Product Item"
      src={picture}
    />
  )
}

const ProductInfoCard = () => {
  const { contextWarehouses, contextSelectedProduct } = useContext(
    ProductContext
  )
  const [apiWarehouses, setApiWarehouses] = contextWarehouses
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct

  const findWarehouse = () => {
    const warehouse = apiWarehouses.find(
      element => element.id == selectedProduct.warehouseId
    )
    return warehouse ? warehouse.name : 'unspecified'
  }

  return (
    <Space size="middle" align="start">
      <ProductImagePreview picture={selectedProduct.picture} />

      <ProductDesc product={selectedProduct} warehouse={findWarehouse()} />
    </Space>
  )
}

export default ProductInfoCard
