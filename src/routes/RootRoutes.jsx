import React from 'react';
import { Routes, Route } from 'react-router-dom'

import RouteConfig from "./RouteConfig";
import Layout from '../layouts/Layout';

const RootRoutes = () => {
    return (
        <Routes>
             {RouteConfig.map((route, index) => {
                const Pages = route.component;

                // console.log(route.path == '/');
                return (
                    route?.layout == true 
                    ? 
                    <Route key={index} path={route.path} element={<Layout> <Pages/> </Layout>} />
                    
                    :
                    <Route key={index} path={route.path} element={<Pages/>} />
                )
                
            }
            )}
        </Routes>
    );
};

export default RootRoutes;