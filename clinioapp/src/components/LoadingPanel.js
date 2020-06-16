import React, {Component} from 'react';
import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const CustomLoader = () => (
    <Loader
           type="Oval"
           color="#00BFFF"
           height={100}
           width={100}
  
        />
  );

export default class LoadingPanel extends Component{
    render(){
        return (
            <>
                <div className="loading-area">
                    <CustomLoader />
                </div>
            </>
        );
    }
}