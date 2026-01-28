// lib/routes.ts

export const routes = {
  Home: "/",
  About: "/about",
  Profile: "/profile",
  PropertiesList: "/PropertiesList",
  PropertyDetails: {
    Details: (id: number | undefined) => `/PropertyDetails/${id}`,
  },
  NewLaunches: "/NewLaunches",
  SharedProperties: "/shared-properties",
  Contests: "/Contests",
  AboutUs: "/AboutUs",
  ClosingForm: "/ClosingForm",
  SharesDeals: "/shares-deals",
  ContactUs: "/contactUs",
  AccountDetails: "/accounts/accountDetails",
  UpdateAccount: "/accounts/updateAccount",
  ChangePassword: "/accounts/changePassword",
  Favourites: "/favourites",
  History: "/accounts/history",
  IncentiveByMeetings: "/byit-A-team/incentive-by-meetings",
  NewMeetings: "/byit-A-team/incentive-by-meetings/new-meetings",
  GuideLines: "/guideLines",
  LeadGenration: {
    Root: "/byit-A-team/lead-genration",
    MyLeads: (campaignId: number | string) =>
      `/byit-A-team/lead-genration/my-leads/${campaignId}`,
  },
  Blog: {
    Root: "/blog",
    slug: (slug: string) => `/blog/${slug}`,
  },
  Dashboard: {
    Root: "/dashboard",
    Settings: "/dashboard/settings",
    Users: {
      root: "/dashboard/users",
      id: (id: string) => `/dashboard/users/${id}`,
    },
  },
  auth: {
    Login: "/login",
    Register: "/register",
    ForgotPassword: "/forgot-password",
  },
} as const;

export type RoutePaths =
  | typeof routes.Home
  | typeof routes.About
  | typeof routes.Profile
  | typeof routes.Blog.Root
  | ReturnType<typeof routes.Blog.slug>
  | typeof routes.Dashboard.Root
  | typeof routes.Dashboard.Settings
  | typeof routes.Dashboard.Users.root
  | ReturnType<typeof routes.Dashboard.Users.id>
  | typeof routes.auth.Login
  | typeof routes.auth.Register
  | typeof routes.auth.ForgotPassword;
