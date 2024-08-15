import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hook";
import { DeleteCloth } from "@/redux/slices/clothSlice";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
interface props {
  Brand: string;
  clothId: string;
}
const DeleteDialog: React.FunctionComponent<props> = ({ Brand, clothId }) => {
  const [text, setText] = useState<string>("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (text !== `delete my ${Brand} from my wardrobe`) {
      toast({
        title: "please enter correct text for confirmation",
      });
      return;
    }
    //after that we need to dispatch the action
    dispatch(DeleteCloth({ clothId }))
      .then(() => {
        toast({
          title: "deleted successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <MdDelete
          size={32}
          className="absolute right-1 bottom-1 text-red-600"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your cloth data from our servers.
          </DialogDescription>
          <p>Type "delete my {Brand} from my wardrobe"</p>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Search Product by title"
            className="appearance-none bg-white border md:w-96 w-64 border-gray-300 rounded-md py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300 ">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-gradient-to-r bg-red-600 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300 "
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDialog;
