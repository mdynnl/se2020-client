import React, { useState } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const UploadButton = () => (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Photo</div>
  </div>
)

const ImageUpload = () => {
  const [fileList, setFileList] = useState([])

  return (
    <Upload
      name="picture"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={f => setFileList([...fileList, f])}
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
