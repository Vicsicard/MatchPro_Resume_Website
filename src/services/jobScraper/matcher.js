const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

function extractResumeFeatures(resumeData) {
    const features = {
        skills: new Set(),
        titles: new Set(),
        education: new Set(),
        experience: []
    };

    // Extract skills
    if (resumeData.skills && resumeData.skills.skills) {
        resumeData.skills.skills.split(',')
            .map(skill => skill.trim().toLowerCase())
            .forEach(skill => features.skills.add(skill));
    }

    // Extract job titles and experience
    if (resumeData.experience) {
        resumeData.experience.forEach(exp => {
            if (exp.Position) {
                features.titles.add(exp.Position.toLowerCase());
            }
            if (exp.Description) {
                features.experience.push(exp.Description.toLowerCase());
            }
        });
    }

    // Extract education
    if (resumeData.education) {
        resumeData.education.forEach(edu => {
            if (edu['Field of Study']) {
                features.education.add(edu['Field of Study'].toLowerCase());
            }
            if (edu['Degree']) {
                features.education.add(edu['Degree'].toLowerCase());
            }
        });
    }

    return features;
}

function calculateJobMatch(job, resumeFeatures) {
    let score = 0;
    const jobDescription = (job.description || '').toLowerCase();
    const jobTitle = (job.title || '').toLowerCase();

    // Title matching
    resumeFeatures.titles.forEach(title => {
        if (jobTitle.includes(title)) {
            score += 30; // High weight for title match
        }
    });

    // Skills matching
    resumeFeatures.skills.forEach(skill => {
        if (jobDescription.includes(skill) || jobTitle.includes(skill)) {
            score += 20;
        }
    });

    // Education matching
    resumeFeatures.education.forEach(edu => {
        if (jobDescription.includes(edu)) {
            score += 15;
        }
    });

    // Experience matching using TF-IDF
    const tfidf = new TfIdf();
    
    // Add resume experience documents
    resumeFeatures.experience.forEach(exp => {
        tfidf.addDocument(tokenizer.tokenize(exp));
    });
    
    // Add job description
    tfidf.addDocument(tokenizer.tokenize(jobDescription));
    
    // Calculate similarity
    const similarity = tfidf.tfidf(tokenizer.tokenize(jobDescription), 
        tfidf.documents.length - 1);
    
    score += Math.min(35, similarity * 10); // Cap at 35 points

    return Math.min(100, score); // Cap total score at 100
}

async function matchJobs(jobs, resumeData) {
    const resumeFeatures = extractResumeFeatures(resumeData);
    
    const matchedJobs = jobs.map(job => ({
        ...job,
        matchScore: calculateJobMatch(job, resumeFeatures)
    }));

    // Sort by match score (highest first)
    return matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { matchJobs };
