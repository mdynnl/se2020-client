import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import AddNewItem from './pages/AddNewItem'
import MainPage from './pages/MainPage'
import CompanyAvatar from './components/CompanyAvatar'
import { Layout } from 'antd'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <Router>
      <ProductProvider>
        <div className="App">
          <Layout>
            <Layout.Header style={{ color: 'white' }}>
              <CompanyAvatar />
            </Layout.Header>
            <Layout.Content>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/products" />
                </Route>
                <Route path="/products" exact>
                  <MainPage />
                </Route>

                <Route path="/products/trash" exact>
                  recycle bin
                </Route>

                <Route path="/products/new" exact>
                  <AddNewItem />
                </Route>

                <Route path="/products/:id/edit" exact>
                  <AddNewItem />
                </Route>

                <Route path="/products/:id" exact>
                  product info
                </Route>

                <Route path="*" exact>
                  404 not found
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
