import jsonData from '../../resources/data.json' assert { type: 'json' };
import timeData from '../../resources/time.json' assert { type: 'json' };
import { BORDER_CLASSES, PROJECT_STATUS } from './constants.js';

const newProjectContainerNode = document.getElementById('newProjectCardsContainer');
const claimsGeneratedContainerNode = document.getElementById('claimsGeneratedCardsContainer');
const draftGeneratedContainerNode = document.getElementById('draftGeneratedCardsContainer');
const markedCompleteContainerNode = document.getElementById('markedCompleteCardsContainer');
const startNewProjectNode = document.getElementById('addNewProjectCard');
const createProjectModalNode = document.getElementById('createProjectModal');
const modalCloseBtnNode = document.getElementById('modalCloseBtn');

const loadDataFromJsonFileToDom = () => {
  jsonData.map(project => {
    if (project.status === PROJECT_STATUS.NEW) {
      const card = generateCard(project, BORDER_CLASSES.NEW);
      newProjectContainerNode.appendChild(card);
    } else if (project.status === PROJECT_STATUS.CLAIMS) {
      const card = generateCard(project, BORDER_CLASSES.CLAIMS);
      claimsGeneratedContainerNode.appendChild(card);
    } else if (project.status === PROJECT_STATUS.DRAFT) {
      const card = generateCard(project, BORDER_CLASSES.DRAFT);
      draftGeneratedContainerNode.appendChild(card);
    } else if (project.status === PROJECT_STATUS.COMPLETE) {
      const card = generateCard(project, BORDER_CLASSES.COMPLETE);
      markedCompleteContainerNode.appendChild(card);
    }
  });
};

const generateCard = (project, borderClass) => {
  const card = document.createElement('div');

  card.className = `card-container ${borderClass}`;
  card.innerHTML = `
    <div class="card h-full d-flex flex-column justify-between">
      <h3 class="card-title">${project.name}</h3>
      <div>
        <p>
          <span class="client-text">Client</span>
          <span class="client-name d-inline-block ml-4">${project.client}</span>
        </p>
        <div class="d-flex justify-between mt-4">
          <div>
            <p class="date-text">Create on</p>
            <p class="date">${project.create_on}</p>
          </div>
          <div>
            <p class="date-text">Modified on</p>
            <p class="date">${project.last_modified}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
};

loadDataFromJsonFileToDom();

const openCreateProjectModal = () => {
  createProjectModalNode.style.display = 'flex';
};

export const closeCreateProjectModal = () => {
  createProjectModalNode.style.display = 'none';
};

startNewProjectNode.addEventListener('click', openCreateProjectModal);
modalCloseBtnNode.addEventListener('click', closeCreateProjectModal);