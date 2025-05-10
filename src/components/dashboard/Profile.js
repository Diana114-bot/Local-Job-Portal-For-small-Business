import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Assuming Firebase has been initialized elsewhere in your project

const db = getFirestore();

function Profile() {
  const [editingSection, setEditingSection] = useState(null);

  const auth = getAuth();
  const userEmail = auth.currentUser ? auth.currentUser.email : 'cb@example.com';

  const [personalInfo, setPersonalInfo] = useState({
    name: 'Caleb Porter',
    email: userEmail,
    phone: '060 709 6324',
  });

  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [jobPreferences, setJobPreferences] = useState({
    roles: ['UI/UX Designer'],
    jobType: ['Remote', 'Full-time'],
    location: ['South Africa'],
  });

  const [socialLinks, setSocialLinks] = useState([
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jcalebporter' },
    { label: 'Portfolio', url: 'https://caleb.dev' },
  ]);

  const [experience, setExperience] = useState([
    { title: 'Head Of Design', company: 'Facebook', year: '2018 - Present' },
    { title: 'UI Designer', company: 'Instagram', year: '2013 - 2018' },
  ]);

  const [education, setEducation] = useState([
    { level: 'Bachelor Degree', school: ' University of Cape Town', year: '2013 - 2016' },
    { level: 'High School', school: 'Highlands College', year: '2010 - 2013' },
  ]);

  const [skills, setSkills] = useState(['App Design', 'Photoshop', 'Illustration']);

  // Handle file uploads
  const handleResumeUpload = (e) => setResume(e.target.files[0]);
  const handleProfilePicUpload = (e) => setProfilePicture(URL.createObjectURL(e.target.files[0]));

  // Load profile from Firebase if it exists
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const docRef = doc(db, "profiles", personalInfo.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPersonalInfo(data.personalInfo);
          setJobPreferences(data.jobPreferences);
          setSocialLinks(data.socialLinks);
          setExperience(data.experience);
          setEducation(data.education);
          setSkills(data.skills);
          // For files, you might store URLs instead.
          setProfilePicture(data.profilePicture);
          // resume can be handled similarly (e.g., storing the file name or URL)
        }
      } catch (error) {
        console.error("Error loading profile from Firebase:", error);
      }
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save the complete profile to Firebase
  const saveProfileToFirebase = async () => {
    try {
      const profileData = {
        personalInfo,
        jobPreferences,
        socialLinks,
        experience,
        education,
        skills,
        // If you have storage set up for files, you can store URLs or file names
        resume: resume ? resume.name : null,
        profilePicture,
      };

      const docRef = doc(db, "profiles", personalInfo.email);
      // setDoc will create or overwrite the profile document
      await setDoc(docRef, profileData);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile to Firebase:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h1>My Profile</h1>

      {/* Profile Picture */}
      <section className="mb-4">
        <h3>Profile Picture</h3>
        <input type="file" accept="image/*" className="form-control mb-3" onChange={handleProfilePicUpload} />
        {profilePicture && (
          <img src={profilePicture} alt="Profile" width={100} className="rounded-circle" />
        )}
      </section>

      {/* Personal Info */}
      <section className="mb-4">
        <h3>Personal Information</h3>
        {editingSection === 'personal' ? (
          <>
            <input
              className="form-control mb-2"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
            />
            <input
              className="form-control mb-2"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            />
            <input
              className="form-control mb-3"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
            />
            <button
              className="btn btn-success"
              onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {personalInfo.name}</p>
            <p><strong>Email:</strong> {personalInfo.email}</p>
            <p><strong>Phone:</strong> {personalInfo.phone}</p>
            <button className="btn btn-primary" onClick={() => setEditingSection('personal')}>Edit</button>
          </>
        )}
      </section>

      {/* Resume */}
      <section className="mb-4">
        <h3>Resume</h3>
        <input type="file" accept=".pdf,.doc,.docx" className="form-control mb-3" onChange={handleResumeUpload} />
        {resume && <p>Uploaded: {resume.name}</p>}
      </section>

      {/* Job Preferences */}
      <section className="mb-4">
        <h3>Job Preferences</h3>
        {editingSection === 'preferences' ? (
          <>
            <h5>Roles</h5>
            {jobPreferences.roles.map((role, idx) => (
              <input
                key={idx}
                className="form-control mb-2"
                value={role}
                onChange={(e) => {
                  const updated = [...jobPreferences.roles];
                  updated[idx] = e.target.value;
                  setJobPreferences({ ...jobPreferences, roles: updated });
                }}
              />
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setJobPreferences({ ...jobPreferences, roles: [...jobPreferences.roles, ''] })}
            >
              Add Role
            </button>

            <h5>Type</h5>
            {jobPreferences.jobType.map((type, idx) => (
              <input
                key={idx}
                className="form-control mb-2"
                value={type}
                onChange={(e) => {
                  const updated = [...jobPreferences.jobType];
                  updated[idx] = e.target.value;
                  setJobPreferences({ ...jobPreferences, jobType: updated });
                }}
              />
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setJobPreferences({ ...jobPreferences, jobType: [...jobPreferences.jobType, ''] })}
            >
              Add Type
            </button>

            <h5>Location</h5>
            {jobPreferences.location.map((loc, idx) => (
              <input
                key={idx}
                className="form-control mb-3"
                value={loc}
                onChange={(e) => {
                  const updated = [...jobPreferences.location];
                  updated[idx] = e.target.value;
                  setJobPreferences({ ...jobPreferences, location: updated });
                }}
              />
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setJobPreferences({ ...jobPreferences, location: [...jobPreferences.location, ''] })}
            >
              Add Location
            </button>

            <br />
            <button
              className="btn btn-success"
              onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Roles:</strong> {jobPreferences.roles.join(', ')}</p>
            <p><strong>Type:</strong> {jobPreferences.jobType.join(', ')}</p>
            <p><strong>Location:</strong> {jobPreferences.location.join(', ')}</p>
            <button className="btn btn-primary" onClick={() => setEditingSection('preferences')}>Edit</button>
          </>
        )}
      </section>

      {/* Social Links */}
      <section className="mb-4">
        <h3>Social Links</h3>
        {editingSection === 'social' ? (
          <>
            {socialLinks.map((link, idx) => (
              <div key={idx}>
                <input
                  className="form-control mb-2"
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[idx].label = e.target.value;
                    setSocialLinks(updated);
                  }}
                />
                <input
                  className="form-control mb-3"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[idx].url = e.target.value;
                    setSocialLinks(updated);
                  }}
                />
              </div>
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setSocialLinks([...socialLinks, { label: '', url: '' }])}
            >
              Add Social Link
            </button>
            <br />
            <button
              className="btn btn-success"
              onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {socialLinks.map((link, idx) => (
              <p key={idx}><strong>{link.label}:</strong> <a href={link.url}>{link.url}</a></p>
            ))}
            <button className="btn btn-primary" onClick={() => setEditingSection('social')}>Edit</button>
          </>
        )}
      </section>

      {/* Work Experience */}
      <section className="mb-4">
        <h3>Work Experience</h3>
        {editingSection === 'experience' ? (
          <>
            {experience.map((exp, idx) => (
              <div key={idx}>
                <input
                  className="form-control mb-2"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[idx].title = e.target.value;
                    setExperience(updated);
                  }}
                />
                <input
                  className="form-control mb-2"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[idx].company = e.target.value;
                    setExperience(updated);
                  }}
                />
                <input
                  className="form-control mb-3"
                  value={exp.year}
                  onChange={(e) => {
                    const updated = [...experience];
                    updated[idx].year = e.target.value;
                    setExperience(updated);
                  }}
                />
              </div>
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setExperience([...experience, { title: '', company: '', year: '' }])}
            >
              Add Experience
            </button>
            <br />
            <button
              className="btn btn-success"
              onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {experience.map((exp, idx) => (
              <p key={idx}><strong>{exp.title}</strong> at {exp.company} ({exp.year})</p>
            ))}
            <button className="btn btn-primary" onClick={() => setEditingSection('experience')}>Edit</button>
          </>
        )}
      </section>

      {/* Education */}
      <section className="mb-4">
        <h3>Education</h3>
        {editingSection === 'education' ? (
          <>
            {education.map((edu, idx) => (
              <div key={idx}>
                <input
                  className="form-control mb-2"
                  value={edu.level}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].level = e.target.value;
                    setEducation(updated);
                  }}
                />
                <input
                  className="form-control mb-2"
                  value={edu.school}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].school = e.target.value;
                    setEducation(updated);
                  }}
                />
                <input
                  className="form-control mb-3"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[idx].year = e.target.value;
                    setEducation(updated);
                  }}
                />
              </div>
            ))}
            <button
              className="btn btn-info mb-3"
              onClick={() => setEducation([...education, { level: '', school: '', year: '' }])}
            >
              Add Education
            </button>
            <br />
            <button
              className="btn btn-success"
              onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            {education.map((edu, idx) => (
              <p key={idx}><strong>{edu.level}</strong> from {edu.school} ({edu.year})</p>
            ))}
            <button className="btn btn-primary" onClick={() => setEditingSection('education')}>Edit</button>
          </>
        )}
      </section>

      {/* Skills */}
      <section className="mb-4">
        <h3>Skills</h3>
        {editingSection === 'skills' ? (
          <>
            {skills.map((skill, idx) => (
              <div key={idx}>
                <input
                  className="form-control mb-2"
                  value={skill}
                  onChange={(e) => {
                    const updated = [...skills];
                    updated[idx] = e.target.value;
                    setSkills(updated);
                  }}
                />
              </div>
            ))}
            <button className="btn btn-info mb-3" onClick={() => setSkills([...skills, ''])}>Add Skill</button>
            <br />
            <button className="btn btn-success" onClick={() => { setEditingSection(null); saveProfileToFirebase(); }}>
              Save
            </button>
          </>
        ) : (
          <>
            <ul>
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => setEditingSection('skills')}>Edit</button>
          </>
        )}
      </section>
      
      {/* Save Profile Button */}
      <div className="mb-4">
        <button className="btn btn-success" onClick={saveProfileToFirebase}>
          Save Profile to Firebase
        </button>
      </div>
    </div>
  );
}

export default Profile;
