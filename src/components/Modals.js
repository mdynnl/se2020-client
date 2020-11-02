import React from 'react'
import { Modal } from 'antd'

const SuccessModal = ({ message }) => {
  Modal.success({ content: message })
}

export default SuccessModal
