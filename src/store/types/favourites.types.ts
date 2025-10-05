import { NewLaunch, Property } from "@/types/Properties";

export interface UserState {
  favouritesProperties: Property[];
  favouritesNewLaunches: NewLaunch[];
  setFavouritesProperties: (property: Property[]) => void;
  setFavouritesNewlaunches: (newlaunches: NewLaunch[]) => void;
}
