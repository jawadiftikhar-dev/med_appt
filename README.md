# Medical Appointment Booking (StayHealthy)

**StayHealthy** is a responsive front-end web application built as part of the **IBM Front-End Developer Capstone Project**. Designed for a non-profit healthcare initiative, StayHealthy enables patients—especially those in remote and underserved areas—to search for medical specialists, book or cancel appointments, request instant consultations, manage their profiles, view medical reports, and submit doctor reviews online.

---

## Key Features

- **Landing Page & Navigation Bar:** Clean, responsive layout with intuitive navigation across all pages (`Home`, `Appointments`, `Instant Consult`, `Reviews`, `Reports`, `Sign Up`, `Login`).
- **User Authentication:** Sign Up (Role, Name, Phone, Email, Password) and Login forms with client-side validation and backend API connectivity (`sessionStorage` token management and Logout support).
- **Doctor Search & Appointment Booking:** Search doctors by speciality or name with autocomplete suggestions (`FindDoctorSearch`), book appointments with date and time slots (`AppointmentForm`), and cancel existing bookings (`DoctorCard`).
- **Instant Consultation:** Quick-connect consultation booking flow (`InstantConsultation`, `DoctorCardIC`, `AppointmentFormIC`) using `reactjs-popup`.
- **Application-Wide Notifications:** Persistent notification banner (`Notification`) displaying active appointment details across the entire application.
- **Reviews & Ratings:** Interactive feedback form (`GiveReviews`) with star ratings and post-submission disabling behavior.
- **User Profile & Medical Reports:** View and update user profile details (`ProfileCard`) and view/download patient consultation reports (`ReportsLayout`).
- **SEO & Responsive Design:** Configured with SEO meta tags in `index.html` and responsive CSS layouts for desktop, tablet, and mobile devices.

---

## Tech Stack

- **Front-End:** React.js (Vite), React Router DOM, `reactjs-popup`, HTML5, CSS3
- **Back-End (API Server):** Node.js, Express.js, MongoDB
- **Styling & Icons:** Custom CSS, Google Fonts (`Poppins`), Font Awesome

---

## Project Structure

```text
med_appt/
├── index.html
├── package.json
├── README.md
├── server/                     # Back-end server & database connectivity
│   ├── db.js
│   ├── index.js
│   └── package.json
└── src/
    ├── App.jsx
    ├── App.css
    ├── config.js
    ├── index.css
    ├── main.jsx
    └── Components/
        ├── AppointmentForm/
        ├── BookingConsultation.jsx
        ├── DoctorCard/
        ├── FindDoctorSearch/
        ├── InstantConsultationBooking/
        ├── Landing_Page/
        ├── Login/
        ├── Navbar/
        ├── Notification/
        ├── ProfileCard/
        ├── ReportsLayout/
        ├── ReviewForm/
        └── Sign_Up/
```

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher recommended) and **npm**
- **MongoDB** (local instance or MongoDB connection URI)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/jawadiftikhar-dev/med_appt.git
cd med_appt
```

### 2. Install Front-End Dependencies

```bash
npm install
```

### 3. Configure and Run the Back-End Server

1. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Open `server/db.js` and update the `mongoURI` connection string with your MongoDB host, port, and credentials.
3. Start the back-end server:
   ```bash
   node index
   ```
   If successful, the terminal will display:
   `Server is running on port localhost:8181 Connected to Mongo Successfully`
4. Verify `src/config.js` points to your running back-end server URL:
   ```js
   export const API_URL = "http://localhost:8181";
   ```

### 4. Run the Front-End Application

Open a new terminal in the root `med_appt` folder:

- **Development Mode:**
  ```bash
  npm run dev
  ```
- **Build & Preview Mode:**
  ```bash
  npm run preview
  ```

### 5. Create a Production Build

To generate the production bundle inside the `dist/` folder:

```bash
npm run build
```

---

## Application Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `Landing_Page` | Home page with hero banner and quick actions |
| `/signup` | `Sign_Up` | User registration form |
| `/login` | `Login` | User authentication form |
| `/appointments` | `BookingConsultation` | Search doctors and book/cancel appointments |
| `/instant-consultation` | `InstantConsultation` | Instant doctor consultation booking |
| `/reviews` | `GiveReviews` | View consultations and submit doctor reviews |
| `/profile` | `ProfileCard` | View and edit logged-in user profile |
| `/reports` | `ReportsLayout` | View and download patient medical reports |

---

## Author

- **Jawad Iftikhar** — IBM Front-End Developer Capstone Project (`StayHealthy`)