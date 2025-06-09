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

This repository contains the source code for the official Project NANDA website, available at [https://aidecentralized.github.io/](https://aidecentralized.github.io/).

The website serves as a central hub to:
*   Share our research findings, including academic papers and technical articles.
*   Showcase applications and open-source tools developed within the NANDA ecosystem.
*   Provide updates on project developments and community news via our blog.
*   Announce upcoming events, workshops, and conferences.

## Tech Stack

This website is built using plain:
*   HTML
*   CSS
*   Vanilla JavaScript (primarily for including shared HTML components like the navbar and footer)

## Website Structure Overview

*   `index.html`: The main landing page.
*   Other `.html` files (e.g., `papers.html`, `blog.html`, `blog-1.html`): Individual content pages.
*   `navbar.html`, `footer.html`: Reusable HTML snippets for the navigation bar and footer. These are dynamically included in pages by `script.js`.
*   `styles.css`: Contains all styling rules for the website.
*   `script.js`: Handles the inclusion of HTML partials (navbar, footer) and other minor client-side interactions (e.g., mobile menu, smooth scroll).

All these files reside in the root directory of the project.

## Viewing the Website

*   **Live Site:** [https://aidecentralized.github.io/](https://aidecentralized.github.io/)
*   **Locally:** To view the website locally, simply clone or download this repository and open the `index.html` file in your preferred web browser. All other pages can be accessed by navigating from the homepage or opening their respective HTML files directly.

## Making Modifications

*   **Content:** Edit the content directly within the relevant `.html` files (e.g., to update text on the About section in `index.html`, or to change a blog post in `blog-1.html`).
*   **Navigation Menu:** Modify `navbar.html`.
*   **Footer:** Modify `footer.html`.
*   **Styling:** Edit `styles.css`.
*   **Client-side Interactions:** Edit `script.js`.

Since this is a static site, changes pushed to the `main` (or `master`) branch of the GitHub repository will be reflected on the live site served by GitHub Pages, assuming it's configured to serve from that branch's root.

## Further Information

To learn more about Project NANDA, please visit:
*   [About Us](index.html#about) (on the live site, or `index.html#about` locally)
*   [Research Papers](papers.html)
*   [Blog](blog.html)
