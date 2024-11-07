import Link from "next/link";

import Localsearch from "@/components/search/Localsearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to create a new project in Next.js?",
    description:
      "I am trying to create a new project in Next.js but I am not able to do it. Can someone help me with this?",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    downvotes: 1,
    answers: 1,
    views: 100,
    createdAt: new Date(),
  },

  {
    _id: "2",
    title: "how to design a website using figma?",
    description:
      "I am trying to design a website using figma but I am not able to do it. Can someone help me with this?",
    tags: [
      { _id: "1", name: "figma" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "1", name: "Matt stewart" },
    upvotes: 1,
    downvotes: 12,
    answers: 12,
    views: 10,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <Localsearch
          placeholder="Search questions..."
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
          route="/"
        />
      </section>
      {/* HomeFilter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <div key={question._id}>
            <h1>{question.title}</h1>
            {/* <p>{question.description}</p> */}
          </div>
        ))}
      </div>
    </>
  );
}
