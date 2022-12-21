package com.udemy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    @Autowired StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() throws InterruptedException {
        return studentService.getAllStudent();
    }

}
