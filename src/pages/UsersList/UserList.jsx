import React from 'react'
import { Table } from 'antd';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './../../asyncAction/users';
import { fetchOneUser } from './../../asyncAction/oneUser';
import { columes } from './columes';

const UserList = () => {
    const users= useSelector(state=>state.users.users)
    const user= useSelector(state=>state.users.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUsers(),console.log('lolo'))
      dispatch(fetchOneUser(),console.log('lolo'))
    }, []);
    
  
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