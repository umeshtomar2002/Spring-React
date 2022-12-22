package com.udemy.demo;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Student {

    @JsonProperty("studentId")
    private final UUID studentId;
    @JsonProperty("firstName")
    private final String firstName;
    @JsonProperty("lastName")
    private final String lastName;
    @JsonProperty("email")
    private final String email;
    @JsonProperty("gender")
    private final Gender gender;

    public Student(UUID studentId, String firstName, String lastName, String email, Gender gender) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Gender getGender() {
        return gender;
    }

    enum Gender {MALE,FEMALE}

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }
}
