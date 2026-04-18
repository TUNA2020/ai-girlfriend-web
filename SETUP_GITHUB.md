# GitHub Repository Setup Guide

## Option 1: Using GitHub CLI (Recommended)

### Step 1: Authenticate with GitHub
```bash
gh auth login
```
Follow the prompts to authenticate (use browser or token method).

### Step 2: Create and Push Repository
```bash
cd /c/Users/tunap/Desktop/AI Girlfriend

# Create repository on GitHub
gh repo create TUNA2020/ai-girlfriend-web --public --source=. --push

# Or if repo already exists locally:
gh repo set-remote TUNA2020/ai-girlfriend-web
```

## Option 2: Manual Setup

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Name: `ai-girlfriend-web`
3. Description: "AI Girlfriend Web App"
4. Make it Public
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
# Push main branch
git push -u origin main

# Or if using master branch
git push -u origin master
```

## Option 3: Using GitHub Token (Non-Interactive)

### Step 1: Generate Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scopes: `repo` (full control of private repositories) or `public_repo` (for public repos)
4. Generate token and save it securely

### Step 2: Set Environment Variable
```bash
export GH_TOKEN="your_personal_access_token"
```

### Step 3: Create and Push
```bash
cd /c/Users/tunap/Desktop/AI Girlfriend
gh repo create TUNA2020/ai-girlfriend-web --public --source=. --push
```

## Verify Setup

After pushing, verify the repository:
```bash
# Check remote URL
git remote -v

# Check branches
git branch -a

# View on GitHub
open https://github.com/TUNA2020/ai-girlfriend-web
```

## Initial Commit

If you need to make an initial commit:
```bash
cd /c/Users/tunap/Desktop/AI Girlfriend

# Stage all files
git add -A

# Commit
git commit -m "Initial commit: AI Girlfriend Web App"

# Push to GitHub
git push -u origin main
```

## Repository Structure

Your repository will contain:

```
ai-girlfriend-web/
├── src/
│   ├── components/
│   │   ├── CharacterCard.js
│   │   ├── CharacterCarousel.js
│   │   ├── ChatWindow.js
│   │   ├── MessageInput.js
│   │   └── CharacterAnimation.css
│   ├── context/
│   │   ├── ConversationContext.js
│   │   └── ConversationProviderWrapper.js
│   ├── hooks/
│   │   └── useCharacter.js
│   ├── pages/
│   │   └── Home.js
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   ├── llm.js
│   │   └── format.js
│   ├── App.js
│   ├── index.js
│   └── package.json
├── public/
│   └── index.html
├── launch-app.bat
├── start.bat
├── launch-app-debug.bat
├── start-app.ps1
├── babel.config.js
├── .babelrc
├── .gitignore
├── package.json
├── README.md
├── DOCUMENTATION.md
└── FINAL_BUILD_REPORT.md
```

## Next Steps

After pushing to GitHub:

1. **Enable GitHub Pages** (optional):
   - Go to Settings → Pages
   - Source: main branch / root
   - Save

2. **Set up CI/CD** (optional):
   - Add GitHub Actions for automated builds
   - Configure testing and deployment

3. **Share the repository**:
   ```bash
   # Get the repository URL
   git remote -v
   
   # Share this URL with collaborators
   ```

## Troubleshooting

### Push rejected: non-fast-forward
```bash
# Pull latest changes
git pull --rebase origin main

# Then push
git push -u origin main
```

### Authentication errors
- Ensure you're authenticated: `gh auth status`
- Check token permissions
- Verify remote URL is correct

### Branch naming issues
```bash
# Rename branch to main
git branch -m main

# Or configure default branch
git config --global init.defaultBranch main
```

## Repository URL

Once pushed, your repository will be available at:
```
https://github.com/TUNA2020/ai-girlfriend-web
```
