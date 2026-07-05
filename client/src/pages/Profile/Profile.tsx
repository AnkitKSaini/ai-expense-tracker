import { useState } from "react";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import { useProfile } from "../../hooks/useProfile";
import Loader from "../../components/common/Loader";

function Profile() {
  const { profile, loading, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);

  if (loading) return <Loader />;

  if (!profile) return null;
  return (
    <div className="mx-auto max-w-4xl p-6">
      <ProfileCard user={profile} onEdit={() => setOpen(true)} />

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
