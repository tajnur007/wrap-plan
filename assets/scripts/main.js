import jsonData from '../../resources/data.json' assert { type: 'json' };
import timeData from '../../resources/time.json' assert { type: 'json' };
import { BORDER_CLASSES, PROJECT_STATUS } from './constants.js';

const newProjectContainerNode = document.getElementById('newProjectCardsContainer');
const claimsGeneratedContainerNode = document.getElementById('claimsGeneratedCardsContainer');
const draftGeneratedContainerNode = document.getElementById('draftGeneratedCardsContainer');
const markedCompleteContainerNode = document.getElementById('markedCompleteCardsContainer');

const newProjectCountNode = document.getElementById('newProjectCount');
const claimsGeneratedCountNode = document.getElementById('claimsGeneratedCount');
const draftGeneratedCountNode = document.getElementById('draftGeneratedCount');
const markedCompleteCountNode = document.getElementById('markedCompleteCount');

const startNewProjectNode = document.getElementById('addNewProjectCard');
const createProjectModalNode = document.getElementById('createProjectModal');
const modalCloseBtnNode = document.getElementById('modalCloseBtn');

let numOfNewProjects = 0;
let numOfClaimsGenerated = 0;
let numOfDraftGenerated = 0;
let numOfMarkedComplete = 0;

const loadDataFromJsonFileToDom = () => {
  jsonData.map(project => {
    if (project.status === PROJECT_STATUS.NEW) {
      const card = generateCard(project, BORDER_CLASSES.NEW);
      newProjectContainerNode.appendChild(card);
      numOfNewProjects++;
    } else if (project.status === PROJECT_STATUS.CLAIMS) {
      const card = generateCard(project, BORDER_CLASSES.CLAIMS);
      claimsGeneratedContainerNode.appendChild(card);
      numOfClaimsGenerated++;
    } else if (project.status === PROJECT_STATUS.DRAFT) {
      const card = generateCard(project, BORDER_CLASSES.DRAFT);
      draftGeneratedContainerNode.appendChild(card);
      numOfDraftGenerated++;
    } else if (project.status === PROJECT_STATUS.COMPLETE) {
      const card = generateCard(project, BORDER_CLASSES.COMPLETE);
      markedCompleteContainerNode.appendChild(card);
      numOfMarkedComplete++;
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

const updateCounts = () => {
  newProjectCountNode.innerText = numOfNewProjects;
  claimsGeneratedCountNode.innerText = numOfClaimsGenerated;
  draftGeneratedCountNode.innerText = numOfDraftGenerated;
  markedCompleteCountNode.innerText = numOfMarkedComplete;
};

loadDataFromJsonFileToDom();
updateCounts();

const openCreateProjectModal = () => {
  createProjectModalNode.style.display = 'flex';
};

export const closeCreateProjectModal = () => {
  createProjectModalNode.style.display = 'none';
};

startNewProjectNode.addEventListener('click', openCreateProjectModal);
modalCloseBtnNode.addEventListener('click', closeCreateProjectModal);