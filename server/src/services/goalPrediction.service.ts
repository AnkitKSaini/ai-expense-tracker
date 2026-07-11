import  model  from "../config/gemini.js";

interface GoalInput {
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

export async function predictGoal(
  goal: GoalInput,
) {
  const remaining =
    goal.targetAmount -
    goal.savedAmount;

  const prompt = `
You are an AI Financial Planner.

Goal:
${goal.title}

Target:
₹${goal.targetAmount}

Saved:
₹${goal.savedAmount}

Remaining:
₹${remaining}

Deadline:
${goal.deadline}

Respond ONLY in JSON.

{
"probability":"",
"monthlySaving":"",
"risk":"",
"estimatedCompletion":"",
"recommendation":""
}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}