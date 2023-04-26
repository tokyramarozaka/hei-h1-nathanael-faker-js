import { faker } from '@faker-js/faker';
import fs from 'fs';
const group_values = [];
const user_values = [];
const course_values = [];
const exam_values = [];
const follow_values = [];
const have_grade_values = [];


//Génère les "fake data" de la table "group"
for (let i = 0; i < 1000; i++) {
    const id_group = faker.datatype.number() + faker.random.alpha({ casing: 'upper' });
    const ref_group = faker.helpers.unique(()=>faker.random.alpha({ count: 1, casing: 'upper' }) + faker.datatype.number({ min: 1, max: 9 })+i);
    const creation_datetime = faker.date.between('2021-01-01', '2023-06-18').toISOString().slice(0, 19).replace('T', ' ');


    //Génère les "fake data" de la table "user"
    const id_user = faker.datatype.number() + faker.random.alpha({ casing: 'upper', count: 2 });
    const last_name = faker.name.lastName().replace("'", "''");
    const first_name = faker.name.firstName().replace("'", "''");
    const email = `hei.${last_name}.${i + 1}@gmail.com`;
    const status = faker.helpers.arrayElement(['actif(ve)', 'décroché(e)']);
    const sex = faker.helpers.arrayElement(['M', 'F']);
    const ref = faker.helpers.unique(() => `STD${faker.datatype.number(9999).toString()}` + i);
    let birth_date = faker.date.between('1980-01-01', new Date()).toISOString().slice(0, 10);
    const entrance_datetime = faker.date.between('2021-01-01', '2023-06-18').toISOString().slice(0, 10);
    const prefixPhone = Math.floor(Math.random() * 3);
    const phone = (prefixPhone === 0) ? faker.phone.number('034 ## ### ##') :
        (prefixPhone === 1) ? faker.phone.number('032 ## ### ##') :
            faker.phone.number('033 ## ### ##');
    const adress = faker.address.streetAddress().replace("'", "''");
    const role = faker.helpers.arrayElement(['M', 'S', 'T']);
    const group_id = id_group;


    //Génère les "fake data" de la table "course"
    const id_course = faker.datatype.number() + faker.random.alpha({ casing: 'upper' });
    const ref_course = faker.helpers.arrayElement(["PROG1", "PROG2", "WEB1", "WEB2", "SYS1", "SYS1", "SYS2", "THEORIE1", "MGT1"]);
    const name_course = faker.helpers.arrayElement(["Algorithme", "Javascipt", "Bootstrap", "Java", "Google Workspace", "Git and Github"]);
    const total_hours = faker.datatype.number({ min: 1 }, { max: 120 });

    //Génère les "fake data" de la table "exam"
    const id_exam = faker.datatype.number() + faker.random.alpha({ casing: 'upper' });
    const exam_date = faker.date.past().toISOString().slice(0, 10);
    const duration = faker.datatype.number({ min: 1 }, { max: 4 });
    const course_id = id_course;

    //Génère les "fake data" de la table "follow"
    const user_id = id_user;

    //Génère les "fake data" de la table "have_grade"
    const exam_id = id_exam;
    const point = faker.datatype.float({ min: 0 }, { max: 20 }, { precision: .50 })



    group_values.push(`(
    '${id_group}', 
    '${ref_group}',
    '${creation_datetime}')
    
    `);

    user_values.push(`(
    '${id_user}',
    '${first_name}',
    '${last_name}',
    '${email}',
    '${ref}',
    '${status}',
    '${sex}',
    '${birth_date}','
    ${entrance_datetime}',
    '${phone}',
    '${adress}',
    '${role}',
    '${group_id}')
    
    `);

    course_values.push(`(
        '${id_course}',
        '${ref_course}',
        '${name_course}',
        '${total_hours}')

    `);

    exam_values.push(`(
        '${id_exam}',
        '${exam_date}',
        '${duration}',
        '${course_id}')

     `);
     
    follow_values.push(`(
        '${user_id}',
        '${course_id}')
    `);

    have_grade_values.push(`(
        '${user_id}',
        '${exam_id}',
        '${point}')
    `);
}



const instructionGroup = `INSERT INTO "group" (id, ref, creation_datetime) VALUES ${group_values};`;
const instructionUser = `INSERT INTO "user"(id,first_name,last_name,email,ref,status,sex,birth_date,entrance_datetime,phone,adress,role)VALUES${user_values};`;
const instructionCourse = `INSERT INTO "coures"(idref,name,total_hours)VALUES ${course_values};`;
const instructionExam = `INSERT INTO "exam"(id,exam_date,duration,course_id)VALUES ${exam_values};`;
const instructionFollow = `INSERT INTO "follow"(user_id,course_id)VALUES ${follow_values};`;
const instructionHaveGrade = `INSERT INTO "have_grade"(user_id,exam_id,point)VALUES ${have_grade_values};`;


// Écriture dans les fichiers SQL
fs.writeFile('group.sql', instructionGroup, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier group.sql');
});

fs.writeFile('user.sql', instructionUser, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier user.sql');
});
fs.writeFile('course.sql', instructionCourse, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier course.sql');
});
fs.writeFile('exam.sql', instructionExam, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier exam.sql');
});
fs.writeFile('follow.sql', instructionFollow, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier follow.sql');
});
fs.writeFile('have_grade.sql', instructionHaveGrade, (err) => {
    if (err) throw err;
    console.log('Instructions SQL écrites dans le fichier have_grade.sql');
});
