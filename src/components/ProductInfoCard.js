import { React } from 'react'
import './Components.css'
import 'antd/dist/antd.css'
import { Card, Descriptions, Button, Space } from 'antd'
import {
  EditOutlined,
  DollarTwoTone,
  FileTextTwoTone,
  HomeTwoTone,
  FundTwoTone
} from '@ant-design/icons'

const iconStyle = {
  style: {
    fontSize: 18
  }
}

const ProductDesc = ({ product }) => {
  return (
    <>
      <Descriptions column={1} size="middle">
        <Descriptions.Item>
          <Space>
            <DollarTwoTone {...iconStyle} />
            {product.price}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item>
          <Space>
            <FundTwoTone {...iconStyle} />
            {product.stockBalance}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item>
          <Space>
            <HomeTwoTone {...iconStyle} />
            {product.warehouse}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item>
          <Space align="baseline">
            <FileTextTwoTone {...iconStyle} />
            {product.description}
          </Space>
        </Descriptions.Item>
      </Descriptions>
      {/* <br />
      <Button icon={<EditOutlined />}>Edit</Button> */}
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

const ProductInfoCard = ({ product }) => {
  return (
    <div style={{ paddingTop: '86px' }}>
      <Card
        title={product.name}
        style={{
          width: '400px',
          margin: '24px'
        }}
      >
        <Space size="middle" align="start">
          <ProductImagePreview picture={product.picture} />

          <Card.Meta description={<ProductDesc product={product} />} />
        </Space>
      </Card>
    </div>
  )
}

export default ProductInfoCard
