# Campus Nexus - User Model Schema

This document defines the User model for the backend database.

## User Schema

```javascript
{
  // Authentication & Basic Info
  "_id": ObjectId,
  "email": String (unique, required),
  "password": String (hashed, required),
  "firstName": String (required),
  "lastName": String (required),
  "createdAt": Date (default: now),
  "updatedAt": Date (default: now),

  // Profile Information
  "photoURL": String (optional),
  "gender": String (enum: ["male", "female", "other"]),
  
  // Academic Information
  "institution": String (required),
  "major": String (required),
  
  // Bio & About
  "about": String (required, max: 500 chars),
  
  // Skills (Array of skill strings)
  "skills": [String],
  
  // Experience (Array of experience objects)
  "experience": [
    {
      "company": String (required),
      "position": String (required),
      "startDate": String (required, format: YYYY-MM),
      "endDate": String (optional, format: YYYY-MM or "Present"),
      "currentlyWorking": Boolean (optional),
      "description": String (optional)
    }
  ],
  
  // Professional & Social
  "location": String (required),
  "phone": String (required),
  "linkedin": String (optional, URL),
  "github": String (optional, URL),
  "twitter": String (optional, URL),
  
  // Interests
  "interests": [String],
  
  // Additional Metadata
  "isProfileComplete": Boolean (default: false),
  "profileCompletedAt": Date (optional)
}
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Yes | MongoDB unique identifier |
| email | String | Yes | User's email (must be unique) |
| password | String | Yes | Hashed password |
| firstName | String | Yes | User's first name |
| lastName | String | Yes | User's last name |
| photoURL | String | No | URL to profile photo |
| gender | String | No | Gender (male, female, other) |
| institution | String | Yes | University/College name |
| major | String | Yes | Field of study |
| about | String | Yes | Bio/About me (max 500 chars) |
| skills | Array[String] | No | List of technical skills |
| experience | Array[Object] | No | List of professional experience |
| experience[].company | String | Yes (if exp exists) | Company name |
| experience[].position | String | Yes (if exp exists) | Job position/title |
| experience[].startDate | String | Yes (if exp exists) | Start date (YYYY-MM format) |
| experience[].endDate | String | No | End date (YYYY-MM or "Present") |
| experience[].currentlyWorking | Boolean | No | Flag for current job |
| experience[].description | String | No | Job description |
| location | String | Yes | City, Country |
| phone | String | Yes | Contact phone number |
| linkedin | String | No | LinkedIn profile URL |
| github | String | No | GitHub profile URL |
| twitter | String | No | Twitter/X profile URL |
| interests | Array[String] | No | Areas of interest/expertise |
| isProfileComplete | Boolean | No | Flag indicating profile completion |
| profileCompletedAt | Date | No | Timestamp of profile completion |

## Possible Interest Values

The system supports the following interest categories:
- Tech & Innovation
- Venture Building
- Startups
- AI & Machine Learning
- Web Development
- Mobile Development
- Blockchain
- Cloud Computing
- DevOps
- Design
- Product Management
- DataexperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: 'Present'
  },
  currentlyWorking: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: null
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  photoURL: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male'
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  major: {
    type: String,
    required: true,
    trim: true
  },
  about: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  experience: [experienceSchema] ,
    maxlength: 500,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  linkedin: {
    type: String,
    default: null
  },
  github: {
    type: String,
    default: null
  },
  twitter: {
    type: String,
    default: null
  },
  interests: {
    type: [String],
    default: []
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },
  profileCompletedAt: {
    type: Date,
    default: null
  },
  createdAt: {
  experience: [
    {
      company: "Google",
      position: "Software Engineer",
      startDate: "2024-06",
      endDate: "Present",
      currentlyWorking: true,
      description: "Working on cloud infrastructure..."
    },
    {
      company: "Startup XYZ",
      position: "Junior Developer",
      startDate: "2023-01",
      endDate: "2024-05",
      description: "Built full-stack features for SaaS product"
    }
  ],
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

## API Response Format

When returning user profile data (e.g., for viewing profile or feed), return all fields except password:

```javascript
{
  _id: "user_id",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  photoURL: "https://example.com/photo.jpg",
  gender: "male",
  institution: "MIT",
  major: "Computer Science",
  about: "Passionate about building products...",
  skills: ["React", "Node.js", "MongoDB"],
  location: "Cambridge, USA",
  phone: "+1-555-0000",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  twitter: "https://twitter.com/johndoe",
  interests: ["AI & Machine Learning", "Startups"],
  isProfileExperience:**
- Frontend sends: `experience: [{ company, position, startDate, endDate, currentlyWorking, description }]`
- Backend stores: `experience` array (optional, can be empty)

**Step 4 - Complete: true,
  profileCompletedAt: "2026-04-07T10:30:00Z",
  createdAt: "2026-04-05T09:00:00Z"
}
```

## Frontend to Backend Data Mapping

### During Registration/Onboarding:
**Step 1 - Skills:**
- Frontend sends: `skills: [String]`
- Backend stores: `skills`

**Step 2 - Bio:**
- Frontend sends: `institution, major, about, gender, photoURL`
- Backend stores: all fields as-is

**Step 3 - Contact & Social:**
- Frontend sends: `location, phone, linkedin, github, twitter, interests`
- Backend stores: all fields as-is, sets `isProfileComplete = true`

### View Profile Request:
- Frontend calls: `GET /user/view/:id`
- Backend returns: Complete user object (minus password)

### Feed Endpoint:
- Frontend calls: `GET /user/feed`
- Backend returns: Array of user objects (excluding password and optional fields if empty)
