import React from "react";

const Paginator = (
        props: { 
            page: number, 
            lastPage: number, 
            pageChanged: (page: number) => void 
        }
    ) => {
    const next = () => {
        if (props.page < props.lastPage) {
            props.pageChanged(props.page + 1)
        }
    }

    const previous = () => {
        if (props.page > 1) {
            props.pageChanged(props.page - 1)
        }
    }

    return (
        <div className="pagination">
            <button style={{ marginRight: '10px' }} type="button" className="btn btn-primary" onClick={previous}>Previous</button>
            <button type="button" className="btn btn-primary" onClick={next}>Next</button>
        </div>
    )
}

export default Paginator