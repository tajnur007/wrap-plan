import jsonData from '../../resources/data.json' assert { type: 'json' };
import timeData from '../../resources/time.json' assert { type: 'json' };
import { DB_KEYS, PROJECT_STATUS } from './constants.js';

const newProjectContainerNode = document.getElementById('newProjectCardsContainer');
const claimsGeneratedContainerNode = document.getElementById('claimsGeneratedCardsContainer');
const draftGeneratedContainerNode = document.getElementById('draftGeneratedCardsContainer');
const markedCompleteContainerNode = document.getElementById('markedCompleteCardsContainer');
const startNewProjectNode = document.getElementById('addNewProjectCard');

const DB = new Map();

const initializeDb = () => {
  Object.values(DB_KEYS).map(key => {
    DB.set(key, []);
  });
};

const loadDataFromJsonFileToDb = () => {
  const newProjects = [];
  const claimProjects = [];
  const draftProjects = [];
  const completeProjects = [];

  jsonData.map(project => {
    if (project.status === PROJECT_STATUS.NEW) {
      newProjects.push(project);
    } else if (project.status === PROJECT_STATUS.CLAIMS) {
      claimProjects.push(project);
    } else if (project.status === PROJECT_STATUS.DRAFT) {
      draftProjects.push(project);
    } else if (project.status === PROJECT_STATUS.COMPLETE) {
      completeProjects.push(project);
    }
  });

  DB.set(DB_KEYS.NEW, newProjects);
  DB.set(DB_KEYS.CLAIMS, claimProjects);
  DB.set(DB_KEYS.DRAFT, draftProjects);
  DB.set(DB_KEYS.COMPLETE, completeProjects);
};

initializeDb();
loadDataFromJsonFileToDb();
console.log('DB::', DB);
