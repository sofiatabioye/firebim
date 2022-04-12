import React, { useEffect } from 'react';
import ForgeViewer from 'react-forge-viewer';

const  ModelViewer = (props) => {
    const {urn, view, handleTokenRequested, handleDocumentError, handleDocumentLoaded, 
        handleModelError, handleModelLoaded, handleViewerError, trigger} = props
    
        useEffect(() => {
            console.log('hello....1')
        }, [trigger])
    return (
        <ForgeViewer
        version="7.0"
        urn={urn}
        view={view}
        headless={false}
        onViewerError={handleViewerError}
        onTokenRequest={handleTokenRequested}
        onDocumentLoad={handleDocumentLoaded}
        onDocumentError={handleDocumentError}
        onModelLoad={handleModelLoaded}
        onModelError={handleModelError}
        /> 
    )
}

export default ModelViewer