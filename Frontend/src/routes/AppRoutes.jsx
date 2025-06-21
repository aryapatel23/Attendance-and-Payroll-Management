import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import HRLayout from "../Components/layout/HRLayout";
import EmployeeLayout from "../Components/layout/EmployeLayout";

// Auth Pages
import Login from "../Pages/Login/Login";

// HR Pages
import HRDashboard from "../Pages/Admin/HrDashboard";
import Employees from "../Pages/Admin/Employees";
import AddEmployee from "../Pages/Admin/AddEmployee";
import PayrollSystem from "../Pages/Admin/Payrollsystem";
import HRCalendar from "../Pages/Admin/HRCalendar";
import EmployeeProfile from "../Pages/Admin/EmployePage";

// Employee Pages
import Deshbord from "../Pages/Employee/EmployeeHome";
import Attendance from "../Pages/Employee/Attendance";
import Salary from "../Pages/Employee/Salary";
import Calendar from "../Pages/Employee/Calendar";
import AttendanceNew from "../Components/attendance";

// Common / Temp
import Add from "../Pages/Add";

const AppRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role?.toLowerCase();
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Employee Routes */}
      {isAuthenticated && role === "employee" && (
        <Route path="/" element={<EmployeeLayout />}>
          <Route path="emhome" element={<Deshbord />} />
          <Route path="emattendance" element={<Attendance />} />
          <Route path="emsalary" element={<Salary />} />
          <Route path="emcalendar" element={<Calendar />} />
          <Route path="attendance" element={<AttendanceNew />} />
        </Route>
      )}

      {/* HR Routes */}
      {isAuthenticated && role === "hr" && (
        <Route path="/" element={<HRLayout />}>
          <Route path="hrhome" element={<HRDashboard />} />
          <Route path="hremployees" element={<Employees />} />
          <Route path="hraddemployee" element={<AddEmployee />} />
          <Route path="hrpayrollsystem" element={<PayrollSystem />} />
          <Route path="hrcalendar" element={<HRCalendar />} />
          <Route path="hremployees/profile/:id" element={<EmployeeProfile />} />
        </Route>
      )}

      {/* Common/Fallback Route */}
      <Route path="/add" element={<Add />} />
      {/* Optional 404 Page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;