import { SearchPannel } from "./search-panel"
import { List } from "./list"
import { useEffect,useState } from "react"
import React from 'react';
import { cleanObject } from "utils";
import * as qs from 'qs';

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = ()=>{
    const [users, setusers] = useState([])
    const [param, setParam] = useState(
        {
            name: '',
            id: ''
        })
    
    const [list,setList] = useState([])

        useEffect(()=>{
            console.log(apiURL)
            fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(
                async response =>{
                    if (response.ok){
                        setList(await response.json())
                    }
                }
            )
        },[param])

        useEffect(()=>{
            fetch(`${apiURL}/users`).then(
                async response =>{
                    if (response.ok){
                        setusers(await response.json())
                    }
                }
            )
        },[param])

    return <div>
        <SearchPannel param={param} setParam={setParam} users={users} setusers={setusers}></SearchPannel>
        <List list={list} users={users}></List>

    </div>
}