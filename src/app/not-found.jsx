import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center object-center p-8 m-8 space-y-4">
      <h2 className="text-3xl text-muted-foreground">404!- Not Found</h2>
      <p className="text-xl text-primary">
        Sorry sir! <br /> This page is not developed yet. <br /> Try other pages
        please!
      </p>
      <Link
        href="/"
        className=" text-white rounded-md py-1 px-2 bg-primary hover:bg-blue-700"
      >
        Return Home
      </Link>
    </div>
  );
}
