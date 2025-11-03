import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserProfile from "./user-profile";
import { getUser } from "@/server/user-action";

const Header = async () => {
  const links = [{ to: "/", label: "Home" }] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 container mx-auto">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <UserProfile />

          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
