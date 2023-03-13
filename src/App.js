import React, { useState } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import Employees from "./components/Employees";
import Tasks from "./components/Tasks";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Reminders from "./components/Reminders";
import initialDataEmp from "./initialData/initialDataEmployees.json";
import initialDataTasks from "./initialData/initialDataTasks.json";
import initialDataRem from "./initialData/initialDataReminders.json";

function App() {
  const [employees, setEmployees] = useState(initialDataEmp);
  const [newEmployee, setNewEmployee] = useState({});

  const [tasks, setTasks] = useState(initialDataTasks);
  const [newTask, setNewTask] = useState({});

  const [reminders, setReminders] = useState(initialDataRem);
  const [newReminder, setNewReminder] = useState({});

  const topN = () => {
    let n;
    if (5 > employees.length) n = 4;
    if (4 > employees.length) n = 3;

    if (3 > employees.length) n = 2;

    if (2 > employees.length) {
      return false;
    } else n = 5;
    return employees

      .sort((a, b) => {
        return b.taskNumber - a.taskNumber;
      })
      .slice(0, n)
      .map((topFive) => {
        return (
          <Typography>
            <CheckCircleIcon color="primary" /> {topFive.fullName}
          </Typography>
        );
      });
  };

  const veryImportantReminders = reminders.filter(
    (rem) => rem.important === "error"
  );

  const NumberImportant = veryImportantReminders.length;

  const lessImportantReminders = reminders.filter(
    (rem) => rem.important === "warning"
  );

  const NumberlessImportant = lessImportantReminders.length;

  const notImportantReminders = reminders.filter(
    (rem) => rem.important === "primary"
  );

  const NumberNotImportant = notImportantReminders.length;

  return (
    <div className="flex flex-col p-8 ">
      <div className="flex justify-evenly h-screen">
        <Card className="  m-5 p-10 border w-2/5 h-full">
          <Employees
            employees={employees}
            setEmployees={setEmployees}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
          />
        </Card>
        <Card className="m-5 p-10 border w-2/5 h-full">
          <Tasks
            tasks={tasks}
            setTasks={setTasks}
            newTask={newTask}
            setNewTask={setNewTask}
            employees={employees}
          />
        </Card>
        <Card className="m-5 p-10 border w-2/5 h-full">
          <Reminders
            reminders={reminders}
            setReminders={setReminders}
            newReminder={newReminder}
            setNewReminder={setNewReminder}
            employees={employees}
          />
        </Card>
      </div>
      <div className="flex justify-around pt-8">
        <Card className="m-5 p-10 border w-2/5">
          <Typography mb={5} variant="h4" fontWeight="bold">
            STATISTICS:
          </Typography>
          <Typography variant="h6">
            Top 5 employees who completed the most tasks in the past month:
          </Typography>
          <Typography p={1}>{topN()}</Typography>
          <div className="flex mt-10">
            <Typography color="error.main" variant="h6">
              The number of very important reminders:
            </Typography>
            <Typography ml={1} fontWeight="bold" variant="h5">
              {NumberImportant}
            </Typography>
          </div>
          <div className="flex mt-10">
            <Typography color="orange" variant="h6">
              The number of less important reminders:
            </Typography>
            <Typography ml={1} fontWeight="bold" variant="h5">
              {NumberlessImportant}
            </Typography>
          </div>
          <div className="flex mt-10">
            <Typography variant="h6">
              The number of not important reminders:
            </Typography>
            <Typography ml={1} fontWeight="bold" variant="h5">
              {NumberNotImportant}
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
