import React, { useState } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Photo</div>
  </div>
)

const ImageUpload = ({ fileList, setFileList, handleUpload }) => {
  return (
    <Upload
      name="picture"
      listType="picture-card"
      handleUpload={handleUpload}
      onChange={fileList => setFileList(fileList)}
      beforeUpload={f => setFileList(f)}
      style={{
        width: '200px',
        height: '200px'
      }}
    >
      {fileList.length >= 1 ? null : <UploadButton />}
    </Upload>
  )
}

export default ImageUpload
