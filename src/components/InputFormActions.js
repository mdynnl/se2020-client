import React from 'react'
import { Row, Button, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const InputFormActions = ({ buttonLoading }) => {
  return (
    <Row justify="space-between" align="middle">
      <Button type="primary" loading={buttonLoading} htmlType="submit">
        Save
      </Button>

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
