import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

function BarGraph(prop) {
    var data = [
    ];
    const days=["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
    prop.data.map((value, index)=>{
        data.push({Day:days[index], entries:value})
    })
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <div className='flex-grow flex-shrink w-[350px] h-[350px] border-2 p-2 active:scale-95 cursor-pointer active:bg-slate-100 bg-green-50 shadow-md shadow-slate-600 rounded'>
            <h2 className='text-xl font-medium text-center'>{prop.heading}</h2>
            <div className="w-full h-[90%]">
                <ResponsiveContainer width="100%" height='100%'>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="entries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarGraph