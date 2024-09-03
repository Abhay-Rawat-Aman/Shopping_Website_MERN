import React from 'react'
import '../NewsLetter/NewsLetter.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Newsletter = () => {
    return (
        <div className='newsletter'>
            <SendIcon />
            <input type='text' placeholder='Your Email Address' />
            <Button className='bg-g'>Subscribe</Button>
        </div>
    )
}

export default Newsletter