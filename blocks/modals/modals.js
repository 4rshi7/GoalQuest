export function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('show');
  }
}
export function closeModal(id) {
  // console.log(id);
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('show');
  }
}

// Load topics for a specific week
// function loadTopics(weekId) {
//   const topics = JSON.parse(localStorage.getItem('weekTopics'))[weekId];
//   const topicsList = document.querySelector(`#${weekId}Modal .topics-list`);
//   topicsList.innerHTML = topics.map((topic) => `
//     <div class="topic-item">
//         <input type="checkbox" id="${topic.id}" ${topic.completed ? 'checked' : ''}>
//         <label for="${topic.id}">${topic.name}</label>
//     </div>
// `).join('');

//   // Attach the listeners
//   topicsList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
//     const topicId = checkbox.id;
//     checkbox.addEventListener('change', () => updateProgress(weekId, topicId));
//   });
//   updateWeekProgress(weekId);
// }

// Update progress when a topic is checked/unchecked

// Update the progress display for a specific week
function updateWeekProgress(weekId) {
  const storedData = JSON.parse(localStorage.getItem('weekTopics'));
  const topics = storedData[weekId];
  const completedCount = topics.filter((t) => t.completed).length;
  const progressPercentage = Math.round((completedCount / topics.length) * 100);

  // Find the specific week's progress elements
  const id = weekId[weekId.length - 1]; // Get the last character of weekId (e.g., '1' from 'week1')
  const weekCard = document.getElementById(id);
  // console.log(weekCard);
  const progressPath = weekCard.querySelector('.radial-progress path');
  // console.log(progressPath);
  const progressText = weekCard.querySelector('p');
  progressPath.setAttribute('stroke-dasharray', `${progressPercentage}, 100`);
  progressText.textContent = `${progressPercentage}%`;
}

function updateProgress(weekId, topicId) {
  const storedData = JSON.parse(localStorage.getItem('weekTopics'));
  const topicIndex = storedData[weekId].findIndex((t) => t.id === topicId);
  storedData[weekId][topicIndex].completed = !storedData[weekId][topicIndex].completed;
  localStorage.setItem('weekTopics', JSON.stringify(storedData));
  updateWeekProgress(weekId);
}

export default function decorate(block) {
  console.log(block);
  let iter = 1;
  [...block.children].forEach((child) => {
    child.classList.add('modal');
    child.id = `week${iter}modal`;
    // console.log(child.id);
    const listWrapper = child.children[0];
    listWrapper.classList.add('topics-list-wrapper');
    // listWrapper.children[1].classList.add('topics-list');
    const close = child.querySelector('p');
    // console.log(close);
    close.addEventListener('click', () => {
      closeModal(child.id);
    });
    iter += 1;
  });
  ['week1', 'week2', 'week3', 'week4'].forEach((weekId) => {
    const topics = JSON.parse(localStorage.getItem('weekTopics'))[weekId];
    const topicsList = document.querySelector(`#${weekId}modal`).children[0];
    // console.log(topicsList);
    if (topicsList && topics) {
      const newAddition = document.createElement('div');
      newAddition.innerHTML = topics.map((topic) => `
    <div class="topic-item">
        <input type="checkbox" id="${topic.id}" ${topic.completed ? 'checked' : ''}>
        <label for="${topic.id}">${topic.name}</label>
    </div>
`).join('');

      // Attach the listeners
      newAddition.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        const topicId = checkbox.id;
        checkbox.addEventListener('change', () => updateProgress(weekId, topicId));
      });
      topicsList.append(newAddition);
      updateWeekProgress(weekId);
    }
  });
}
