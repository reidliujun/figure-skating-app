#Figure Skating APP

This APP will show the details of the figure skating moves based on the [Official USFSA Curriculum](https://skatingacademy.org/wp-content/uploads/Basic_Skills_Overview1.pdf)


## Environment Setup

This project uses environment variables to store sensitive configuration. Before running the app:

1. Copy the example environment file:
```bash
   cp .env.example .env
```

## Firebase Deployment

To deploy this application to Firebase, follow these steps:

1. Install Firebase CLI globally (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
 ```

3. Initialize Firebase in your project:
```bash
firebase init
 ```

During initialization:

- Select "Hosting: Configure files for Firebase Hosting"
- Choose your project
- Use "build" as your public directory
- Configure as a single-page app: Yes
- Don't overwrite build/index.html: No

4. Build the React application:
```bash
npm run build
 ```

5. Deploy to Firebase:
```bash
firebase deploy
 ```

After successful deployment, your app will be available at your Firebase Hosting URL (e.g., https://your-project-id.web.app ).