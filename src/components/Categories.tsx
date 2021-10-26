import React, { useEffect, useState } from 'react'
import { Button, Modal, Table, Tag, Form, Input,Select, Space } from 'antd';
import { Category, CategoryForm } from '../types/category';
import { AppState } from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../store/actions/categoryActions';
import { SketchPicker } from "react-color"
import { DeleteFilled, EditOutlined } from "@ant-design/icons"
import { Mode } from '../types/general';

  const emptyForm : CategoryForm = {
    name : "",
    type : "income",
    color : "black"
  }
function Categories() {
  const { data , loading  } = useSelector(
    (state : AppState) => state.categories); 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode , setMode] = useState<Mode>("new")   
    const [form , setForm] = useState<CategoryForm>(emptyForm)
    const [updateId , setUpdateId] = useState<number | null>(null)
    const [deleteId , setDeleteId] = useState<number |null>(null)
    const showModal = (mode : Mode) => {
      setIsModalVisible(true);
      setMode(mode)
    };
 
    const handleOk = () => {
      // mode degerine gore create or update action create cagırıcaz
      if(mode === "new" ) dispatch(addCategory(form))
      else if(mode === "edit" && typeof updateId === "number"){
        dispatch(updateCategory(form , updateId))
      }else if (mode === "delete" && typeof deleteId === "number"){
      
        dispatch(deleteCategory(deleteId))
        dispatch(getCategories())
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
 
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render : (text : string , category : Category) => {
          return <Tag color = {category.color}>{text.toUpperCase()}</Tag>
      } 
    },
    {
      title : "Action",
      key : "action",
      render : (text : string, category : Category)=> (
        <Space size = "middle">
           <EditOutlined style = {{color : "blue"}} onClick = {()=> {
             showModal("edit")
             setForm(category)  
             setUpdateId(category.id)              
                            }} />
           <DeleteFilled style = {{color : "red"}}
           onClick = {() => {
            showModal("delete")
            setDeleteId(category.id)
           }}
           
           />
        </Space>
      )
    } 
  ];
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCategories())

  }, [])
 
    return(
      <React.Fragment>
        <div>
          <div style = {{display : "flex" , justifyContent : "flex-end" , marginBottom : "10px"}}>
           <Button 
            type = "primary"
            onClick = {() => showModal("new")}>
             New Category
           </Button>
              </div>
           <Modal  title={mode === "new" ? "Create New Category " : mode ==="edit" ? "Update Category" : "Delete Category"} 
           visible={isModalVisible} 
           onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps = {{ disabled : !form.name && !(mode === "delete") }}
            >
              { mode === "edit" || mode === "new" ?   
              <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}>
           <Form.Item label="Category name" required>
          <Input name ="name" value={form.name} onChange = {(e) =>setForm({...form , name : e.target.value}) } />
        </Form.Item>
        <Form.Item label="Category type">
          <Select 
           defaultValue="expence" 
          value = {form.type}
           onChange = {type => setForm({...form ,type })}
            >
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label = "Color">
        <SketchPicker 
        color = {form.color}
        onChange={(color) => setForm({...form , color: color.hex})}/>
           </Form.Item>
           </Form>
              : mode === "delete" ?  <>Are You sure </>  : null
              } 
      </Modal>
        </div>
        <Table loading = {loading} columns={columns} dataSource={data} rowKey="id"/>
      </React.Fragment>
      )
    
}

export default Categories