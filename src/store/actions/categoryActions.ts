import api from '../../utils/api';
import { CategoryDispatch , Category, CategoryForm} from './../../types/category';

// *****************************************************************************************************************
// *****************************************************************************************************************
export const getCategories = () => async (dispatch: CategoryDispatch) =>{

    dispatch({type: "GET_CATEGORIES_START"})
    try {
        const response = await api().get<Category[]>("/categories")
        dispatch({type : "GET_CATEGORIES_SUCCESS" , payload : response.data})
    
    } catch{
        dispatch({type : "GET_CATEGORIES_ERROR"})
    }
}
// *****************************************************************************************************************
export const addCategory = (form : CategoryForm )=> async (dispatch : CategoryDispatch ) => {
    dispatch({
        type : "ADD_CATEGORY_START"
    })
    try {
        const response = await api().post<Category>("/categories" , form )
        dispatch({type : "ADD_CATEGORY_SUCCESS", payload : response.data })
        } catch{
        dispatch({type : "ADD_CATEGORY_ERROR" })
    }
}
// *****************************************************************************************************************
//typescript de olan bir ozellik partial ismindende anlasılacagı uzere part part yani istedigimiz yerleri girecegimizi soyluyruz   
export const updateCategory  = (form : Partial<CategoryForm>, categoryId : Number) => async (dispacth : CategoryDispatch) =>{
    dispacth ({
        type : "UPDATE_CATEGORY_START"
    })
    try {
        const response = await api().put<Category>("/categories/"+ categoryId , form   )
        dispacth({
            type : "UPDATE_CATEGORY_SUCCES" , payload : response.data
        })
    } catch {
        dispacth({
            type : "UPDATE_CATEGORY_ERROR"
        })
    }
}
// *****************************************************************************************************************
export const deleteCategory = (categoryId : number) =>  async (dispacth : CategoryDispatch) => {

    dispacth({
        type : "DELETE_CATEGORY_START"
    })
    try {
         await api().delete("/categories/" + categoryId )
        dispacth({
            type : "DELETE_CATEGORY_SUCCESS" , payload : categoryId 
        })
    } catch {
        dispacth({
            type : "DELETE_CATEGORY_ERROR"
        })
        
    }
}
// *****************************************************************************************************************
