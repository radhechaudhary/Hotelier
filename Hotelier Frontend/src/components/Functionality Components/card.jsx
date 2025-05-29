import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

function Card(prop) {
    const data=prop.data;
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <div className='flex-grow flex-shrink w-[350px] h-[350px] border-2 p-2 active:scale-95 cursor-pointer active:bg-slate-100 bg-green-50 shadow-md shadow-slate-600 rounded'>
            <h2 className='text-xl font-medium text-center'>{prop.heading}</h2>
            <div className="w-full h-[90%]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Card