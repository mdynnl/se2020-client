import React, { useContext } from 'react'
import { Modal, Space, Divider, Popconfirm, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ProductInfoCard from './ProductInfoCard'
import { ProductContext } from '../context/ProductContext'

const ProuductInfoModal = ({ handleCancel, confirm }) => {
  const { contextSelectedProduct, contextModalVisible } = useContext(
    ProductContext
  )
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  const [modalVisible, setModalVisible] = contextModalVisible
  return (
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
            <Button type="link" icon={<EditOutlined />} onClick={handleCancel}>
              Edit
            </Button>
          </Link>
        </Space>
      ]}
    >
      <ProductInfoCard />
    </Modal>
  )
}

export default ProuductInfoModal
