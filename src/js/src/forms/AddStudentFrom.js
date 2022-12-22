import React,{Component} from "react";
import {Formik} from 'formik';
import {Input,Button,Tag} from 'antd';
import { addNewStudent } from "../client";

const inputBottomMargin =  {marginBottom:'5px'};
const tagStyle = {backgroundColor:'#f50'};

class AddStudentForm extends Component{

    render(){
        return(
            <div>            
            <Formik
              initialValues={{ firstName:'',lastName:'', email: '', gender: '' }}
              validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.firstName = 'Required';
                  }
                if (!values.lastName) {
                    errors.lastName = 'Required';
                  }
                if (!values.gender) {
                    errors.gender = 'Required';
                  }else if(!['MALE','FEMALE','male','female'].includes(values.gender)){
                    errors.gender = 'Gender Must be (MALE,FEMALE,male,female)';
                  }
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(student, { setSubmitting }) => {
                addNewStudent(student).then(()=>{
                    this.props.onSuccess();
                    setSubmitting(false);
                })
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    style={inputBottomMargin}                   
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder='First Name. E.g John'
                  />
                  {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                  <Input
                    style={inputBottomMargin}                    
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder='Last Name. E.g John'
                  />
                  {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                  <Input
                    style={inputBottomMargin}                    
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Email'
                  />
                  {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
                  <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder='Gender'
                  />
                  {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                  <Button type="primary" onClick={()=> submitForm()} disabled={isSubmitting | (touched && !isValid)}>
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        );
    }

}

export default AddStudentForm;