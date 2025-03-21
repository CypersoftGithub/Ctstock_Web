import { Eye } from '@phosphor-icons/react';
import React from 'react'
import { Link } from "react-router-dom";

const ViewMoreBtn = ({customTitle = "VIEW MORE", redirectUrl=false}) => {
  return (
    // <Link to={redirectUrl} className='view-more-btn'>{customTitle}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></Link>
    <Link to={redirectUrl} className='view-more-btn_icon'><Eye size={18} /></Link>
  )
}

export default ViewMoreBtn