import { useState } from "react";
import axios from "../../api/api";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function AIPage() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");

  const generateInsight = async () => {
    try {
      setLoading(true);

      const today = new Date();

      const { data } = await axios.post("/ai/insights", {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      });

      setInsight(data.insights);

      toast.success("AI Insight Generated");
      toast.success("AI Insight Generated");
    } catch (error) {
      toast.error("Failed to generate AI Insight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <button
        onClick={generateInsight}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        {loading ? "Generating..." : "Generate AI Insight"}
      </button>

      {insight && (
        <div className="mt-6 rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">AI Expense Analysis</h2>
        
        <div className="prose max-w-none dark:prose-invert">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {insight}
  </ReactMarkdown>
</div>
        </div>
      )}
    </div>
  );
}

export default AIPage;
