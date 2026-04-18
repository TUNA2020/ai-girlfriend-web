# 🚀 How to Push AI Girlfriend App to GitHub

## Prerequisites
- GitHub account
- Git installed on your machine
- Repository access (public or private)

## Method 1: Using GitHub CLI (Recommended)

### Step 1: Authenticate with GitHub
```bash
gh auth login
```
Follow the prompts:
- Choose "GitHub.com"
- Select protocol: HTTPS
- Authenticate with your browser or paste a token

### Step 2: Create and Push Repository
```bash
cd /c/Users/tunap/Desktop/AI Girlfriend

# Create new repository on GitHub and push
gh repo create TUNA2020/ai-girlfriend-web --public --source=. --push
```

**Flags explained:**
- `--public`: Creates a public repository
- `--source=.`: Uses current directory as source
- `--push`: Pushes code to the new repository

## Method 2: Manual Push (Without GitHub CLI)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `ai-girlfriend-web`
3. Description: "AI Girlfriend Web App"
4. Make it: Public
5. Click "Create repository"

### Step 2: Link Local Repository
```bash
cd /c/Users/tunap/Desktop/AI Girlfriend

# Add remote repository
git remote add origin https://github.com/TUNA2020/ai-girlfriend-web.git

# Verify remote
git remote -v
```

### Step 3: Push to GitHub
```bash
# Push main branch and set upstream
git push -u origin main

# If using master branch instead:
git push -u origin master
```

## Method 3: Using Personal Access Token

### Step 1: Generate Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo` (for private) or `public_repo` (for public)
4. Generate and copy the token

### Step 2: Use Token for Authentication
```bash
# Set token as environment variable
export GH_TOKEN="your_personal_access_token"

# Create and push
gh repo create TUNA2020/ai-girlfriend-web --public --source=. --push
```

## Alternative: HTTPS with Token
```bash
# Use token in URL
git remote set-url origin https://TOKEN@github.com/TUNA2020/ai-girlfriend-web.git

# Push
git push -u origin main
```

## Verify Deployment

After pushing, verify your repository:

```bash
# Check remote URL
git remote -v

# Check branches
git branch -a

# View on GitHub (open in browser)
open https://github.com/TUNA2020/ai-girlfriend-web

# Or just visit in browser
https://github.com/TUNA2020/ai-girlfriend-web
```

## Next Steps After Push

### 1. Enable GitHub Pages (Optional)
1. Go to repository Settings
2. Navigate to Pages
3. Set source to: main branch / root
4. Save
5. Your site will be at: https://TUNA2020.github.io/ai-girlfriend-web/

### 2. Deploy to Production
For production hosting, consider:
- **Vercel**: `vercel` (great for Next.js/React)
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Built-in with repository settings
- **Render**: Free tier available
- **Heroku**: `heroku create`

### 3. Continuous Integration
Set up GitHub Actions for automated builds:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: |
          # Your deployment commands here
```

## Troubleshooting

### Push rejected: non-fast-forward
```bash
# Fetch and merge
git pull --rebase origin main

# Then push
git push -u origin main
```

### Authentication errors
```bash
# Check authentication
gh auth status

# Re-authenticate if needed
gh auth login
```

### Permission denied
```bash
# Ensure you have write access to the repository
# Check repository settings → Collaborators
```

## Repository URL

Once pushed, your AI Girlfriend app will be available at:
```
https://github.com/TUNA2020/ai-girlfriend-web
```

And if you enable GitHub Pages:
```
https://TUNA2020.github.io/ai-girlfriend-web/
```

## Quick Reference

```bash
# Complete push command sequence
cd /c/Users/tunap/Desktop/AI Girlfriend
git init
git add -A
git commit -m "Initial commit: AI Girlfriend Web App"
gh repo create TUNA2020/ai-girlfriend-web --public --source=. --push
# OR
git remote add origin https://github.com/TUNA2020/ai-girlfriend-web.git
git push -u origin main
```

## 🎉 Success!

Your AI Girlfriend web app is ready to share with the world!
