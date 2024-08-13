import { z } from "zod";

// Define a Zod schema for the form
const clothSchema = z.object({
  userId: z.string(), // Assuming this is always required
  imageurl: z.string().url().optional(), // URL string for image
  category: z.enum([
    "Top",
    "Bottom",
    "Accessory",
    "Footwear",
    "Outerwear",
    "Other",
  ]), // Select options
  color: z.string().min(1, "Color is required"), // String field with minimum length validation
  size: z.string().optional(), // Optional string field for size
  brand: z.string().optional(), // Optional string field for brand
  material: z.string().optional(), // Optional string field for material
  tags: z.array(z.string()).optional(), // Array of strings for tags
  purchaseDate: z.string().transform((val) => new Date(val)), // Date in ISO string format
  condition: z.string().optional(), // Optional string field for condition
  wearcount: z.number().int().nonnegative().optional(), // Integer number for wear count
  lastWorn: z
    .string()
    .transform((val) => new Date(val))
    .optional(), // Optional date in ISO string format
  cost: z.number().positive("Cost must be a positive number"), // Number field with validation
  isFavorite: z.string().min(1, "favourate field is required"), // Boolean field for favorite status
  isArchived: z.string().min(1, "archive is required"), // Boolean field for archived status
  isFormal: z.boolean().optional(), // Optional boolean field for formal status
  weatherSuitability: z.object({
    isRainSuitable: z.string(),
    isWindSuitable: z.string(),
    isSunnySuitable: z.string(),
    isCloudySuitable: z.string(),
    isSnowySuitable: z.string(),
  }), // Object with weather suitability booleans
  seasonSuitability: z.object({
    isWinter: z.string(),
    isSummer: z.string(),
    isSpring: z.string(),
    isAutumn: z.string(),
  }), // Object with season suitability booleans
});

export default clothSchema;
