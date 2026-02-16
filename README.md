# Larry's Travel & Music Blog

Static blog for travel photos and Spotify music embeds, built with Node.js and deployed to GitHub Pages.

## Getting started

1. **Install dependencies**

   ```bash
   cd larry128_blog
   npm install
   ```

2. **Run the local dev server**

   ```bash
   npm run dev
   ```

   This uses `live-server` and opens the `src` folder at `http://127.0.0.1:5173` (or similar).

## Customising content

### Travel photos

- Put your images in `src/images/` (for example: `src/images/japan-2025.jpg`).
- Edit `src/photos.json` and point `src` to your own filenames:

  ```json
  [
    {
      "src": "images/japan-2025.jpg",
      "title": "Tokyo at night",
      "location": "Tokyo, Japan",
      "date": "2025",
      "tag": "city"
    }
  ]
  ```

### Spotify music

1. In Spotify, open a track / album / playlist.
2. Click **Share → Copy link to playlist/album/track**.
3. Convert that link to an **embed** URL:
   - Normal playlist link example:
     `https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n`
   - Embed URL you should use:
     `https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n`
4. Add entries in `src/music.json`:

   ```json
   [
     {
       "title": "My train playlist",
       "artist": "Spotify playlist",
       "year": "2025",
       "type": "playlist",
       "note": "Perfect for long rides.",
       "embedUrl": "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n"
     }
   ]
   ```

## Build for GitHub Pages

1. **Build the static site:**

   ```bash
   npm run build
   ```

   This creates a `docs/` folder containing the static site and a `404.html` copy of `index.html` (useful for client-side routing).

2. **Create a GitHub repository**

   - Go to GitHub and create a repo, for example `blog`.
   - Push this project to that repo.

3. **Enable GitHub Pages**

   - In the GitHub repo: **Settings → Pages**.
   - Source: **Deploy from a branch**.
   - Branch: `main` (or `master`) and folder: `/docs`.
   - Save.

4. **Access your site**

   - If your GitHub username is `larry1280326` and your repo is `blog`, your blog will be at:
     `https://larry1280326.github.io/blog`

Whenever you update photos or music:

```bash
npm run build
git add .
git commit -m "Update blog content"
git push
```

