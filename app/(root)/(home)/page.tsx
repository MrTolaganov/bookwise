import BookOverview from "@/components/home/book-overview";
import BookList from "@/components/home/book-list";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function Page() {
  const response = await db.select().from(users);

  // console.log(JSON.stringify(response, null, 2));
  console.log(response);

  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title={"Latest Books"}
        books={sampleBooks}
        containerClassName={"mt-28"}
      />
    </>
  );
}
