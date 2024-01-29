/**
 * All imports (File Data, Utility Functions, Constants and Others)
 */
import jsonData from '../../resources/data.json' assert { type: 'json' };
import timeData from '../../resources/time.json' assert { type: 'json' };
import { BORDER_CLASSES, PROJECT_STATUS } from './constants.js';

/**
 * Project card container DOM elements
 */
const newProjectContainerNode = document.getElementById('newProjectCardsContainer');
const claimsGeneratedContainerNode = document.getElementById('claimsGeneratedCardsContainer');
const draftGeneratedContainerNode = document.getElementById('draftGeneratedCardsContainer');
const markedCompleteContainerNode = document.getElementById('markedCompleteCardsContainer');

/**
 * Project count DOM elements
 */
const newProjectCountNode = document.getElementById('newProjectCount');
const claimsGeneratedCountNode = document.getElementById('claimsGeneratedCount');
const draftGeneratedCountNode = document.getElementById('draftGeneratedCount');
const markedCompleteCountNode = document.getElementById('markedCompleteCount');

/**
 * Create new project modal and action dropdown related DOM elements
 */
const createProjectModalNode = document.getElementById('createProjectModal');
const projectTitleInputNode = document.getElementById('projectTitleInput');
const clientNameInputNode = document.getElementById('clientNameInput');
const actionDropdownNode = document.getElementById('actionDropdown');

/**
 * Local variables to store project data and track user behaviors
 */
let newProjectsData = [];
let claimsGeneratedData = [];
let draftGeneratedData = [];
let markedCompleteData = [];

let numberOfTotalProjects = 0;
let currentClickedActionBtnId = null;
let currentClickedProjectId = null;
let currentClickedProjectStatus = null;

/**
 * Will iterate over project data which is taking from JSON file
 * and store the data with an individual ID according to their status 
 */
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

  numberOfTotalProjects = jsonData.length;
};

/**
 * Will add project cards into DOM
 * Procedure: Clear the cards container first and then append each card
 * as a child element with project info
 */
const loadDataFromStoreToDom = () => {
  const addNewProjectCard = `
    <div id="addNewProjectCard" class="center flex-column cursor-pointer" onclick="openCreateProjectModal()">
      <img src="./assets/icons/add-icon.svg" alt="add-icon">
      <p class="client-name mt-4">Start a new project</p>
    </div>
  `;

  newProjectContainerNode.innerHTML = addNewProjectCard;
  newProjectsData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.NEW);
    newProjectContainerNode.appendChild(card);
  });

  claimsGeneratedContainerNode.innerHTML = '';
  claimsGeneratedData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.CLAIMS);
    claimsGeneratedContainerNode.appendChild(card);
  });

  draftGeneratedContainerNode.innerHTML = '';
  draftGeneratedData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.DRAFT);
    draftGeneratedContainerNode.appendChild(card);
  });

  markedCompleteContainerNode.innerHTML = '';
  markedCompleteData.forEach(project => {
    const card = generateCard(project, BORDER_CLASSES.COMPLETE);
    markedCompleteContainerNode.appendChild(card);
  });

  updateCounts();
};

/**
 * This will generate a project card with given params info
 * @param {ProjectData} project - Stored project data
 * @param {string} borderClass - Predefined border class
 * @returns Card element
 */
