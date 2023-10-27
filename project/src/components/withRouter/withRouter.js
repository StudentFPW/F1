import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    return (
        <WrappedComponent
            {...props}
            params={params}
            location={location}
            query={query}
        />
    );
};

export default withRouter;