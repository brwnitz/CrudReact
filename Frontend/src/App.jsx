import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import ProductForm from './Components/ProductForm';

function App(){
    return(
        <Router>
            <nav>
                <a href="/">Início</a>
                <a href="/produtos">Produtos</a>
                <a href="/produtos/novo">Novo produto</a>
            </nav>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/produtos' element={<ProductList/>}/>
                <Route path='/produtos/:id' element={<ProductDetail/>}/>
                <Route path='/produtos/novo' element={<ProductForm/>}/>
                <Route path='/produtos/:id/edit' element={<ProductForm/>}/>
            </Routes>
        </Router>
    )
}

export default App;