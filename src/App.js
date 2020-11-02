import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddNewItem from './pages/AddNewItem'
import MainPage from './pages/MainPage'
import { Layout } from 'antd'

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Layout.Header
            style={{
              color: 'white'
            }}
          >
            Product Item Module
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route path="/add-new" exact>
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
    </Router>
  )
}

export default App
