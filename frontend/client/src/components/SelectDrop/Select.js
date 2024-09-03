import React, { useState } from 'react'
import '../SelectDrop/Select.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


const Select = (props) => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);

    const [isSelectedIndex, setisSelectedIndex] = useState(0);

    const [isSelectedItems, setisSelectedItems] = useState(props.placeholder);

    const [listData, setListData] = useState(props.data);
    const [listData2, setListData2] = useState(props.data || []);

    const openSelect = () => {
        setIsOpenSelect(!isOpenSelect);
    }

    const closeSelect = (index, name) => {
        setisSelectedIndex(index);
        setIsOpenSelect(false);
        setisSelectedItems(name);
    }

    const filterList = (e) => {
        const keyword = e.target.value.toLowerCase();
        // console.log(keyword);

        const list = listData2.filter((item) => {
            return item.toLowerCase().includes(keyword);
        })

        const list2 = list.filter((item,index) => list.indexOf(item) === index);

        setListData(list2);
    };


    return (
        <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
            <div className='selectDrop cursor position-relative'>
                {props.icon}
                <span className='OpenSelect' onClick={openSelect}>{isSelectedItems.length>13 ? isSelectedItems.substr(0,13) + '...' : isSelectedItems}
                    <KeyboardArrowDownIcon className='arrow' /> </span>
                {
                    isOpenSelect === true &&
                    <div className='SelectDrop'>
                        <div className='searchField'>
                            <input type='text' placeholder='Search Here....' onChange={filterList} />
                        </div>


                        <ul className='SearchResults'>

                            <li key={0} onClick={() => closeSelect(0, props.placeholder)} className={`${isSelectedIndex === 0 ? 'active category-active' : ''}`}>{props.placeholder}</li>

                            {
                                listData.map((item, index) => {
                                    return (
                                        <li key={index + 1} onClick={() => closeSelect(index + 1, item)} className={`${isSelectedIndex === index + 1 ? 'active category-active' : ''}`}>{item}</li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                }
            </div>
        </ClickAwayListener>

    )

}

export default Select