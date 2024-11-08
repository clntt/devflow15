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

export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `a ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
}
