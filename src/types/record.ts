import { ThunkDispatch } from 'redux-thunk';
import { Category } from './category';
export interface RecordState{
    data : Record[]
    loading : boolean
    error : string 

}
// *****************************************************************************************************************


export interface Record {
    id: number;
    title: string;
    amount: number;
    updatedAt: string;
    createdAt: string;
    category: Category;
}
// *****************************************************************************************************************

export interface RecordForm {
title : string
amount : number 
category_id : number 
}
// *****************************************************************************************************************

interface GET_START{
    type : "GET_RECORD_START"
}
interface GET_SUCCES{
    type: "GET_RECORD_SUCCESS",
    payload : Record[]
}
interface GET_ERROR{
    type : "GET_RECORD_ERROR"
}
// *****************************************************************************************************************

interface ADD_START{
    type : "ADD_RECORD_START"
}
interface ADD_SUCCES{
    type: "ADD_RECORD_SUCCESS",
    payload : Record
}
interface ADD_ERROR{
    type : "ADD_RECORD_ERROR"
}
// *****************************************************************************************************************

interface UPDATE_START{
    type : "UPDATE_RECORD_START"
}
interface UPDATE_SUCCES{
    type: "UPDATE_RECORD_SUCCESS",
    payload : Record
}
interface UPDATE_ERROR{
    type : "UPDATE_RECORD_ERROR"
}
// *****************************************************************************************************************

interface DELETE_START{
    type : "DELETE_RECORD_START"
}
interface DELETE_SUCCES{
    type: "DELETE_RECORD_SUCCESS",
    payload : number
}
interface DELETE_ERROR{
    type : "DELETE_RECORD_ERROR"
}
// *****************************************************************************************************************

export type RecordAction = GET_START |  GET_SUCCES | GET_ERROR |ADD_START|ADD_SUCCES | ADD_ERROR | UPDATE_START | UPDATE_SUCCES |UPDATE_ERROR | DELETE_START| DELETE_SUCCES|DELETE_ERROR ;
export type RecordDispacth= ThunkDispatch<RecordState ,void , RecordAction>