package com.tjetc.controller;

import com.tjetc.common.JsonResult;
import com.tjetc.entity.Meeting;
import com.tjetc.service.MeetingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("user")
@Slf4j
public class MeetingController {
    @Autowired
    private MeetingService meetingService;

    @RequestMapping("add")
    public JsonResult add(){return meetingService.add();}

    @RequestMapping("detail/{id}")
    public JsonResult detail(@PathVariable("id")Integer id){return meetingService.findById(id);}

    @RequestMapping("update")
    public JsonResult update(@RequestBody Meeting meeting){return meetingService.updateById(meeting);}

    @RequestMapping("delete/{id}")
    public JsonResult delete(@PathVariable("id") Integer id){return meetingService.deleteById(id);}

    @RequestMapping("check-exist")
    public JsonResult checkExist(@RequestParam("password")String password){
        return meetingService.checkExistByPassword(password);
    }

    @PostMapping("login")
    public JsonResult login(@RequestParam("password")String password){
        return meetingService.login(password);
    }
}
