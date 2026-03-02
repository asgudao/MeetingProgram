package com.tjetc.service;

import com.tjetc.common.JsonResult;
import com.tjetc.entity.Meeting;

public interface MeetingService {
    /**
     * 新增会议
     *
     * @return
     */
    JsonResult add();

    /**
     * 更新会议时间
     * @param meeting
     * @return
     */
    JsonResult updateById(Meeting meeting);

    /**
     * 查找此会议码是否存在
     * @param password
     * @return
     */
    JsonResult checkExistByPassword(String password);

    /**
     * 根据id删除
     * @param id
     * @return
     */
    JsonResult deleteById(Integer id);

    /**
     * 根据id查询会议数据
     * @param id
     * @return
     */
    JsonResult findById(Integer id);

    /**
     * 登录
     * @param password
     * @return
     */
    JsonResult login(String password);

}
