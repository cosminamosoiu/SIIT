$(document).ready(function () {
  function onTodoLoaded(tasks) {
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
        var row = `<tr>
                <td>${id}</td>
                <td>${taskName}</td>
                <td>${taskDescription}</td>
                <td>${status}</td>
                <td>${startDate}</td>
                <td>${dueDate}</td>
                <td>${assignedUser}</td>
                <td><button class="removeTask">Remove</button></td></tr>`;
        $("#taskList tbody").append(row);
      }
    );
  }

  $("#addNewTask").on("click", function () {
    $("#selectNewTask").slideDown();
  });

  $("#saveTask").on("click", function () {
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
  });

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

  $("#filterInput").keyup(function () {
    var rowData = this.value.split(" ");
    var find = $("#fBody").find("tr");
    if (this.value == "") {
      find.show();
      return;
    }
    find.hide();
    find
      .filter(function () {
        var $searchData = $(this);
        for (var d = 0; d < rowData.length; ++d) {
          if ($searchData.is(":contains('" + rowData[d] + "')")) {
            return true;
          }
        }
        return false;
      })
      .show();
  });

  $("#saveTask").on("click", function () {
    $("#selectNewTask").fadeOut("slow", function () {
      $("#selectNewTask").trigger("reset");
    });
  });

  $(document).on("click", ".removeTask", function () {
    $(this).closest("tr").remove();
  });

  function onError(jqXhr, textStatus) {
    console.log("textStatus: ", textStatus);
  }

  $.ajax({
    method: "GET",
    url: "/tasks.json",
    success: onTodoLoaded,
    error: onError,
  });
});
