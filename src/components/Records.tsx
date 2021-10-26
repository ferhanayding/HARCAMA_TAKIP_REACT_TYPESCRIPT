import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../store/reducers'
import { Button, Modal, Table, Tag, Form, Input,Select, Space, Dropdown } from 'antd';
import { Record, RecordForm } from '../types/record';
import { Category } from '../types/category';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { addRecord, deleteRecord, getRecord, updateRecord } from '../store/actions/recordActions';
import { Mode } from '../types/general';

import { getCategories } from '../store/actions/categoryActions';

const emptyForm : RecordForm = {
    title : "",
    amount : 0,
    category_id : 0
}

function Records() {
    const {data , loading , error} = useSelector((state : AppState) => state.records )
    const { data : categories }  = useSelector((state : AppState) => state.categories) 
    const [mode , setMode] = useState<Mode>("new")   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form , setForm] = useState<RecordForm>(emptyForm)
    const [updateId , setUpdateId] = useState<number | null>(null)
    const [deleteId , setDeleteId] = useState<number |null>(null)
    const dispatch = useDispatch();

    const showModal = (mode : Mode) => {
        setIsModalVisible(true);
        setMode(mode)
      };
      const handleOk = () => {
        if(mode === "new" ) dispatch(addRecord(form))
        else if(mode === "edit" && typeof updateId === "number"){
          dispatch(updateRecord(form , updateId))
        }else if (mode === "delete" && typeof deleteId === "number"){
        
          dispatch(deleteRecord(deleteId))
          dispatch(getRecord())
         }
        
        setIsModalVisible(false); 
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
      };
      const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
        setDeleteId(null)
      };
    const columns = [
        {
            title : "Title",
            dataIndex : "title",
            key : "title"
        },
        {
            title : "Amount",
            dataIndex : "amount",
            key : "amount",
            render : (amount : Record["amount"], record : Record) => {
                return (
                    <>
                    {
                     Intl.NumberFormat("tr-TR" ,{
                         style : "currency",
                         currency : "TRY"
                     }).format(amount)}
                    </>
                );
            }
        },
        {
            title : "Category",
            dataIndex : "category",
            key : "category",
            render : (category: Category , record : Record) =>{
                return <Tag color = {category.color}>{category.name.toUpperCase()}</Tag>
            }
        },
        {
          title : "Last Update",
          dataIndex : "updatedAt",
          key : "updatedAt",
          render : (updatedAt : string , record : Record) => {
            const updatedAtObj = new Date(updatedAt)

            return <>
            
            <div style = {{display : "flex"}}>  
              <Tag style = {{border : "none" , color : "#2E8BCC" }} >
            {updatedAtObj.toLocaleDateString()}
            </Tag>
            <sub> 
               {updatedAtObj.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}</sub>
            </div>
         
          
            </>
          }
        },
        {
            title : "Action",
            key : "action",
            render : (text : string, record : Record)=> { 
              
              const {title, amount} = record
              const category_id =record.category.id
              return(
              

              <Space size = "middle">
                 <EditOutlined style = {{color : "blue"}}
                  onClick = {()=>{
                    showModal("edit")
                      setForm({title , amount ,category_id})
                      setUpdateId(record.id)

                  }}
                
                 />
                 <DeleteFilled style = {{color : "red"}} 
                 onClick = {()=>{
                   showModal("delete")
                   setDeleteId(record.id)
                    
                }}
                />
              </Space>
            )}
          } 
    ]
    useEffect(() => {
        dispatch(getRecord())
        !categories.length && dispatch(getCategories())

    }, [])
    const isFormValid = (
        !form.title ||
        form.amount === 0 ||
        form.category_id === 0
      );
    return (
        <React.Fragment>
            <div>
            <div style = {{display : "flex" , justifyContent : "flex-end" , marginBottom : "10px"}}>
           <Button 
            type = "primary"
            onClick = {() => showModal("new") }
            >
             New Record
           </Button>
              </div>
           {/* ------------------------------------------------------------------------------------------------- */}
              <Modal  title={mode === "new" ? "Create New Record " : mode ==="edit" ? "Update Record" : "Delete Record"} 
           visible={isModalVisible} 
           onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps = {{ disabled : isFormValid && !(mode === "delete") }}
            >
              { mode === "edit" || mode === "new" ?   
              <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}>
           <Form.Item label="Title" required>
          <Input
           name ="title" 
           value={form.title} 
           onChange = {(e) =>setForm({...form , title : e.target.value}) }
            />
        </Form.Item>
           <Form.Item label="Amount" required>
          <Input
           name ="amount" 
           value={form.amount} 
           type = "number" 
           onChange = {(e) =>setForm({...form , amount : Number(e.target.value)}) }
            />
        </Form.Item>
        <Form.Item label="Category">
          <Select 
           defaultValue={form.category_id} 
          value = {form.category_id}
           onChange = {category_id => setForm({...form ,category_id })}
            >
            <Select.Option value={0}disabled>Select a category</Select.Option>
            {categories.map(category =>{ 
                return <Select.Option value={category.id} key = {category.id}>{category.name}</Select.Option>
              })}
          </Select>
        </Form.Item>
        <Form.Item label = "Color">
       
           </Form.Item>
           </Form>
              : mode === "delete" ?  <>Are You sure </>  : null
              } 
      </Modal>
            </div>
            
       <Table loading = {loading} columns = {columns} dataSource = {data} rowKey="id"/>
        </React.Fragment>
    )
}

export default Records;
