function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Recent Transactions
      </h2>

      <ul className="space-y-3">
        <li>Coffee - ₹250</li>
        <li>Groceries - ₹2,100</li>
        <li>Netflix - ₹649</li>
      </ul>
    </div>
  );
}

export default RecentTransactions;