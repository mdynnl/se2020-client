import React, { useState, useEffect, useContext } from 'react'
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
  Button,
  Select,
  Upload,
  Modal,
  Tooltip
} from 'antd'
import {
  PlusOutlined,
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import InputFormActions from './InputFormActions'

// todo: Implement Input Validation

const showSuccessModal = message => {
  Modal.success({ title: 'Item Added', content: 'Item added successfully' })
}

const showErrorModal = ({ message }) => {
  Modal.error({ title: 'Failed', content: 'Failed to add item : ' + message })
}

const InputForm = () => {
  const {
    contextWarehouses,
    contextSelectedProduct,
    contextIsEdit
  } = useContext(ProductContext)
  const [apiWarehouses, setApiWarehouses] = contextWarehouses
  const [selectedProduct, setSelectedProduct] = contextSelectedProduct
  const [isEdit, setIsEdit] = contextIsEdit

  const [form] = Form.useForm()

  const [buttonLoading, setButtonLoading] = useState(false)

  const confirm = e => {
    setButtonLoading(true)
    axios
      .post('/api/v1/products', {
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
        showSuccessModal('Item Added')
        console.log(response)
      })
      .catch(error => {
        setButtonLoading(false)
        showErrorModal(error)
        console.log(error)
      })
  }

  return (
    <div className="InputForm">
      <Typography.Title
        level={3}
        style={{ alignSelf: 'center', color: '#343434' }}
      >
        Add A New Product Item
      </Typography.Title>
      <Form form={form} name="product" layout="vertical">
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
                confirm={confirm}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InputForm
