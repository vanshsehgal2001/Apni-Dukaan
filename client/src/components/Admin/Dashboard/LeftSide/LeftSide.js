import React from 'react'
import './LeftSide.css'
import logo from '../../../../assets/logo1.png'
import { TreeView, TreeItem } from '@mui/lab'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { MdCreateNewFolder } from 'react-icons/md'
import { BiGridSmall } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { AiTwotoneShopping } from 'react-icons/ai'
import { AiTwotoneStar } from 'react-icons/ai'
import { FcExpand } from 'react-icons/fc'
import { FcCollapse } from 'react-icons/fc'

const LeftSide = () => {
    return (
        <>
            <div className='leftside-panel' >
                {/* <div>
                    <Link to="/" >
                        <img src={logo} alt="Apni Dukaan" />
                    </Link>
                </div> */}
                {/* <Link to="/dashboard" >
                    <MdDashboard />

                    <h4>
                        Dashboard
                    </h4>
                </Link> */}
                {/* <Link to="#" > */}
                <TreeView defaultCollapseIcon={<FcCollapse />} defaultExpandIcon={<FcExpand />} >
                    <TreeItem style={{ marginLeft: "25px", background: "white" }} nodeId='1' label="Products" >
                        <Link to="/admin/products">
                            <TreeItem nodeId='2' label="All" icon={<BiGridSmall />} >

                            </TreeItem>
                        </Link>
                        <Link to="/admin/create/product">
                            <TreeItem nodeId='2' label="Create" icon={<MdCreateNewFolder />} >

                            </TreeItem>
                        </Link>
                    </TreeItem>
                </TreeView>
                <div>
                    <Link to="/admin/users" >
                        <FiUsers />

                        <h4>
                            Users
                        </h4>
                    </Link>
                </div>
                <div>
                    <Link to="/admin/orders" >
                        <AiTwotoneShopping />

                        <h4>
                            Orders
                        </h4>
                    </Link>
                </div>
                {/* <div>
                    <Link to="/admin/reviews" >
                        <AiTwotoneStar />
                        <h4>
                            Reviews
                        </h4>
                    </Link>
                </div> */}
                {/* </Link> */}
            </div>
        </>
    )
}

export default LeftSide