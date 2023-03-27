import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// eslint-disable-next-line react/display-name
export default memo(({ data  , isConnectable }: {data: {label: string}, isConnectable: boolean}) => {
  return (
    <div className='bg-white border-black border-[1px] p-4 rounded opacity-20 hover:opacity-70'>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className='text-xs'>
       {data.label}
      </div>
     
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
