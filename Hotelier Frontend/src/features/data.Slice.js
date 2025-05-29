import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sideBar:false, // form opening and closing of the sidebar on small screens.
    loggedIn: false,
    hotelData:{hotel:'', rooms:0, managerName:""},
    rooms:[], //[101,102,103....]
    currentCustomers:[], //[{name:name, ......other all form data}]
    occupiedRooms:{}, //{roomNo: { customerName:name, price:price, entryData:formattedDate, index:1}} index for the curreCustomer Data
    staff:[], //{id:1234, name:saurav, role: manager, dept: administration, joiningDate:*****, reportingTime:*****, attendance:30}
    weekData:[0,0,0,0,0,0,0],
    monthData:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    yearData:[0,0,0,0,0,0,0,0,0,0,0,0]
}

export const dataSlice= createSlice({
    name:'data',
    initialState,
    reducers:{
        setSidebar:(state, action)=>{
            state.sideBar=action.payload;
        },
        setLoggedIn:(state, action)=>{
            state.loggedIn=action.payload;
        },
        setHotelData:(state, action)=>{
            state.hotelData=action.payload;
        },
        setRooms:(state, action)=>{
            state.rooms=action.payload;
        },
        setCurrentCustomers:(state, action)=>{
            state.currentCustomers=action.payload;
        },
        setStaff:(state, action)=>{
            state.staff=action.payload;
        },
        setOccupiedRooms:(state, action)=>{
            state.occupiedRooms=action.payload;
        },
        setWeekData:(state, action)=>{
            state.weekData=action.payload;
        },
        setMonthData:(state, action)=>{
            state.monthData=action.payload;
        },
        setYearData:(state, action)=>{
            state.yearData=action.payload;
        }
        
    }
})

export const {setSidebar, setLoggedIn, setHotelData, setRooms, setCurrentCustomers, setOccupiedRooms, setStaff, setTotalRooms, setWeekData, setMonthData, setYearData}= dataSlice.actions;
export default dataSlice.reducer