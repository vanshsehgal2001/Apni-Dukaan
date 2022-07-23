import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <>
            <div className='dashboard' >
                <LeftSide />
                <RightSide />
            </div>
        </>
    )
}

export default Dashboard