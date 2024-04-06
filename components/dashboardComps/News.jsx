import Link from "next/link";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

function DashBoardNews() {
  return (
    <main className="my-5 w-[90%] mx-auto">
      <div className=" w-full">
        <Card>
          <CardHeader className="flex flex-col items-center justify-between">
            <CardTitle className=" font-2xl font-bold">
              Latest News and Updates
            </CardTitle>
            <CardDescription>
              Keep in tune with the latest news across africa
            </CardDescription>
          </CardHeader>
          <CardContent className="grid lg:grid-cols-3 gap-4 mt-3">
            <CardContent className="space-y-1 my-5 rounded-xl border-2">
              <Image
                alt="Featured Story Image"
                className="rounded-lg border object-cover mx-auto my-2"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "800/500",
                  objectFit: "cover",
                }}
                width={250}
              />
              <div>FEATURED STORY</div>
              <div className="line-clamp-3">
                The 2024 Olympics: A Spectacle of Human Achievement
              </div>
              <div className="line-clamp-2">
                After years of anticipation, the 2024 Summer Olympics have
                finally arrived, bringing together athletes from around the
                world to showcase their talents and compete for glory.
              </div>
              <div className="flex items-center">
                <div className="mr-2">2 hours ago</div>
                <Link
                  className="font-medium underline"
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                >
                  Read more
                </Link>
              </div>
            </CardContent>

            <CardContent className="space-y-1 my-5 rounded-xl border-2">
              <Image
                alt="Sports Story Image"
                className="rounded-lg border object-cover mx-auto my-2"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "800/500",
                  objectFit: "cover",
                }}
                width={250}
              />
              <div>SPORTS</div>
              <div className="line-clamp-2">
                Breaking Records: The Rise of Young Tennis Sensation Emma Parker
              </div>
              <div className="line-clamp-2">
                At just 18 years old, Emma Parker has taken the tennis world by
                storm, defeating seasoned veterans and rising stars alike with
                her formidable skills on the court.
              </div>
              <div className="flex items-center">
                <div className="mr-2">5 hours ago</div>
                <Link
                  className="font-medium underline"
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                >
                  Read more
                </Link>
              </div>
            </CardContent>

            <CardContent className="space-y-1 my-5 rounded-xl border-2">
              <Image
                alt="Entertainment Story Image"
                className="rounded-lg border object-cover mx-auto my-2"
                height={250}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "800/500",
                  objectFit: "cover",
                }}
                width={250}
              />
              <div>ENTERTAINMENT</div>
              <div className="line-clamp-2">
                Behind the Scenes: The Making of the Years Biggest Blockbuster
              </div>
              <div className="line-clamp-2">
                Dive into the world of movie magic as we take you behind the
                scenes of the highly anticipated film starFall, where
                groundbreaking special effects meet captivating storytelling.
              </div>
              <div className="flex items-center">
                <div className="mr-2">10 hours ago</div>
                <Link
                  className="font-medium underline"
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                >
                  Read more
                </Link>
              </div>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default DashBoardNews;
