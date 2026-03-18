import { useMemo, useState } from "react";

type FilterArgs<T> = {
  items: T[];
  getCompany: (item: T) => string | null | undefined;
  getDate: (item: T) => string | null | undefined;
};

function getTimeOrMax(dateValue: string | null | undefined): number {
  if (!dateValue) {
    return Number.MAX_SAFE_INTEGER;
  }

  const parsed = Date.parse(dateValue);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

export function useFilt<T>({ items, getCompany, getDate }: FilterArgs<T>) {
  const [selectedCompany, setSelectedCompany] = useState<string>("All");

  const companyOptions = useMemo(() => {
    const unique = Array.from(
      new Set(
        items
          .map(getCompany)
          .filter((company): company is string => Boolean(company)),
      ),
    );

    return ["All", ...unique];
  }, [items, getCompany]);

  const filteredItems = useMemo(() => {
    const filtered =
      selectedCompany === "All"
        ? items
        : items.filter((item) => getCompany(item) === selectedCompany);

    return [...filtered].sort(
      (a, b) => getTimeOrMax(getDate(a)) - getTimeOrMax(getDate(b)),
    );
  }, [items, selectedCompany, getCompany, getDate]);

  return {
    selectedCompany,
    setSelectedCompany,
    companyOptions,
    filteredItems,
  };
}
