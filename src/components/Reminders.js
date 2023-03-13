import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Reminders({
  reminders,
  setReminders,
  newReminder,
  setNewReminder,
  employees,
}) {
  const [alertCreate, setAlertCreate] = useState(false);

  let inputTitle = document.getElementById("reminderInputTitle");
  let inputDescription = document.getElementById("reminderInputDescription");
  let inputAssignee = document.getElementById("reminderInputAssignee");

  const CreateReminderFunction = () => {
    if (inputTitle.value !== "" && !inputAssignee.value) {
      setReminders([...reminders, newReminder]);

      inputTitle.value = "";
      inputDescription.value = "";

      setAlertCreate(false);
    } else setAlertCreate(true);
  };

  const DeleteReminderFunction = () => {
    const notDeletedReminder = reminders.filter((rem) => rem.delete !== true);
    setReminders(notDeletedReminder);
  };

  const [selectAssignee, setSelectAssignee] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("REMINDERS");

    if (data !== null) setReminders(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("REMINDERS", JSON.stringify(reminders));
  }, [reminders]);

  return (
    <>
      <Typography className="pb-5" variant="h4">
        Reminders:
      </Typography>
      <div className=" h-2/5 overflow-y-scroll">
        {reminders.map((reminder) => {
          return (
            <div
              className={` flex justify-between border shadow-md rounded p-5 m-5 ${
                reminder.important === "error" && " bg-red-400 bg-opacity-60 "
              } ${
                reminder.important === "warning" &&
                "bg-yellow-400 bg-opacity-60"
              }`}
              key={reminder.title}
            >
              <div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Title:{" "}
                  </Typography>
                  <Typography> {reminder.title}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Description:{" "}
                  </Typography>
                  <Typography multiline>{reminder.description}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Assignee:{" "}
                  </Typography>
                  <Typography> {reminder.assignee}</Typography>
                </div>
                <div className="flex"></div>
              </div>
              <div className="flex flex-col justify-around">
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    reminder.delete = true;
                    DeleteReminderFunction();
                  }}
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Typography variant="h6">Create a new reminder!</Typography>
        <div className="pt-3 flex flex-col ">
          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputTitle.value === ""}
            size="small"
            margin="dense"
            required
            id="reminderInputTitle"
            label="Title"
            variant="outlined"
            placeholder="Title"
            onChange={(event) => {
              setNewReminder({
                title: event.target.value,
                description: newReminder.description,
                assignee: newReminder.assignee,
                important: newReminder.important,
              });
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: {
                height: "60px",
              },
            }}
            multiline
            margin="dense"
            id="reminderInputDescription"
            label="Description"
            variant="outlined"
            placeholder="Description"
            onChange={(event) => {
              setNewReminder({
                title: newReminder.title,
                description: event.target.value,
                assignee: newReminder.assignee,
                important: newReminder.important,
              });
            }}
          />

          <div>
            <FormControl
              sx={{ my: 1, minWidth: 120 }}
              size="small"
              required
              error={alertCreate === true && inputAssignee.value === ""}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Assignee
              </InputLabel>
              <Select
                labelId="reminderInputAssignee-label"
                id="reminderInputAssignee"
                value={selectAssignee}
                label="Assignee"
                onChange={(event) => {
                  setNewReminder({
                    title: newReminder.title,
                    description: newReminder.description,
                    assignee: event.target.value,
                    dueDate: newReminder.dueDate,
                  });
                  setSelectAssignee(event.target.value);
                }}
              >
                {employees.map((emp) => {
                  return (
                    <MenuItem id="assigneeReminderNumber" value={emp.fullName}>
                      {emp.fullName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="row-radio-buttons"
              name="importanceGroup"
              id="reminderInputImportant"
              onChange={(event) => {
                setNewReminder({
                  title: newReminder.title,
                  description: newReminder.description,
                  assignee: newReminder.assignee,
                  important: event.target.value,
                });
              }}
            >
              <FormControlLabel
                value="error"
                control={<Radio />}
                label="Very Important"
              />
              <FormControlLabel
                value="warning"
                control={<Radio />}
                label="Important"
              />
              <FormControlLabel
                value="primary"
                control={<Radio />}
                label="Not Important"
              />
            </RadioGroup>
          </FormControl>

          <Button variant="outlined" onClick={CreateReminderFunction}>
            Create
          </Button>
          {alertCreate === true && (
            <Alert className="mt-5" severity="error">
              Error! Please, enter information for the mandatory fields!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
