import { useState } from "react";
import { Wallet, IndianRupee, Receipt, ArrowUpDown } from "lucide-react";

import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import StatCard from "../Dashboard/StatCard";

import { useProfile } from "../../hooks/useProfile";
import { useDashboard } from "../../hooks/useDashboard";
import Loader from "../../components/common/Loader";
import FinancialHealthCard from "./FinancialHealthCard";

function Profile() {
  const { profile, loading, updateProfile } = useProfile();
  const { data: dashboard } = useDashboard();

  const [open, setOpen] = useState(false);

  if (loading) return <Loader />;

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 rounded-2xl bg-gray-50 p-6 dark:bg-gray-950">
      <ProfileCard user={profile} onEdit={() => setOpen(true)} />

      {dashboard && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Current Balance"
            value={dashboard.balance}
            prefix="₹"
            icon={Wallet}
            iconBg="bg-blue-100 text-blue-600"
          />

          <StatCard
            title="Total Income"
            value={dashboard.totalIncome}
            prefix="₹"
            icon={IndianRupee}
            iconBg="bg-green-100 text-green-600"
          />

          <StatCard
            title="Total Expense"
            value={dashboard.totalExpense}
            prefix="₹"
            icon={Receipt}
            iconBg="bg-red-100 text-red-600"
          />

          <StatCard
            title="Transactions"
            value={dashboard.totalTransactions}
            icon={ArrowUpDown}
            iconBg="bg-purple-100 text-purple-600"
          />
        </div>
      )}

      {dashboard && (
        <FinancialHealthCard
          balance={dashboard.balance}
          income={dashboard.totalIncome}
          expense={dashboard.totalExpense}
        />
      )}

      <EditProfileModal
        open={open}
        user={profile}
        onClose={() => setOpen(false)}
        onSave={async (data) => {
          await updateProfile(data);
        }}
      />
    </div>
  );
}

export default Profile;
