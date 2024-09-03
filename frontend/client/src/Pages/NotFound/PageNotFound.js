import React from 'react'
import '../NotFound/PageNotFound.css'
import NotFoundImage from '../../assets/Images/page-404.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const PageNotFound = () => {
    return (
        <section>
            <div className='notFound'>
                <div className='container-fluid'>
                    <div className='box'>
                        <img src={NotFoundImage} />
                        <h1 className='mt-4 mb-4'>Page Not Found</h1>
                        <p>The link you clicked may be broken or the page may have been removed.
                            visit the <span className='text-g'>Homepage</span> or <span className='text-g'>Contact us</span> about the problem</p>

                            <div className='d-flex mt-4'>
                                <Button className='m-auto btn-g btn-lg '><Link to={'/'}> Back to home page </Link></Button> 
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound