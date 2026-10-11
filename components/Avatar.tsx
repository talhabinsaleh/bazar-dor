/* eslint-disable @next/next/no-img-element */
import { User } from "lucide-react";

export default function Avatar({
  name,
  image,
  className = "size-9",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={name ?? "user"}
        referrerPolicy="no-referrer"
        className={`${className} rounded-xl object-cover`}
      />
    );
  }
  return (
    <span className={`${className} grid place-items-center rounded-xl bg-secondary text-primary`}>
      <User className="size-1/2" />
    </span>
  );
}
