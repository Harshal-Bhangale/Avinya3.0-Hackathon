# BitBots_x_LevelSuperMindHackathon

Level SuperMind Pre-Hackathon Assignment, Powered By Level SuperMind

## Links 

Here are the important links for the Social Media Performance Analyzer project :

1. Live Demo - https://bit-bots-x-level-super-mind-hackathon.vercel.app/

2. YouTube Demo - https://youtu.be/sSM_xtDCn98

3. Project Submission - https://www.findcoder.io/projects/bit-bots/67802a678015401a98a4a6c5

# Social Media Performance Analyzer
Hello Everyone, We Team Bit Bots,

This project demonstrates how AI, GPT integration, and database technologies enhance social media analytics by simulating engagement data and providing actionable insights. Using DataStax Astra DB for efficient data storage and Langflow with GPT integration for AI-driven workflows, the module analyzes post performance metrics such as likes, shares, and comments across different post types (e.g., Reels, Carousels). The GPT integration generates meaningful insights, helping content creators optimize strategies, improve engagement, and make data-driven decisions. This approach reduces manual effort, enhances content effectiveness, and empowers smarter social media management.

## Pre-Hackahton Assignment

Objective - Build a basic analytics module using Langflow and DataStax to analyze engagement data from mock social media accounts.

Tools to Use:\
DataStax Astra DB for database operations\
Langflow for workflow creation and GPT integration

Task Details:
1. Fetch Engagement Data:
Create a small dataset simulating social media engagement (e.g., likes, shares, comments, post types).
Store this data in DataStax Astra DB.

2. Analyze Post Performance: Using Langflow, build a simple flow that
Accepts post types (e.g., carousel, reels, static images) as input.
Queries the dataset in Astra DB to calculate average engagement metrics for each post type.

3. Provide Insights: Use GPT integration in Langflow to generate simple insights based on the data
Example outputs:
Carousel posts have 20% higher engagement than static posts.
Reels drive 2x more comments compared to other formats.
##  Problem, Solution And How It Enhances Tasks And Safety 

Problem - Social media creators and marketers face challenges in analyzing content performance across formats like Reels, Carousels, and Static Images. Manual interpretation of engagement metrics such as likes, shares, and comments is time-consuming, prone to errors, and often lacks actionable insights.

Solution -  This project solves these issues by automating analysis with AI, GPT integration, and database technologies, delivering accurate metrics/insights and intelligent recommendations. It enables creators to optimize strategies, boost engagement, and make data-driven decisions efficiently.

How It Enhances Tasks and Safety :- This project simplifies social media analytics by automating engagement analysis and providing AI-driven insights. It reduces manual effort, minimizes errors, and helps creators optimize content strategies. Using DataStax Astra DB ensures secure data handling, while Langflow with GPT integration delivers reliable recommendations. This combination boosts productivity, improves decision-making, and ensures data security, making analytics faster and smarter.
## How it Works

1. Data Ingestion:
Social media performance data (e.g., likes, comments, shares) is fetched and stored in Datastax Astra DB.
Data is processed and analyzed using a LangFlow-based workflow.

2. LangFlow Workflow:
It integrates LangFlow to orchestrate the data processing pipeline. Below snapshot of the workflow:

<img src="public\assests\t3.png" alt="Project Logo" />

    Workflow Steps -
    1.Text Input: "The user begins by entering a query, such as 'Compare engagement for reels and static posts.'
    File Loader: "This component loads the engagement data stored in a CSV file."
    2. Parse Data: "It extracts specific metrics like likes, shares, and comments for analysis."
    3. Astra DB: "This connects to DataStax Astra DB, where the data is stored, and fetches the necessary information."
    4. Text Splitter: "If the data is too large, the Text Splitter divides it into smaller chunks for easier processing."
    5. Combine Text: "Once the chunks are processed, they are combined back into a single dataset ready for GPT analysis."
    6. Prompt: "The Prompt component structures the data in a way that GPT can easily understand."
    7. Groq: "Groq filters the data, ensuring only the most relevant information is passed to GPT."
    8. Chat Output: "Finally, Chat Output displays the insights, such as ‘Reels have higher engagement than static posts."

3. Data Storage with Astra DB:
Datastax Astra DB is used for storing social media data in a scalable, cloud-native database.
The table schema is designed to include:
user_id: Unique identifier for the user.
user_name: Name of the usrr
post_type: Type of post (reel,carousel,static image).
likes, comments, shares: Metrics tracked for performance analysis.
hashtag: contains various hashtag



## Features for the Social Media Performance Analyzer

1. Automated Engagement Analysis :
Collect and analyze engagement metrics (likes, shares, comments) for different post formats (Carousels, Reels, Static Images).

2. AI-Driven Insights :
Use Groq model to generate insights and recommendations based on social media performance data.

3. Data Storage with DataStax Astra DB:
Store and manage performance data securely and efficiently in DataStax Astra DB for scalability.

4. Performance Comparison:
Compare engagement metrics across different post types to identify which format performs better.

5. Real-Time Recommendations:
Provide actionable, AI-powered recommendations in real-time for optimizing content strategy.

## Tech Stack


1. React.js (with TypeScript for type safety
2. Tailwind CSS
3. Node.js with Express.js for setting up API routes.
4. Langflow integrated with Groq for AI-driven insights and recommendations.
5. DataStax Astra DB for secure and scalable cloud-native data storage.


## Run Locally

1. Clone the project

```bash
  git clone https://github.com/Harshal-Bhangale/BitBots_x_LevelSuperMindHackathon.git
```

2. Go to the project directory

```bash
  cd BitBots_x_LevelSuperMindHackathon
```

3. Install dependencies

```bash
  npm install
```
4. Set up environment variables for DataStax Astra DB and Groq API.

5. Start the server

```bash
  npm run start
```




## Team 

- Harshal Bhangale[ @Harshal-Bhangale](https://github.com/Harshal-Bhangale)
- Vaibhav Sathe [ @ryucraftz](https://github.com/ryucraftz)


