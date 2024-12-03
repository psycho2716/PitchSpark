# PitchSpark 🚀

PitchSpark is a dynamic platform where aspiring entrepreneurs, innovators, and startup enthusiasts can pitch their ideas, gain valuable feedback, and connect with like-minded individuals. Whether you're validating an idea, seeking collaboration, or participating in virtual competitions, PitchSpark provides the tools and community to ignite your entrepreneurial journey.

---

## 🌟 Features

### 1. **Pitch Your Startup**

Easily create a detailed pitch for your startup, including:

- Title, Description, and Category
- Image Uploads for Visual Appeal
- Detailed Pitch Section with Markdown Support

### 2. **Engage with the Community**

- **Search and Explore Startups**: Discover and get inspired by pitches from others.
- **Vote on Ideas**: Help great ideas gain visibility through community-driven voting.
- **Collaborate**: Connect with like-minded entrepreneurs and build partnerships.

### 3. **Participate in Virtual Competitions**

Submit your ideas to competitions, get noticed by investors, and climb the leaderboards.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS for styling
- **Backend**: Node.js with Express.js for API handling
- **Database**: MongoDB for storing startup details, users, and votes
- **Cloud Storage**: AWS S3 for image uploads
- **Authentication**: Firebase Auth for secure user login and signup

### Additional Libraries and Tools

- **UI Components**: Radix UI (Alert Dialog, Avatar, Dropdown Menu, Slot, Toast)
- **Markdown**: Markdown-it, @uiw/react-md-editor
- **Image Handling**: @sanity/image-url
- **Error Tracking**: @sentry/nextjs
- **State Management**: clsx, class-variance-authority
- **Styling**: styled-components, tailwind-merge, tailwindcss-animate
- **Utilities**: slugify, zod
- **Sanity**: sanity, sanity-plugin-markdown, next-sanity
- **TypeScript**: TypeScript, @types for Node, React, and React DOM
- **Linting**: ESLint, eslint-config-next
- **Build Tools**: PostCSS, Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- AWS account for S3 setup

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/PitchSpark.git
    cd PitchSpark
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables: Create a .env file in the root directory and add:
    ```
    MONGO_URI=<your_mongo_db_connection_string>
    FIREBASE_API_KEY=<your_firebase_api_key>
    AWS_ACCESS_KEY_ID=<your_aws_access_key>
    AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
    AWS_BUCKET_NAME=<your_s3_bucket_name>
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    AUTH_SECRET=<your_auth_secret>
    AUTH_GITHUB_ID=<your_github_client_id>
    AUTH_GITHUB_SECRET=<your_github_client_secret>
    NEXT_PUBLIC_SANITY_PROJECT_ID=<your_sanity_project_id>
    NEXT_PUBLIC_SANITY_DATASET=<your_sanity_dataset>
    NEXT_PUBLIC_SANITY_API_VERSION=<your_sanity_api_version>
    SANITY_WRITE_TOKEN=<your_sanity_write_token>
    ```
4. Start the development server:
    ```bash
    npm start
    ```
5. Open your browser and navigate to http://localhost:3000.

---

## 🤝 Contributing

We welcome contributions to enhance the platform's features and improve user experience. Please see our CONTRIBUTING.md for guidelines on how to submit improvements and bug fixes.

---

## 📄 License

This project is proprietary software. See the LICENSE file for details.

---

## 📧 Contact

For inquiries or feedback, please contact us at [manzoej@gmail.com](mailtto:manzoej@gmail.com).

---

Thank you for your interest in PitchSpark! We look forward to your contributions and feedback.
