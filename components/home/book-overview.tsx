import { IBook } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/home/book-cover";

export default function BookOverview(book: IBook) {
  return (
    <section className={"book-overview"}>
      <div className={"flex flex-1 flex-col gap-5"}>
        <h1>{book.title}</h1>
        <div className={"book-info"}>
          <p>
            By{" "}
            <span className={"font-semibold text-light-200"}>
              {book.author}
            </span>
          </p>
          <p>
            Category{" "}
            <span className={"font-semibold text-light-200"}>{book.genre}</span>
          </p>
          <div className={"flex flex-row gap-1"}>
            <Image
              src={"/icons/star.svg"}
              alt={"Star"}
              width={22}
              height={22}
            />
            <p>{book.rating}</p>
          </div>
        </div>
        <div className={"book-copies"}>
          <p>
            Total Books <span>{book.total_copies}</span>
          </p>
          <p>
            Available Books <span>{book.available_copies}</span>
          </p>
        </div>
        <p className={"book-description"}>{book.description}</p>
        <Button className={"book-overview_btn"}>
          <Image src={"/icons/book.svg"} alt={"Book"} width={20} height={20} />
          <p className={"font-bebas-neue text-xl text-dark-100"}>Borrow</p>
        </Button>
      </div>
      <div className={"relative flex flex-1 justify-center"}>
        <div className={"relative"}>
          <BookCover
            variant={"wide"}
            className={"z-10"}
            coverColor={book.color}
            coverImage={book.cover}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant={"wide"}
              coverColor={book.color}
              coverImage={book.cover}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
