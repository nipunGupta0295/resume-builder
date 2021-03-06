import * as actionTypes from './actionTypes';
const {v4:uuidv4} = require('uuid');

export const setSkinCd = (skinCd)=>{
    let id = uuidv4();
    return { type:actionTypes.SET_SKIN,document:{skinCd:skinCd,id:id} }
}

export const updateSkinCd = (skinCd)=>{
    return {type:actionTypes.UPDATE_SKIN,document:{ skinCd:skinCd}}
}

export const putPreviousDoc =(id, skinCd) =>{
    return {type: actionTypes.PUT_OLD_DOC, document: {id:id, skinCd: skinCd}}
}