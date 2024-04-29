import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail(){
    const {id} = useParams()
    const [produto, setProduto] = useState(null)

    useEffect(()=>{
        axios
        .get(`http://localhost:3000/produtos/${id}`)
        .then((response)=>{
            setProduto(response.data)
        })
        .catch((error)=>{
            console.error("Erro ao retornar produto: ", error)
        })
    },[id])
    if(!produto){
        return <p>Carregando</p>
    }

    return(
        <div>
            <h2>{produto.produto_nome}</h2>
            <p>Fornecedor: {produto.id_fornecedor}</p>
            <p>Categoria: {produto.id_categoria}</p>
            <p>Unidade: {produto.produto_unidade}</p>
            <p>Preço {produto.produto_preco}</p>
        </div>
    )
}

export default ProductDetail;