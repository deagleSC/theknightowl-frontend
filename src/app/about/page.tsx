import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/AppLayout";

export default function About() {

  const breadcrumbData = [
    {
      title: "About Us",
      url: "/about",
    },
  ];

  return (
    <AppLayout breadcrumbData={breadcrumbData} isLoading={false}>
      <div className="p-2">
        <section className="mb-10">
          <TypographyH2 className="border-b-0 -mb-5">Our Mission</TypographyH2>
          <TypographyP>
            At <strong>The Knight Owl</strong>, our mission is to democratize
            access to high-quality chess education and mentorship. We aim to
            nurture the next generation of chess champions by creating a space
            where learning, growth, and community converge.
          </TypographyP>
        </section>

        <section className="mb-10">
          <TypographyH2 className="border-b-0 -mb-5">Our Story</TypographyH2>
          <TypographyP>
            The Knight Owl was born out of a passion for chess and a desire to
            make quality chess education accessible to everyone. Our team of
            chess enthusiasts, developers, and educators came together to create
            a platform that combines cutting-edge technology with a deep love
            for the game.
          </TypographyP>
        </section>

        <section className="mb-10">
          <TypographyH2 className="mb-3 border-b-0">
            Why Choose The Knight Owl?
          </TypographyH2>
          <div className="flex flex-col md:flex-row gap-3">
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 -mb-5 text-xl">
                  Interactive Learning
                </TypographyH2>
                <TypographyP>
                  With tools like live collaboration, interactive lessons, and
                  AI-powered game analysis, The Knight Owl turns learning into
                  an adventure.
                </TypographyP>
              </CardContent>
            </Card>
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 -mb-5 text-xl">
                  Global Community
                </TypographyH2>
                <TypographyP>
                  Join a growing network of players, coaches, and enthusiasts
                  from around the world. Share knowledge, compete, and grow
                  together.
                </TypographyP>
              </CardContent>
            </Card>
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 -mb-5 text-xl">
                  Tailored for Growth
                </TypographyH2>
                <TypographyP>
                  From beginner to advanced levels, our platform evolves with
                  you. Track your performance, gain actionable insights, and
                  achieve milestones as you master the game.
                </TypographyP>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <TypographyH2 className="mb-3 border-b-0">What we offer</TypographyH2>
          <div className="flex flex-col md:flex-row gap-3">
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 mb-2 text-xl">
                  For Players
                </TypographyH2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personalized coaching from top-rated chess mentors.</li>
                  <li>
                    Tools for in-depth game analysis and skill development.
                  </li>
                  <li>
                    Resources like tutorials, puzzles, and curated lessons.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 mb-2 text-xl">
                  For Coaches
                </TypographyH2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A platform to connect with passionate players.</li>
                  <li>
                    Scheduling tools to manage sessions and track progress.
                  </li>
                  <li>Opportunities to contribute to the chess community.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="basis-1/3">
              <CardContent>
                <TypographyH2 className="border-b-0 py-5 mb-2 text-xl">
                  For Parents
                </TypographyH2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Insights into your child’s progress and development.</li>
                  <li>A safe, engaging platform for growth.</li>
                  <li>
                    Resources to help your child succeed in chess and life.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <TypographyH2 className="border-b-0 -mb-5">Get Involved</TypographyH2>
          <TypographyP>
            Ready to take your game to the next level?
            <strong> Join as a Player</strong> to find a coach, improve your
            skills, and climb the leaderboard.
            <strong> Join as a Coach</strong> to inspire the next generation of
            chess players.
          </TypographyP>
        </section>
      </div>
    </AppLayout>
  );
}
