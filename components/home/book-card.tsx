import { IBook } from "@/types";
import Link from "next/link";
import BookCover from "@/components/home/book-cover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BookCard(book: IBook) {
  return (
    <li className={cn(book.isLoaned && "xs:w-52 w-full")}>
      <Link
        href={`/books/${book.id}`}
        className={cn(book.isLoaned && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={book.color} coverImage={book.cover} />
        <div className={cn("mt-4", !book.isLoaned && "xs:max-w-40 max-w-28")}>
          <p className={"book-title"}>{book.title}</p>
          <p className={"book-genre"}>{book.genre}</p>
        </div>
        {book.isLoaned && (
          <div className={"mt-3 w-full"}>
            <div className={"book-loaned"}>
              <Image
                src={"/icons/calendar.svg"}
                alt={book.title}
                width={18}
                height={18}
                className={"object-contain"}
              />
              <p className={"text-light-100"}>11 days left to return</p>
            </div>
            <Button className={"book-btn"}>Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
}
