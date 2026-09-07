import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.enum(["Site vitrine", "Site administrable", "Application web", "E-commerce"]),
  description: z.string().min(1),
  image: z.string().regex(/^\/projects\/[a-zA-Z0-9/_-]+\.(webp|png|jpg|jpeg|avif)$/),
  imageAlt: z.string().min(1),
  url: z.url({ protocol: /^https$/ }),
  year: z.number().int().min(2020).max(2100),
});
export type Project = z.infer<typeof projectSchema>;
// Only real, approved client projects. See docs/PROJECTS.md.
export const projects: Project[] = z.array(projectSchema).parse([]);
