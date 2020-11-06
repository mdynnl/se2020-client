import React, { useState, useContext } from 'react'
import axios from 'axios'
import './Components.css'
import 'antd/dist/antd.css'
import { ProductContext } from '../context/ProductContext'
import {
  Typography,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Upload,
  Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import InputFormActions from './InputFormActions'
import { useLocation } from 'react-router-dom'

// todo: Implement Input Validation

const showSuccessModal = () => {
  Modal.success({
    centered: true,
    title: 'Product Saved',
    content: 'Product Saved successfully'
  })
}

const showErrorModal = ({ message }) => {
  Modal.error({
    centered: true,
    title: 'Failed',
    content: 'Failed to add product : ' + message
  })
}

const InputForm = () => {
  const { contextWarehouses, contextSelectedProduct } = useContext(
    ProductContext
  )
  const [apiWarehouses, setApiWarehouses] = contextWarehouses
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  const [buttonLoading, setButtonLoading] = useState(false)
  const [form] = Form.useForm()

  const location = useLocation()

  let title = 'Add A New Product Item'
  let apiPath = '/api/v1/products'
  let message = 'Item Added'
  let initialValues = {}

  if (location.pathname === '/edit') {
    initialValues = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      stockBalance: selectedProduct.stockBalance,
      warehouseId: selectedProduct.warehouseId,
      description: selectedProduct.description
    }
    title = 'Edit Product'
    apiPath = '/api/v1/products/' + selectedProduct.id
    message = 'Item Updated'
  }

  const confirm = e => {
    setButtonLoading(true)
    axios
      .post(apiPath, {
        name: form.getFieldValue('name'),
        price: form.getFieldValue('price'),
        stockBalance: form.getFieldValue('stockBalance'),
        warehouseId: form.getFieldValue('warehouseId'),
        description: form.getFieldValue('description'),
        picture: 'http://placeimg.com/500/500/business'
      })
      .then(response => {
        setButtonLoading(false)
        form.resetFields()
        showSuccessModal(message)
        console.log(response)
      })
      .catch(error => {
        setButtonLoading(false)
        showErrorModal(error)
        console.log(error)
      })
  }

  const showConfirmationModal = () => {
    Modal.confirm({
      title: 'Are you sure to save this product?',
      centered: true,
      onOk() {
        confirm()
      },
      onCancel() {}
    })
  }

  return (
    <div className="InputForm">
      <Typography.Title
        level={3}
        style={{ alignSelf: 'center', color: '#343434' }}
      >
        {title}
      </Typography.Title>
      <Form
        form={form}
        name="product"
        layout="vertical"
        initialValues={initialValues}
      >
        <Row>
          <Col>
            <Upload
              name="picture"
              listType="picture-card"
              showUploadList={false}
              style={{
                width: '200px',
                height: '200px'
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Col>
          <Col flex={1} style={{ padding: 8 }}>
            <Form.Item name="name" label="Product Name">
              <Input placeholder="Product 1" />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <InputNumber
                min={0}
                placeholder="1000"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item name="stockBalance" label="Stock Balance">
              <InputNumber
                min={0}
                placeholder="100"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item name="warehouseId" label="Warehouse">
              <Select
                placeholder="Select a warehouse"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {apiWarehouses.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 4
                }}
                maxLength={100}
                showCount={true}
                placeholder="Item Brief Description"
              />
            </Form.Item>
            <Form.Item>
              <InputFormActions
                buttonLoading={buttonLoading}
                confirm={showConfirmationModal}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InputForm
