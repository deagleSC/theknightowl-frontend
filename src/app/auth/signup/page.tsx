import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signupOptions = [
  {
    title: "Chess Player",
    value: "player",
    description: "I want to learn and improve my chess game",
    points: [
      "Learn and improve your chess game",
      "Teach and mentor chess players",
      "Support your child's chess journey",
    ],
    cta: {
        text: "I'm a chess player!",
        href: "/auth/signup/player",
    }
  },
  {
    title: "Chess Coach",
    value: "coach",
    description: "I want to teach and mentor chess players",
    points: [
      "Teach and mentor chess players",
      "Support your child's chess journey",
      "Earn extra income by teaching chess",
    ],
    cta: {
        text: "I'm a chess coach!",
        href: "/auth/signup/coach",
    }
  },
  {
    title: "Chess Parent",
    value: "parent",
    description: "I want to support my child's chess journey",
    points: [
      "Support your child's chess journey",
      "Earn extra income by teaching chess",
      "Track and monitor your child's progress",
    ],
    cta: {
        text: "I'm a chess parent!",
        href: "/auth/signup/parent",
    }
  },
];

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl text-center">
        Which of the following best describes you?
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {signupOptions.map((option) => (
            <Card key={option.value} className="w-full h-[300px] flex flex-col">
              <CardHeader className="flex flex-col gap-2 h-full">
                <CardTitle>{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
                <CardContent>
                  <ul className="list-disc space-y-2 -ml-3 text-sm">
                    {option.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>     
                </CardContent>
              </CardHeader>
              <CardFooter>
                <Button className="w-full h-full" asChild>
                  <Link href={option.cta.href}>{option.cta.text}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
