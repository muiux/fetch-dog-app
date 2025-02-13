import { useCallback, useEffect, useState } from "react";
import { Button, Pagination, Select, Spinner } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import { Dog } from "../types";
import { useDogDetails, useSearchDogs } from "../api/dog";
import CardContainer from "../components/CardContainer";
import { useLogout } from "../api/auth";
import FilterModal, { Filter } from "../components/FilterModal";
import MatchModal from "../components/MatchModal";
import { useFavContext } from "../hooks/useFavContext";

const Search = () => {
  const { favorites } = useFavContext();
  const [searchParams, setSearchParams] = useSearchParams();
  // Page state
  const [sort, setSort] = useState<string>(
    searchParams.get("sort") || "breed:asc"
  );
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [size, setSize] = useState<25 | 50 | 100>(
    parseInt(searchParams.get("size") || "25") as 25 | 50 | 100
  );
  const [total, setTotal] = useState<number>(0);

  // Data state
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>({
    ageMin: "",
    ageMax: "",
    breeds: [],
  });

  // Fetch data
  const { data: dogsData } = useSearchDogs({
    breeds: filter.breeds,
    ageMin: (filter.ageMin && Number(filter.ageMin)) || undefined,
    ageMax: (filter.ageMax && Number(filter.ageMax)) || undefined,
    size: size,
    from: (page - 1) * size,
    sort: sort,
  });
  const { data: dogs = [], isPending: isFetchingDogsPending } =
    useDogDetails<Dog[]>(selectedDogIds);

  // Mutate data
  const { mutate: logout } = useLogout();

  // Modal state
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);

  useEffect(() => {
    if (dogsData) {
      const { resultIds, total } = dogsData;
      setTotal(total);
      setSelectedDogIds(resultIds);
    }
  }, [dogsData]);

  useEffect(() => {
    setSearchParams({
      sort,
      page: page.toString(),
      size: size.toString(),
    });
  }, [sort, page, size, setSearchParams]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const getSortDirection = useCallback(
    (field: string) => {
      return sort.split(":")[0] === field ? (
        sort.split(":")[1] === "asc" ? (
          <FaSortAmountUp className="ml-2 h-5 w-5" />
        ) : (
          <FaSortAmountDown className="ml-2 h-5 w-5" />
        )
      ) : (
        ""
      );
    },
    [sort]
  );

  const onSort = useCallback(
    (value: string) => () => {
      const [field, direction] = sort.split(":");
      if (field === value) {
        setSort(`${value}:${direction === "asc" ? "desc" : "asc"}`);
      } else {
        setSort(`${value}:asc`);
      }
    },
    [sort]
  );

  return (
    <div className="max-w-7xl min-h-screen w-full flex flex-col gap-4 items-center justify-center p-4 m-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg md:text-3xl">Find Your Perfect Dog</h1>
        <Button size="xs" color="gray" outline onClick={() => logout()}>
          <IoLogOut className="h-5 w-5" />
        </Button>
      </div>
      {isFetchingDogsPending ? (
        <div className="h-full grow p-4 flex flex-col items-center justify-center">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <Button.Group>
                <Button color="gray" onClick={onSort("breed")}>
                  Breed {getSortDirection("breed")}
                </Button>
                <Button color="gray" onClick={onSort("name")}>
                  Name {getSortDirection("name")}
                </Button>
                <Button color="gray" onClick={onSort("age")}>
                  Age {getSortDirection("age")}
                </Button>
              </Button.Group>
            </div>
            <div className="flex gap-4">
              <Button
                color="purple"
                onClick={() => favorites.length > 0 && setOpenMatchModal(true)}
                disabled={favorites.length === 0}
              >
                Find Match
              </Button>
              <Button color="blue" onClick={() => setOpenFilterModal(true)}>
                Apply Filters
              </Button>
            </div>
          </div>
          <div className="w-full min-h-full">
            <CardContainer dogs={dogs} />
          </div>
        </>
      )}
      {total > 0 && (
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <Select
              id="size"
              className="w-20"
              value={size}
              onChange={(e) =>
                setSize(e.target.value as unknown as 25 | 50 | 100)
              }
            >
              {[25, 50, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <span>of {total.toLocaleString()} dogs</span>
          </div>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / size)}
            onPageChange={setPage}
            previousLabel="<"
            nextLabel=">"
          />
        </div>
      )}

      <FilterModal
        isOpen={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        onApply={setFilter}
      />
      <MatchModal
        isOpen={openMatchModal}
        onClose={() => setOpenMatchModal(false)}
      />
    </div>
  );
};

export default Search;
