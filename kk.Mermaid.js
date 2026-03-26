Product Requirements Document (PRD): Influencer-Campaign Matching Engine
1. Overview & Objective
Currently, the platform allows any influencer to participate in any campaign. This is a critical flaw because unmatched campaigns lead to poor conversion rates, destroying advertiser Return on Investment (ROI) and platform trust.
To become the "Google Ads for influencers," we are introducing a Priority Matching Sub-System.
The Goal: Calculate a Match Score (0-100) for every influencer when a new campaign is launched. Instead of hard-banning users who aren't a perfect fit, we use a Cascading Access system combined with a "Soft Penalty" score. The system ranks influencers based on their Match Score, ensuring top-tier, highly relevant influencers get priority access to the best jobs. If a campaign is not fulfilled quickly, access cascades down to the rest of the network (including Activated, Inactive, and Suspended users).
2. The 100-Point Match Formula
The system calculates priority based on a maximum score of 100 points, split into a Base Match (80 pts) and a Performance Bonus (20 pts).
A. Base Match Score (Max 80 Points)
Calculated based on how well the influencer's profile matches the advertiser's target parameters.
Platform (30 Points): Uses a multi-select array. * Why: Advertisers may target single or multiple platforms (e.g., TikTok AND Instagram).
Match: +30 Points (Influencer's platform exists within the Advertiser's target platforms array).
No Match: +0 Points.
Niche (30 Points): Uses a multi-select array and a Similarity Matrix.
Exact/Array Match: +30 Points (e.g., Influencer is "Beauty", Advertiser targets "Beauty").
Similar Match: +15 Points (e.g., Influencer is "Entertainment", mapped as similar to "Beauty").
Unrelated: +0 Points.
Gender (10 Points):
Match (or Advertiser selects "Any"): +10 Points.
No Match: +0 Points.
Age (10 Points): Uses a multi-select array.
Match: +10 Points (Influencer's age bracket is within the Advertiser's target array).
No Match: +0 Points.
B. Performance Bonus (Max 20 Points)
Rewards proven influencers while allowing new/suspended users to compete purely on their Base Match.
Active (>100 accepted clicks): +20 Points.
Activated (1-99 accepted clicks): +10 Points.
New / Inactive / Suspended: +0 Points.
3. System Constraints & Safety Nets
Cascading Access (Time-Delayed Release): * Why: As a growing agency, we need to ensure campaigns are fulfilled even if we lack perfect matches, while still trying to protect advertiser ROI in the early stages of a campaign.
Rule: If an influencer scores below 40 points, or if their platform does not match the advertiser's target platform, the system will Drop influencers from this campaign pool or let them access it after some time have passed (e.g., 48 hours).
Phase 1 (Exclusive): Only high-scoring, platform-matching influencers see the job.
Phase 2 (Open): Time delay expires; remaining budget is open to the wider pool.
Primary & Secondary Sorting:
Primary: ORDER BY match_score DESC. (An 80-point Suspended user ALWAYS beats a 75-point Active user. Math dictates priority).
Secondary: ORDER BY status ASC. (If two users tie at 75 points, the Active/Activated user is placed above the Suspended user).
4. Activity Diagram / Workflow Logic
Below is the visual flowchart and step-by-step logic the backend system will execute upon campaign creation:
Visual Activity Diagram
```mermaid flowchart TD Start([Advertiser Launches Campaign]) --> Init[1. Retrieve Campaign Parameters] Init --> Query[2. Query Influencer Database]
Query --> CalcBase[3. Calculate Base Match Score]
CalcBase --> CalcPerf[4. Add Performance Bonus]
CalcPerf --> SumScore[5. Sum Total Match Score]

SumScore --> CheckFilters{6. Passes Platform Match AND Score >= 40?}
CheckFilters -- No --> Delay([7. Drop influencers from this campaign pool \n or let them access it after some time have passed])
CheckFilters -- Yes --> Sort[8. Sort: Primary Score DESC, Secondary Status ASC]

Delay -.->|Time Elapsed| Sort

Sort --> Publish[9. Publish to Influencer Dashboards]
Publish --> End([End Workflow])


```
Step-by-Step Logic
Step 1: Campaign Initiation
Advertiser clicks "Launch Campaign".
System retrieves campaign parameters (Target Platform Array, Target Niche Array, Target Age Array, Target Gender, Budget).
Step 2: Data Retrieval
System queries the database of all registered influencers.
Step 3: Calculate Base Score & Performance Bonus
System calculates Base Match (Platform + Niche + Gender + Age).
System queries account status and adds Performance Bonus (0, 10, or 20).
System sums total Match Score (Max 100).
Step 4: Phase 1 Access Check (Quality & Platform)
Decision: Does the influencer's Platform match AND is their Final Score  40?
No: Drop influencers from this campaign pool or let them access it after some time have passed (Phase 2).
Yes: Keep in Phase 1 eligible pool.
Step 5: Sorting & Dashboard Distribution
System sorts eligible influencers (Primary: Score DESC, Secondary: Status ASC).
System publishes the campaign to the respective influencers' "Available Jobs" dashboards.
Influencers scoring  80 points see the campaign pinned at the top with a "High Match" UI badge.
