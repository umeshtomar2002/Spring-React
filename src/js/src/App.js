import './App.css';
import React,{ Component } from 'react';
import {getAllStudents} from './client';
import { Avatar, Table, Spin,Modal, Empty} from 'antd';
import {Icon,LoadingOutlined} from '@ant-design/icons';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentFrom';
//import { errorNotification } from './Notification'; 


const getIndicatorIcon = () =>  <LoadingOutlined style={{ fontSize: 24 }} spin />;



class App extends Component{

  state = {
    students: [],
    isFetching:false,
    isAddStudentModalVisible:false
  }
   
  componentDidMount(){
    this.fetchStudents();
  }

  openAddStudentModal = () => {
    this.setState({isAddStudentModalVisible:true});
  }
  closeAddStudentModal = () => {
    this.setState({isAddStudentModalVisible:false});
  }

  fetchStudents = () => {
    this.setState({
      isFetching: true
    });
    getAllStudents().then(res => res.json().then(students => {
      console.log(students);
      this.setState({
        students,
        isFetching:false
      });      
    }))
    .catch(error =>{
      console.log(error.error.error);
      //errorNotification(error.error.message,error.error.error);
      this.setState({
        isFetching: false
      });
    });
  }

  render(){

    
    const { students,isFetching,isAddStudentModalVisible } = this.state;

    const commonElements = () => (
      <div>
         <Modal 
            title='Add new student'
            open={isAddStudentModalVisible}
            onOk={this.closeAddStudentModal} onCancel={this.closeAddStudentModal}
            width={1000}>                        
            <AddStudentForm  onSuccess={() => {this.closeAddStudentModal();
            this.fetchStudents()}}/>
          </Modal>
              
    
          <Footer 
            numberOfStudents={students.length}
            handleAddStudentClickEvent={this.openAddStudentModal}/>
      </div>
    )

    if(isFetching){
      return(
        <Container>
          <Spin indicator={getIndicatorIcon} style={{position:'center'}}/>
        </Container>
      );
    }

        if(students && students.length){
          const columns = [
            {
              title:'',             
              Key:'avatar',
              render:(text,student) => (
               <Avatar size='large'>
                  {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
               </Avatar>
              )
            },
            {
              title:'StudentId',
              dataIndex:'studentId',
              Key:'studentId'
            },
            {
              title:'First Name',
              dataIndex:'firstName',
              Key:'firstName'
            },
            {
              title:'Last Name',
              dataIndex:'lastName',
              Key:'lastName'
            },
            {
              title:'Email',
              dataIndex:'email',
              Key:'email'
            },
            {
              title:'Gender',
              dataIndex:'gender',
              Key:'gender'
            }
          ];

          return( 
                  <Container>
                    <Table  
                          style={{marginBottom:'100px'}}
                          dataSource={students} 
                          columns={columns}
                          pagination={false}
                          rowKey='studentId' />
                     {commonElements()}                              
                  </Container>  
                      
                );

        }


        return (
          <Container>
              <Empty description={<h1>No Students Found</h1>} />
              {commonElements()}
          </Container>
        );
    }
}
export default App;
