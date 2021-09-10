import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loadingbox() {
    return (
        <div>
            <div className="loading-overlay">
                <CircularProgress />
            </div>
        </div>
    )
}
