package com.udemy.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
            HttpStatus badRequest =  HttpStatus.BAD_REQUEST;
            ApiException apiException =  new ApiException(e.getMessage(),e, HttpStatus.BAD_REQUEST
                        , ZonedDateTime.now(ZoneId.of("Z")));
        return new ResponseEntity<>(apiException,badRequest);
    }
}
