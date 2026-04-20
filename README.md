# CareerLens AI 🎓✨

🔗 **[Live Demo: CareerLens AI on Vercel](https://careerportal-umber.vercel.app)**

**CareerLens AI** is a premium, modern, AI-powered student career intelligence and placement-risk modeling dashboard. It is designed to predict placement timelines, estimate expected starting salaries, and identify students who may face delays in securing employment, specifically tailored for education loan borrowers, students, and lenders.

## 🚀 Features

* **Placement Risk Modeling**: AI-powered predictions for job placement probabilities at 3, 6, and 12 months post-graduation.
* **Expected Salary Estimation**: Real-time salary projections based on student profile, field, and current market benchmarks.
* **Interactive AI Assistant**: Embedded chat widget powered by Groq (LLaMA 3.3 70B) for personalized career guidance, risk explanation, and skill gap analysis.
* **Lender Intelligence View**: Specialized dashboard for lenders providing early visibility into employability risks, EMI-to-income ratios, and loan default probabilities.
* **Editable Student Profile**: Dynamic profile management allowing students to update their academic and personal details, reflecting instantly across the dashboard.
* **Industry & Labor Market Indicators**: Real-time insights into macro-economic conditions, sector hiring trends, and regional job density.
* **Premium UI/UX**: Designed with a clean, neo-portal aesthetic using soft gradients, glassmorphism, and a highly responsive layout (built with Tailwind CSS and Lucide React).

## 🛠️ Technology Stack

* **Frontend**: Next.js 14, React, Tailwind CSS, Recharts, Lucide Icons
* **AI Integration**: Groq API (LLaMA 3.3 70B model)
* **Design System**: Custom CSS variables, modern gradients, and smooth micro-animations

## ⚙️ Getting Started

### Prerequisites

* Node.js 18+
* A Groq API Key (for the AI Chat and Analysis features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hazz-Y/CareerLens-AI.git
   cd career_portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

* `/src/app`: Next.js app router pages and API routes (`/api/chat`, `/api/analyze`).
* `/src/components`: Reusable UI components (Sidebar, Navbar, EditableProfile, LenderDashboard, LaborMarketPanel, etc.).
* `/src/lib/mockData.ts`: Centralized mock data acting as the temporary database for the prototype.
* `/public`: Static assets including the application logo.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve CareerLens AI.
