import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Components.css'
import 'antd/dist/antd.css'
import {
  Typography,
  Form,
  Row,
  Col,
  Card,
  Image,
  Input,
  InputNumber,
  Button,
  Select,
  Space,
  Upload
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const InputForm = () => {
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

  return (
    <div className="InputForm">
      <Typography.Title
        level={3}
        style={{ alignSelf: 'center', color: '#343434' }}
      >
        Add A New Product Item
      </Typography.Title>
      <Form layout="vertical">
        <Row>
          <Col>
            <Upload
              name="picture"
              listType="picture-card"
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
            <Form.Item label="Product Name">
              <Input placeholder="Product 1" />
            </Form.Item>
            <Form.Item label="Price">
              <InputNumber
                min={0}
                placeholder="1000"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Stock Balance">
              <InputNumber
                min={0}
                placeholder="100"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Warehouse">
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
            <Form.Item label="Description">
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
                <Button type="primary">Save</Button>
                <Link to="/">
                  <Button type="secondary">Cancel</Button>
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
