function showNoTasksMessage() {
  const morningTasksList = document.querySelector('.work-session-1 > div:nth-of-type(2)');
  const afternoonTasksList = document.querySelector('.work-session-2 > div:nth-of-type(2)');

  if (morningTasksList) morningTasksList.innerHTML = '<p class="no-tasks">All tasks completed! 🎉</p>';
  if (afternoonTasksList) afternoonTasksList.innerHTML = '<p class="no-tasks">Great job! 🌟</p>';

  // Reset headers
//   const morningHeader = document.querySelector('.work-session-1 h2');
//   const afternoonHeader = document.querySelector('.work-session-2 h2');
}

function updateTaskProgress(weekId, taskId, checkbox) {
  const taskItem = checkbox.closest('.task-item');

  // console.log(weekId,taskId,checkbox );

  // Add completion animation class
  taskItem.classList.add('task-completed');
  // console.log(taskItem);

  // Wait for animation to finish before updating state
  setTimeout(() => {
    const storedData = JSON.parse(localStorage.getItem('weekTopics'));
    const taskIndex = storedData[weekId].findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      // Update completion status based on checkbox state
      storedData[weekId][taskIndex].completed = checkbox.checked;

      localStorage.setItem('weekTopics', JSON.stringify(storedData));

      // Trigger a custom event for badge updates
      const event = new CustomEvent('taskStatusChanged', {
        detail: { weekId, taskId, completed: checkbox.checked },
      });
      window.dispatchEvent(event);

      // Reload tasks to update the display
      loadWeekTasks(weekId[weekId.length - 1] - 1);
    }
  }, 500); // Match this with the CSS animation duration
}

function loadWeekTasks(weekId) {
  const storedData = JSON.parse(localStorage.getItem('weekTopics'));

  const parsedWeekId = parseInt(weekId, 10) + 1;
  const w = `week${parsedWeekId}`;
  if (!storedData || !storedData[w]) {
    console.log('you are here');
    showNoTasksMessage();
    return;
  }

  const pendingTasks = storedData[w].filter((task) => !task.completed);

  if (pendingTasks.length === 0) {
    showNoTasksMessage();
    return;
  }

  // Get task containers using the new class names
  const morningTasksList = document.querySelector('.work-session-1 > div:nth-of-type(2)');
  const afternoonTasksList = document.querySelector('.work-session-2 > div:nth-of-type(2)');

  if (!morningTasksList || !afternoonTasksList) {
    console.error('Could not find task list containers');
    return;
  }

  // Clear previous content
  morningTasksList.innerHTML = '';
  afternoonTasksList.innerHTML = '';

  // Split tasks between morning and afternoon
  const midPoint = Math.ceil(pendingTasks.length / 2);
  const morningTasks = pendingTasks.slice(0, midPoint);
  const afternoonTasks = pendingTasks.slice(midPoint);

  // Update section headers with task counts
  const morningHeader = document.querySelector('.work-session:first-of-type .routine-header h2');
  const afternoonHeader = document.querySelector('.work-session:last-of-type .routine-header h2');

  if (morningHeader) morningHeader.textContent = `Morning Work Session (${morningTasks.length} tasks)`;
  if (afternoonHeader) afternoonHeader.textContent = `Afternoon Work Session (${afternoonTasks.length} tasks)`;

  // Render morning tasks
  morningTasksList.innerHTML = morningTasks.map((task) => `
        <div class="task-item" data-task-id="${task.id}">
            <input type="checkbox" id="${task.id}" 
                   ${task.completed ? 'checked' : ''} 
                   >
            <label for="${task.id}">${task.name}</label>
        </div>
    `).join('');

  morningTasksList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const taskId = checkbox.id;
      updateTaskProgress(w, taskId, checkbox);
    });
  });

  // Render afternoon tasks
  afternoonTasksList.innerHTML = afternoonTasks.map((task) => `
        <div class="task-item" data-task-id="${task.id}">
            <input type="checkbox" id="${task.id}" 
                   ${task.completed ? 'checked' : ''} 
                  >
            <label for="${task.id}">${task.name}</label>
        </div>
    `).join('');

  afternoonTasksList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const taskId = checkbox.id;
      updateTaskProgress(`week${weekId}`, taskId, checkbox);
    });
  });
}

function setupWeekSelection() {
  const weekButtons = document.querySelectorAll('.week-btn');
  weekButtons.forEach((button) => {
    button.addEventListener('click', () => {
      weekButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      // console.log(button.dataset.week);
      loadWeekTasks(button.getAttribute('watt'));
    });
  });

  // Load first week by default
  if (weekButtons.length > 0) {
    weekButtons[0].click();
  }
}

// Show message when no tasks are available

// Update task progress with animation

export default function decorate(block) {
  block.children[0].classList.add('morning');
  block.children[1].classList.add('work-session-1');
  block.children[2].classList.add('break');
  block.children[3].classList.add('work-session-2');
  [...block.children].forEach((card) => {
    card.classList.add('routine-card');
  });

  setupWeekSelection();
}
