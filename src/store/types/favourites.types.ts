import { NewLaunch, ProjectsUnit } from "@/types/PropertiesV2";

export interface UserState {
  favouritesProperties: ProjectsUnit[];
  favouritesNewLaunches: NewLaunch[];
  setFavouritesProperties: (property: ProjectsUnit[]) => void;
  setFavouritesNewlaunches: (newlaunches: NewLaunch[]) => void;
}
