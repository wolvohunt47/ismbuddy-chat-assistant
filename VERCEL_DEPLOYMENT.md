# Deploying ISMBuddy Chat Assistant to Vercel

This guide will walk you through the process of deploying your ISMBuddy Chat Assistant to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Project

Your project is already configured for Vercel deployment with the `vercel.json` file that has been created. This configuration tells Vercel how to build and serve your application.

### 2. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click on "Add New" > "Project"
3. Import your Git repository containing the ISMBuddy Chat Assistant
4. Configure the project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (already configured in vercel.json)
   - **Output Directory**: `dist` (already configured in vercel.json)

### 3. Environment Variables

No custom environment variables are required for this project as the API endpoint is hardcoded in the application.

The application is already configured to use the production backend URL:
```
const API_URL = 'https://chat-bot-iit-ism-backend.vercel.app';
```

### 4. Deploy

1. Click "Deploy"
2. Wait for the build process to complete
3. Once deployed, Vercel will provide you with a URL to access your application

### 5. Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain and follow the instructions to configure DNS settings

## Troubleshooting

### Build Failures

If your build fails, check the build logs in Vercel for specific errors. Common issues include:

- Missing dependencies: Make sure all dependencies are correctly listed in `package.json`
- Build script errors: Verify that the build script works locally with `npm run build`

### API Connection Issues

If the application deploys but cannot connect to the backend API:

- Verify that the backend API at `https://chat-bot-iit-ism-backend.vercel.app` is accessible
- Check for CORS issues if the backend is not configured to accept requests from your Vercel domain

## Updating Your Deployment

When you push changes to your connected Git repository, Vercel will automatically rebuild and redeploy your application.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)