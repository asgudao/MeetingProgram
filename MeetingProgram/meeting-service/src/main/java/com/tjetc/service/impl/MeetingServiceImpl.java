package com.tjetc.service.impl;

import com.tjetc.common.JsonResult;
import com.tjetc.dao.MeetingMapper;
import com.tjetc.entity.Meeting;
import com.tjetc.service.MeetingService;

import java.util.List;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class MeetingServiceImpl implements MeetingService {
    @Autowired
    private MeetingMapper meetingMapper;
    Random random = new Random();
    Integer randomPassword = 0;
    Integer[][] countsOld;
    Integer[][] countsNew;
    @Override
    @Transactional
    public JsonResult add(){
        Meeting meeting = new Meeting(); 
        try{
            while(true) {
                randomPassword = random.nextInt(90000000)+10000000;
                meeting.setPassword(String.valueOf(randomPassword));
                JsonResult jsonResult = checkMeeting(meeting);
                if (jsonResult.getState() == 0) {
                    meetingMapper.insert(meeting);
                    break;
                }
            }
            meeting=meetingMapper.selectByPassword(meeting.getPassword());
            return JsonResult.success("创建成功",meeting);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public JsonResult updateById(Meeting meeting) {
        System.out.println(meeting);
        Integer id = meeting.getId();
        if (id == null || id <= 0) {
            log.warn("meetingId={} 不合法，无法更新", id);
            return JsonResult.fail("会议的 id 不正确，无法更新");
        }

        // 1. 查出旧数据
        Meeting db = meetingMapper.selectById(id);
        if (db == null) {
            log.warn("meetingId={} 查不到记录", id);
            return JsonResult.fail("找不到对应会议，无法更新");
        }

        // 2. 把 JSON 字段转成 List<List<Integer>>
        List<List<Integer>> oldCounts = (List<List<Integer>>) db.getCounts();
        List<List<Integer>> delta    = (List<List<Integer>>) meeting.getCounts();

        // 3. 累加（12×7）
        for (int i = 0; i < 12; i++) {
            for (int j = 0; j < 7; j++) {
                int val = oldCounts.get(i).get(j) + delta.get(i).get(j);
                oldCounts.get(i).set(j, val);
            }
        }

        // 4. 写回实体
        db.setPassword(meeting.getPassword());   // 如果也要改密码
        db.setCounts(oldCounts);

        // 5. 更新
        int rows = meetingMapper.updateById(db);
        return rows == 0 ? JsonResult.fail("更新失败")
                : JsonResult.success("更新成功");
    }
    @Override
    public JsonResult deleteById(Integer id){
        if(id==null||id<0){
            return JsonResult.fail("会议id为空或者小于0");
        }
        int affectedRows = meetingMapper.deleteById(id);
        if (affectedRows <= 0) {
            log.warn("meetingId={}，删除操作数据库，影响行数为0，所以失败",id);
            return JsonResult.fail("删除会议失败,因为用户不存在");
        }else{
            return JsonResult.success("删除会议成功");
        }
    }

    @Override
    public JsonResult findById(Integer id){
        if (id == null||id<0) {
            return JsonResult.fail("会议id不能为空或者小于0");
        }
        Meeting meeting = meetingMapper.selectById(id);
        if (meeting == null) {
            log.warn("meetingId={}的会议不存在",id);
            return JsonResult.fail("会议不存在");
        }
        return JsonResult.success(meeting);
    }


    @Override
    public JsonResult checkExistByPassword(String password){
        if(StringUtils.isBlank(password)||password.length()!=8){
            return JsonResult.fail("会议码错误");
        }
        Meeting meeting = meetingMapper.selectByPassword(password);
        if(meeting==null){
            return JsonResult.success(false);
        }else {
            return JsonResult.success(true);
        }
    }

    @Override
    public JsonResult login(String password){
        JsonResult jsonResult=checkExistByPassword(password);
        if (jsonResult.getState()!=0){
            return jsonResult;
        }
        Meeting meeting = meetingMapper.selectByPassword(password);
        if (meeting==null){
            return JsonResult.fail("会议码错误");
        }else {
            return JsonResult.success(meeting);
        }
    }

    private JsonResult checkMeeting(Meeting meeting){
        if(meeting.getPassword().length()!=8){
            return JsonResult.fail("生成的会议码不为8位");
        }
        Meeting meeting1 = meetingMapper.selectByPassword(meeting.getPassword());
        if(meeting1!=null){
            return JsonResult.fail("生成的会议码有重复");
        }
        return JsonResult.success("会议码没有问题");
    }
}
