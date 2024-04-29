import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm(){
    const [produto,setProduto] = useState({
        produto_nome:'',
        id_fornecedor:'',
        id_categoria:'',
        produto_unidade:'',
        produto_preco:'',
    })

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:3000/produtos/${id}`)
            .then((response)=>{
                setProduto(response.data);
            })
            .catch((error)=>{
                console.error("Erro ao retornar produto: ",error)
            })
        }
    },[id])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduto({ ...produto, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(id){
            axios.put(`http://localhost:3000/produtos/${id}`, produto)
            .then(()=>{
                navigate('/Produtos')
            })
            .catch((error)=>{
                console.error("Erro ao atualizar produto: ", error)
            })
        } else{
            axios.post('http://localhost:3000/produtos',produto)
            .then(()=>{
                navigate('/Produtos')
            })
            .catch((error) => {
                console.error("Erro ao criar produto: ", error)
            })
        }
    }

    return(
        <div>
            <h2>{id ? 'Editar Produto' : 'Criar Produto'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type='Text' name='produto_nome' value={produto.produto_nome} onChange={handleInputChange}></input></label><br/>
                <label>Fornecedor: <input type='Text' name='id_fornecedor' value={produto.id_fornecedor} onChange={handleInputChange}></input></label><br/>
                <label>Cateogira: <input type='Text' name='id_categoria' value={produto.id_categoria} onChange={handleInputChange}></input></label><br/>
                <label>Unidade: <input type='Text' name='produto_unidade' value={produto.produto_unidade} onChange={handleInputChange}></input></label><br/>
                <label>Preço: <input type='Text' name='produto_preco' value={produto.produto_preco} onChange={handleInputChange}></input></label><br/>
                <button type='submit'>{id ? 'Atualizar Produto' : 'Criar Produto'}</button>
            </form>
        </div>
    )
}

export default ProductForm