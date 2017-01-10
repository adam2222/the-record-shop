const Promise = require('bluebird');
const fs = require('fs');

const db = require('./index');
const Campus = require('./models/index').Campus;
const Student = require('./models/index').Student;

// assumes list of campus links to wikimedia commons images of campuses
const campusLinks = fs.readFileSync('links.txt', 'utf8').split(',');

// CONFIGURATION

let numStudents = 25;
let numCampuses = 5;

// USERS

const firstNames = [
    'Charles', 'David', 'Michael', 'John', 'Andrew', 'Joseph', 'Robert', 'William', 'Gordon', 'Samuel',
    'Anne', 'Elizabeth', 'Christine', 'Yolanda', 'Raquel', 'Uma', 'Felicity', 'Valerie', 'Tara', 'Zoe'];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'];

function selectRandomEntry (nameArr) {
    function getRandomName (arr) {return Math.floor(Math.random() * arr.length)}
    return nameArr[getRandomName(nameArr)];
}

function createEmail (first, last) {
    return (first[0] + last).toLowerCase() + '@mhia.edu';
}

function createUser() {
    const firstName = selectRandomEntry(firstNames), lastName = selectRandomEntry(lastNames);
    const email = createEmail(firstName, lastName);
    return {firstName, lastName, email};
}

// CAMPUSES

const campusNames = ['Adirondack', 'Broome', 'Canton', 'Cayuga', 'Cobleskill', 'Greene',
                     'Cortland', 'Dutchess', 'Empire', 'Farmingdale', 'Fredonia', 'Herkimer',
                     'Jefferson', 'Nassau', 'Plattsburgh', 'Potsdam'];

// BUILDING MODELS

function generateUser () {
    const firstName = selectRandomEntry(firstNames);
    const lastName = selectRandomEntry(lastNames);

    return Student.build({
        firstName,
        lastName,
        email: createEmail(firstName, lastName)
    })
}

function generateCampus () {
    return Campus.build({
        name: selectRandomEntry(campusNames),
        image: selectRandomEntry(campusLinks)
    })
}

// SYNC

db.sync({force: true})
.then(() => {
    let students = [];
    while (numStudents) {
        students.push(generateUser());
        numStudents--;
    }
    return Promise.map(students, function (student) {
        return student.save();
    })
}, (err) => {
    console.error(err.stack);
})
.then(() => {
    let campuses = [];
    while (numCampuses) {
        campuses.push(generateCampus());
        numCampuses--;
    }
    return Promise.map(campuses, function (campus) {
        return campus.save();
    })
}, (err) => {
    console.error(err.stack);
})
.then(() => {
    db.close();
    console.log('Complete!');
    return null;
})
