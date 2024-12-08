
# **The Knight Owl Frontend**  
### **Checkmate your limits**

Welcome to the frontend repository for **The Knight Owl**, a platform designed to empower young chess players by connecting them with expert coaches and providing a collaborative space to improve their game. This repository houses the code for the user-facing interface, built with a modern tech stack for performance, accessibility, and scalability.

---

## **Tech Stack**  

- **Framework**: [Next.js](https://nextjs.org/)  
- **Styling**: [ShadCN](https://shadcn.dev/) and [Tailwind CSS](https://tailwindcss.com/)  
- **Icons**: [React Feather](https://github.com/feathericons/react-feather)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  

---

## **Features**  

1. **User-Centric Design**  
   - Intuitive UI for players, coaches, and parents.  
   - Fully responsive across devices (desktop, tablet, mobile).  

2. **Integration with Backend APIs**  
   - Dynamic data fetching from the Django-powered backend.  
   - Secure authentication and session management.  

3. **Interactive Components**  
   - Real-time collaboration tools (e.g., analysis board).  
   - Seamless booking, profile management, and game analysis.  

4. **Theming & Customization**  
   - Light and dark mode support.  
   - Built with a modular component-based architecture for reusability.  

---

## **Project Structure**  

```plaintext
theknightowl-frontend/
├── components/         # Reusable React components
├── pages/              # Next.js page routing
├── styles/             # Tailwind and global styles
├── public/             # Static assets
├── utils/              # Helper functions and utilities
├── hooks/              # Custom React hooks
├── types/              # TypeScript types and interfaces
└── next.config.js      # Next.js configuration
```

---

## **Getting Started**  

Follow these steps to set up and run the frontend locally:

### **Prerequisites**  
- **Node.js** (v16 or higher)  
- **npm** or **yarn**  

### **Installation**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/theknightowl-frontend.git
   cd theknightowl-frontend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env.local` file for environment variables:  
   ```plaintext
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8000/ws
   ```

4. Run the development server:  
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```

---

## **Scripts**  

- `npm run dev`: Start the development server.  
- `npm run build`: Build the project for production.  
- `npm run start`: Start the production server.  
- `npm run lint`: Run linter to ensure code quality.  

---

## **Contributing**  

We welcome contributions! Follow these steps:  

1. Fork the repository and clone it locally.  
2. Create a new branch for your feature or bugfix:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes and push to your branch.  
4. Submit a pull request for review.  

Check out our [Contributing Guidelines](link_to_contributing_guidelines) for detailed instructions.

---

## **License**  

This project is licensed under the [MIT License](link_to_license_file).  

---

## **Contact**  

For any questions or feedback, reach out to the development team at **support@theknightowl.com**.  

---

