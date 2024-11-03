import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techname: string) => {
  const normalizedTechName = techname.replace(/\./g, "-").toLowerCase();

  const techMap: { [key: string]: string } = {
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",
    react: "devicon-react-original",
    nodejs: "devicon-nodejs-plain",
    HTML: "devicon-html5-plain",
    CSS: "devicon-css3-plain",
    Python: "devicon-python-plain",
    Java: "devicon-java-plain",
    MongoDB: "devicon-mongodb-plain",
    Docker: "devicon-docker-plain",
  };

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored `
    : "devicon-devicon-plain";
};
