import dashboard_1 from "../assets/images/projects/dashboard/dashboard-1-bank-campaign.png";
import dashboard_2 from "../assets/images/projects/dashboard/dashboard-2-airbnb.png";
import dashboard_3 from "../assets/images/projects/dashboard/dashboard-3.png";
const projects = [
  {
    id: 1,
    category: "Dashboard",
    title:
      "Bank Campaign Performance Dashboard (Term-Deposit Subscription Reporting)",
    subtitle: "2st Milestone in Data Science Academya Arkavidia ITB 2025",
    year: "March 2025",
    description_1:
      "Developed an interactive dashboard to report bank marketing campaign performance and customer subscription behavior, integrating key KPIs such as total clients, subscription rate, cal duration effectiveness, and demographic segmentation.",
    description_2:
      "The dashboard highlights the strongest drivers of successful term-deposit subscriptions (e.g., cal duration, contact channel, and campaign timing), supporting data-driven targeting strategies and model interpretation for the stacked ensemble prediction project.",
    software: "Tableau Public",
    image: dashboard_1,
    preview: [
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv1.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv2.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv3.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv4.webp"],
      },
    ],
  },

  {
    id: 2,
    category: "Dashboard",
    title: "Airbnb Listing Performance & User Insights Dashboard",
    subtitle: " Dashboard Analysis Competition, Gelar Rasa 2024",
    year: "November 2024",
    description_1:
      "Developed an interactive Tableau dashboard to analyze Airbnb listing performance, user preferences, and neighborhood-level trends using key metrics such as review scores, room type distribution, pricing, and booking patterns. The dashboard enables data-driven insights for optimizing host strategy by identifying high-demand areas, top-performing listings, and the most influential amenities affecting customer satisfaction.",
    software: "Tableau Public",
    image: dashboard_2,
    preview: [
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv1.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv2.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv3.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv4.webp"],
      },
    ],
  },

  {
    id: 3,
    category: "Dashboard",
    title: "US Superstore Half - Year Sales Performance Report (2024)",
    subtitle: "Final project of Microsoft Excel Bootcamp at Edspert.id",
    year: "February 2025",
    description_1:
      "Developed an interactive Excel-based sales reporting dashboard to analyze US Superstore performance across revenue, profit, product quantity, customer segmentation, and geographic trends over a 6-month period. The report highlights key business insights such as total revenue of $51,339 and total profit of $7,700.85, with California as the highest-profit state ($1,552.95) and Oregon as the lowest ($11.85), supporting targeted strategy improvements for underperforming regions.",
    software: "Microsoft Excel",
    image: dashboard_3,
    preview: [
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv1.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv2.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv3.webp"],
      },
      {
        title: "Kalmia Coffee",
        images: ["/images/kalmia-coffee/prv4.webp"],
      },
    ],
  },

  {
    id: 4,
    category: "Data Analysis",
    title:
      "Multi-species Marine Mammal Audio Classification Using Bioacoustic Feature Fusion Integrationin Machine Learning Models",
    subtitle: "Final Data Mining Competition INTELECTA 2025",
    year: "November 2025",
    image: dashboard_1,
    description_1:
      "Built an audio classification pipeline using MFCC, spectral features, and mel-spectrogram feature fusion to strengthen signal representation. Improved model robust ness by bench marking multivariate regression, supervised learning, and deep learning approaches on complex marine acoustic patterns.",
    software: "VS Code - Python",
  },
  {
    id: 5,
    category: "Data Analysis",
    title:
      "Predictive Modeling of Annual Average Temperatures Integrating Agricultural and Environmental Data to Support Sustainable Food Security",
    subtitle: "Preliminary Round Data Mining Competition INTELECTA 2025",
    year: "November 2025",
    event: "",
    image: dashboard_1,
    description_1:
      "Developed an interactive Excel-based sales reporting dashboard to analyze US Superstore performance across revenue, profit, product quantity, customer segmentation, and geographic trends over a 6-month period. The report highlights key business insights such as total revenue of $51,339 and total profit of $7,700.85, with California as the highest-profit state ($1,552.95) and Oregon as the lowest ($11.85), supporting targeted strategy improvements for underperforming regions.",
    software: "VS Code - Python",
  },
  {
    id: 6,
    category: "Data Analysis",
    title: "BurnAlyze: Smart Detection and Classification of Skin Burns",
    subtitle: "Final Project of CodingCampby DBS Foundation",
    year: "May - June 2025",
    image: dashboard_1,
    description_1:
      "Developed a transfer learning image classification model using MobileNetV2 to detect burn severity from medical images. Improved model performance through fine-tuning and architectural enhancements (Global Average Pooling + Dense layers) to support faster severity screening.",
    software: "(VS Code, Google Colabs) - Python, GitHub",
  },
  {
    id: 7,
    category: "Data Analysis",
    title:
      "Content-Based Movie Recommendation Using TF-IDF and Cosine Similarity: An Analysis on the TMDB Dataset",
    subtitle: "Project of CodingCampby DBS Foundation 2025",
    year: "April 2025",
    image: dashboard_1,
    description_1:
      "This project developed a content-based movie recommendation system using TF-IDF vectorization and cosine similarity. The system achieved strong ranking performance with Precision@10 = 0.90 and NDCG@10=0.9337, ensuring highly relevant recommendations were consistently prioritized.",
    software: "VS Code, GoogleColabs - Python",
  },
  {
    id: 8,
    category: "Data Analysis",
    title:
      "Machine Learning-Based Fraud Detectionon Imbalanced Bank Account Transaction Data: A Bench marking Study",
    subtitle: "Project of CodingCampby DBS Foundation 2025",
    year: "April 2025",
    image: dashboard_1,
    description_1:
      "This study built and evaluated multiple machine learning models on the NeurIPS 2022 Bank Account Fraud dataset consisting of 1,000,000 records and 32 features. Gradient Boosting achieved the best performance with AUC=0.8645 and Accuracy=0.9876, supporting effective fraud detection under highly imbalanced conditions.",
    software: "VS Code - Python",
  },
];

export default projects;
