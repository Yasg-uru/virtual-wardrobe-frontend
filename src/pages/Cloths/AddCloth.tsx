import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/Date-picker";
import clothSchema from "@/schema/clothschema/createCloth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/redux/hook";
import { AddUserCloth } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";

const AddCloth: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(clothSchema),
  });

  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(
    null
  );

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    dispatch(AddUserCloth(data))
      .then(() => {
        toast({
          title: "Successfully added your cloths to the wardrobe",
        });
      })
      .catch((error: any) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 m-8 shadow-2xl shadow-slate-600 p-5 rounded-md"
        >
          <h1 className="text-center  text-2xl font-bold italic ">
            Add Cloth Form
          </h1>
          {imagePreviewUrl && (
            <Avatar className="mx-auto h-10 w-10">
              <AvatarImage src={imagePreviewUrl} />
              <AvatarFallback>Selected</AvatarFallback>
            </Avatar>
          )}
          <FormField
            control={form.control}
            name="imageurl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purchasedate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Date</FormLabel>
                <FormControl>
                  <DatePickerDemo
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Top">Top</SelectItem>
                      <SelectItem value="Bottom">Bottom</SelectItem>
                      <SelectItem value="Accessory">Accessory</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Brown" {...field} />
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />

          {/* New Fields */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. casual, summer" {...field} />
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seasonSuitability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Season Suitability</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season suitability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isSummer">Summer</SelectItem>
                      <SelectItem value="isWinter">Winter</SelectItem>
                      <SelectItem value="isSpring">Spring</SelectItem>
                      <SelectItem value="isAutumn">Autumn</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weatherSuitability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weather Suitability</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weather suitability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isRainSuitable">Rain</SelectItem>
                      <SelectItem value="isWindSuitable">Wind</SelectItem>
                      <SelectItem value="isSunnySuitable">Sunny</SelectItem>
                      <SelectItem value="isCloudySuitable">Cloudy</SelectItem>
                      <SelectItem value="isSnowySuitable">Snowy</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input placeholder="89.99" type="number" />
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFavorite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favorite</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is this your favorite?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Archived</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Is this archived?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="italic font-bold text-xl" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCloth;
