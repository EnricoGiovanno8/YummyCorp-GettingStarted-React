import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../components/Wrapper";

const ProductEdit = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`products/${+window.location.pathname.substring(10)}`)

                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setPrice(data.price)
            }
        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const sendData = {
            title,
            description,
            image,
            price
        }

        await axios.put(`products/${+window.location.pathname.substring(10)}`, sendData)

        setRedirect(true)
    }

    const updateImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url
        }
        setImage(url)
    }

    if (redirect) {
        return <Navigate to='/products' />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" placeholder="Product Name" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Description</label>
                    <textarea className="form-control" placeholder="Product Description" defaultValue={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Product Image" ref={ref} defaultValue={image} onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload uploaded={updateImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Price</label>
                    <input type="number" className="form-control" placeholder="Product Price" value={price} onChange={(e) => setPrice(+e.target.value)} />
                </div>
                <div>
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default ProductEdit