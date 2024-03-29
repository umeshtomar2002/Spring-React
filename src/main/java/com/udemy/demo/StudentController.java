package com.udemy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

    @Autowired StudentService studentService;

    @GetMapping("/allStudents")
    public List<Student> getAllStudents(){
        //throw new ApiRequestException("Oops cannot get all Student with custom Exception");
        return studentService.getAllStudent();
    }

    @PostMapping("/saveStudent")
    public void addNewStudent(@RequestBody @Valid Student student){
        studentService.addNewStudent(student);
    }
}
