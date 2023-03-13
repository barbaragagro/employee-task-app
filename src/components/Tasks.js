import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Tasks({
  tasks,
  setTasks,
  newTask,
  setNewTask,
  employees,
}) {
  const [open, setOpen] = useState(false);
  const [alertCreate, setAlertCreate] = useState(false);

  let inputTitle = document.getElementById("taskInputTitle");
  let inputDescription = document.getElementById("taskInputDescription");
  let inputAssignee = document.getElementById("taskInputAssignee");
  let inputDueDate = document.getElementById("taskInputDueDate");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateTaskFunction = () => {
    if (
      inputTitle.value !== "" &&
      inputDescription.value !== "" &&
      !inputAssignee.value &&
      inputDueDate.value !== ""
    ) {
      setTasks([...tasks, newTask]);

      inputTitle.value = "";
      inputDescription.value = "";

      inputDueDate.value = "";

      setAlertCreate(false);
      employees.forEach((element) => {
        if (element.fullName == selectAssignee) element.taskNumber++;
      });
      console.log(document.getElementById("assigneeTaskNumber").value);
    } else setAlertCreate(true);
  };

  const DeleteTaskFunction = () => {
    const notDeletedTasks = tasks.filter((task) => task.delete !== true);
    setTasks(notDeletedTasks);
  };

  const [selectAssignee, setSelectAssignee] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("TASKS");

    if (data !== null) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Typography className="pb-5" variant="h4">
        Tasks:
      </Typography>
      <div className=" h-2/5 overflow-y-scroll">
        {tasks.map((task) => {
          return (
            <div
              className=" flex justify-between border shadow-md rounded p-5 m-5 "
              key={task.title}
            >
              <div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Title:{" "}
                  </Typography>
                  <Typography> {task.title}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Description:{" "}
                  </Typography>
                  <Typography> {task.description}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Assignee:{" "}
                  </Typography>
                  <Typography> {task.assignee}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Due Date{" "}
                  </Typography>
                  <Typography> {task.dueDate}</Typography>
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    <SettingsIcon />
                  </Button>
                  <Dialog width="400px" open={open} onClose={handleClose}>
                    <DialogTitle>
                      Please, enter ONLY fields that should be updated!
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please, enter new title of the task.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="titleValue"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new description of the task.
                      </DialogContentText>
                      <TextField
                        multiline
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="descriptionValue"
                        label="Description"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new assignee of the task.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="assigneeValue"
                        label="Assignee"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new due date for the task.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="dueDateValue"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          if (document.getElementById("titleValue").value)
                            task.title =
                              document.getElementById("titleValue").value;
                          if (document.getElementById("descriptionValue").value)
                            task.description =
                              document.getElementById("descriptionValue").value;
                          if (document.getElementById("assigneeValue").value)
                            task.assignee =
                              document.getElementById("assigneeValue").value;
                          if (document.getElementById("dueDateValue").value)
                            task.dueDate =
                              document.getElementById("dueDateValue").value;

                          window.localStorage.setItem(
                            "TASKS",
                            JSON.stringify(tasks)
                          );
                          handleClose();
                        }}
                      >
                        UPDATE
                      </Button>
                      <Button onClick={handleClose}>CANCEL</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    task.delete = true;
                    DeleteTaskFunction();
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
        <Typography variant="h6">Create a new task!</Typography>
        <div className="pt-3 flex flex-col ">
          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputTitle.value === ""}
            size="small"
            margin="dense"
            required
            id="taskInputTitle"
            label="Title"
            variant="outlined"
            placeholder="Title"
            onChange={(event) => {
              setNewTask({
                title: event.target.value,
                description: newTask.description,
                assignee: newTask.assignee,
                dueDate: newTask.dueDate,
              });
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputDescription.value === ""}
            inputProps={{
              style: {
                height: "60px",
              },
            }}
            multiline
            // size="string"
            margin="dense"
            required
            id="taskInputDescription"
            label="Description"
            variant="outlined"
            placeholder="Description"
            onChange={(event) => {
              setNewTask({
                title: newTask.title,
                description: event.target.value,
                assignee: newTask.assignee,
                dueDate: newTask.dueDate,
              });
            }}
          />
          {/* <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputAssignee.value === ""}
            size="small"
            margin="dense"
            required
            id="taskInputAssignee"
            label="Assignee"
            variant="outlined"
            placeholder="Assignee"
            onChange={(event) => {
              setNewTask({
                title: newTask.title,
                description: newTask.description,
                assignee: event.target.value,
                dueDate: newTask.dueDate,
              });
            }}
          /> */}

          {/* DROPDOWN MENU */}

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
                labelId="taskInputAssignee-label"
                id="taskInputAssignee"
                value={selectAssignee}
                label="Assignee"
                onChange={(event) => {
                  setNewTask({
                    title: newTask.title,
                    description: newTask.description,
                    assignee: event.target.value,
                    dueDate: newTask.dueDate,
                  });
                  setSelectAssignee(event.target.value);
                }}
              >
                {employees.map((emp) => {
                  return (
                    <MenuItem id="assigneeTaskNumber" value={emp.fullName}>
                      {emp.fullName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          {/* DROPDOWN MENU */}
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            error={alertCreate === true && inputDueDate.value === ""}
            size="small"
            margin="dense"
            required
            id="taskInputDueDate"
            label="Due Date"
            variant="outlined"
            placeholder="Due Date"
            onChange={(event) => {
              setNewTask({
                title: newTask.title,
                description: newTask.description,
                assignee: newTask.assignee,
                dueDate: event.target.value,
              });
            }}
          />

          <Button variant="outlined" onClick={CreateTaskFunction}>
            Create
          </Button>
          {alertCreate === true && (
            <Alert className="mt-5" severity="error">
              Error! All fields are mandatory! Please, enter information for the
              new task!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
