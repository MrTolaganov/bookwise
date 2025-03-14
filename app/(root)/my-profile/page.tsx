import { signOut } from "@/lib/auth";
import BookList from "@/components/home/book-list";
import { sampleBooks } from "@/constants";
import { Button } from "@/components/ui/button";

export default function Page() {
  const onAction = async () => {
    "use server";

    await signOut();
  };

  return (
    <>
      <form action={onAction} className={"mb-10"}>
        <Button className={"text-dark-100"}>Logout</Button>
      </form>
      <BookList title={"Borrowed Books"} books={sampleBooks} />
    </>
  );
}
