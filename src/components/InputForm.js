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
  Modal
} from 'antd'
import InputFormActions from './InputFormActions'
import ImageUpload from './ImageUpload'
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
  const [fileList, setFileList] = useState([])

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
    const fields = {
      name: form.getFieldValue('name'),
      price: form.getFieldValue('price'),
      stockBalance: form.getFieldValue('stockBalance'),
      warehouseId: form.getFieldValue('warehouseId'),
      description: form.getFieldValue('description')
    }
    const formData = new FormData()
    for (let k in fields) formData.append(k, fields[k])
    fileList.length && formData.append('picture', ...fileList)
    console.log(formData)
    axios
      .post(apiPath, formData)
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
        requiredMark={false}
        onFinish={showConfirmationModal}
        initialValues={initialValues}
      >
        <Row>
          <Col style={{ padding: 8 }}>
            <ImageUpload />
          </Col>
          <Col flex={1} style={{ padding: 8 }}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Product Name is required' }]}
            >
              <Input placeholder="Product 1" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Price is required' }]}
            >
              <InputNumber
                min={0}
                placeholder="1000"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              name="stockBalance"
              label="Stock Balance"
              rules={[{ required: true, message: 'Stock Balance is required' }]}
            >
              <InputNumber
                min={0}
                placeholder="100"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              name="warehouseId"
              label="Warehouse"
              rules={[{ required: true, message: 'Warehouse is required' }]}
            >
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
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Product Description is required' }
              ]}
            >
              <Input.TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 4
                }}
                maxLength={150}
                showCount={true}
                placeholder="Item Brief Description"
              />
            </Form.Item>
            <Form.Item>
              <InputFormActions buttonLoading={buttonLoading} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InputForm
