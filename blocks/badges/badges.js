// function isWeekCompleted(weekId) {
//   const storedData = JSON.parse(localStorage.getItem('weekTopics'));
//   if (!storedData || !storedData[weekId]) return false;

//   return storedData[weekId].every((topic) => topic.completed);
// }

function updateBadges() {
  const storedData = JSON.parse(localStorage.getItem('weekTopics'));
  if (!storedData) return;

  Object.entries(storedData).forEach(([weekId, topics]) => {
    const badge = document.getElementById(`${weekId}-badge`);
    console.log(badge);
    if (!badge) return;

    // Calculate progress percentage
    const totalTasks = topics.length;
    const completedTasks = topics.filter((topic) => topic.completed).length;
    const progressPercentage = (completedTasks / totalTasks) * 100;

    // Update progress bar
    const progressBar = badge.querySelector('.progress');
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }

    // Check if all tasks are completed
    const isWeekCompleted = completedTasks === totalTasks;

    // Update badge status
    const badgeOverlay = badge.querySelector('.badge-overlay');
    const badgeImage = badge.querySelector('.badge-image');

    if (isWeekCompleted) {
      badge.classList.remove('locked');
      if (badgeOverlay) {
        badgeOverlay.style.display = 'none';
      }
      if (badgeImage) {
        badgeImage.style.filter = 'none';
      }
    } else {
      badge.classList.add('locked');
      if (badgeOverlay) {
        badgeOverlay.style.display = 'flex';
      }
      if (badgeImage) {
        badgeImage.style.filter = 'blur(3px) grayscale(1)';
      }
    }
  });
}

export default function decorate(block) {
  let iter = 1;
  [...block.children].forEach((badge) => {
    badge.classList.add('badge-card');
    badge.id = `week${iter}-badge`;
    badge.classList.add('locked');
    // console.log(badge);
    badge.children[0].classList.add('badge-card-top');
    badge.children[1].classList.add('badge-card-bottom');
    const badgeBottom = badge.children[1];
    const progress = document.createElement('div');
    progress.classList.add('progress-bar');
    progress.append(document.createElement('div'));
    progress.children[0].classList.add('progress');
    badgeBottom.append(progress);
    iter += 1;
  });
  updateBadges();
}
