import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/Authstate";
import { useAppDispatch } from "@/redux/hook";
import { useToast } from "@/components/ui/use-toast";
import { editProfile } from "@/redux/slices/authSlice";
import { useAuthContext } from "@/context/authContext";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [username, setUserName] = useState<string>(user.username);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { checkAuth } = useAuthContext();
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profileUrl || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    if (username) {
      formData.append("username", username);
    }
    dispatch(editProfile(formData))
      .unwrap()
      .then(() => {
        toast({
          title: "your profile edited successfully",
        });
        checkAuth();
      })
      .catch((error) => {
        toast({
          title: error,
        });
      });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile picture. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                id="username"
                defaultValue={user.username}
                className="col-span-3"
              />
            </div>

            {/* Profile Picture Upload Section */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImage" className="text-right">
                Profile Picture
              </Label>
              <div className="col-span-3 flex flex-col items-start gap-2">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-56 h-24 rounded-md object-cover border"
                  />
                )}
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
