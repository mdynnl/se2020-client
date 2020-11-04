import React, { useContext } from 'react'
import './Components.css'
import 'antd/dist/antd.css'
import { Descriptions, Space } from 'antd'
import { ProductContext } from '../context/ProductContext'

const ProductDesc = ({ product }) => {
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
        <Descriptions.Item label="Warehouse">
          {product.warehouse}
        </Descriptions.Item>
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
  const { contextSelectedProduct } = useContext(ProductContext)
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  return (
    <Space size="middle" align="start">
      <ProductImagePreview picture={selectedProduct.picture} />

      <ProductDesc product={selectedProduct} />
    </Space>
  )
}

export default ProductInfoCard
