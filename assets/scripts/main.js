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

const createProjectModalNode = document.getElementById('createProjectModal');

const newProjectsData = [];
const claimsGeneratedData = [];
const draftGeneratedData = [];
const markedCompleteData = [];

let numberOfTotalProjects = 0;
let currentClickedProjectId = null;
let currentClickedProjectStatus = null;

const loadDataFromJsonFileToStore = () => {
  jsonData.forEach((project, id) => {
    const projectWithId = { id, ...project };

    if (project.status === PROJECT_STATUS.NEW) {
      newProjectsData.push(projectWithId);
    } else if (project.status === PROJECT_STATUS.CLAIMS) {
      claimsGeneratedData.push(projectWithId);
    } else if (project.status === PROJECT_STATUS.DRAFT) {
      draftGeneratedData.push(projectWithId);
    } else if (project.status === PROJECT_STATUS.COMPLETE) {
      markedCompleteData.push(projectWithId);
    }
  });

  numberOfTotalProjects = numberOfTotalProjects.length;
};

const loadDataFromStoreToDom = () => {
  newProjectsData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.NEW);
    newProjectContainerNode.appendChild(card);
  });

  claimsGeneratedData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.CLAIMS);
    claimsGeneratedContainerNode.appendChild(card);
  });

  draftGeneratedData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.DRAFT);
    draftGeneratedContainerNode.appendChild(card);
  });

  markedCompleteData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.COMPLETE);
    markedCompleteContainerNode.appendChild(card);
  });
};

const generateCard = (project, borderClass) => {
  const card = document.createElement('div');

  card.className = `card-container ${borderClass}`;
  card.innerHTML = `
    <div class="card h-full d-flex flex-column justify-between">
      <h3 class="card-title">${project.name}</h3>
      <div class="three-dot center-y h-full" onclick="showActionBox('${project.id}, ${project.status}')">
        <div class="d-flex flex-column px-1">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
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
  newProjectCountNode.innerText = newProjectsData.length;
  claimsGeneratedCountNode.innerText = claimsGeneratedData.length;
  draftGeneratedCountNode.innerText = draftGeneratedData.length;
  markedCompleteCountNode.innerText = markedCompleteData.length;
};

loadDataFromJsonFileToStore();
loadDataFromStoreToDom();
updateCounts();

window.openCreateProjectModal = () => {
  createProjectModalNode.style.display = 'flex';
};

window.closeCreateProjectModal = () => {
  createProjectModalNode.style.display = 'none';
};

window.showActionBox = (projectId, projectStatus) => {
  console.log('Project:::', projectId, projectStatus);
  currentClickedProjectId = projectId;
  currentClickedProjectStatus = projectStatus;
};

window.updateProjectStatus = (targetedStatus) => {
  let targetedProject;

  if (currentClickedProjectStatus === PROJECT_STATUS.NEW) {
    targetedProject = newProjectsData.find(project => project.id === currentClickedProjectId);
    newProjectsData = newProjectsData.filter(project => project.id !== currentClickedProjectId);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.CLAIMS) {
    targetedProject = claimsGeneratedData.find(project => project.id === currentClickedProjectId);
    claimsGeneratedData = claimsGeneratedData.filter(project => project.id !== currentClickedProjectId);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.DRAFT) {
    targetedProject = draftGeneratedData.find(project => project.id === currentClickedProjectId);
    draftGeneratedData = draftGeneratedData.filter(project => project.id !== currentClickedProjectId);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.COMPLETE) {
    targetedProject = markedCompleteData.find(project => project.id === currentClickedProjectId);
    markedCompleteData = markedCompleteData.filter(project => project.id !== currentClickedProjectId);
  }

  targetedProject.status = targetedStatus;

  if (targetedStatus === PROJECT_STATUS.NEW) {
    newProjectsData.push(targetedProject);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.CLAIMS) {
    claimsGeneratedData.push(targetedProject);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.DRAFT) {
    draftGeneratedData.push(targetedProject);
  } else if (currentClickedProjectStatus === PROJECT_STATUS.COMPLETE) {
    markedCompleteData.push(targetedProject);
  }

  loadDataFromStoreToDom();
};