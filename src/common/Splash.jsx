import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadInitial } from '../store/actions/dashActions';
const splashStyle = {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}

function Splash() {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(loadInitial())
        }, 500)
    }, [])
    return (
        <div style={splashStyle}>
            <h1>Omedia</h1>
        </div>
    )
}

export default Splash