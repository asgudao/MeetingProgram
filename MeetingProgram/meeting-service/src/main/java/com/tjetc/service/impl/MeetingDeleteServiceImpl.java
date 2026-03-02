package com.tjetc.service.impl;

import com.tjetc.common.JsonResult;
import com.tjetc.dao.MeetingDeleteMapper;
import com.tjetc.dao.MeetingMapper;
import com.tjetc.entity.MeetingDelete;
import com.tjetc.service.MeetingDeleteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Slf4j
public class MeetingDeleteServiceImpl implements MeetingDeleteService {
    @Autowired
    private MeetingDeleteMapper meetingDeleteMapper;

    @Override
    @Transactional
    public JsonResult delete(){
        List<MeetingDelete> meetings=meetingDeleteMapper.selectAll();
        LocalDateTime now=LocalDateTime.now();
        for(MeetingDelete meetingDelete:meetings){
            if(meetingDelete.getUpdateTime()==null){
                continue;
            }
            if (ChronoUnit.DAYS.between(meetingDelete.getUpdateTime(),now)>=7){
                meetingDeleteMapper.deleteById(meetingDelete.getId());
            }
        }
        return null;
    }

}
