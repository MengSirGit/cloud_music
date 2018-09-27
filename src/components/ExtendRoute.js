import React from 'react'
import {Route} from 'react-router-dom'
import AsyncComponent from './AsyncComponent'

const ExtendRoute = (route) =>{
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <AsyncComponent load={route.component}>
                    {(Comp) => <Comp {...props} routes={route.routes} />}
                </AsyncComponent>
            )}
        />
    )
}
export default ExtendRoute