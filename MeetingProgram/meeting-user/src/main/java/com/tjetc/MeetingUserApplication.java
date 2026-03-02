package com.tjetc;


import com.tjetc.entity.Meeting;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.tjetc.dao")
public class MeetingUserApplication {
    public static void main(String[] args) {
        SpringApplication.run(MeetingUserApplication.class,args);}
}
