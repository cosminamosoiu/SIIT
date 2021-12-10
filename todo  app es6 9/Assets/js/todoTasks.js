function Task(options = {}) {
  const {
    id = "",
    taskName = "",
    taskDescription = "",
    status = "",
    startDate = "",
    dueDate = "",
    assignedUser = "",
  } = options;
  this.id = id;
  this.taskName = taskName;
  this.taskDescription = taskDescription;
  this.status = status;
  this.startDate = startDate;
  this.dueDate = dueDate;
  this.assignedUser = assignedUser;
}

Task.prototype.getRow = function () {
  return `<tr>  
        <td>${this.id}</td>
        <td>${this.taskName}</td>
        <td>${this.taskDescription}</td>
        <td>${this.status}</td>
        <td>${this.startDate}</td>
        <td>${this.dueDate}</td>
        <td>${this.assignedUser}</td>
        <td><button class="removeTask">Remove</button></td>
        </tr>`;
};
