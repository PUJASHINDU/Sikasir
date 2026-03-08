import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link as RouterLink } from "react-router-dom";

const NavbarComponents = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul
      className="
        flex flex-col md:flex-row
        items-center
        gap-4 md:gap-6 lg:gap-8
        font-poppins text-sm font-medium
      "
    >
      {[
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transaksi", path: "/" },
        { name: "Laporan", path: "/laporan" },
      ].map((item) => (
        <li key={item.name} className="w-full md:w-auto text-center">
          <RouterLink
            to={item.path}
            className="
              block cursor-pointer
              text-white/70
              hover:text-indigo-400
              transition-all
              relative
              py-2 md:py-0
              after:absolute
              after:-bottom-1
              after:left-1/2
              after:-translate-x-1/2
              after:h-[2px]
              after:w-0
              after:bg-indigo-400
              after:transition-all
              hover:after:w-6
            "
          >
            {item.name}
          </RouterLink>
        </li>
      ))}
    </ul>
  );

  return (
    <Navbar
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[94%] md:w-[90%] lg:w-auto
        max-w-6xl
        px-5 md:px-6 py-3
        rounded-xl md:rounded-2xl lg:rounded-full
        bg-[#0B1120]/70
        backdrop-blur-xl
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
    >
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Typography
          as={RouterLink}
          to="/"
          className="
            font-poppins font-bold
            text-indigo-400
            text-lg
            tracking-wide
            mr-4 md:mr-6 lg:mr-10
            cursor-pointer
          "
        >
          SIKASIR
        </Typography>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navList}

          <div className="flex items-center gap-2 lg:gap-3">
            <RouterLink to="/login">
              <Button
                variant="text"
                size="sm"
                className="
                  font-poppins
                  text-white/80
                  hover:text-white
                "
              >
                Login
              </Button>
            </RouterLink>

            <RouterLink to="/register">
              <Button
                size="sm"
                className="
                  bg-indigo-500
                  hover:bg-indigo-600
                  font-poppins
                  rounded-full
                  px-6
                  shadow-lg
                  hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]
                  transition-all
                "
              >
                Daftar
              </Button>
            </RouterLink>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <IconButton
          variant="text"
          className="md:hidden text-white"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </IconButton>
      </div>

      {/* MOBILE MENU */}
      <Collapse open={openNav} className="md:hidden">
        <div
          className="
            mt-4
            flex flex-col gap-4
            rounded-xl
            bg-[#0B1120]/80
            backdrop-blur-xl
            border border-white/10
            p-4
          "
        >
          {navList}

          <div className="flex flex-col gap-3 pt-2">
            <RouterLink to="/login">
              <Button
                variant="outlined"
                fullWidth
                className="
                  font-poppins
                  border-white/20
                  text-white
                  hover:bg-white/5
                "
              >
                Login
              </Button>
            </RouterLink>

            <RouterLink to="/register">
              <Button
                fullWidth
                className="
                  bg-indigo-500
                  hover:bg-indigo-600
                  font-poppins
                  shadow-lg
                "
              >
                Daftar
              </Button>
            </RouterLink>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponents;