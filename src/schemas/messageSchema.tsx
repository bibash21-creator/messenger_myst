import {z} from "zod"


export const messageSchema = z.object({
    content: z
    .string()
    .min(10, 'Content must  be of 10 characters')
    .max(1000, 'Content must be within 1000 characters')
})


// Import zod
//    ↓
// Create z.object()
//    ↓
// Define field → z.string()
//    ↓
// Set rules → .min() / .max()
//    ↓
// Export schema
