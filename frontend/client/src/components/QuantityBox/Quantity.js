import React, { useState } from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
const Quantity = () => {
    
    const [inputValue, setInputValue] = useState(1);

    const plus = () => {
        setInputValue(inputValue + 1);
    }

    const minus = () => {
        if (inputValue !== 1) {
            setInputValue(inputValue - 1);
        }

    }


    return (
        <div className='addCartSection pt-4 pb-4 d-flex align-items-center justify-content-center'>
            <div className='counterSec'>
                <input type='number' value={inputValue} />
                <span className='plus arrow' onClick={plus}><KeyboardArrowUpOutlined /> </span>
                <span className='minus arrow' onClick={minus}><KeyboardArrowDownOutlined /> </span>
            </div>
        </div>
    )
}

export default Quantity