const generateCard = (project, borderClass) => {
  const card = document.createElement('div');

  card.className = `card-container ${borderClass}`;
  card.innerHTML = `
    <div class="card h-full d-flex flex-column justify-between">
      <h3 class="card-title">${project.name}</h3>
      <div class="three-dot center-y h-full">
        <div id="${'threeDot' + project.id}" class="d-flex flex-column px-1" onclick="showActionBox('${'threeDot' + project.id}', '${project.id}', '${project.status}')">
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

/**
 * This method will update the number of projects into a particular section
 */
const updateCounts = () => {
  newProjectCountNode.innerText = newProjectsData.length;
  claimsGeneratedCountNode.innerText = claimsGeneratedData.length;
  draftGeneratedCountNode.innerText = draftGeneratedData.length;
  markedCompleteCountNode.innerText = markedCompleteData.length;
};

/**
 * This will return a delay timing according to project status
 * @param {string} targetedStatus - The status into a project status field
 * @returns A number which is given into time.json file
 */
const getDelayTiming = (targetedStatus) => {
  if (targetedStatus === PROJECT_STATUS.NEW) {
    return timeData['New Project'];
  } else if (targetedStatus === PROJECT_STATUS.CLAIMS) {
    return timeData['Claims generated'];
  } else if (targetedStatus === PROJECT_STATUS.DRAFT) {
    return timeData['Draft generated'];
  } else if (targetedStatus === PROJECT_STATUS.COMPLETE) {
    return timeData['Complete'];
  }

  return 0;
};

/**
 * Loading project cards into DOM
 */
loadDataFromJsonFileToStore();
loadDataFromStoreToDom();

/**
 * Event handler to control outside click of action dropdown
 */
document.addEventListener('click', (e) => {
  if (e.target.id.includes('threeDot') || e.target.className.split(' ').includes('dot')) {
  } else {
    currentClickedActionBtnId = null;
    actionDropdownNode.style.display = 'none';
  }
});

/**
 * Event handler to open Create New Project modal
 */
window.openCreateProjectModal = () => {
  createProjectModalNode.style.display = 'flex';
};

/**
 * Event handler to close Create New Project modal
 */
window.closeCreateProjectModal = () => {
  projectTitleInputNode.value = '';
  clientNameInputNode.value = '';
  createProjectModalNode.style.display = 'none';
};

/**
 * Event handler to insert a new project with given inputs
 */
window.createNewProject = () => {
  const projectTitle = projectTitleInputNode.value.trim();
  const clientName = clientNameInputNode.value.trim();

  if (!projectTitle || !clientName) {
    alert('You must have to provide a project title and client name to create a new project');
  } else {
    const isoDate = new Date().toISOString();
    const [year, month, day] = isoDate.substring(0, 10).split('-');

    const newProject = {
      id: numberOfTotalProjects,
      name: projectTitle,
      client: clientName,
      create_on: `${day}-${month}-${year}`,
      last_modified: "Just now",
      status: "New Project"
    };

    newProjectsData.push(newProject);
    numberOfTotalProjects++;
    loadDataFromStoreToDom();
    window.closeCreateProjectModal();
  }
};

/**
 * This event handler will show the action dropdown by tracking the current 
 * clicked location into DOM
 * @param {string} actionBtnId - Clicked action button ID 
 * @param {string} projectId - Clicked project's ID
 * @param {string} projectStatus - Clicked project's Status
 */
window.showActionBox = (actionBtnId, projectId, projectStatus) => {
  if (currentClickedActionBtnId === actionBtnId) {
    currentClickedActionBtnId = null;
    actionDropdownNode.style.display = 'none';
  } else {
    const clickedActionBtnNode = document.getElementById(actionBtnId);
    const actionBtnPosition = clickedActionBtnNode.getBoundingClientRect();

    currentClickedActionBtnId = actionBtnId;

    actionDropdownNode.style.display = 'block';
    actionDropdownNode.style.top = `${window.scrollY + actionBtnPosition.top - 45}px`;
    actionDropdownNode.style.left = `${window.scrollX + actionBtnPosition.left - 120}px`;

    currentClickedProjectId = projectId;
    currentClickedProjectStatus = projectStatus;
  }
};

/**
 * This event handler will update a project's status
 * @param {string} targetedStatus - Selected project section's status
 */
window.updateProjectStatus = (targetedStatus) => {
  const delayTiming = getDelayTiming(targetedStatus);

  currentClickedActionBtnId = null;
  actionDropdownNode.style.display = 'none';

  setTimeout(() => {
    let targetedProject;

    if (currentClickedProjectStatus === PROJECT_STATUS.NEW) {
      targetedProject = newProjectsData.find(project => project.id == currentClickedProjectId);
      newProjectsData = newProjectsData.filter(project => project.id != currentClickedProjectId);
    } else if (currentClickedProjectStatus === PROJECT_STATUS.CLAIMS) {
      targetedProject = claimsGeneratedData.find(project => project.id == currentClickedProjectId);
      claimsGeneratedData = claimsGeneratedData.filter(project => project.id != currentClickedProjectId);
    } else if (currentClickedProjectStatus === PROJECT_STATUS.DRAFT) {
      targetedProject = draftGeneratedData.find(project => project.id == currentClickedProjectId);
      draftGeneratedData = draftGeneratedData.filter(project => project.id != currentClickedProjectId);
    } else if (currentClickedProjectStatus === PROJECT_STATUS.COMPLETE) {
      targetedProject = markedCompleteData.find(project => project.id == currentClickedProjectId);
      markedCompleteData = markedCompleteData.filter(project => project.id != currentClickedProjectId);
    }

    targetedProject.status = targetedStatus;

    if (targetedStatus === PROJECT_STATUS.NEW) {
      newProjectsData.push(targetedProject);
    } else if (targetedStatus === PROJECT_STATUS.CLAIMS) {
      claimsGeneratedData.push(targetedProject);
    } else if (targetedStatus === PROJECT_STATUS.DRAFT) {
      draftGeneratedData.push(targetedProject);
    } else if (targetedStatus === PROJECT_STATUS.COMPLETE) {
      markedCompleteData.push(targetedProject);
    }

    loadDataFromStoreToDom();
  }, 1000 * delayTiming);
};