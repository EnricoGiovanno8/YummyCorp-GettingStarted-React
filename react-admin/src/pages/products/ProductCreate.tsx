import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductCreate = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const sendData = {
            title,
            description,
            image,
            price
        }

        await axios.post('products', sendData)

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to='/products' />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Description</label>
                    <textarea className="form-control" placeholder="Product Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Product Image" value={image} onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Price</label>
                    <input type="number" className="form-control" placeholder="Product Price" onChange={(e) => setPrice(+e.target.value)} />
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Add Product</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default ProductCreate