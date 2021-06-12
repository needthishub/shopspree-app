import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ROUTE} from "../../constants/route";

class HandleAllError extends React.Component<RouteComponentProps, any> {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.props.history.push(ROUTE.ERROR);
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default withRouter(HandleAllError);
