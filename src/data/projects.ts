export interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Example Project",
    description: "A placeholder project. Replace with your actual projects.",
    url: "https://github.com",
    tags: ["typescript", "ai"],
  },
];
