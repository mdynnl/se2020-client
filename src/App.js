import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddNewItem from './pages/AddNewItem'
import MainPage from './pages/MainPage'
import { Layout } from 'antd'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <Router>
      <ProductProvider>
        <div className="App">
          <Layout>
            <Layout.Header style={{ color: 'white' }}>
              Product Item Module
            </Layout.Header>
            <Layout.Content>
              <Switch>
                <Route path="/new" exact>
                  <AddNewItem />
                </Route>
                <Route path="/edit" exact>
                  <AddNewItem />
                </Route>
                <Route path="/" exact>
                  <MainPage />
                </Route>
              </Switch>
            </Layout.Content>
          </Layout>
        </div>
      </ProductProvider>
    </Router>
  )
}

export default App
