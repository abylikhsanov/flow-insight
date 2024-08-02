// @flow
import React from 'react';

export type SensorData = {
    id: string,
    label: string,
    value: string
}

type Props = {
    data: SensorData[];
};

const AnyEquipment = ({data}: Props) => {
    const onDragStart = (event: any, data: SensorData[]) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(data));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="p-2 m-2 bg-gray-500 cursor-grab"
            draggable
            onDragStart={(event) => onDragStart(event, data)}
        >
            {data.map((sensor) => (
                <div key={sensor.id}>
                    {sensor.label}: {sensor.value}
                </div>
            ))}
        </div>
    );
};

export default AnyEquipment;