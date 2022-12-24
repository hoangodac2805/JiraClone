import React from 'react'

export default function PageNotFound(props) {
  return (
    <div style={{padding:'75px'}}> Không tìm thấy trang {props.match.url}
    </div>
  )
}
