import React from 'react'
import { Table } from 'antd';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState();
    const [user, setUser] = useState();
    const getUser = async () => {
      const token = localStorage.getItem("userToken");
      const req = await fetch(
        `https://sheltered-dusk-77313.herokuapp.com/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await req.json();
      const newUsers = res.users.map((user) => {
        return {
          key: user.id,
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          role: user.role,
          status: user.status,
        };
      });
      setUsers(newUsers);
    };
    const getOneUsers = async () => {
      const token = localStorage.getItem("userToken");
      const req = await fetch(
        `https://sheltered-dusk-77313.herokuapp.com/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await req.json();
      setUser(res);
      console.log(res);
    };
    useEffect(() => {
      getUser();
      getOneUsers();
    }, []);
  
    const columes = [
      {
        title: "Id",
        dataIndex: "id",
        key: "key",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "key",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "key",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "key",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "key",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "key",
      },
    ];
  return (
    <div>
        <header>
        {user ? (
          <div className="userOne">
            Me: {user.email} || {user.name}
          </div>
        ) : (
          ""
        )}
        <Table
          dataSource={users}
          columns={columes}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: !users,
          }}
        ></Table>
      </header>
    </div>
  )
}

export default UserList