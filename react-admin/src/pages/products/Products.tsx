import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Product } from "../../models/product";

const Products = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`products?page=${page}`)

                setProducts(data.data)
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page])

    const del = async (id: number) => {
        if (window.confirm(`Are you sure you want to delete Product #${id}`)) {
            await axios.delete(`products/${id}`)
            const { data } = await axios.get(`products?page=${page}`)

            setProducts(data.data)
            setLastPage(data.meta.last_page)
        }
    }

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: Product) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} width="50px" alt="product" /></td>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>
                                        <Link to={`/products/${p.id}`}><button type="button" className="btn btn-warning">Edit</button></Link>
                                        <button type="button" className="btn btn-danger" onClick={() => del(p.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} /*pageChanged={page => setPage(page)} OR*/ pageChanged={setPage} />
        </Wrapper>
    )
}

export default Products