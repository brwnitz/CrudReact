import { useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

function ProductList(){
    const [produtos, setProdutos] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/Produtos')
        .then((response)=>{
            setProdutos(response.data)
        })
        .catch((error)=>{
            console.error('Erro ao retornar produtos: ', error)
        })
    }, [])


    return(
        <div>
            <h2>Lista de produtos</h2>
            <ul>
                {produtos.map((produto)=>{
                    return(
                    <li key={produto.id_produto}>
                        <Link to={`/produtos/${produto.id_produto}`}>{produto.produto_nome}</Link>
                        <button type="button" onClick={()=>{window.location.href = `/produtos/${produto.id_produto}/edit`}}>Editar</button>
                        <button type="button" onClick={()=>{axios.delete(`http://localhost:3000/Produtos/${produto.id_produto}`).then(()=>{window.location.href = '/produtos'})}}>Delete</button>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ProductList