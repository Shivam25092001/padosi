import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './loading.css';

const Loading = () => {
  return (
    <div className='loading-page'>
        <Spin size="large" />
    </div>
  )
}

export default Loading