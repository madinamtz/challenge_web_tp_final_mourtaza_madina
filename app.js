const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/educonnect_db')
    .then(() => console.log("Connecté à MongoDB !"))
    .catch(err => console.error(err));

// schéma formateurs
const trainerSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    specialite: { type: String, required: true },
    email: { type: String, unique: true }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

// schéma cours (avec référence vers Trainers)
const courseSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    duree: { type: Number, required: true },
    formateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }
});

const Course = mongoose.model('Course', courseSchema);

// schéma étudiants
const studentSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    classe: { type: String, required: true },
    email: { type: String, unique: true }
});

const Student = mongoose.model('Student', studentSchema);

// schéma notes (avec référence vers Students et Courses)
const gradeSchema = new mongoose.Schema({
    valeur: { type: Number, min:0, max:20, required: true },
    etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    cours: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

const Grade = mongoose.model('Grade', gradeSchema);

// statistiques 
app.get('/api/stats/course/:courseId', async (req, res) => {
    
});

// gestion des cours
app.post('/api/courses', async (req, res) => {

});

app.get('/api/courses', async (req, res) => {

});

// gestions des notes
app.post('/api/grades', async (req, res) => {

});

app.get('/api/grades/student/:id', async (req, res) => {
    const grades = await Grade.find({ etudiant: req.params.id })
        .populate('etudiant', 'nom') // Infos de l'élève
        .populate({
            path: 'cours',
            populate: { path: 'formateur' } // Infos du prof du cours
        });
    res.json(grades);
});