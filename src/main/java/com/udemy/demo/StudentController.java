package com.udemy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    @Autowired StudentService studentService;

    @GetMapping("/allStudents")
    public List<Student> getAllStudents() throws InterruptedException {
        return studentService.getAllStudent();
    }

    @PostMapping("/saveStudent")
    public void addNewStudent(@RequestBody Student student){
        studentService.addNewStudent(student);
        System.out.println(student);
    }
}
