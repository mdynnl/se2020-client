import React, { useState, createContext } from 'react'

export const ProductContext = createContext()
export const ProductProvider = props => {
  const [apiProducts, setApiProducts] = useState([])
  const [apiWarehouses, setApiWarehouses] = useState([])

  const [selectedProduct, setSelectedProduct] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <ProductContext.Provider
      value={{
        contextProducts: [apiProducts, setApiProducts],
        contextWarehouses: [apiWarehouses, setApiWarehouses],
        contextSelectedProduct: [selectedProduct, setSelectedProduct],
        contextModalVisible: [modalVisible, setModalVisible],
        contextIsEdit: [isEdit, setIsEdit]
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}
