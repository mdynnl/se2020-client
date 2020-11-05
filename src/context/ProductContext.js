import React, { useState, createContext } from 'react'

export const ProductContext = createContext()
export const ProductProvider = props => {
  const [apiProducts, setApiProducts] = useState([])
  const [apiWarehouses, setApiWarehouses] = useState([])

  const [selectedProduct, setSelectedProduct] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ProductContext.Provider
      value={{
        contextProducts: [apiProducts, setApiProducts],
        contextWarehouses: [apiWarehouses, setApiWarehouses],
        contextSelectedProduct: [selectedProduct, setSelectedProduct],
        contextModalVisible: [modalVisible, setModalVisible]
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}
