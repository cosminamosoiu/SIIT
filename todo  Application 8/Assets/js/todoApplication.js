function Application() {
  this.name = "Todo list";
  this.tableElement = $("#taskList");
  this.tableBodyElement = $("#taskList").find("tbody");
  this.entireDocument = $(document);
  this.tasksList = [];
}

Application.prototype.init = function () {
  this.addEventListeners();
  this.loadTasks();
};

Application.prototype._render = function (filterText = "") {
  this.destroyTable();
  this.tasksList
    //.filter(
    //(item) =>
    // !filterText || (filtertext && item.taskName.includes(filterText))
    //)
    .forEach((task) => {
      var row = task.getRow();
      this.tableBodyElement.append(row);
    });
};

Application.prototype.onToDoLoaded = function (tasks) {
  tasks.forEach(
    ({
      id,
      taskName,
      taskDescription,
      status,
      startDate,
      dueDate,
      assignedUser,
    }) => {
      var task = new Task(
        id,
        taskName,
        taskDescription,
        status,
        startDate,
        dueDate,
        assignedUser
      );
      this.tasksList.push(task);
    }
  );
  this._render();
};

Application.prototype._onRemoveButton = function () {
  $(this).closest("tr").remove();
};

Application.prototype._onAddTask = function () {
  $("#selectNewTask").slideDown();
};

Application.prototype._onSaveTask = function () {
  var statusValue = "In progress";
  var startDateValue = determineCurrentDate(new Date());
  var incrementDueDate = $("#selectDueDate").val();
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + Number(incrementDueDate));
  var correctDueDate = determineCurrentDate(dueDate);
  var newData = {
    id: $("#taskId").val(),
    taskName: $("#taskName").val(),
    taskDescription: $("#taskDescription").val(),
    status: statusValue,
    startDate: startDateValue,
    dueDate: correctDueDate,
    taskUser: $("#taskUser").val(),
  };
  $("#taskList").append(
    `<tr>
        <td>${newData.id}</td>
        <td>${newData.taskName}</td>
        <td>${newData.taskDescription}</td>
        <td>${newData.status}</td>
        <td>${newData.startDate}</td>
        <td>${newData.dueDate}</td>
        <td>${newData.taskUser}</td>
        <td><button class="removeTask">Remove</button></td>
      </tr>`
  );
  $("#selectNewTask").fadeOut("slow", function () {
    $("#selectNewTask").trigger("reset");
  });
};

Application.prototype._onFilterInput = function () {
  var aux = $("#filterInput").val();
  var rowData = aux.split(" ");
  var find = $("#fBody").find("tr");
  if (aux.value == "") {
    find.show();
    return;
  }
  find.hide();
  $.each(rowData, function (i, v) {
    find.filter(":contains('" + v + "')").show();
  });
};

Application.prototype.addEventListeners = function () {
  this.entireDocument.on("click", ".removeTask", this._onRemoveButton);
  this.entireDocument.on("click", "#addNewTask", this._onAddTask);
  this.entireDocument.on("click", "#saveTask", this._onSaveTask);
  this.entireDocument.on("keyup", "#filterInput", this._onFilterInput);
};

function determineCurrentDate(currentDate) {
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate();
  if (currentDay < 10) {
    currentDay = "0" + currentDay;
  }
  var correctDate =
    currentDay + "." + currentMonth + "." + currentDate.getFullYear();
  return correctDate;
}

Application.prototype.loadTasks = function () {
  $.ajax({
    method: "GET",
    url: "data/tasks.json",
    success: (tasks) => this.onToDoLoaded(tasks),
    error: this.onError,
  });
};

Application.prototype.destroyTable = function () {
  this.tableBodyElement.empty();
};

Application.prototype.onError = function (jqXhr, textStatus) {
  console.log("textStatus: ", textStatus);
};
