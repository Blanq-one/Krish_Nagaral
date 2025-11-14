# Portfolio Website - Krish Nagaral

A modern, Spotify-inspired portfolio website built with React, Vite, and Tailwind CSS. Deployed automatically to GitHub Pages.

## 🚀 Features

- **Spotify-style UI**: Dark theme with green accents
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Powered by Framer Motion
- **Project Carousels**: Horizontal scrolling carousels using Swiper.js
- **Auto Deployment**: GitHub Actions automatically deploys to GitHub Pages

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Swiper.js
- Lucide Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🌐 GitHub Pages Deployment

### Initial Setup

1. **Update `vite.config.js`**: 
   - Change the `base` path to match your GitHub repository name:
   ```js
   base: "/your-repo-name/",
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

3. **GitHub Actions**:
   - The workflow file `.github/workflows/deploy.yml` is already configured
   - It will automatically build and deploy on every push to `main`
   - No manual steps required!

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run build
git add dist
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/       # Reusable components
│   ├── sections/         # Page sections
│   ├── data/            # Data files (projects, skills, etc.)
│   ├── assets/          # Images and static assets
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
├── index.html
├── vite.config.js       # Vite configuration (with base path)
└── package.json
```

## ✏️ Customization

### Update Your Information

1. **Personal Data**: Edit files in `src/data/`:
   - `projects.js` - Add your projects
   - `skills.js` - Update your skills
   - `publications.js` - Add your publications

2. **Profile Image**: 
   - Add your profile image to `public/profile.jpg`
   - Or update the path in `src/sections/Hero.jsx`

3. **Social Links**: 
   - Update links in `src/sections/Hero.jsx` and `src/sections/Contact.jsx`
   - Update GitHub, LinkedIn, and email links

4. **Resume**:
   - Add your resume as `public/resume.pdf`
   - The resume button will automatically link to it

5. **Contact Form**:
   - Replace `YOUR_FORM_ID` in `src/sections/Contact.jsx` with your Formspree form ID
   - Or use any other form service

## 🎨 Styling

The project uses Tailwind CSS with a custom Spotify-inspired color palette:

- `spotify-black`: #121212
- `spotify-dark`: #1a1a1a
- `spotify-grey`: #181818
- `spotify-green`: #1db954
- `spotify-green-hover`: #1ed760

Customize colors in `tailwind.config.js`.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Krish Nagaral - MSCS Student

---

Built with ❤️ using React and Vite

