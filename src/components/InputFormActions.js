import React from 'react'
import { Row, Popconfirm, Button, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const InputFormActions = ({ buttonLoading, confirm }) => {
  return (
    <Row justify="space-between" align="middle">
      <Popconfirm
        title="Are you sure"
        onConfirm={confirm}
        okText="OK"
        cancelText="Cancel"
      >
        <Button type="primary" htmlType="submit" loading={buttonLoading}>
          Save
        </Button>
      </Popconfirm>
      <Link to="/">
        <Tooltip title="Close">
          <Button
            shape="circle"
            size="large"
            icon={<CloseOutlined />}
            disabled={buttonLoading}
          />
        </Tooltip>
      </Link>
    </Row>
  )
}

export default InputFormActions
