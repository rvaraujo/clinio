import React from "react";
import styled, { keyframes } from 'styled-components';
const Utils = {
    spinner:function(){
        return styled.div`
        margin: 16px;
        animation: ___CSS_0___ 1s linear infinite;
        transform: translateZ(0);
        border-top: 2px solid grey;
        border-right: 2px solid grey;
        border-bottom: 2px solid grey;
        border-left: 4px solid black;
        background: transparent;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      `;
    },
    customLoader:()=>{
        <div style={{ padding: '24px' }}>
        <spinner />
        <div>Fancy Loader...</div>
      </div>
    }
};
export default Utils;