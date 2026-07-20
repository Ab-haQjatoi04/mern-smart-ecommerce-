# ⚡ Nexus Tech: Smart AI-Powered E-Commerce Platform

An advanced, decoupled Full-Stack MERN application featuring an independent, localized Artificial Intelligence layer that automates real-time product recommendations. Built to demonstrate content-based filtering algorithms operating completely within a native server architecture.

---

## 👥 Team Roles & Contributions

*   **Abdul Haq:** Backend Engineering Core — Engineered the Express.js RESTful API endpoints, architected the local Mongoose models, integrated the RAM-isolated In-Memory database system, and wrote the vector-based Cosine Similarity mathematical matching utilities.
*   **Muhammad Bux:** Frontend UI/UX Architecture — Designed and engineered the modular React.js storefront application component tree, implemented the custom CSS3 styling layouts, configured Vite asset pipelines, and wired up asynchronous Axios state handlers for live AI data mapping.

---

## 🚀 Core Features

*   **Intelligent Recommendation Engine:** Utilizes an $N$-dimensional Vector Space Model to convert product metadata tags into numerical trajectories and ranks related products dynamically in real-time.
*   **Pure Algorithmic Independence:** Executes similarity parsing completely using raw server-side mathematics without relying on external, slow cloud machine learning APIs.
*   **Isolated In-Memory Data Layer:** Integrates an in-memory database configuration that provisions a native, sandboxed database binary directly inside system RAM—eliminating external network routing dependencies and bypassing ISP port blocks.
*   **Premium Visual Storefront:** A modern consumer-grade dashboard featuring responsive product showcases, an interactive checkout pipeline, and a dynamic tracking card visualizing live AI feature allocations.

---

## 🧠 Algorithmic Architecture & Mathematics

The core recommendation engine relies on a mathematical **Vector Space Model (VSM)**. When a user interacts with a product, the item's metadata attributes are vectorized into numerical arrays. 

To determine the directional affinity between the active item ($A$) and a catalog item ($B$), the system evaluates the spatial angle between their respective feature matrices using the **Cosine Similarity Formula**:

$$\text{Similarity}(A, B) = \frac{A \cdot B}{\|A\| \|B\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \cdot \sqrt{\sum_{i=1}^{n} B_i^2}}$$

*   A structural calculation output near **1.0** indicates identical feature properties (highest recommendation mapping).
*   An output of **0.0** indicates orthogonal vectors containing zero shared semantic attributes.

---

## 🛠️ Built With

*   **Frontend:** React.js, Vite, Axios, Custom CSS3 Grid/Flexbox
*   **Backend:** Node.js, Express.js (RESTful API Architecture)
*   **Database ORM:** Mongoose
*   **Storage Virtualization:** MongoDB Memory Server (`mongodb-memory-server`)

---

## 💻 Getting Started

Follow these steps to pull, install, and execute the complete framework locally on your device:

### 1. Restore Subdirectory Dependencies
Open your command terminal inside each app directory and restore the system environment:

```bash
# Set up the Backend
cd mern-ecommerce-backend
npm install

# Set up the Frontend
cd ../mern-ecommerce-frontend
npm install
