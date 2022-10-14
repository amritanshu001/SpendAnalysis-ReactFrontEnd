const navbar_data = [
  { title: "Home", href: "/", id: "01", visible: true },
  { title: "Login", href: "/login", id: "02", visible: !ctx.isLoggedIn },
  {
    title: "Register",
    href: "/register",
    id: "03",
    visible: !ctx.isLoggedIn,
  },
  {
    title: "Spend Analysis",
    href: "/spendanalysis",
    id: "04",
    visible: ctx.isLoggedIn,
  },
  {
    title: "Manage Accounts",
    href: "/manageaccount",
    id: "05",
    visible: ctx.isLoggedIn,
  },
  {
    title: "Upload Statement",
    href: "/uploadstatement",
    id: "06",
    visible: ctx.isLoggedIn,
  },
  {
    title: "Bank Details",
    href: "/addbank",
    id: "07",
    visible: ctx.isLoggedIn && ctx.isAdmin,
  },
];

export default navbar_data;
