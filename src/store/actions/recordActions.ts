import api from '../../utils/api';
import { RecordDispacth,Record, RecordForm } from './../../types/record';
// *******************************************************************************************************************************
// *******************************************************************************************************************************

export const getRecord = () => async (dispacth : RecordDispacth) => {
    dispacth({
        type : "GET_RECORD_START"
    })
    try {

        const response = await api().get<Record[]>("/records")
        response.data.sort((a,b) => b.id - a.id)
        dispacth({

            type : "GET_RECORD_SUCCESS" , payload : response.data
        })
    } catch (error) {
        dispacth({
            type : "GET_RECORD_ERROR"
        })
    }
}
// *******************************************************************************************************************************

export const addRecord = (form :RecordForm ) => async (dispacth : RecordDispacth) => {
    dispacth({
        type : "ADD_RECORD_START"
    })
    try {
        const response = await api().post<Record>("/records",form)
        dispacth({

            type : "ADD_RECORD_SUCCESS" , payload : response.data
        })
    } catch (error) {
        dispacth({
            type : "ADD_RECORD_ERROR"
        })
    }

}
// *******************************************************************************************************************************
export const updateRecord = (form : RecordForm , id : Record["id"]) => async (dispacth : RecordDispacth) => {
    dispacth({
        type : "UPDATE_RECORD_START"
    })
    try {
        const response = await api().put<Record>("/records/" + id , form )
        dispacth ({

            type : "UPDATE_RECORD_SUCCESS" , payload : response.data
        })
    } catch (error) {
        dispacth({
            type : "UPDATE_RECORD_ERROR"
        })
    }
}
// *******************************************************************************************************************************
export const deleteRecord = (id : Record["id"]) => async (dispacth : RecordDispacth) => {
    dispacth({
        type : "DELETE_RECORD_START"
    })
    try {
        await api().delete("/records/" + id )
        dispacth({
            type: "DELETE_RECORD_SUCCESS" , payload : id
        })
    } catch (error) {
        dispacth({
            type: "DELETE_RECORD_ERROR" 
        })
    }
}
// *****************************************************************************************************************



