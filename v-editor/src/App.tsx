import { Timeline, TimelineAction } from '@xzdarcy/react-timeline-editor';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import './index.less'; // 导入样式文件
import { mockData, mockEffect } from './mock'; // 导入模拟数据

const defaultEditorData = mockData;

const TimelineEditor = () => {
  // 使用 useState 钩子管理编辑器数据
  const [data, setData] = useState(defaultEditorData);

  // 使用 useState 钩子管理拖动线的状态
  const [dragLine, setDragLine] = useState(true);

  // 使用 useState 钩子管理自动滚动的状态
  const [autoScroll, setAutoScroll] = useState(true);

  // 使用 useRef 钩子生成唯一的 ID
  const idRef = React.useRef(0);

  return (
    <div className="timeline-editor">
      <Timeline
        scale={5} // 设置时间轴的缩放比例
        dragLine={dragLine} // 设置是否显示拖动线
        onChange={setData} // 当时间轴数据变化时，更新数据
        editorData={data} // 传递编辑器数据
        effects={mockEffect} // 传递效果数据
        hideCursor={false} // 设置是否隐藏光标
        autoScroll={autoScroll} // 设置是否自动滚动
        onDoubleClickRow={(e, { row, time }) => {
          // 双击行时触发的回调函数
          setData((pre) => {
            // 找到当前行的索引
            const rowIndex = pre.findIndex(item => item.id === row.id);

            // 创建一个新的动作
            const newAction: TimelineAction = {
              id: `action${idRef.current++}`, // 生成唯一的动作 ID
              start: time, // 设置动作的开始时间
              end: time + 1, // 设置动作的结束时间
              effectId: "effect0", // 设置动作的效果 ID
            }

            // 更新当前行的动作列表
            pre[rowIndex] = { ...row, actions: row.actions.concat(newAction) };

            // 返回更新后的数据
            return [...pre];
          })
        }}
      />
    </div>
  );
};

export default TimelineEditor; // 导出 TimelineEditor 组件
