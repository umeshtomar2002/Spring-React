package com.udemy.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired public JdbcTemplate jdbcTemplate;

    @Override
    public List<Student> getAllStudent() {
        String sql = "SELECT * FROM student";
        return jdbcTemplate.query(sql,mapStudentFromDb());

        //return Arrays.asList(new Student(UUID.randomUUID(),"umesh","singh","ums@gmail.com", Student.Gender.MALE),
        //        new Student(UUID.randomUUID(),"umesh_1","singh_1","ums1@gmail.com", Student.Gender.MALE));
    }



    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet,i) -> {
            return new Student(UUID.fromString(resultSet.getString("student_id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    Student.Gender.valueOf(resultSet.getString("gender").toUpperCase()));
        };
    }

    @Override
    public void addNewStudent(Student student) {
        String sql = "INSERT INTO student(student_id,first_name,last_name,email,gender)" +
                "values (?,?,?,?,?)";

       int update = jdbcTemplate.update(sql,UUID.randomUUID(),
                    student.getFirstName(),
                    student.getLastName(),
                    student.getEmail(),
                    student.getGender().name().toUpperCase());

    }
}
