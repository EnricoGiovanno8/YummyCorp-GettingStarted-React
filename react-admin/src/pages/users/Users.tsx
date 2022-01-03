import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`users?page=${page}`)

        setUsers(data.data)
        setLastPage(data.meta.last_page)
      }
    ) ()
  }, [page])

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1)
    }
  }

  const previous = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const del = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete User #${id}`)) {
      await axios.delete(`users/${id}`)
      const { data } = await axios.get(`users?page=${page}`)

      setUsers(data.data)
      setLastPage(data.meta.last_page)
    }
  }

  return (
    <Wrapper>
      <div className="add-user">
        <Link to="/users/create">
          <button type="button" className="btn btn-success" onClick={previous}>Add</button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                      <button type="button" className="btn btn-danger" onClick={() => del(user.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button style={{ marginRight: '10px' }} type="button" className="btn btn-primary" onClick={previous}>Previous</button>
        <button type="button" className="btn btn-primary" onClick={next}>Next</button>
      </div>
    </Wrapper>
  )
}

export default Users;