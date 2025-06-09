# NANDA (Networked Agents and Decentralized AI) Project Website

## About Project NANDA

NANDA (Networked Agents and Decentralized AI) is an open research initiative dedicated to developing foundational infrastructure for the Agentic Web. Our mission is to build and foster decentralized systems that empower autonomous AI agents to discover, communicate, and collaborate effectively and securely, without reliance on centralized control points.

As a non-profit academic research and software development project, NANDA focuses on:

*   Decentralized Agent Discovery
*   Secure Agent Communication & Coordination
*   Open Source Tooling
*   Privacy-Preserving AI

Project NANDA aims to contribute to a more resilient, equitable, and innovative future for artificial intelligence by championing decentralized principles.

## About This Website

This repository contains the source code for the official Project NANDA website, which is designed to be built using the Eleventy static site generator.

The website serves as a central hub to:
*   Share our research findings, including academic papers and technical articles.
*   Showcase applications and open-source tools developed within the NANDA ecosystem.
*   Provide updates on project developments and community news via our blog.
*   Announce upcoming events, workshops, and conferences.

**Live Site:** [https://aidecentralized.github.io/](https://aidecentralized.github.io/)
*(Note: The live site may not reflect these latest Eleventy source changes until successfully built and deployed from this structure).*

## Tech Stack

*   **Eleventy:** Static Site Generator
*   **Nunjucks:** Templating engine (primarily used)
*   **Markdown:** For blog posts and potentially other content
*   **HTML, CSS, Vanilla JavaScript**
*   **Node.js & npm:** For dependency management and running Eleventy

## Project Structure

*   `src/`: Contains all source files for the Eleventy site.
    *   `_includes/`: Layouts (e.g., `base.njk`, `post.njk`) and Partials (e.g., `navbar.njk`, `footer.njk`).
    *   `_data/`: Global data files (e.g., `papers.json`, `videos.json`).
    *   `posts/`: Blog posts written in Markdown.
    *   `css/`: CSS stylesheets.
    *   `js/`: JavaScript files.
    *   `assets/`: Static assets like images.
    *   Other HTML/Markdown files for individual pages (e.g., `index.html`, `papers.html`).
*   `docs/`: The output directory where the generated static site is placed after a successful build. This folder is typically what gets deployed.
*   `eleventy.config.js`: Eleventy configuration file.
*   `package.json`: Defines project dependencies (including Eleventy) and npm scripts.
*   `.gitignore`: Specifies intentionally untracked files that Git should ignore (e.g. `node_modules/`, `docs/`).

## Local Development & Building

**Prerequisites:**
*   Node.js and npm installed on your local machine.

**Setup:**
1.  Clone this repository: `git clone https://github.com/aidecentralized/aidecentralized.github.io.git` (Assuming this is the correct repo URL)
2.  Navigate to the project directory: `cd aidecentralized.github.io`
3.  Install dependencies: `npm install`

**Running Locally:**
*   To build the site and start a local development server with hot-reloading:
    ```bash
    npm start
    ```
    (This runs `eleventy --serve` as defined in `package.json`). Access the site at `http://localhost:8080` (or as indicated by Eleventy).

**Building for Production:**
*   To build the static site for deployment (output to `docs/`):
    ```bash
    npm run build
    ```
    (This runs `eleventy` as defined in `package.json`).

**Important Note on Current Build Status:**
The automated build process for this Eleventy site encountered environment-specific issues related to `npm` package installation and executable availability within the development/CI sandbox used for these changes. As a result, the `docs/` output directory could not be automatically generated and verified in that environment.

**The code in the `src/` directory represents the complete Eleventy source structure. To view or deploy this website, you will need to clone this repository to your local machine and run the build process as described above.**

## Making Modifications

*   **Content Pages:** Edit HTML or Markdown files in the `src/` directory (e.g., `src/index.html`, `src/posts/your-post.md`).
*   **Blog Posts:** Add new `.md` files to `src/posts/`.
*   **Data (Papers, Videos):** Update the JSON files in `src/_data/`.
*   **Layouts & Partials:** Modify templates in `src/_includes/`.
*   **Styling:** Edit `src/css/styles.css`.
*   **Client-side Scripts:** Edit `src/js/script.js`.

After making changes, Eleventy will typically rebuild the site automatically if `npm start` is running, or you can run `npm run build` manually.

## Further Information

To learn more about Project NANDA, please visit the live website or explore the content generated from this source once built locally.
