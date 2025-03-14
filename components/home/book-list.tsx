import { IBook } from "@/types";
import BookCard from "@/components/home/book-card";

interface Props {
  title: string;
  books: IBook[];
  containerClassName?: string;
}

export default function BookList({ title, books, containerClassName }: Props) {
  return (
    <section className={containerClassName}>
      <h2 className={"font-bebas-neue text-4xl text-light-100"}>{title}</h2>
      <ul className={"book-list"}>
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
}
