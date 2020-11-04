import React from 'react'
import { Modal, Space, Divider, Popconfirm, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ProductInfoCard from './ProductInfoCard'

const ProuductInfoModal = ({
  selectedProduct,
  visible,
  handleCancel,
  confirm
}) => {
  return (
    <Modal
      title={selectedProduct.name}
      onCancel={handleCancel}
      visible={visible}
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
      <ProductInfoCard product={selectedProduct} />
    </Modal>
  )
}

export default ProuductInfoModal
