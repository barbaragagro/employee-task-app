import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Alert from "@mui/material/Alert";

export default function Employees({
  employees,
  setEmployees,
  newEmployee,
  setNewEmployee,
}) {
  const [open, setOpen] = useState(false);
  const [alertCreate, setAlertCreate] = useState(false);

  let inputName = document.getElementById("employeeInputName");
  let inputEmail = document.getElementById("employeeInputEmail");
  let inputPhone = document.getElementById("employeeInputPhone");
  let inputBirthday = document.getElementById("employeeInputBirthday");
  let inputSalary = document.getElementById("employeeInputSalary");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateEmployeeFunction = () => {
    if (
      inputName.value !== "" &&
      inputEmail.value !== "" &&
      inputPhone.value !== "" &&
      inputBirthday.value !== "" &&
      inputSalary.value !== ""
    ) {
      setEmployees([...employees, newEmployee]);

      inputName.value = "";
      inputEmail.value = "";
      inputPhone.value = "";
      inputBirthday.value = "";
      inputSalary.value = "";

      setAlertCreate(false);
    } else setAlertCreate(true);
  };

  const DeleteEmployeeFunction = () => {
    const notDeletedEmployees = employees.filter(
      (employee) => employee.delete !== true
    );
    setEmployees(notDeletedEmployees);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("EMPLOYEES");

    if (data !== null) setEmployees(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("EMPLOYEES", JSON.stringify(employees));
  }, [employees]);

  return (
    <>
      <Typography className="pb-5" variant="h4">
        Employees:
      </Typography>
      <div className=" h-2/5 overflow-y-scroll">
        {employees.map((employee) => {
          return (
            <div
              className=" flex justify-between border shadow-md rounded p-5 m-5 "
              key={employee.email}
            >
              <div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Full Name:{" "}
                  </Typography>
                  <Typography> {employee.fullName}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Email:{" "}
                  </Typography>
                  <Typography> {employee.email}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Phone Number:{" "}
                  </Typography>
                  <Typography> {employee.phoneNumber}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Date Of Birth:{" "}
                  </Typography>
                  <Typography> {employee.dateOfBirth}</Typography>
                </div>
                <div className="flex">
                  <Typography color="primary" pr={1} fontWeight="bold">
                    Monthly Salary:{" "}
                  </Typography>
                  <Typography> {employee.monthlySalary} $</Typography>
                </div>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    <ManageAccountsIcon />
                  </Button>
                  <Dialog width="400px" open={open} onClose={handleClose}>
                    <DialogTitle>
                      Please, enter ONLY fields that should be updated!
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please, enter new name of the employee.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="nameValue"
                        label="FullName"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new email of the employee.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="emailValue"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new phone number of the employee.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="phoneValue"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new date of birth of the employee.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="birthdayValue"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        variant="standard"
                      />
                      <DialogContentText className="dialog">
                        Please, enter new monthly salary of the employee.
                      </DialogContentText>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        margin="dense"
                        id="salaryValue"
                        label="Monthly Salary (in USD)"
                        type="number"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          if (document.getElementById("nameValue").value)
                            employee.fullName =
                              document.getElementById("nameValue").value;
                          if (document.getElementById("emailValue").value)
                            employee.email =
                              document.getElementById("emailValue").value;
                          if (document.getElementById("phoneValue").value)
                            employee.phoneNumber =
                              document.getElementById("phoneValue").value;
                          if (document.getElementById("birthdayValue").value)
                            employee.dateOfBirth =
                              document.getElementById("birthdayValue").value;
                          if (document.getElementById("salaryValue").value)
                            employee.monthlySalary =
                              document.getElementById("salaryValue").value;

                          window.localStorage.setItem(
                            "EMPLOYEES",
                            JSON.stringify(employees)
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
                    employee.delete = true;
                    DeleteEmployeeFunction();
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
        <Typography variant="h6">Create a new employee!</Typography>
        <div className="pt-3 flex flex-col ">
          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputName.value === ""}
            size="small"
            margin="dense"
            required
            id="employeeInputName"
            label="Full Name"
            variant="outlined"
            placeholder="Full Name"
            onChange={(event) => {
              setNewEmployee({
                fullName: event.target.value,
                email: newEmployee.email,
                phoneNumber: newEmployee.phoneNumber,
                dateOfBirth: newEmployee.dateOfBirth,
                monthlySalary: newEmployee.monthlySalary,
                taskNumber: 0,
              });
            }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputEmail.value === ""}
            type="email"
            size="small"
            margin="dense"
            required
            id="employeeInputEmail"
            label="Email"
            variant="outlined"
            placeholder="Email"
            onChange={(event) => {
              setNewEmployee({
                fullName: newEmployee.fullName,
                email: event.target.value,
                phoneNumber: newEmployee.phoneNumber,
                dateOfBirth: newEmployee.dateOfBirth,
                monthlySalary: newEmployee.monthlySalary,
                taskNumber: 0,
              });
            }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            error={alertCreate === true && inputPhone.value === ""}
            size="small"
            margin="dense"
            required
            id="employeeInputPhone"
            label="Phone Number"
            variant="outlined"
            placeholder="Phone Number"
            onChange={(event) => {
              setNewEmployee({
                fullName: newEmployee.fullName,
                email: newEmployee.email,
                phoneNumber: event.target.value,
                dateOfBirth: newEmployee.dateOfBirth,
                monthlySalary: newEmployee.monthlySalary,
                taskNumber: 0,
              });
            }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type="date"
            error={alertCreate === true && inputBirthday.value === ""}
            size="small"
            margin="dense"
            required
            id="employeeInputBirthday"
            label="Date of Birth"
            variant="outlined"
            placeholder="Date of Birth"
            onChange={(event) => {
              setNewEmployee({
                fullName: newEmployee.fullName,
                email: newEmployee.email,
                phoneNumber: newEmployee.phoneNumber,
                dateOfBirth: event.target.value,
                monthlySalary: newEmployee.monthlySalary,
                taskNumber: 0,
              });
            }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            type="number"
            error={alertCreate === true && inputSalary.value === ""}
            size="small"
            margin="dense"
            required
            id="employeeInputSalary"
            label="Monthly Salary (in USD)"
            variant="outlined"
            placeholder="Monthly Salary"
            onChange={(event) => {
              setNewEmployee({
                fullName: newEmployee.fullName,
                email: newEmployee.email,
                phoneNumber: newEmployee.phoneNumber,
                dateOfBirth: newEmployee.dateOfBirth,
                monthlySalary: event.target.value,
                taskNumber: 0,
              });
            }}
          />

          <Button variant="outlined" onClick={CreateEmployeeFunction}>
            Create
          </Button>
          {alertCreate === true && (
            <Alert className="mt-5" severity="error">
              Error! All fields are mandatory! Please, enter information for the
              new employee!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
