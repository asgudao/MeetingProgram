package com.tjetc.entity;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.tjetc.common.JsonResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("`use`")
public class Meeting {

    private Integer id;
    private String password;

    // 关键：用 Object 但运行时放 List<List<Integer>>
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Object counts = initZeroCounts();   // ← 新增

    /* 生成 12×7 全 0 的 List<List<Integer>> */
    private static List<List<Integer>> initZeroCounts() {
        List<List<Integer>> c = new ArrayList<>(12);
        for (int i = 0; i < 12; i++) {
            c.add(new ArrayList<>(java.util.Collections.nCopies(7, 0)));
        }
        return c;
    }

    /** 工具方法：对外暴露 int[][] 视图 */
    public int[][] countsArray() {
        if (!(counts instanceof List)) return new int[12][7];
        List<List<Integer>> list = (List<List<Integer>>) counts;
        int[][] arr = new int[12][7];
        for (int i = 0; i < 12 && i < list.size(); i++) {
            List<Integer> row = list.get(i);
            for (int j = 0; j < 7 && j < row.size(); j++) {
                arr[i][j] = row.get(j);
            }
        }
        return arr;
    }

    /** 工具方法：把 int[][] 写回 counts */
    public void countsArray(int[][] arr) {
        List<List<Integer>> list = new ArrayList<>();
        for (int[] row : arr) {
            list.add(Arrays.stream(row).boxed().collect(Collectors.toList()));
        }
        this.counts = list;
    }
}