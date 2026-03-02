package com.tjetc.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjetc.entity.MeetingDelete;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface MeetingDeleteMapper extends BaseMapper<MeetingDelete> {

    /**
     * 根据密码查询会议信息
     */
    List<MeetingDelete> selectAll();


    /**
     * 根据id删除
     * @param id
     * @return
     */
    void deleteById(@Param("id") Integer id);
}
