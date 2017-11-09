import React from 'react'
import {Link, Route} from 'react-router-dom'


export default function DefaultLayout ({component: MatchedPage, ...rest}) {
    return (
        <Route {...rest} render={matchProps => (
            <div>

                <Link to='/'>
                    Home
                </Link>
                <br/>
                <Link to='/about'>
                    About
                </Link>

                <hr/>


                <MatchedPage {...matchProps} />
            </div>
        )} />
    )
};