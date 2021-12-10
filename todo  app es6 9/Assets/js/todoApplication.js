const getTasks = new Promise((resolve, reject) => {
  $.ajax({
    method: "GET",
    url: "data/tasks.json",
    success: function (tasks) {
      resolve(tasks);
    },
    error: function (jqXhr, textStatus, erroeThrown) {
      reject(textStatus, erroeThrown);
    },
  });
});

class Application {
  constructor(name) {
    this.name = "Todo list";
    this.tableElement = $("#taskList");
    this.tableBodyElement = $("#taskList").find("tbody");
    this.entireDocument = $(document);
    this.formBody = $("#selectNewTask");
    this.tasksList = [];
  }

  init() {
    this.addEventListeners();
    this.loadTasks();
  }

  _render(filterText = "") {
    this.destroyTable();
    this.tasksList.forEach((task) => {
      const row = task.getRow();
      this.tableBodyElement.append(row);
    });
  }

  onToDoLoaded(tasks) {
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
        var options = {
          id,
          taskName,
          taskDescription,
          status,
          startDate,
          dueDate,
          assignedUser,
        };

        const task = new Task(options);
        this.tasksList.push(task);
      }
    );
    this._render();
  }
  _onRemoveButton() {
    $(this).closest("tr").remove();
  }

  _onAddTask() {
    $("#selectNewTask").slideDown();
  }

  _onSaveTask() {
    function determineCurrentDate(currentDate) {
      const currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();
      if (currentDay < 10) {
        currentDay = "0" + currentDay;
      }
      const correctDate =
        currentDay + "." + currentMonth + "." + currentDate.getFullYear();
      return correctDate;
    }

    const statusValue = "In progress";
    const startDateValue = determineCurrentDate(new Date());
    const incrementDueDate = $("#selectDueDate").val();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(incrementDueDate));
    let correctDueDate = determineCurrentDate(dueDate);

    const newData = {
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
  }

  _onFilterInput() {
    let aux = $("#filterInput").val();
    let rowData = aux.split(" ");
    let find = $("#fBody").find("tr");
    if (aux.value == "") {
      find.show();
      return;
    }
    find.hide();
    $.each(rowData, function (i, v) {
      find.filter(":contains('" + v + "')").show();
    });
  }

  addEventListeners() {
    $(document).on("click", ".removeTask", this._onRemoveButton);
    $(document).on("click", "#addNewTask", this._onAddTask);
    $(document).on("click", "#saveTask", this._onSaveTask);
    $(document).on("keyup", "#filterInput", this._onFilterInput);
  }

  loadTasks() {
    getTasks
      .then((tasks) => {
        this.onToDoLoaded(tasks);
      })
      .catch((textStatus, errorThrown) => {
        console.error(textStatus, errorThrown);
      });
  }

  destroyTable() {
    this.tableBodyElement.empty();
  }
}
