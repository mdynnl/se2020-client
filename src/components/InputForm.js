import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Components.css'
import 'antd/dist/antd.css'
import SuccessModal from './Modals'

import {
  Typography,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Select,
  Space,
  Upload,
  Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

// todo: Implement Input Validation

const InputForm = ({ product }) => {
  let initialValues
  if (product !== undefined) {
    initialValues = {
      name: product.name
    }
  }
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    axios
      .get('/api/foreign/warehouses')
      .then(response => {
        setWarehouses(response.data)
      })
      .catch(() => {
        console.log('failed to fetch warehouses')
      })
  }, []) // <= don'f forget the dependency array

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = values => {
    setLoading(true)
    axios
      .post('/api/v1/products', {
        name: values.name,
        price: values.price,
        stockBalance: values.stockBalance,
        warehouseId: 3,
        description: values.description,
        picture: 'http://placeimg.com/500/500/business'
      })
      .then(response => {
        setLoading(false)
        form.resetFields()
        showSuccessModal('Item Added')
        console.log(response)
      })
      .catch(error => {
        setLoading(false)
        showErrorModal(error)
        console.log(error)
      })
    // console.log(values)
  }

  const showSuccessModal = message => {
    Modal.success({ title: 'Item Added', content: 'Item added successfully' })
  }

  const showErrorModal = ({ message }) => {
    Modal.error({ title: 'Failed', content: 'Failed to add item : ' + message })
  }

  return (
    <div className="InputForm">
      <Typography.Title
        level={3}
        style={{ alignSelf: 'center', color: '#343434' }}
      >
        Add A New Product Item
      </Typography.Title>
      <Form
        form={form}
        name="product"
        layout="vertical"
        onFinish={onFinish}
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
                {warehouses.map(({ id, name }) => (
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
                maxLength={50}
                showCount={true}
                placeholder="Item Brief Description"
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" loading={loading} htmlType="submit">
                  Save
                </Button>
                <Link to="/">
                  <Button type="secondary" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default InputForm
