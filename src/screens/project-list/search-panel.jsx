import { useEffect, useState } from "react"
import React from 'react';

export const SearchPannel = ({param,setParam,users,setusers}) => {

    return <form>
        <div>
            <input type="text" value={param.name} onChange={event => setParam({
                ...param, name: event.target.value
            })} />
            <select value={param.id} onChange={evt => setParam({
                ...param, id: evt.target.value
            })}>
                <option value="">负责人</option>
                {
                    users.map(user =><option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}