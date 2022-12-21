import './App.css';
import React,{ Component } from 'react';
import {getAllStudents} from './client';
import { Avatar, Table, Spin,Modal} from 'antd';
import {Icon,LoadingOutlined} from '@ant-design/icons';
import Container from './Container';
import Footer from './Footer';


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
    }));
  }

  render(){

    
    const { students,isFetching,isAddStudentModalVisible } = this.state;



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
                    <Table dataSource={students} 
                          columns={columns}
                          pagination={false}
                          rowKey='studentId' />

                    <Modal 
                        title='Add new student'
                        open={isAddStudentModalVisible}
                        onOk={this.closeAddStudentModal} onCancel={this.closeAddStudentModal}
                        width={1000}> 
                        <h1>Hello Modal width Antd</h1>
                      </Modal>
                          

                    <Footer 
                     numberOfStudents={students.length}
                     handleAddStudentClickEvent={this.openAddStudentModal}/>      
                  </Container>  
                      
                );

        }


        return <h1> No Student found</h1>;
    }
}
export default App;
