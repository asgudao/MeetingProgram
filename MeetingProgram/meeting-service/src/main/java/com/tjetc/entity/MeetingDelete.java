package com.tjetc.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("`use`")
public class MeetingDelete {
    private Integer id;
    private LocalDateTime updateTime;
}
