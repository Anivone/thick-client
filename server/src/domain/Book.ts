import mongoose, { Document, Model, Schema } from "mongoose";

export interface BookProps {
  isbn: string;
  title: string;
  author: string;
}

export interface BookDocument extends BookProps, Document {}

interface BookModel extends BookProps, Model<BookDocument> {
  build(props: BookProps): BookDocument;
}

const BookSchema = new Schema<BookDocument>(
  {
    isbn: {
      required: true,
      type: String,
      unique: true,
    },
    title: {
      required: true,
      type: String,
    },
    author: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BookSchema.statics.build = (props: BookProps) => {
  return new Book(props);
};

const Book = mongoose.model<BookDocument, BookModel>("Book", BookSchema);

export default Book;
