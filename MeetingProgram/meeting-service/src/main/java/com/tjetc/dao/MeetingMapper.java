package com.tjetc.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjetc.entity.Meeting;
import org.apache.ibatis.annotations.Param;

public interface MeetingMapper extends BaseMapper<Meeting> {

    /**
     * 根据密码查询会议信息
     * @param password
     * @return
     */
    Meeting selectByPassword(String password);

    /**
     * 根据id更新
     * @param meeting
     * @return
     */
    int updateById(Meeting meeting);

    /**
     * 根据id选择
     * @param id
     * @return
     */
    Meeting selectById(@Param("id") Integer id);

    /**
     * 根据id删除
     * @param id
     * @return
     */
    int deleteById(@Param("id") Integer id);



}
