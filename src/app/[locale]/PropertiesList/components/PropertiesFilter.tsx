import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { DropdownInput } from "@/components/DropdownInput";
import { PriceDropdownList } from "@/components/PriceDropdownList";
import { priceArray } from "@/lib/PriceArray";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Label } from "@/shadcn/components/ui/label";
import { Category, Developer, Location, Project } from "@/types/Properties";

type Props = {
  propertyType: string;
  onFilterPress: (
    selectedLocationIds: number[],
    selectedTypeIds: number[],
    selectedDeliveryTypes: string[],
    selectedFinishingTypes: string[],
    selectedBedroom: string[],
    selectedCompound: Project | undefined,
    fromPrice: number,
    toPrice: number
  ) => void;
};

const PropertiesFilter = ({ propertyType, onFilterPress }: Props) => {
  const t = useTranslations();
  const {
    getAllDevelopersApi,
    getAllProjectsApi,
    getAllNewLaunchesApi,
    getAllCategoriesApi,
    getAllLocationsApi,
  } = useGetApis();
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [, setProjectsSearched] = useState<Project[]>([]);
  const [selectedBedroom, setSelectedBedroom] = useState<string[]>([]);
  const [selectedFinishingTypes, setSelectedFinishingTypes] = useState<
    string[]
  >([]);
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
  const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState<string[]>(
    []
  );
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [, setLoadingSearch] = useState(false);
  const [projectPage, setProjectPage] = useState(1);
  const [, setLaunchPage] = useState(1);
  const [projectPages, setProjectPages] = useState(0);
  const [, setLaunchPages] = useState(0);
  //const [searchKeyword, setSearchKeyword] = useState('')
  //const [resultVisible, setResultVisible] = useState(false)
  const [, setLoadMore] = useState(false);

  const [devLoading, setDevLoading] = useState(false);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [devPages, setDevPages] = useState(1);
  const [devPage, setDevPage] = useState(1);

  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer>();
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const getAllDevelopers = async (
    page: number,
    refresh: boolean,
    search: string
  ) => {
    try {
      const response = await getAllDevelopersApi(page, search, propertyType);

      setDevPages(response.data.pageCount);
      setDevPage(response.data.page);
      setDevelopers((prev) =>
        refresh ? response.data.data : [...prev, ...response.data.data]
      );

      // لو حبيت تفعل البحث لاحقًا
      // setDevelopersSearched((prev) =>
      //   refresh ? response.data.data : [...prev, ...response.data.data]
      // );
    } catch (error) {
      console.log("Error", error);
    } finally {
      setDevLoading(false);
      setLoadMore(false);
    }
  };

  const getProjects = (page: number, refresh: boolean, search: string) => {
    // setProjectsLoading(true);

    getAllProjectsApi(page, search, propertyType, selectedDeveloper?.id || 0)
      .then((response) => {
        setProjectPages(response.data.pageCount);
        setProjectPage(response.data.page);
        if (propertyType !== "SEPARATED") {
          getNewLaunches(page, search, refresh, response.data.data);
          return;
        }
        setProjects((prev) =>
          refresh ? response.data.data : [...prev, ...response.data.data]
        );
        setProjectsSearched((prev) =>
          refresh ? response.data.data : [...prev, ...response.data.data]
        );
        setLoadMore(false);
        setLoadingSearch(false);
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadMore(false);
        setLoadingSearch(false);
        setProjectsLoading(false);
      })
      .finally(() => {
        //  setLoadMore(false)
        // setLoadingSearch(false)
        //  setProjectsLoading(false)
      });
  };

  const getNewLaunches = (
    page: number,
    search: string,
    refresh: boolean,
    existingProjects: Project[]
  ) => {
    getAllNewLaunchesApi(page, search, selectedDeveloper?.id || 0)
      .then((response) => {
        const concatProjects = [...existingProjects, ...response.data.data];
        setProjects((prev) =>
          refresh ? concatProjects : [...prev, ...concatProjects]
        );
        setProjectsSearched((prev) =>
          refresh ? concatProjects : [...prev, ...concatProjects]
        );
        setLaunchPages(response.data.pageCount);
        setLaunchPage(response.data.page);
        // const combined = [...existingProjects, ...response.data.data];
        // setProjects(combined);
        // setProjectsSearched(sortProjects(combined));
      })
      .catch(console.log)
      .finally(() => {
        setProjectsLoading(false);
        setLoadMore(false);
        setLoadingSearch(false);
      });
  };

  ///////// Get Categories
  const getCategories = async () => {
    try {
      const response = await getAllCategoriesApi(propertyType);
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  ///////////// get locations
  const getLocations = async () => {
    try {
      const response = await getAllLocationsApi(propertyType);
      setLocations(response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const mergLocationIds = (id: number) => {
    const locationIds = [...selectedLocationIds];
    if (locationIds.includes(id)) {
      locationIds.splice(locationIds.indexOf(id), 1);
    } else {
      locationIds.push(id);
    }
    setSelectedLocationIds(locationIds);
  };

  const mergTypeIds = (id: number) => {
    const typeIds = [...selectedTypeIds];
    if (typeIds.includes(id)) {
      typeIds.splice(typeIds.indexOf(id), 1);
    } else {
      typeIds.push(id);
    }
    setSelectedTypeIds(typeIds);
  };

  const mergDeliveryTypes = (type: string) => {
    const deliveryTypes = [...selectedDeliveryTypes];
    if (deliveryTypes.includes(type)) {
      deliveryTypes.splice(deliveryTypes.indexOf(type), 1);
    } else {
      deliveryTypes.push(type);
    }
    setSelectedDeliveryTypes(deliveryTypes);
  };

  const mergeFinishingTypes = (type: string) => {
    const finishingTypes = [...selectedFinishingTypes];
    if (finishingTypes.includes(type)) {
      finishingTypes.splice(finishingTypes.indexOf(type), 1);
    } else {
      finishingTypes.push(type);
    }
    setSelectedFinishingTypes(finishingTypes);
  };

  const mergeBedRooms = (type: string) => {
    const bedrooms = [...selectedBedroom];
    if (bedrooms.includes(type)) {
      bedrooms.splice(bedrooms.indexOf(type), 1);
    } else {
      bedrooms.push(type);
    }
    console.log("tttt", bedrooms);
    setSelectedBedroom(bedrooms);
  };

  const clearAll = () => {
    setSelectedLocationIds([]);
    setSelectedDeliveryTypes([]);
    setSelectedFinishingTypes([]);
    setSelectedTypeIds([]);
    setSelectedBedroom([]);
    setFromPrice(0);
    setToPrice(0);
  };
  useEffect(() => {
    getAllDevelopers(1, false, "");
    getCategories();
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);
  return (
    <div className="w-[100%] shadow-md p-2">
      <p className="font-bold mb-3">{t("Search in properties")}</p>
      <DropdownInput
        title={"selectDeveloper"}
        titleSearch={"searchDeveloper"}
        titleLoading={"developerLoading"}
        data={developers}
        value={selectedDeveloper?.id || parseInt("0")}
        width="w-full"
        onChange={(val) => {
          const selected = developers.find((dev) => dev.id === val);
          setSelectedProject(undefined);
          setSelectedDeveloper(selected);
        }}
        hasMore={devPages > devPage}
        onLoadMore={getAllDevelopers}
        page={devPage}
        loadingMore={devLoading}
      />

      <div className="my-[2vmin]" />
      <DropdownInput
        title={"selectProject"}
        titleSearch={"searchProject"}
        titleLoading={"projectLoading"}
        data={projects}
        value={selectedProject?.id}
        width="w-full"
        onChange={(val) => {
          const selected = projects.find((project) => project.id === val);
          setSelectedProject(selected);
        }}
        onClick={() => {
          setProjects([]);
          getProjects(1, true, "");
        }}
        hasMore={projectPages > projectPage}
        onLoadMore={getProjects}
        page={projectPage}
        loadingMore={projectsLoading}
      />

      <div className="border-t-1 my-[2vmin]" />
      <PriceDropdownList
        title={"From Price"}
        data={priceArray()}
        value={fromPrice}
        width="w-full"
        onChange={(val) => setFromPrice(val)}
      />
      <div className="my-[2vmin]" />
      <PriceDropdownList
        title={"To Price"}
        data={priceArray()}
        value={toPrice}
        width="w-[100%]"
        onChange={(val) => setToPrice(val)}
      />

      <div className="border-t-1 my-4" />
      {/* Type start */}
      <p className="text-md font-bold">{t("Type")}</p>
      <div className="grid grid-cols-2 gap-6 my-[2vmin]">
        {categories.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={`${item.id}`}
              checked={selectedTypeIds.includes(item.id)}
              onCheckedChange={() => mergTypeIds(item.id)}
            />
            <Label htmlFor="terms">{item.categoryName}</Label>
          </div>
        ))}
      </div>
      {/* Type end */}

      <div className="border-t-1 my-4" />
      {/* location start */}
      <p className="text-md font-bold">{t("Location")}</p>
      <div className="grid grid-cols-2 gap-6 my-[2vmin]">
        {locations.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={`${item.id}`}
              checked={selectedLocationIds.includes(item.id)}
              onCheckedChange={() => mergLocationIds(item.id)}
            />
            <Label htmlFor="terms">{item.name}</Label>
          </div>
        ))}
      </div>
      {/* location end */}

      <div className="border-t-1 my-4" />
      {/* delivery start */}
      <p className="text-md font-bold">{t("Delivery")}</p>
      <div className="grid grid-cols-2 gap-6 my-[2vmin]">
        {[
          "READY-To-MOVE",
          "AFTER-ONE-YEAR",
          "AFTER-TWO-YEARS",
          "AFTER-THREE-YEARS",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Checkbox
              id={item}
              checked={selectedDeliveryTypes.includes(item)}
              onCheckedChange={() => mergDeliveryTypes(item)}
            />
            <Label htmlFor="terms">{t(item)}</Label>
          </div>
        ))}
      </div>
      {/* delivery end */}

      <div className="border-t-1 my-4" />
      {/* finishing start */}
      <p className="text-md font-bold">{t("Finishing")}</p>
      <div className="grid grid-cols-2 gap-6 my-[2vmin]">
        {["FULLY-FINISHED", "SEMI-FINISHED", "CORE-SHELL"].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Checkbox
              id={item}
              checked={selectedFinishingTypes.includes(item)}
              onCheckedChange={() => mergeFinishingTypes(item)}
            />
            <Label htmlFor="terms">{t(item)}</Label>
          </div>
        ))}
      </div>
      {/* finishing end */}

      <div className="border-t-1 my-4" />
      {/* bedrooms start */}
      <p className="text-md font-bold">{t("Bedrooms")}</p>
      <div className="grid grid-cols-2 gap-6 my-[2vmin]">
        {["ONE-BEDROOM", "TWO-BEDROOM", "THREE-BEDROOM", "DUPLEX"].map(
          (item) => (
            <div key={item} className="flex items-center gap-3">
              <Checkbox
                id={item}
                checked={selectedBedroom.includes(item)}
                onCheckedChange={() => mergeBedRooms(item)}
              />
              <Label htmlFor="terms">{t(item)}</Label>
            </div>
          )
        )}
      </div>
      {/* bedrooms end */}

      <Button
        type="submit"
        className="w-full my-4"
        onClick={() =>
          onFilterPress(
            selectedLocationIds,
            selectedTypeIds,
            selectedDeliveryTypes,
            selectedFinishingTypes,
            selectedBedroom,
            selectedProject || undefined,
            fromPrice,
            toPrice
          )
        }
      >
        {t("Search")}
      </Button>
      <Button
        type="submit"
        className="w-full bg-white border-1 border-primary mt-2 hover:bg-primary/4 "
        onClick={() => clearAll()}
      >
        <p className="text-primary">{t("Reset")}</p>
      </Button>
    </div>
  );
};

export default PropertiesFilter;
